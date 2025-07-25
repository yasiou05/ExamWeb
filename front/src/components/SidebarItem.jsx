import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react"; // or any icon
import "./sideHeader.css";

const SidebarItem = ({ icon: Icon = Sparkles, label = "Inventory", route = "/", iconClass = '' , text=''}) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="sidebar-item"
      onClick={() => navigate(route)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon className={iconClass} />
      {hovered && (
        <div className="hover-info-box">
          <h4>{label}</h4>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
