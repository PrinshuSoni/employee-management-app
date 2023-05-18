import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Button, ButtonGroup } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'

const EmployeeTable = ({ employees, onDelete, onEditClick }) => {

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEditClick = (employee) => {
    onEditClick(employee);
  };

  const rows = employees.map((employee) => ({
    id: employee._id,
    name: employee.name,
    address: employee.address,
    email: employee.email,
    dob: format(new Date(employee.dob), 'yyyy-MM-dd'),
    gender: employee.gender,
    dateOfJoining: format(new Date(employee.dateOfJoining), 'yyyy-MM-dd'),
    maritalStatus: employee.maritalStatus,
    contactNo: employee.contactNo,
  }));

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'dob', headerName: 'DOB', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'dateOfJoining', headerName: 'Date of Joining', flex: 1 },
    { field: 'maritalStatus', headerName: 'Marital Status', flex: 1 },
    { field: 'contactNo', headerName: 'Contact No', flex: 1 },
    { field: 'actions', headerName: '', flex: 1, sortable: false, renderCell: (params) => (
      <ButtonGroup>
        <Button onClick={() => handleEditClick(params.row)}>
          <AiOutlineEdit />
        </Button>
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete />
        </Button>
      </ButtonGroup>
    ),
  },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowSelection={false}
        autoPageSize
      />
    </div>
  );
};

export default EmployeeTable;
