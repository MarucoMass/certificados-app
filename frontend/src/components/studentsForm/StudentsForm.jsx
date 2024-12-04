const StudentsForm = ({ formData, handleChange, handleSubmit, token }) => (
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-md rounded-lg p-6 col-span-3"
  >
    <div className="mb-4">
      <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
        Nombre
      </label>
      <input
        name="nombre"
        value={formData.nombre}
        placeholder="Nombre"
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="apellido"
        className="block text-gray-700 font-medium mb-2"
      >
        Apellido
      </label>
      <input
        name="apellido"
        value={formData.apellido}
        placeholder="Apellido"
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="dni" className="block text-gray-700 font-medium mb-2">
        DNI
      </label>
      <input
        name="dni"
        value={formData.dni}
        placeholder="DNI"
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    {token && (
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    )}

    <button
      type="submit"
      className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
    >
      {token ? "Agregar Alumno" : "Descargar PDF"}
    </button>
  </form>
);

export default StudentsForm;
