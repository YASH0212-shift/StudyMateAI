import { useState } from "react";
import UploadBox from "./components/UploadBox";
import ChatBox from "./components/ChatBox";

function App() {
  const [documentId, setDocumentId] = useState("");

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">

        <div className="max-w-7xl mx-auto py-6">

          <h1 className="text-4xl font-bold text-center">
            📚 StudyMate AI
          </h1>

          <p className="text-center text-blue-100 mt-2">
            Chat with your PDFs using Gemini AI
          </p>

        </div>

      </header>

      <main className="max-w-7xl mx-auto p-8">

        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-4">

            <UploadBox
              onUploadSuccess={setDocumentId}
            />

          </div>

          <div className="col-span-8">

            <ChatBox
              documentId={documentId}
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;