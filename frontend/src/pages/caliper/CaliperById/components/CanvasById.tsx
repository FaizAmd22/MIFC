/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Stage, Layer, Arrow, Image as KonvaImage } from "react-konva";
import SideToolbar from "../../components/SideToolbar";

interface ShapeProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  icon: string;
  data?: { [key: string]: string };
}

const CanvasById: React.FC<{ data: any }> = ({ data }) => {
  const { shapes, connections } = data;

  const connectionsState = connections;
  const [shapesState, setShapes] = useState<ShapeProps[]>(shapes || []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleIconClick = (shape: ShapeProps) => {
    setSelectedId(shape.id);
    setFormData(shape.data || {});
    setSidebarVisible(true);
  };

  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (selectedId) {
      const selectedShape = shapesState.find(
        (shape) => shape.id === selectedId
      );
      if (selectedShape) {
        setFormData(selectedShape.data || {});
      }
    }
  }, [selectedId, shapesState]);

  return (
    <div className="grid grid-cols-8">
          <div className={`h-[90vh] overflow-auto bg-white rounded-xl ${sidebarVisible ? "col-span-6" : "col-span-8"}`}>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onClick={handleStageClick}
        >
          <Layer>
            {shapesState.map((shape) => (
              <KonvaImage
                key={shape.id}
                image={(() => {
                  const img = new Image();
                  img.src = shape.icon;
                  return img;
                })()}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                onClick={() => handleIconClick(shape)}
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

                  return (
                    <Arrow
                      key={index}
                      points={[fromX, fromY, toX, toY]}
                      stroke={connection.color}
                      strokeWidth={4}
                      fill={connection.color}
                      pointerLength={10}
                      pointerWidth={10}
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
            closeSidebar={() => setSidebarVisible(false)}
            handleFormChange={(e) => {
              const { name, value } = e.target;
              setFormData((prevData) => ({ ...prevData, [name]: value }));
            }}
            saveShape={() => {
              setShapes((prevShapes) =>
                prevShapes.map((shape) =>
                  shape.id === selectedId
                    ? { ...shape, data: { ...formData } }
                    : shape
                )
              );
            }}
          />
        )}

        {/* {!sidebarVisible && (
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
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CanvasById;
