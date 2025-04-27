import React from "react";
import { Form } from "react-bootstrap";

const FormField = ({ field, register, errors, disabled, style = {} }) => {
  const { name, label, type, placeholder, options } = field;

  const renderInputField = () => {
    switch (type) {
      case "textarea":
        return (
          <Form.Control
            as="textarea"
            {...register(name)}
            placeholder={placeholder}
            isInvalid={!!errors[name]}
            style={{ ...style }}
            disabled={disabled}
          />
        );
      case "file":
        return (
          <Form.Control
            type="file"
            {...register(name)}
            isInvalid={!!errors[name]}
            disabled={disabled}
          />
        );
      case "select":
        return (
          <Form.Control as="select" {...register(name)} isInvalid={!!errors[name]} disabled={disabled}>
            <option value="">Select...</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        );
        case "checkbox":
          case "radio":
            return (
              <>
                {options?.map((option) => (
                  <Form.Check
                    key={`${name}-${option.value}`}
                    type={type}
                    label={option.label}
                    value={option.value}
                    {...register(name)}
                    isInvalid={!!errors[name]}
                    disabled={disabled}
                    name={name} 
                  />
                ))}
              </>
            );
          
      case "datalist":
        return (
          <>
            <Form.Control
              type="text"
              list={`${name}-datalist`}
              {...register(name)}
              placeholder={placeholder}
              isInvalid={!!errors[name]}
            />
            <datalist id={`${name}-datalist`}>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </datalist>
          </>
        );
      default:
        return (
          <Form.Control
            type={type}
            {...register(name)}
            placeholder={placeholder}
            isInvalid={!!errors[name]}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>
        <strong>{label}</strong>
      </Form.Label>
      {renderInputField()}
      {errors[name] && (
        <Form.Control.Feedback type="invalid" className="mt-2">
          {errors[name]?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormField;
