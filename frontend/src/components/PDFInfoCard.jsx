function PDFInfoCard({ pdfInfo }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

      <h2 className="text-2xl font-bold mb-5">
        📄 Current PDF
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-gray-500 text-sm">Filename</p>
          <p className="font-semibold break-words">
            {pdfInfo.filename}
          </p>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Pages</span>
          <span className="font-bold">{pdfInfo.pages}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Chunks</span>
          <span className="font-bold">{pdfInfo.chunks}</span>
        </div>

        <div className="pt-3 border-t">

          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-green-700 font-medium">

            🟢 Ready to Chat

          </span>

        </div>

      </div>

    </div>
  );
}

export default PDFInfoCard;