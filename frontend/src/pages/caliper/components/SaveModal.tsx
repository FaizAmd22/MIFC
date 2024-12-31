import React, { useState } from "react";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fileName: string) => void;
  successMessage: string;
  setSuccessMessage: (fileName: string) => void;
}

const SaveModal: React.FC<SaveModalProps> = ({
  isOpen,
  onClose,
  onSave,
  successMessage,
  setSuccessMessage,
}) => {
  const [fileName, setFileName] = useState("");

  const handleSave = () => {
    if (fileName.trim() === "") {
      alert("File name cannot be empty.");
      return;
    }
    onSave(fileName);
    setSuccessMessage(`Canvas data saved as "${fileName}".`);
    setFileName("");
  };

  const handleClose = () => {
    setFileName("");
    setSuccessMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[300px]">
        {!successMessage && (
          <>
            <h2 className="text-lg font-semibold mb-4">Save Your Design</h2>
            <input
              type="text"
              className="border border-gray-300 rounded w-full px-2 py-1 mb-4"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </>
        )}

        {successMessage && (
          <>
            <h2 className="text-lg font-semibold mb-4">Success</h2>
            <p className="text-gray-700 mb-4">{successMessage}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleClose}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SaveModal;
