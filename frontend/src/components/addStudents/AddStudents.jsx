import { useContext, useState } from "react";
import api from "../../api/axios.js";
import { toast } from "react-toastify";
import StudentForm from "../studentsForm/StudentsForm.jsx";
import FileUploadForm from "../fileUploadForm/FileUploadForm.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const AddStudents = ({ setAlumnos }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    ...(token ? { email: "" } : {}),
  });
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const alumno = await api.post("/alumnos", formData);
        const nuevoAlumno = {
          nombre: alumno.data.nombre,
          apellido: alumno.data.apellido,
          dni: alumno.data.dni,
          email: alumno.data.email,
        };
        setAlumnos((prev) => [...prev, nuevoAlumno]);
        toast.success("Alumno agregado con éxito");
      } else {
        alert("Descargar PDF");
        toast.success("PDF descargado con éxito");
      }
    } catch (error) {
      toast.error("Error al agregar el alumno");
    }
    setFormData({
      nombre: "",
      apellido: "",
      dni: "",
      ...(token ? { email: "" } : {})
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload-excel-preview", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPreviewData(response.data);
      toast.success("Archivo cargado correctamente para previsualización");
    } catch (error) {
      toast.error("Error al procesar el archivo");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.added === 0) {
        toast.error(response.data.message);
        return;
      }

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error al procesar el archivo");
    }
  };

  return (
    <div className="flex flex-col items-center pt-4 pb-10 px-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Ingrese los datos de los alumnos a través del formulario o suba un
          archivo Excel
        </h2>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-6 gap-4">
        <StudentForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          token={token}
        />
        <FileUploadForm
          file={file}
          handleFileChange={handleFileChange}
          handlePreview={handlePreview}
          handleUpload={handleUpload}
          previewData={previewData}
        />
      </div>
    </div>
  );
};

export default AddStudents;
