import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";
import JsButton from "../Components/Button";
import Table from "../Components/Table";
import { IoAdd } from "react-icons/io5";
import Offcanvas from "../Components/Offcanvas";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
const inventorySchema = Yup.object().shape({
    itemName: Yup.string().required("Item Name is required"),
    quantity: Yup.number().required("Quantity is required").min(1, "Quantity must be greater than 0"),
    price: Yup.number().required("Price is required").min(0.01, "Price must be greater than 0"),
});

const Inventory = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(inventorySchema),
        mode: "onTouched",
    });

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/inventory")
            .then((response) => {
                if (response.status === 200) {
                    setInventoryItems(response.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching inventory items:", error);
            });
    }, []);

    const columns = [
        { header: "S.No", accessor: "sno" },
        { header: "Item Name", accessor: "itemName" },
        { header: "Quantity", accessor: "quantity" },
        { header: "Category", accessor: "category" },
        { header: "Price", accessor: "price" },
        { header: "Action", accessor: "action" }
    ];

    const data = inventoryItems.map((item, index) => ({
        sno: index + 1,
        itemName: item?.itemName,
        quantity: item?.quantity,
        category: item?.category,
        price: item?.price ? `$${item?.price.toFixed(2)}` : "$0.00",
        action: (
            <div className="d-flex">
                <div onClick={() => handleEdit(item)}>
                    <CiEdit className="fs-4" style={{ cursor: "pointer", color: "blue" }} />
                </div>
                <div onClick={() => handleDelete(item)}>
                    <MdOutlineDelete className="fs-4" style={{ cursor: "pointer", color: "red" }} />
                </div>
            </div>
        ),
    }));


    const formFields = [
        { name: "itemName", label: "Item Name", type: "text", placeholder: "Enter item name" },
        { name: "quantity", label: "Quantity", type: "number", placeholder: "Enter quantity" },
        { name: "price", label: "Price", type: "number", placeholder: "Enter price" },
    ];

    const handleFormSubmit = (formData) => {
        axios
            .post("http://localhost:8080/api/v1/inventory", formData)
            .then((response) => {
                if (response.status === 201) {
                    setInventoryItems([...inventoryItems, response.data.data]);
                    setShowOffcanvas(false);
                    reset();
                }
            })
            .catch((error) => {
                console.error("Error adding inventory item:", error);
            });
    };

    const handleEdit = (item) => {
        console.log("Editing item:", item);
    };

    const handleDelete = (item) => {
        axios
            .delete(`http://localhost:8080/api/v1/inventory/${item.id}`)
            .then((response) => {
                if (response.status === 200) {
                    setInventoryItems(inventoryItems.filter((i) => i.id !== item.id));
                }
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
    };

    return (
        <div className="inventory">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-start mt-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    Inventory View
                </h1>
            </div>
            <hr />
            <div className="text-end mb-3">
                <Row>
                    <Col className="text-start mt-3" style={{ fontSize: "1rem", fontWeight: "bold" }}>
                        All Inventory Items
                    </Col>
                    <Col className="text-end">
                        <JsButton
                            label={
                                <>
                                    <IoAdd className="fs-4" style={{ color: "white" }} /> Add New
                                </>
                            }
                            style={{ backgroundColor: "#1FCB4F", borderColor: "#1FCB4F" }}
                            onClick={() => setShowOffcanvas(true)}
                        />
                    </Col>
                </Row>
            </div>
            <Table columns={columns} data={data} />
            <Offcanvas
                show={showOffcanvas}
                onHide={() => {
                    setShowOffcanvas(false);
                    reset();
                }}
                title="Add Inventory Item"
                fields={formFields}
                onSubmit={handleSubmit(handleFormSubmit)}
                register={register}
                errors={errors}
            />
        </div>
    );
};

export default Inventory;
