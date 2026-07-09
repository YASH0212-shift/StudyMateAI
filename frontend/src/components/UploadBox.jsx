import { useState } from "react";
import api from "../services/api";
function UploadBox({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
const handleUpload = async () => {

    if (!file) {

        alert("Please select a PDF");

        return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

        const response = await api.post(

            "/upload",

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            }

        );

        console.log("========== BACKEND RESPONSE ==========");
console.log(response.data);
console.log("Document ID:", response.data.document_id);
console.log("Type:", typeof response.data.document_id);

onUploadSuccess(response.data.document_id);

alert("PDF Uploaded Successfully!");

    }

    catch (error) {
    console.error("FULL ERROR:", error);

    console.error("Response:", error.response);

    console.error("Data:", error.response?.data);

    console.error("Message:", error.message);

    console.error("Stack:", error.stack);

    alert(error.message);
}
};
  return (
  <div className="bg-white rounded-2xl shadow-xl p-8">

    <h2 className="text-3xl font-bold mb-6">
      📄 Upload Study Material
    </h2>

    <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center hover:border-blue-500 transition">

      <p className="text-5xl mb-4">
        📚
      </p>

      <p className="text-lg font-semibold">
        Drag & Drop your PDF here
      </p>

      <p className="text-gray-500 my-3">
        or
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-6"
      />

      {file && (
        <div className="bg-green-50 border border-green-300 rounded-lg p-3 mb-5">
          <p className="text-green-700 font-medium">
            ✅ {file.name}
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-semibold"
      >
        Upload PDF
      </button>

    </div>

  </div>
);
}
export default UploadBox;