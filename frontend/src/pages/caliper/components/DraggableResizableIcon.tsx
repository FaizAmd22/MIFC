/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";

interface ShapeProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  icon: string;
  data?: { [key: string]: string };
}

const DraggableResizableIcon: React.FC<
  ShapeProps & {
    isSelected: boolean;
    onSelect: () => void;
    onChange: (newAttrs: ShapeProps) => void;
  }
> = ({
  id,
  x,
  y,
  width,
  height,
  icon,
  data,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    console.log("Image state updated:", image);
  }, [image]);
  

  useEffect(() => {
    if (icon) {
      console.log("Icon path:", icon);
      const img = new Image();
      img.src = icon;
      img.onload = () => {
        console.log("Image loaded successfully:", icon);
        setImage(img);
      };
      img.onerror = (err) => {
        console.error("Failed to load image:", icon, err);
      };
    }

    if (!icon) {
      throw new Error("Icon path is required!");
    }
  }, [icon]);

  useEffect(() => {
    if (isSelected) {
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      {image &&
        (console.log("Rendering KonvaImage with image:", image),
        (
          <KonvaImage
            ref={shapeRef}
            image={image}
            x={x}
            y={y}
            width={width}
            height={height}
            draggable
            onClick={onSelect}
            onDragEnd={(e) => {
              const newAttrs = {
                id,
                x: e.target.x(),
                y: e.target.y(),
                width,
                height,
                icon,
                data: { ...data },
              };
              onChange(newAttrs);
            }}
            onTransformEnd={() => {
              const node = shapeRef.current;
              const newWidth = Math.max(10, node.width() * node.scaleX());
              const newHeight = Math.max(10, node.height() * node.scaleY());
              node.scaleX(1);
              node.scaleY(1);
              const newAttrs = {
                id,
                x: node.x(),
                y: node.y(),
                width: newWidth,
                height: newHeight,
                icon,
                data: { ...data },
              };
              onChange(newAttrs);
            }}
          />
        ))}
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};

export default DraggableResizableIcon;
