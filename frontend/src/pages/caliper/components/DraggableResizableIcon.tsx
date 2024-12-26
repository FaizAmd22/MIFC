/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";

interface ShapeProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  icon: string; // Use image path
  data?: { [key: string]: string };
}

const DraggableResizableIcon: React.FC<
  ShapeProps & {
    isSelected: boolean;
    onSelect: () => void;
    onChange: (newAttrs: ShapeProps) => void;
  }
> = ({ id, x, y, width, height, icon, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (icon) {
      const img = new window.Image();
      img.src = icon;
      img.onload = () => setImage(img);
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
      {image && (
        <Image
          ref={shapeRef}
          image={image}
          x={x}
          y={y}
          width={width}
          height={height}
          draggable
          onClick={onSelect}
          onDragEnd={(e) => {
            onChange({
              id,
              x: e.target.x(),
              y: e.target.y(),
              width,
              height,
              icon,
              data: {},
            });
          }}
          onTransformEnd={() => {
            const node = shapeRef.current;
            const newWidth = Math.max(10, node.width() * node.scaleX());
            const newHeight = Math.max(10, node.height() * node.scaleY());
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              id,
              x: node.x(),
              y: node.y(),
              width: newWidth,
              height: newHeight,
              icon,
              data: {},
            });
          }}
        />
      )}
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};

export default DraggableResizableIcon;
