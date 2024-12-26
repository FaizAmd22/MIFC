/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Stage, Layer, Arrow } from "react-konva";
import DraggableResizableIcon from "./DraggableResizableIcon";
import Sidebar from "./Sidebar";
import listIcons from "../data/Icon";

interface ShapeProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  icon: string; // Use image path
  data?: { [key: string]: string }; // Store user input data
}

const CanvasComponent: React.FC = () => {
  const [shapes, setShapes] = useState<ShapeProps[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<{ from: string; to: string } | null>(null);
  const [connections, setConnections] = useState<{ from: string; to: string; color: string }[]>([]);
  const [selectedColorArrow, setSelectedColorArrow] = useState<string>("black");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);

  const addIcon = (icon: string) => {
    const newShape = {
      id: `${shapes.length}`,
      x: 100,
      y: 100,
      width: 60,
      height: 60,
      icon,
      data: {},
    };
    setShapes([...shapes, newShape]);
    setSelectedId(newShape.id);
    setFormData({});
    setSidebarVisible(true);
  };

  const handleIconClick = (shape: ShapeProps) => {
    if (isShiftPressed && selectedId) {
      setConnections([...connections, { from: selectedId, to: shape.id, color: selectedColorArrow }]);
    } else {
      setSelectedId(shape.id);
      setFormData(shape.data || {});
      setSidebarVisible(true);
    }
  };

  const handleConnectionClick = (connection: { from: string; to: string }) => {
    setSelectedConnection(connection);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveShape = () => {
    if (selectedId) {
      const shapeToUpdate = shapes.find((shape) => shape.id === selectedId);
      if (shapeToUpdate) {
        const updatedShape = { ...shapeToUpdate, data: formData };
        const updatedShapes = shapes.map((shape) =>
          shape.id === updatedShape.id ? updatedShape : shape
        );
        setShapes(updatedShapes);
      }
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
    // Handle delete key
    if (e.key === "Delete") {
      if (selectedId) {
        // Delete selected shape
        setShapes(shapes.filter((shape) => shape.id !== selectedId));
        setSelectedId(null); // Deselect after deletion
        setSidebarVisible(false); // Close sidebar after deletion
      } else if (selectedConnection) {
        // Delete selected connection
        setConnections(connections.filter((connection) => connection !== selectedConnection));
        setSelectedConnection(null); // Deselect connection after deletion
      }
    }
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
    // Deselect connection and icon if click is not on a connection or icon
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedConnection(null);
      setSelectedId(null);
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [shapes, selectedId, selectedConnection]);

  return (
    <>
      <div className="w-[80vw]">
        <div className="w-[80vw] overflow-x-auto">
          <div className="w-[100vw] flex gap-10 px-5">
            {listIcons.map((iconData, index) => (
              <button key={index} onClick={() => addIcon(iconData.icon)}>
                <img
                  src={iconData.icon}
                  alt={iconData.name}
                  className="object-cover"
                />
              </button>
            ))}
            <button onClick={() => handleChangeColorArrow("black")}>
              Black Arrow
            </button>
            <button onClick={() => handleChangeColorArrow("red")}>
              Red Arrow
            </button>
          </div>
        </div>

        <div className="w-[80vw] h-[80vh] overflow-auto mt-5 bg-white rounded-xl">
          <Stage width={window.innerWidth} height={window.innerHeight} onClick={handleStageClick}>
            <Layer>
              {shapes.map((shape) => (
                <DraggableResizableIcon
                  key={shape.id}
                  {...shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => handleIconClick(shape)}
                  onChange={(newAttrs) => {
                    const updatedShapes = shapes.map((shape) =>
                      shape.id === newAttrs.id ? newAttrs : shape
                    );
                    setShapes(updatedShapes);
                  }}
                />
              ))}
              {connections.map((connection, index) => {
                const fromShape = shapes.find((shape) => shape.id === connection.from);
                const toShape = shapes.find((shape) => shape.id === connection.to);
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
                      onClick={() => handleConnectionClick(connection)} // Add click handler for connection
                    />
                  );
                }
                return null;
              })}
            </Layer>
          </Stage>
        </div>
      </div>
      {sidebarVisible && (
        <Sidebar
          formData={formData}
          selectedId={selectedId}
          closeSidebar={closeSidebar}
          handleFormChange={handleFormChange}
          saveShape={saveShape}
        />
      )}
    </>
  );
};

export default CanvasComponent;