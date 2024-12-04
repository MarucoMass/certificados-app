import { useContext, useEffect, useState } from "react";
import api from "../../api/axios.js";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext.jsx";
// import { jsPDF } from "jspdf";


const ListStudents = ({ alumnos, setAlumnos }) => {
  // const [alumnos, setAlumnos] = useState([]);
  const { token } = useContext(AuthContext);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchAlumnos = async () => {
      const response = await api.get("/alumnos");
      setAlumnos(response.data);
    };

    fetchAlumnos();
  }, []);

  const toggleDropdown = (index) => {
    setEditIndex(editIndex === index ? null : index);
  };

  const handleEditChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index] = { ...updatedAlumnos[index], [name]: value };
    setAlumnos(updatedAlumnos);
  };

  const saveChanges = async (alumno, index) => {
    try {
      const updatedAlumno = alumnos[index];
      console.log(updatedAlumno);
      await api.put(`/alumnos/${alumno.id}`, updatedAlumno);
      setEditIndex(null);
      toast.success("Datos del alumno actualizados con éxito.");
    } catch (error) {
      console.error("Error al actualizar los datos", error);
      toast.error("Hubo un problema al actualizar los datos.");
    }
  };

  const printPDF = async (alumno) => {
      try {
        if(token)
        {
          const response = await api.get(`/certificado/${alumno.id}`, {
            responseType: "blob",
          });
  
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `Certificado_${alumno.nombre}_${alumno.apellido}.pdf`
          );
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          alert("no esta logueado")
        }
      } catch (error) {
        console.error("Error al descargar el PDF", error);
      }
  };

  const handleDelete = async (alumno) => {
    try {
      if (token) {
        const response = await api.delete(`/alumnos/${alumno.id}`);
        toast.success(response.data.message);
      }
      setAlumnos(alumnos.filter((a) => a.id !== alumno.id));
      toast.success("Alumno eliminado");
    } catch (error) {
      toast.error("Error al eliminar el alumno", error);
    }
  };

  return (
    <div className="p-4 bg-white">

      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Lista de Alumnos
      </h1>

      {alumnos.length > 0 ? (
        <ul className="space-y-4">
          {alumnos.map((alumno, index) => (
            <li key={`${alumno.id}-${index}`} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg">{`${alumno.nombre} ${alumno.apellido}`}</span>
                <div className="space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => printPDF(alumno)}
                  >
                    Descargar PDF
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={() => toggleDropdown(index)}
                  >
                    {editIndex === index ? "Cerrar" : "Editar"}
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(alumno)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              {editIndex === index && (
                <div className="mt-4">
                  <form>
                    <div className="space-y-2">
                      <input
                        className="w-full border p-2 rounded"
                        name="nombre"
                        value={alumno.nombre}
                        onChange={(e) => handleEditChange(e, index)}
                        placeholder="Nombre"
                      />
                      <input
                        className="w-full border p-2 rounded"
                        name="apellido"
                        value={alumno.apellido}
                        onChange={(e) => handleEditChange(e, index)}
                        placeholder="Apellido"
                      />
                      <input
                        className="w-full border p-2 rounded"
                        name="dni"
                        value={alumno.dni}
                        onChange={(e) => handleEditChange(e, index)}
                        placeholder="DNI"
                      />
                      <input
                        className="w-full border p-2 rounded"
                        name="email"
                        value={alumno.email}
                        onChange={(e) => handleEditChange(e, index)}
                        placeholder="Email"
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => saveChanges(alumno, index)}
                    >
                      Guardar Cambios
                    </button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay alumnos</p>
      )}
    </div>
  );
};

export default ListStudents;
