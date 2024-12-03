
import { useState } from 'react';
import AddStudents from './components/addStudents/AddStudents'
import ListStudents from './components/listStudents/ListStudents'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
const [alumnos, setAlumnos] = useState([]);

  return (
    <>
      <AddStudents setAlumnos={setAlumnos} />
      <ListStudents alumnos={alumnos} setAlumnos={setAlumnos} />
      <ToastContainer />
    </>
  );
}

export default App
