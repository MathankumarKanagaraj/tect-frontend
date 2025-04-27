import React from "react";
import { Button } from "react-bootstrap";

const JsButton = ({ 
  label, 
  onClick, 
  variant = "primary", 
  size = "md", 
  type = "button",
  disabled = false ,
  style = {},
}) => {
  return (
    <Button 
      variant={variant} 
      size={size} 
      style={{...style}}
      type={type} 
      onClick={onClick} 
      disabled={disabled}
    
    >
      {label}
      
    </Button>
  );
};

export default JsButton;
