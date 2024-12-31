import React from "react";

interface SidebarProps {
  formData: { [key: string]: string };
  selectedId: string | null;
  closeSidebar: () => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveShape: () => void;
  addCircle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  formData,
  selectedId,
  closeSidebar,
  handleFormChange,
  saveShape,
  addCircle,
}) => {
  return (
    <div
      style={{
        height: "100%",
        padding: "10px",
        borderLeft: "1px solid #ccc",
      }}
    >
      <button
        onClick={closeSidebar}
        className="w-full bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Close
      </button>

      {selectedId && (
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
              onClick={addCircle}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Add Circle
            </button>
            <button
              onClick={saveShape}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </>
      )}

      {!selectedId && <p>Select a shape to edit</p>}
    </div>
  );
};

export default Sidebar;
