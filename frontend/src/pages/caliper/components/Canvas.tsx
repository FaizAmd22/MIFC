// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useCallback, useState } from "react";
// import ReactFlow, {
//   addEdge,
//   Background,
//   Controls,
//   Node,
//   Edge,
//   ReactFlowProvider,
// } from "react-flow-renderer";
// import CustomNode from "./customNode/customNode";
// import listIcons from "../data/Icon";

// const initialNodes: Node[] = [];
// const initialEdges: Edge[] = [];

// const Canvas: React.FC = () => {
//   const edgeThickness = 2;
//   const [nodes, setNodes] = useState<Node[]>(initialNodes);
//   const [edges, setEdges] = useState<Edge[]>(initialEdges);
//   const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
//   const [edgeColor, setEdgeColor] = useState<string>("black");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [formData, setFormData] = useState<{ [key: string]: string }>({
//     name: "",
//     description: "",
//   });
//   const [selectedNodeData, setSelectedNodeData] = useState<{
//     [key: string]: string;
//   } | null>(null);
//   const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(
//     null
//   );
//   const [iconSize, setIconSize] = useState<number>(24); // State untuk ukuran ikon

//   const onConnect = useCallback(
//     (params: any) => {
//       const newEdge: Edge = {
//         ...params,
//         style: { stroke: edgeColor, strokeWidth: edgeThickness },
//         markerEnd: {
//           type: "arrow",
//           width: 10,
//           height: 10,
//           strokeWidth: edgeThickness,
//           color: edgeColor,
//         },
//       };
//       setEdges((eds) => addEdge(newEdge, eds));
//     },
//     [edgeColor, edgeThickness]
//   );

//   const openModalWithIcon = (icon: React.ReactNode) => {
//     setSelectedIcon(icon);
//     setFormData({ name: "", description: "" });
//     setIsModalOpen(true);
//   };

//   const saveNode = () => {
//     const newNode: Node = {
//       id: `${nodes.length + 1}`,
//       data: {
//         label: <CustomNode icon={selectedIcon} size={{ width: 100, height: 100 }} />, // Set ukuran default
//         info: { ...formData },
//       },
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//       draggable: true,
//     };
//     setNodes((nds) => nds.concat(newNode));
//     setIsModalOpen(false);
//   };

//   const deleteNode = () => {
//     if (selectedNodeId) {
//       setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
//       setEdges((eds) =>
//         eds.filter(
//           (edge) =>
//             edge.source !== selectedNodeId && edge.target !== selectedNodeId
//         )
//       );
//       setSelectedNodeId(null);
//     }
//   };

//   const onNodeClick = (event: React.MouseEvent, node: Node) => {
//     setSelectedNodeId(node.id);
//     setSelectedNodeData(node.data.info);
//     setIsViewModalOpen(true);
//   };

//   const onNodeDrag = (event: any, node: Node) => {
//     setNodes((nds) =>
//       nds.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
//     );
//   };

//   return (
//     <div className="flex flex-col w-[80rem] h-[90vh]">
//       <div className="flex justify-between mb-4">
//         {listIcons.map((icons: any) => (
//           <button
//             key={icons.id} // Tambahkan key untuk setiap ikon
//             onClick={() => openModalWithIcon(icons.icon)}
//             className="bg-green-500 text-white px-4 py-2 rounded ml-2"
//           >
//             {icons.icon}
//           </button>
//         ))}
//         <button
//           onClick={deleteNode}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Delete Selected Node
//         </button>
//         <button
//           onClick={() => setEdgeColor("black")}
//           className="bg-black text-white px-4 py-2 rounded ml-2"
//         >
//           Black Edge
//         </button>
//         <button
//           onClick={() => setEdgeColor("red")}
//           className="bg-red-500 text-white px-4 py-2 rounded ml-2"
//         >
//           Red Edge
//         </button>
//       </div>

//       <div className="flex-1 border border-gray-300 rounded">
//         <ReactFlowProvider>
//           <ReactFlow
//             nodes={nodes.map((node) => ({
//               ...node,
//               style: {
//                 ...node.style,
//                 width: node.data.width,
//                 height: node.data.height,
//               },
//             }))}
//             edges={edges}
//             onConnect={onConnect}
//             onNodeClick={onNodeClick}
//             onNodeDrag={onNodeDrag}
//             fitView={true}
//           >
//             <Background />
//             <Controls className="bg-red-600" />
//           </ReactFlow>
//         </ReactFlowProvider>
//       </div>

//       {/* Modal for Adding Node */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-lg font-bold mb-4">Add Node</h2>
//             <table className="mb-4 w-full">
//               <tbody>
//                 <tr>
//                   <td className="py-2 pr-4">Name:</td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       className="border border-gray-300 p-2 w-full"
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-2 pr-4">Description:</td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.description}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           description: e.target.value,
//                         })
//                       }
//                       className="border border-gray-300 p-2 w-full"
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-2 pr-4">Icon Size:</td>
//                   <td>
//                     <input
//                       type="number"
//                       value={iconSize}
//                       onChange={(e) => setIconSize(Number(e.target.value))}
//                       className="border border-gray-300 p-2 w-full"
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="flex justify-end">
//               <button
//                 onClick={saveNode}
//                 className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal for Viewing Node Data */}
//       {isViewModalOpen && selectedNodeData && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-lg font-bold mb-4">Node Details</h2>
//             <p>
//               <strong>Name:</strong> {selectedNodeData.name}
//             </p>
//             <p>
//               <strong>Description:</strong> {selectedNodeData.description}
//             </p>
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setIsViewModalOpen(false)}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Canvas;