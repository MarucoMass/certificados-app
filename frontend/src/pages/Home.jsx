import { useContext, useState } from "react";
import AddStudents from "../components/addStudents/AddStudents";
import ListStudents from "../components/listStudents/ListStudents";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  // const [alumnos, setAlumnos] = useState([]);
  // const {alumnos, setAlumnos} = useContext(AuthContext);
  return (
    <div>
      <AddStudents  />
      <ListStudents />
    </div>
  );
};

export default Home;
