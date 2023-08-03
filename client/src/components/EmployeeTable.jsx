import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Table } from "react-bootstrap"; // Import Bootstrap Table component
import { PencilSquare, Trash, PersonAdd } from "react-bootstrap-icons"; // Import Bootstrap Icons

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    id: null,
    name: "",
    role: "",
    salary: "",
    city: "",
  });

  // Fetch data from Spring Boot API
  useEffect(() => {
    fetch("http://localhost:8081/getEmp")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    // Make DELETE request to the Spring Boot API
    fetch(`http://localhost:8081/deleteById/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Remove deleted employee from state
          setEmployees((prevEmployees) =>
            prevEmployees.filter((emp) => emp.id !== id)
          );
        }
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  const handleDeleteAll = () => {
    // Make DELETE request to the Spring Boot API
    fetch(`http://localhost:8081/deleteAll`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Remove deleted employee from state
          setEmployees([]);
        }
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  const handleEdit = (id) => {
    setEditId(id);
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setEditedEmployee({
        id: employee.id,
        name: employee.name,
        role: employee.role,
        salary: employee.salary,
        city: employee.city,
      });
    }
  };

  const handleSave = () => {
    fetch(`http://localhost:8081/updateById/${editedEmployee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedEmployee),
    })
      .then((response) => {
        if (response.ok) {
          // Update the employees list with the edited employee
          setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
              emp.id === editedEmployee.id ? editedEmployee : emp
            )
          );
          setEditId(null);
        }
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  const handleAddNew = () => {
    setEditedEmployee({
      id: null,
      name: "",
      role: "",
      salary: "",
      city: "",
    });
    setEditId("new");
    console.log("success handleNew");
  };

  const handleSaveNew = () => {
    fetch("http://localhost:8081/addEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedEmployee),
    })
      .then((response) => response.json())
      .then((newEmployee) => {
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        setEditId(null);
      })
      .catch((error) => console.error("Error creating new employee:", error));
    console.log("success handleSaveNew");
  };

  return (
    <div className="container mt-4 align-center">
      <h1 className="text-center fw-bolder">Wolters Kluwer, Pune</h1>
      <hr />
      <div className="d-flex justify-content-start mt-3">
        <button
          className="btn btn-md btn-success text-center m-2"
          onClick={() => handleAddNew()}
        >
          <PersonAdd /> Add New
        </button>

        <button
          className="btn btn-md  btn-danger text-center m-2"
          onClick={() => handleDeleteAll()}
        >
          <Trash /> Fire All!
        </button>
      </div>
      <h2 className="mb-4 text-center text-uppercase fs-4">Employee Data</h2>

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>
                {editId === employee.id ? (
                  <input
                    type="text"
                    value={editedEmployee.name}
                    onChange={(e) =>
                      setEditedEmployee({
                        ...editedEmployee,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  employee.name
                )}
              </td>

              {/* <td>{employee.name}</td> */}
              <td>
                {editId === employee.id ? (
                  <input
                    type="text"
                    value={editedEmployee.role}
                    onChange={(e) =>
                      setEditedEmployee({
                        ...editedEmployee,
                        role: e.target.value,
                      })
                    }
                  />
                ) : (
                  employee.role
                )}
              </td>
              {/* <td>{employee.role}</td> */}
              <td>
                {editId === employee.id ? (
                  <input
                    type={Number}
                    value={editedEmployee.salary}
                    onChange={(e) =>
                      setEditedEmployee({
                        ...editedEmployee,
                        salary: e.target.value,
                      })
                    }
                  />
                ) : (
                  employee.salary
                )}
              </td>
              {/* <td>{employee.salary}</td> */}
              <td>
                {editId === employee.id ? (
                  <input
                    type="text"
                    value={editedEmployee.city}
                    onChange={(e) =>
                      setEditedEmployee({
                        ...editedEmployee,
                        city: e.target.value,
                      })
                    }
                  />
                ) : (
                  employee.city
                )}
              </td>
              {/* <td>{employee.city}</td> */}

              <td>
                {editId === employee.id ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleSave(employee.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(employee.id)}
                    >
                      <PencilSquare /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <Trash /> Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {editId === "new" && (
            <tr>
              <td>
                <input
                  type={Number}
                  value={editedEmployee.id}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      id: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  required={true}
                  type="text"
                  value={editedEmployee.name}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      name: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  required={true}
                  type="text"
                  value={editedEmployee.role}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      role: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  required={true}
                  type={Number}
                  value={editedEmployee.salary}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      salary: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  required={true}
                  type="text"
                  value={editedEmployee.city}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      city: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <button className="btn btn-success" onClick={handleSaveNew}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <hr />
    </div>
  );
};

export default EmployeeTable;
