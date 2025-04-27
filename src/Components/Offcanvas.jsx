import React from "react";
import { Button, Form, Offcanvas as BootstrapOffcanvas } from "react-bootstrap";
import FormField from "./Form";

const Offcanvas = ({ show, onHide, title, fields, onSubmit, register, errors }) => {
    return (
        <BootstrapOffcanvas show={show} onHide={onHide} placement="end">
            <BootstrapOffcanvas.Header closeButton>
                <BootstrapOffcanvas.Title>{title}</BootstrapOffcanvas.Title>
            </BootstrapOffcanvas.Header>
            <BootstrapOffcanvas.Body>
                <Form onSubmit={onSubmit}> 
                    {fields.map((field) => (
                        <FormField
                            key={field.name}
                            field={field}
                            register={register}
                            errors={errors}
                        />
                    ))}
                    <div className="text-end mt-4">
                        <Button type="submit" variant="success">
                            Submit
                        </Button>
                    </div>
                </Form>
            </BootstrapOffcanvas.Body>
        </BootstrapOffcanvas>
    );
};

export default Offcanvas;
