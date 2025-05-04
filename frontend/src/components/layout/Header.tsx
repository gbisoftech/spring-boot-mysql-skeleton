import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChevronDown } from 'lucide-react';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { mockUser } from '../../types/user';

type HeaderProps = {
  onToggleSidebar: () => void;
};

const navItems = ['Home', 'Provider', 'Content', 'Listing', 'Form', 'Banner', 'Student', 'Report'];

const Header: React.FC<HeaderProps> = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle clicks outside the drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerOpen]);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-xl">Menu</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
        <nav className="flex flex-col p-4">
          {navItems.map((item, idx) => (
            <a
              href="#"
              key={idx}
              onClick={() => setDrawerOpen(false)}
              className="py-3 px-2 border-b border-gray-100 hover:bg-gray-50 text-gray-700"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <header className="bg-white h-16 shadow-sm">
        <div className="px-4 md:pl-[70px]">
          <div className="flex items-center justify-between h-16">
            {/* Mobile: Menu button and centered logo */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} size="lg" />
              </button>

              <div className="mx-auto">
                <a href="/" className="font-bold text-xl md:text-2xl whitespace-nowrap">
                  Staff Hub
                </a>
              </div>

              {/* Invisible element to balance the flex space */}
              <div className="w-8"></div>
            </div>

            {/* Desktop: Original layout */}
            <div className="hidden lg:flex items-center space-x-2 md:gap-[70px] gap-[30px]">
              <div className="flex items-center">
                <a href="/" className="font-bold text-xl md:text-2xl flex-1">
                  Staff Hub
                </a>
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="lg:hidden flex items-center gap-1 px-4 py-2 bg-gray-100 
                  text-sm rounded hover:bg-gray-200"
                >
                  Home
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white 
                  shadow-lg rounded border z-10">
                    <nav className="flex flex-col p-2 text-sm text-gray-700">
                      {navItems.map((item, idx) => (
                        <a
                          href="#"
                          key={idx}
                          onClick={() => setOpen(false)}
                          className="block px-3 py-2 hover:bg-gray-100"
                        >
                          {item}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </div>

              <nav className="hidden lg:flex space-x-6 text-sm text-gray-600">
                <a href="#" className="hover:text-black">Home</a>
                {navItems.slice(1).map((item, idx) => (
                  <a href="#" key={idx} className="hover:text-black">{item}</a>
                ))}
              </nav>
            </div>

            {/* Right: User controls (visible on all screen sizes) */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="#">
                <FontAwesomeIcon icon={faQuestion} size="lg" className="text-gray-500" />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faBell} size="lg" className="text-gray-500" />
              </a>
              <a href="#">
                <img
                  src={mockUser.avatar}
                  alt={`${mockUser.name}'s avatar`}
                  className="w-10 rounded-full border-2 border-white shadow"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header; 