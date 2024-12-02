import { useState } from "react";
import api from "../../api/axios.js";

const AddStudents = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/alumnos", formData);
            alert("Alumno agregado con éxito");
        } catch (error) {
            alert("Error al agregar el alumno", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nombre" placeholder="Nombre" onChange={handleChange} />
            <input name="apellido" placeholder="Apellido" onChange={handleChange} />
            <input name="dni" placeholder="DNI" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <button type="submit">Agregar Alumno</button>
        </form>
    );
};

export default AddStudents;
