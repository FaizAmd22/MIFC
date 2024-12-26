// import React, { useState } from "react";
// import { Handle, Position } from "react-flow-renderer";

// interface CustomNodeProps {
//   icon?: React.ReactNode;
//   size?: { width: number; height: number };
// }

// const CustomNode: React.FC<CustomNodeProps> = ({ icon, size }) => {
//   const [nodeSize, setNodeSize] = useState(size || { width: 100, height: 100 }); // Set default size

//   const handleResize = (e: React.MouseEvent, direction: string) => {
//     e.preventDefault();
//     const startX = e.clientX;
//     const startY = e.clientY;

//     const onMouseMove = (moveEvent: MouseEvent) => {
//       if (!nodeSize) return; // Pastikan nodeSize tidak undefined

//       let newWidth = nodeSize.width;
//       let newHeight = nodeSize.height;

//       if (direction === "right") {
//         newWidth = nodeSize.width + (moveEvent.clientX - startX);
//       } else if (direction === "bottom") {
//         newHeight = nodeSize.height + (moveEvent.clientY - startY);
//       } else if (direction === "left") {
//         newWidth = nodeSize.width - (moveEvent.clientX - startX);
//       } else if (direction === "top") {
//         newHeight = nodeSize.height - (moveEvent.clientY - startY);
//       }

//       // Pastikan ukuran tidak negatif
//       newWidth = Math.max(newWidth, 20); // Minimum width
//       newHeight = Math.max(newHeight, 20); // Minimum height

//       setNodeSize({ width: newWidth, height: newHeight });
//     };

//     const onMouseUp = () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//   };

//   return (
//     <>
//       <div
//         className="bg-red-600 rounded-lg flex justify-center items-center"
//         style={{ width: `${nodeSize.width}px`, height: `${nodeSize.height}px`, position: 'relative' }}
//       >
//         {React.cloneElement(icon as React.ReactElement, { size: Math.min(nodeSize.width, nodeSize.height) / 2 })}
//       </div>
//       <Handle type="target" position={Position.Top} id="top" />
//       <Handle type="source" position={Position.Bottom} id="bottom" />
//       <Handle type="target" position={Position.Left} id="left" />
//       <Handle type="source" position={Position.Right} id="right" />

//       {/* Titik Resize */}
//       <div
//         onMouseDown={(e) => handleResize(e, "right")}
//         style={{
//           width: "10px",
//           height: "10px",
//           backgroundColor: "blue",
//           position: "absolute",
//           bottom: "5px",
//           right: "5px",
//           cursor: "nwse-resize",
//         }}
//       />
//       <div
//         onMouseDown={(e) => handleResize(e, "bottom")}
//         style={{
//           width: "10px",
//           height: "10px",
//           backgroundColor: "blue",
//           position: "absolute",
//           bottom: "5px",
//           left: "5px",
//           cursor: "ns-resize",
//         }}
//       />
//       <div
//         onMouseDown={(e) => handleResize(e, "left")}
//         style={{
//           width: "10px",
//           height: "10px",
//           backgroundColor: "blue",
//           position: "absolute",
//           top: "5px",
//           left: "5px",
//           cursor: "ew-resize",
//         }}
//       />
//       <div
//         onMouseDown={(e) => handleResize(e, "top")}
//         style={{
//           width: "10px",
//           height: "10px",
//           backgroundColor: "blue",
//           position: "absolute",
//           top: "5px",
//           right: "5px",
//           cursor: "ns-resize",
//         }}
//       />
//     </>
//   );
// };

// export default CustomNode;