import {  useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("Employees");
    const navigate= useNavigate();
    const menuItems = [""];

    return (
        <div className="sidebar" style={{ backgroundColor: "#1d1d41", height: "100vh", width: "200px", padding: "20px" }}>
            <div className="sidebar__title" style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "white" }}>
                <span style={{ color: "#1FCB4F" }}>Tech</span>Lambdas
            </div> 
            <div className="sidebar__content">
                {menuItems.map((item) => (
                    <div
                        key={item}
                        className="sidebar__item"
                        onClick={() => setActiveItem(item,navigate(`/${item.toLowerCase()}`))}
                        style={{
                            marginBottom: "10px",
                            color: activeItem === item ? "black" : "white",
                            backgroundColor: activeItem === item ? "white" : "transparent",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            fontWeight: activeItem === item ? "bold" : "normal",
                            cursor: "pointer",
                            transition: "0.3s all",
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
