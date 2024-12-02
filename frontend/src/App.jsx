
import AddStudents from './components/addStudents/AddStudents'
import ListStudents from './components/listStudents/ListStudents'
import './index.css'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
     <AddStudents />
     <ListStudents />
     <ToastContainer />
    </>
  )
}

export default App
