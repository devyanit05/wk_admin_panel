import './App.css';
import { Routes, Route } from "react-router-dom";

import SideNav from './components/SideNav';
import EmployeeTable from './components/EmployeeTable';

function App() {
  return (
    <div>
      {/* <SideNav /> */}
      <EmployeeTable />
    </div>
  );
}

export default App;
