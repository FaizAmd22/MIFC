/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Stage, Layer, Arrow, Circle } from "react-konva";
import DraggableResizableIcon from "../../components/DraggableResizableIcon";
import SideToolbar from "../../components/SideToolbar";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import listIcons from "../../data/Icon";
import BlackArrow from "../../../../assets/toolbarIcons/icon17.svg";
import RedArrow from "../../../../assets/toolbarIcons/icon18.svg";
import SaveModal from "../../components/SaveModal";
import { Button } from "@/components/ui/button";

interface ShapeProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  icon: string;
  data?: { [key: string]: string };
}

interface CircleProps {
  id: string;
  x: number;
  y: number;
  radius: number;
}

const CanvasEdit: React.FC<{ data: any }> = ({ data }) => {
  const { shapes, connections } = data;
  const canvasId = data.id;

  const [shapesState, setShapes] = useState(shapes || []);
  const [connectionsState, setConnections] = useState(connections || []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<{
    from: string;
    to: string;
  } | null>(null);
  const [selectedColorArrow, setSelectedColorArrow] = useState<string>("black");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [circles, setCircles] = useState<CircleProps[]>([]);

  const handleSaveCanvas = () => {
    const savedFiles = JSON.parse(localStorage.getItem("files") || "[]");
    console.log("save file: ", savedFiles);

    const existingFileIndex = savedFiles.findIndex(
      (file: any) => file.fileName === canvasId
    );
    console.log("existing file: ", existingFileIndex);

    if (existingFileIndex !== -1) {
      savedFiles[existingFileIndex].shapes = shapesState;
      savedFiles[existingFileIndex].connections = connectionsState;
      localStorage.setItem("files", JSON.stringify(savedFiles));
      setSuccessMessage(`Canvas data "${data.fileName}" has updated.`);
    } else {
      const newFile = {
        id: Date.now().toString(),
        fileName: data.fileName,
        shapes: shapesState,
        connections: connectionsState,
      };
      savedFiles.push(newFile);
      localStorage.setItem("files", JSON.stringify(savedFiles));
      setSuccessMessage(`Canvas data saved as "${newFile.fileName}".`);
    }

    setIsSaveModalOpen(true);
  };

  const addIcon = (icon: string) => {
    const newShape = {
      id: Date.now().toString(),
      x: 100,
      y: 100,
      width: 60,
      height: 60,
      icon,
      data: {},
    };

    setShapes((prevShapes: ShapeProps[]) => [...prevShapes, newShape]);
    setSelectedId(newShape.id); // Pastikan shape baru dipilih
    setSidebarVisible(true); // Tampilkan sidebar untuk shape baru
    setFormData({}); // Reset form data
  };

  const handleIconClick = (shape: ShapeProps) => {
    if (isShiftPressed && selectedId) {
      const existingConnection = connectionsState.find(
        (conn: any) => conn.from === selectedId && conn.to === shape.id
      );

      if (!existingConnection) {
        setConnections((prevConnections: any) => [
          ...prevConnections,
          { from: selectedId, to: shape.id, color: selectedColorArrow },
        ]);
      }
    } else {
      setSelectedId(shape.id);
      setFormData(shape.data || {});
      setSidebarVisible(true);
    }
  };

  const handleShapeChange = (newAttrs: ShapeProps) => {
    setShapes((prevShapes: ShapeProps[]) =>
      prevShapes.map((shape: ShapeProps) =>
        shape.id === newAttrs.id ? { ...shape, ...newAttrs } : shape
      )
    );

    // Update the position of the associated circle
    setCircles((prevCircles) =>
      prevCircles.map((circle) => {
        if (circle.id === newAttrs.id) {
          return {
            ...circle,
            x: newAttrs.x + newAttrs.width / 2,
            y: newAttrs.y + newAttrs.height / 2,
          };
        }
        return circle;
      })
    );

    if (selectedId === newAttrs.id) {
      setFormData(newAttrs.data || {});
    }
  };

  const handleConnectionClick = (connection: { from: string; to: string }) => {
    setSelectedConnection(connection);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (selectedId) {
      setShapes((prevShapes: ShapeProps[]) =>
        prevShapes.map((shape: ShapeProps) =>
          shape.id === selectedId
            ? { ...shape, data: { ...formData, [name]: value } }
            : shape
        )
      );
    }
  };

  const saveShape = () => {
    if (selectedId) {
      setShapes((prevShapes: any) =>
        prevShapes.map((shape: any) =>
          shape.id === selectedId ? { ...shape, data: { ...formData } } : shape
        )
      );
    }
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
    setSelectedId(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsShiftPressed(true);
    }
    if (e.key === "Delete") {
      if (selectedId) {
        setShapes(
          shapesState.filter((shape: ShapeProps) => shape.id !== selectedId)
        );
        setSelectedId(null);
        setSidebarVisible(false);
      } else if (selectedConnection) {
        setConnections(
          connectionsState.filter(
            (connection: { from: string; to: string }) =>
              connection !== selectedConnection
          )
        );
        setSelectedConnection(null);
      }
    }
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const confirmDeleteAll = () => {
    setShapes([]);
    setConnections([]);
    setSelectedId(null);
    setSelectedConnection(null);
    setSidebarVisible(false);
    closeDeleteModal();
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsShiftPressed(false);
    }
  };

  const handleChangeColorArrow = (color: string) => {
    setSelectedColorArrow(color);
  };

  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedConnection(null);
      setSelectedId(null);
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (selectedId) {
      const selectedShape = shapesState.find(
        (shape: any) => shape.id === selectedId
      );
      if (selectedShape) {
        setFormData(selectedShape.data || {});
      }
    }
  }, [selectedId, shapesState]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [shapesState, selectedId, selectedConnection]);

  return (
    <div className="grid grid-cols-8">
      <div className="h-[90vh] overflow-auto bg-white rounded-xl col-span-6">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onClick={handleStageClick}
        >
          <Layer>
            {shapesState.map((shape: any) => (
              <DraggableResizableIcon
                key={shape.id}
                {...shape}
                isSelected={shape.id === selectedId}
                onSelect={() => handleIconClick(shape)}
                onChange={(newAttrs) => handleShapeChange(newAttrs)}
              />
            ))}
            {circles.map((circle: CircleProps) => (
              <Circle
                key={circle.id}
                x={circle.x}
                y={circle.y}
                radius={circle.radius}
                fill="blue" // You can change the color as needed
                draggable
                onDragEnd={(e) => {
                  const newX = e.target.x();
                  const newY = e.target.y();
                  setCircles((prevCircles) =>
                    prevCircles.map((c) =>
                      c.id === circle.id ? { ...c, x: newX, y: newY } : c
                    )
                  );
                }}
                onClick={() => {
                  console.log(`Circle ${circle.id} clicked`);
                  setSelectedId(circle.id);
                  setFormData({});
                  setSidebarVisible(true);
                }}
              />
            ))}
            {connectionsState.map(
              (
                connection: { from: string; to: string; color: string },
                index: any
              ) => {
                const fromShape = shapesState.find(
                  (shape: any) => shape.id === connection.from
                );
                const toShape = shapesState.find(
                  (shape: any) => shape.id === connection.to
                );
                if (fromShape && toShape) {
                  const fromX = fromShape.x + fromShape.width / 2;
                  const fromY = fromShape.y + fromShape.height / 2;
                  const toX = toShape.x + toShape.width / 2;
                  const toY = toShape.y + toShape.height / 2;

                  const isSelected =
                    selectedConnection &&
                    selectedConnection.from === connection.from &&
                    selectedConnection.to === connection.to;

                  return (
                    <Arrow
                      key={index}
                      points={[fromX, fromY, toX, toY]}
                      stroke={isSelected ? "blue" : connection.color}
                      strokeWidth={4}
                      fill={isSelected ? "blue" : connection.color}
                      pointerLength={10}
                      pointerWidth={10}
                      onClick={() => handleConnectionClick(connection)}
                    />
                  );
                }
                return null;
              }
            )}
          </Layer>
        </Stage>
      </div>

      <div className="col-span-2 h-[90vh] overflow-y-auto pb-10">
        {sidebarVisible && (
          <SideToolbar
            formData={formData}
            selectedId={selectedId}
            closeSidebar={closeSidebar}
            handleFormChange={handleFormChange}
            saveShape={saveShape}
          />
        )}

        {!sidebarVisible && (
          <>
            <div className="grid grid-cols-2 gap-8 px-10">
              {listIcons.map((iconData, index) => (
                <button
                  key={index}
                  onClick={() => addIcon(iconData.icon)}
                  className="bg-[#d6d6d6] flex justify-center items-center py-[20px] rounded-[5px]"
                >
                  <img
                    src={iconData.icon}
                    alt={iconData.name}
                    className="object-cover"
                  />
                </button>
              ))}

              <button
                className="bg-[#d6d6d6] flex justify-center items center py-[20px] rounded-[5px]"
                onClick={() => handleChangeColorArrow("black")}
              >
                <img
                  src={BlackArrow}
                  alt="Black Arrow"
                  className="object-cover"
                />
              </button>

              <button
                className="bg-[#d6d6d6] flex justify-center items-center py-[20px] rounded-[5px]"
                onClick={() => handleChangeColorArrow("red")}
              >
                <img src={RedArrow} alt="Red Arrow" className="object-cover" />
              </button>
            </div>

            <div className="mt-10 px-10 flex flex-col gap-5">
              <Button className="w-full bg-white text-black hover:bg-gray-200 border-black border-[3px] rounded-full py-2">
                <p className="font-semibold text-lg">Add Text</p>
              </Button>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full py-2"
                onClick={openDeleteModal}
              >
                <p className="font-semibold text-lg">Delete</p>
              </Button>

              <Button
                className="w-full bg-[#2C2C2C] hover:bg-[#202020] text-white rounded-full py-2"
                onClick={handleSaveCanvas}
              >
                <p className="font-semibold text-lg">Save</p>
              </Button>
            </div>
          </>
        )}
      </div>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteAll}
        />
      )}

      {isSaveModalOpen && (
        <SaveModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          onSave={() => handleSaveCanvas()}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </div>
  );
};

export default CanvasEdit;
