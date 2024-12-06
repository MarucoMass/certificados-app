const FileUploadForm = ({
  file,
  handleFileChange,
  handlePreview,
  handleUpload,
  previewData,
}) => (
  <form onSubmit={handleUpload} className="space-y-4 col-span-3">
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleFileChange}
      className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {file && (
      <div className="flex w-full gap-2 flex-wrap">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex-1"
        >
          Subir Archivo Excel
        </button>
        <button
          type="button"
          onClick={handlePreview}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition flex-1"
        >
          Previsualizar Archivo
        </button>
      </div>
    )}
    {previewData.length > 0 && (
      <div className="col-span-12 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Previsualización de los Datos
        </h3>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Apellido</th>
              <th className="border px-4 py-2">DNI</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{row[0]}</td>
                <td className="border px-4 py-2">{row[1]}</td>
                <td className="border px-4 py-2">{row[2]}</td>
                <td className="border px-4 py-2">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </form>
);

export default FileUploadForm;
