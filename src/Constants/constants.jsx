import * as Yup from "yup";
export const employeeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  location: Yup.string().required("Location is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .required("Age is required")
    .min(1, "Age must be greater than 0"),
});

export const formFields = [
  { name: "name", label: "Employee Name", type: "text", placeholder: "Enter employee name" },
  { name: "location", label: "Location", type: "text", placeholder: "Enter location" },
  { name: "phoneNumber", label: "Phone Number", type: "number", placeholder: "Enter phone number" },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ]
  },
  { name: "age", label: "Age", type: "number", placeholder: "Enter age" },
];