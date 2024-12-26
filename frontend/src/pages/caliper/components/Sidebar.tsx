import React from "react";

interface SidebarProps {
  formData: { [key: string]: string };
  selectedId: string | null;
  closeSidebar: () => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveShape: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  formData,
  selectedId,
  closeSidebar,
  handleFormChange,
  saveShape,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "300px",
        height: "100%",
        padding: "10px",
        borderLeft: "1px solid #ccc",
        backgroundColor: "#fff",
      }}
    >
      <h2 className="text-lg font-bold mb-4">Edit Shape Data</h2>
      <button
        onClick={closeSidebar}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Close
      </button>
      {selectedId ? (
        <>
          <label>
            Field 1:
            <input
              type="text"
              name="field1"
              value={formData.field1 || ""}
              onChange={handleFormChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label>
            Field 2:
            <input
              type="text"
              name="field2"
              value={formData.field2 || ""}
              onChange={handleFormChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              onClick={saveShape}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <p>Select a shape to edit</p>
      )}
    </div>
  );
};

export default Sidebar;