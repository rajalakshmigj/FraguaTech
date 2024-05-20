import React, { useState } from 'react'
import { faCheck, faPowerOff, faCaretRight, faUser, faBuilding, faUserPlus, faCaretUp, faTruckFast, faGears, faMagnifyingGlass, faGear, faBook, faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import { faHandshake, faWindowRestore, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';
import rednoteLogo from '../assets/img/rednote-logo.png';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const toggle = () =>{ 
    //     setIsOpen(!isOpen);
    //     console.log("toggle: ", isOpen);
    // };

    function toggle() {
        setIsOpen(!isOpen);
    }
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <ion-icon name="pulse-outline" />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/master",
            name: "Master",
            icon: <ion-icon name="bookmark-sharp" />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/sales",
            name: "Sales",
            icon: <FontAwesomeIcon icon={faWindowRestore} />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/purchase",
            name: "Purchase",
            icon: <ion-icon name="cart" />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/ewaybill",
            name: "eWay Bill",
            icon: <FontAwesomeIcon icon={faTruckFast} />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/expense",
            name: "Expense",
            icon: <FontAwesomeIcon icon={faCreditCard} />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/automation",
            name: "Automation",
            icon: <FontAwesomeIcon icon={faGears} />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/searchhsn",
            name: "Search HSN/SAC",
            icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/gstrfilings",
            name: "GSTR Filings",
            icon: <FontAwesomeIcon icon={faMoneyBill1} />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/reports",
            name: "Report",
            icon: <FontAwesomeIcon icon={faBook} />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/settings",
            name: "Settings",
            icon: <FontAwesomeIcon icon={faGear} />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },

    ]
    return (
        <div className='container bg-gray-200'>
            <div className={`sidebar ${isOpen ? 'w-[250px]' : 'w-[250px]'}`}>
                <div className='top-section'>
                    <h1 className={` logo`}><img src={rednoteLogo} className="fixed w-40 h-9 cursor-auto" alt="Rednote Logo" /></h1>
                    <div className={`${isOpen ? 'ml-[50px]' : 'ml-[50px]'} bars fixed`}>
                        <button onClick={toggle} aria-expanded={isOpen}>
                            <svg className="w-5 h-5 text-black hover:text-[#dfb81c]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`menu-items ${isOpen ? 'w-[250px]' : 'w-[50px]'}`}>
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="nav-link" activeClassName="active">
                                <div className='icon'>{item.icon}</div>
                                <div className={`${isOpen ? 'block' : 'hidden'} link_text`}>{item.name}</div>
                                <div className={`${isOpen ? 'block' : 'hidden'} link_dropdown`}>{item.dropdownicon}</div>
                            </NavLink>
                        ))
                    }
                </div>

            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar