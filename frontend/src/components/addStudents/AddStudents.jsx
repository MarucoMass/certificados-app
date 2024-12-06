import { useContext, useState } from "react";
import api from "../../api/axios.js";
import { toast } from "react-toastify";
import StudentForm from "../studentsForm/StudentsForm.jsx";
import FileUploadForm from "../fileUploadForm/FileUploadForm.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { jsPDF } from "jspdf";

const AddStudents = () => {
  const { token, setAlumnos } = useContext(AuthContext);
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

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Configuración del borde
    doc.setDrawColor(0, 70, 120); // Azul oscuro en formato RGB
    doc.setLineWidth(2); // Grosor del borde
    doc.rect(10, 10, 190, 220); // Dibuja el borde rectangular (A4)
  
    // Configuración del texto
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(28);
    // doc.setTextColor(23, 61, 72); // Azul oscuro para el texto
    doc.setTextColor(0, 170, 200);
    doc.text('"Yo puedo programar"', 105, 40, null, null, "center");
    
    // Texto dinámico
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");
    doc.text("En reconocimiento a", 105, 60, null, null, "center");
    doc.setFontSize(18);
    doc.text(
      `${formData.nombre} ${formData.apellido}, DNI N° ${formData.dni}`,
      105,
      75,
      null,
      null,
      "center"
    );
  
    // Texto estático
    doc.setFontSize(14);
    doc.text(
      "quien en su calidad de alumno ha participado en el programa",
      105,
      95,
      null,
      null,
      "center"
    );
    doc.text(
      '"Yo Puedo Programar", adquiriendo nociones sobre programación:',
      105,
      105,
      null,
      null,
      "center"
    );
    doc.text(
      "HTML, CSS y JavaScript, acreditando una duración de 20 hs.",
      105,
      115,
      null,
      null,
      "center"
    );
    doc.text("Santa Fe, Argentina 2024", 105, 135, null, null, "center");
  
    // Firmas
    doc.text("______________________", 30, 160);
  
    doc.text("______________________", 120, 160);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text("LUCAS HADAD", 30, 170);
    doc.text("JUAN PIVETTA", 120, 170);
    doc.setFontSize(10);
    doc.text("Director General", 30, 175);
    doc.text("Presidente", 120, 175);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Junior Achievement Santa Fe", 120, 180);
  
    // Descargar el PDF
    doc.save(`certificado_${formData.nombre}_${formData.apellido}.pdf`);
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
        generatePDF();
        toast.success("PDF descargado con éxito");
      }
    } catch (error) {
      toast.error("Error al agregar el alumno");
    }
    setFormData({
      nombre: "",
      apellido: "",
      dni: "",
      ...(token ? { email: "" } : {}),
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
