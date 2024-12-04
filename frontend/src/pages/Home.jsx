import { useState } from "react";
import AddStudents from "../components/addStudents/AddStudents";
import ListStudents from "../components/listStudents/ListStudents";

const Home = () => {
  const [alumnos, setAlumnos] = useState([]);
  return (
    <div>
      <AddStudents setAlumnos={setAlumnos} />
      <ListStudents alumnos={alumnos} setAlumnos={setAlumnos} />
    </div>
  );
};

export default Home;
