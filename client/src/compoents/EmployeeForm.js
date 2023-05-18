import React from "react";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const EmployeeForm = ({ employee = {}, addEmployee, updateEmployee }) => {
  const formik = useFormik({
    initialValues: {
      name: employee.name || "",
      address: employee.address || "",
      email: employee.email || "",
      dob: employee.dob || "",
      gender: employee.gender || "",
      dateOfJoining: employee.dateOfJoining || "",
      maritalStatus: employee.maritalStatus || "",
      contactNo: employee.contactNo || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      address: Yup.string().required("Address is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      dob: Yup.date().required("Date of Birth is required"),
      gender: Yup.string().required("Gender is required"),
      dateOfJoining: Yup.date().required("Date of Joining is required"),
      maritalStatus: Yup.string().required("Marital Status is required"),
      contactNo: Yup.string().required("Contact Number is required"),
    }),
    onSubmit: (values) => {
      if (employee.id) {
        updateEmployee(employee.id, values);
      } else {
        addEmployee(values);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        fullWidth
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Address"
        fullWidth
        id="address"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Email"
        fullWidth
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Date of Birth"
        type="date"
        fullWidth
        id="dob"
        name="dob"
        value={formik.values.dob}
        onChange={formik.handleChange}
        error={formik.touched.dob && Boolean(formik.errors.dob)}
        helperText={formik.touched.dob && formik.errors.dob}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
        </RadioGroup>
        {formik.touched.gender && formik.errors.gender && (
          <FormHelperText error>{formik.errors.gender}</FormHelperText>
        )}
      </FormControl>

      <TextField
        label="Date of Joining"
        type="date"
        fullWidth
        id="dateOfJoining"
        name="dateOfJoining"
        value={formik.values.dateOfJoining}
        onChange={formik.handleChange}
        error={
          formik.touched.dateOfJoining && Boolean(formik.errors.dateOfJoining)
        }
        helperText={formik.touched.dateOfJoining && formik.errors.dateOfJoining}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="marital-status-label">Marital Status</InputLabel>
        <Select
          label="Marital Status"
          labelId="marital-status-label"
          id="maritalStatus"
          name="maritalStatus"
          value={formik.values.maritalStatus}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)
          }
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
          <MenuItem value="Widowed">Widowed</MenuItem>
        </Select>
        {formik.touched.maritalStatus && formik.errors.maritalStatus && (
          <FormHelperText error>{formik.errors.maritalStatus}</FormHelperText>
        )}
      </FormControl>

      <TextField
        label="Contact Number"
        fullWidth
        id="contactNo"
        name="contactNo"
        value={formik.values.contactNo}
        onChange={formik.handleChange}
        error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
        helperText={formik.touched.contactNo && formik.errors.contactNo}
        sx={{ marginBottom: 2 }}
      />

      <Button type="submit" variant="contained">
        {employee.id ? 'Update' : 'Add'}
      </Button>
    </form>
  );
};

export default EmployeeForm;
