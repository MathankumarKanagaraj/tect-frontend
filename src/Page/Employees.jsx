import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Row, Col, Alert } from "react-bootstrap";
import JsButton from "../Components/Button";
import Table from "../Components/Table";
import { IoAdd } from "react-icons/io5";
import { LuBellDot } from "react-icons/lu";
import Offcanvas from "../Components/Offcanvas";
import axios from "axios";
import { CiEdit, CiWarning } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import Modal from "../Components/Model";
import { employeeSchema, formFields } from "../Constants/constants";

const Employees = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formMode, setFormMode] = useState("add");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(employeeSchema),
        mode: "onTouched",
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const showAlert = (message, variant = "success") => {
        setAlertMessage(message);
        setAlertVariant(variant);

        setTimeout(() => {
            setAlertMessage("");
        }, 3000);
    };

    const fetchEmployees = () => {
        axios
            .get("http://localhost:8080/api/v1/employee")
            .then((response) => {
                if (response.status === 200) {
                    setEmployees(response.data.data);
                    showAlert("Employees fetched successfully!");
                }
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
                showAlert("Error fetching employees!", "danger");
            });
    };

    const resetForm = () => {
        reset({
            name: "",
            location: "",
            phoneNumber: "",
            gender: "",
            age: 0,
        });
        setSelectedEmployee(null);
        setFormMode("add");
    };

    const columns = [
        { header: "S.No", accessor: "sno" },
        { header: "Name", accessor: "name" },
        { header: "Location", accessor: "location" },
        { header: "Phone Number", accessor: "phoneNumber" },
        { header: "Gender", accessor: "gender" },
        { header: "Age", accessor: "age" },
        { header: "Action", accessor: "action" },
    ];

    const data = employees.map((employee, index) => ({
        sno: index + 1,
        name: employee.name,
        location: employee.location,
        phoneNumber: employee.phoneNumber,
        gender: employee.gender,
        age: employee.age,
        action: (
            <div className="d-flex gap-2">
                <div onClick={() => handleEdit(employee)}>
                    <CiEdit className="fs-4 me-3" style={{ cursor: "pointer", color: "blue" }} />
                </div>
                <div onClick={() => handleDelete(employee)}>
                    <MdOutlineDelete className="fs-4" style={{ cursor: "pointer", color: "red" }} />
                </div>
            </div>
        ),
    }));

    const handleFormSubmit = (formData) => {
        if (formMode === "edit") {
            axios
                .put(`http://localhost:8080/api/v1/employee/${selectedEmployee.id}`, formData)
                .then(() => {
                    fetchEmployees();
                    setShowOffcanvas(false);
                    resetForm();
                    showAlert("Employee updated successfully!");
                })
                .catch((error) => {
                    console.error("Error updating employee:", error);
                    showAlert("Error updating employee!", "danger");
                });
        } else {
            axios
                .post("http://localhost:8080/api/v1/employee", formData)
                .then(() => {
                    fetchEmployees();
                    setShowOffcanvas(false);
                    resetForm();
                    showAlert("Employee added successfully!");
                })
                .catch((error) => {
                    console.error("Error adding employee:", error);
                    showAlert("Error adding employee!", "danger");
                });
        }
    };

    const handleEdit = (employee) => {
        setFormMode("edit");
        reset(employee);
        setSelectedEmployee(employee);
        setShowOffcanvas(true);
    };

    const handleDelete = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!selectedEmployee) return;

        axios
            .delete(`http://localhost:8080/api/v1/employee/${selectedEmployee.id}`)
            .then(() => {
                fetchEmployees();
                setShowDeleteModal(false);
                setSelectedEmployee(null);
                showAlert("Employee deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
                showAlert("Error deleting employee!", "danger");
            });
    };

    return (
        <div className="employees p-3">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-start" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1FCB4F" }}>
                    Employee View
                </h1>
                <div>
                    <LuBellDot className="fs-4" />
                </div>
            </div>
            <hr />
            {alertMessage && (
                <Alert variant={alertVariant} className="mt-2">
                    {alertMessage}
                </Alert>
            )}

            <div className="text-end mb-3">
                <Row>
                    <Col className="text-start mt-3" style={{ fontSize: "1rem", fontWeight: "bold" }}>
                        All Employees
                    </Col>
                    <Col className="text-end">
                        <JsButton
                            label={
                                <>
                                    <IoAdd className="fs-4" style={{ color: "white" }} /> Add New
                                </>
                            }
                            style={{ backgroundColor: "#1FCB4F", borderColor: "#1FCB4F" }}
                            onClick={() => {
                                resetForm();
                                setShowOffcanvas(true);
                            }}
                        />
                    </Col>
                </Row>
            </div>

            <Table columns={columns} data={data} />
            <Offcanvas
                show={showOffcanvas}
                onHide={() => {
                    setShowOffcanvas(false);
                    resetForm();
                }}
                title={formMode === "edit" ? "Edit Employee" : "Add Employee"}
                fields={formFields}
                onSubmit={handleSubmit(handleFormSubmit)}
                register={register}
                errors={errors}
            />
            <Modal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setSelectedEmployee(null);
                }}
                title={
                    <>
                        <CiWarning className="fs-4" style={{ color: "red" }} /> Are you sure you want to delete the employee?
                    </>
                }
                onSave={confirmDelete}
                saveLabel="Delete"
                closeLabel="Cancel"
            >
                <p>It will permanently remove the employee from DB.</p>
            </Modal>
        </div>
    );
};

export default Employees;
