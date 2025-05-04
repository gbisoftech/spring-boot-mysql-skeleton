import React, { useState } from 'react';
import { Users } from "lucide-react";
import { Button } from "../ui/SidebarButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';

type SidebarProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    { icon: <FontAwesomeIcon icon={faUser} size="lg" className="ml-1" />, label: "My Profile" },
    { icon: <Users />, label: "Users" },
    { icon: <FontAwesomeIcon icon={faBuilding} size="lg" className="ml-1" />, label: "Account List" },
  ];

  return (
    <>
      <div
        className={`hidden sm:flex flex-col transition-all duration-300 ease-in-out bg-white p-4 ${collapsed ? "w-16" : "w-64"
          } overflow-hidden`}
      >
        <div className="flex justify-between items-center mb-8 w-full">
          <h2
            className={`text-lg font-semibold transition-opacity duration-300 whitespace-nowrap ${collapsed ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"
              }`}
          >
            Account Settings
          </h2>
          <div className={`${collapsed ? "w-full flex justify-center" : ""}`}>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="flex-shrink-0">
              <FontAwesomeIcon icon={collapsed ? faSquareCaretRight : faSquareCaretLeft} />
            </Button>
          </div>
        </div>

        <div className="space-y-4 w-full">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center text-gray-700 hover:text-black cursor-pointer ${collapsed ? "justify-center" : "space-x-3"
                }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span
                className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;