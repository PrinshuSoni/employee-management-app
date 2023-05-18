import React, { useState, useEffect } from "react";
import { Container, Divider, Typography } from "@mui/material";
import axios from "axios";

import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [selectedEmployeeData, setSelectedEmployeeData] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching employees. Please try again.");
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      await axios.post("/api/employees", employeeData);
      fetchEmployees();
      setError(null);
    } catch (error) {
      setError("Error adding employee. Please try again.");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      if (id === selectedEmployeeData.id) {
        setSelectedEmployeeData({});
      }
      await axios.delete(`/api/employees/${id}`);
      fetchEmployees();
      setError(null);
    } catch (error) {
      setError("Error deleting employee. Please try again.");
    }
  };

  const updateEmployee = async (id, updatedData) => {
    try {
      await axios.put(`/api/employees/${id}`, updatedData);
      fetchEmployees();
      setError(null);
      setSelectedEmployeeData({});
    } catch (error) {
      setError("Error updating employee. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Employee Management
      </Typography>

      {/* Employee Form */}
      <div>
        <Typography variant="h6" gutterBottom>
          Add Employee
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ pb: 2 }}>
            {error}
          </Typography>
        )}
        <EmployeeForm
          key={`${employees.length}-${selectedEmployeeData.id}`}
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          onResetClick={() => {
            setSelectedEmployeeData({});
            setError(null);
          }}
          employee={selectedEmployeeData}
        />
      </div>
      <Divider sx={{ my: 4 }} />
      {/* Employee Table */}
      {employees.length ? (
        <div>
          <Typography variant="h6" gutterBottom>
            Employee Details
          </Typography>
          <EmployeeTable
            employees={employees}
            onDelete={deleteEmployee}
            onEditClick={setSelectedEmployeeData}
          />
        </div>
      ) : (
        <Typography>No employees found.</Typography>
      )}
    </Container>
  );
};

export default Employee;
