import React, { Children, Component, useState } from "react";
import { faCheck, faPowerOff, faCaretRight, faUser, faBuilding, faUserPlus, faCaretUp, faTruckFast, faGears, faMagnifyingGlass, faGear, faBook, faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import { faHandshake, faWindowRestore, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom';

function Toggle({ Children }) {
    const [isToggleDropdownOpen, setIsToggleDropdownOpen] = useState({});
    const [isToggle, setIsToggle] = useState(false);
    const [isClicked, setIsClicked] = useState("");


    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <ion-icon name="pulse-outline" />,
            dropdownicon: <ion-icon name="chevron-up-outline" />
        },
        {
            path: "/product",
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

    const SubMenuDropdown = (dropdownId) => {
        setIsToggleDropdownOpen(prevState => ({
            ...prevState,
            [dropdownId]: !prevState[dropdownId]
        }));
    };

    function toggleDropdown() {
        setIsToggle(!isToggle);
    }

    const handleMenuClick = (item) => {
        setIsClicked(item);
        // navigate(`/company/${encodeURIComponent(companyName)}`);
    };
    return (


        <div>


            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                <button onClick={toggleDropdown} aria-expanded={isToggle}>
                    <svg className="w-5 h-5 text-black hover:text-[#dfb81c]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </span>

            {/* Expand Mode  */}
            {isToggle && (

                <div className={`${isToggle ? 'w-52' : 'w-14'} expanded-dropdown cursor-pointer absolute left-[-2px] top-16 bg-white shadow-2xl h-full min-h-screen text-ssm overflow-y-scroll sidebar-scroll`}>

                    <ul className="">
                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1  hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "dashboard" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("dashboard")}>
                            <Link to="/dashboard">
                                <ion-icon name="pulse-outline" />
                                <span className="pl-4">Dashboard</span>
                            </Link> {/* <ion-icon name="pulse-outline"/>
                            <span className="pl-4">Dashboard</span> */}
                        </li>

                        <button onClick={() => SubMenuDropdown("master")} className="hover:border-r-4 hover:border-r-red-600 flex items-center justify-between w-full text-left text-ssm text-gray-800 bg-white hover:bg-gray-100 focus:outline-none">
                            <li className="pl-5 py-2 my-1 hover:text-red-500"><ion-icon name="bookmark-sharp" /><span className="pl-4 pr-6">Master</span>
                                <span className="ml-auto pl-7 pr-2 arrow">
                                    {isToggleDropdownOpen["master"] ? (
                                        <ion-icon name="chevron-up-outline" />
                                    ) : (
                                        <ion-icon name="chevron-down-outline" />
                                    )}
                                </span></li>
                        </button>

                        {isToggleDropdownOpen["master"] && (
                            <div className="mt-1 w-44 bg-white submenu master">
                                <ul>
                                    <li className={`flex items-center justify-start pl-12 pr-0 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "Products" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("Products")}>
                                       <Link to="/product" >Products</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "Industry" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("Industry")}>
                                    <Link to="/industry" > Industry</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "excat" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("excat")}>
                                    <Link to="/expense" >Expense Category</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "uom" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("uom")}>
                                    <Link to="/uom" > UOM</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "terms" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("terms")}>
                                    <Link to="/terms" > Terms</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "flag" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("flag")}>
                                    <Link to="/flag" >Flag</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "pgroup" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("pgroup")}>
                                    <Link to="/productgroup" >Product Group</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "psubgroup" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("psubgroup")}>
                                    <Link to="/productsubgroup" >  Product SubGroup</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "sosource" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("sosource")}>
                                    <Link to="/sosource" > SalesOrder Source</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "category" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("category")}>
                                    <Link to="/category" > Category</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "sostatus" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("sostatus")}>
                                    <Link to="/sostatus" >  SalesOrder Status</Link>
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "variant" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("variant")}>
                                    <Link to="/variant" >   Variant </Link>
                                    </li>
                                </ul>
                            </div>
                        )}

                        <button onClick={() => SubMenuDropdown("sales")} className="hover:border-r-4 hover:border-r-red-600 flex items-center justify-between w-full text-left text-ssm  text-gray-800 bg-white hover:bg-gray-100 focus:outline-none">
                            <li className="pl-5 py-2 my-1  hover:text-red-500"><FontAwesomeIcon icon={faWindowRestore} /><span className="pl-4 pr-7">Sales</span>
                                <span className="ml-auto pr-2 pl-9 arrow">
                                    {isToggleDropdownOpen["sales"] ? (
                                        <ion-icon name="chevron-up-outline" />
                                    ) : (
                                        <ion-icon name="chevron-down-outline" />
                                    )}
                                </span></li>
                        </button>
                        {isToggleDropdownOpen["sales"] && (
                            <div className="mt-1 w-44 bg-white submenu sales">
                                <ul>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "clients" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("clients")}>
                                        Clients
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "einv" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("einv")}>
                                        e-Invoices
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "receipt" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("receipt")}>
                                        Receipt
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "creditnote" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("creditnote")}>
                                        Credit Note
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "quota" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("quota")}>
                                        Quotation
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "so" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("so")}>
                                        Sales Order
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "performainv" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("performainv")}>
                                        Perfoma Invoice
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "delivery" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("delivery")}>
                                        Delivery Challan
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "poack" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("poack")}>
                                        PO Acknowledgement
                                    </li>
                                </ul>
                            </div>
                        )}

                        <button onClick={() => SubMenuDropdown("purchase")} className="hover:border-r-4 hover:border-r-red-600 flex items-center justify-between  w-full text-left text-ssm  text-gray-800 bg-white hover:bg-gray-100 focus:outline-none">
                            <li className="pl-5 py-2 my-1  hover:text-red-500"><ion-icon name="cart" /><span className="pl-4 pr-6">Purchase</span>
                                <span className="ml-auto pr-2 pl-4">
                                    {isToggleDropdownOpen["purchase"] ? (
                                        <ion-icon name="chevron-up-outline" />
                                    ) : (
                                        <ion-icon name="chevron-down-outline" />
                                    )}
                                </span></li>
                        </button>
                        {isToggleDropdownOpen["purchase"] && (
                            <div className="mt-1 w-44 bg-white submenu purchase">
                                <ul>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "vendor" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("vendor")}>
                                        Vendor
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "purchaseinv" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("purchaseinv")}>
                                        Purchase Invoice
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "payment" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("payment")}>
                                        Payment
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "cheque" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("cheque")}>
                                        Cheque Printing
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "grn" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("grn")}>
                                        GRN
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "debnote" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("debnote")}>
                                        Debit Note
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "po" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("po")}>
                                        Purchase Order
                                    </li>
                                </ul>
                            </div>
                        )}

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 hover:text-red-500 ${isClicked === "ewaybill" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("ewaybill")}><FontAwesomeIcon icon={faTruckFast} /><span className="pl-4">eWay Bill</span></li>
                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 hover:text-red-500 ${isClicked === "expense" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("expense")}><FontAwesomeIcon icon={faCreditCard} /><span className="pl-4">Expense</span></li>

                        <button onClick={() => SubMenuDropdown("automation")} className="hover:border-r-4 hover:border-r-red-600 flex items-center justify-between w-full text-left text-ssm  text-gray-800 bg-white hover:bg-gray-100 focus:outline-none">
                            <li className="pl-5  pr-4 text-left text-ssm py-2 my-1 hover:text-red-500"><FontAwesomeIcon icon={faGears} /><span className="pl-4">Automation</span>
                                <span className="ml-auto pr-2 pl-5">
                                    {isToggleDropdownOpen["automation"] ? (
                                        <ion-icon name="chevron-up-outline" />
                                    ) : (
                                        <ion-icon name="chevron-down-outline" />
                                    )}
                                </span></li>
                        </button>
                        {isToggleDropdownOpen["automation"] && (
                            <div className="mt-1 w-44 bg-white submenu automation">
                                <ul>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "flow" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("flow")}>
                                        Flow
                                    </li>
                                </ul>
                            </div>
                        )}

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 hover:text-red-500 ${isClicked === "search" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("search")}><FontAwesomeIcon icon={faMagnifyingGlass} /><span className="pl-4">Search HSN/SAC</span></li>

                        <button onClick={() => SubMenuDropdown("gstr")} className="hover:border-r-4 hover:border-r-red-600 flex items-center justify-between w-full text-left text-ssm  text-gray-800 bg-white hover:bg-gray-100 focus:outline-none">
                            <li className="pl-5  pr-4 text-left text-ssm py-2 my-1 hover:text-red-500"><FontAwesomeIcon icon={faMoneyBill1} /><span className="pl-4">GSTR Filings</span>
                                <span className="ml-auto pr-2 pl-5">
                                    {isToggleDropdownOpen["gstr"] ? (
                                        <ion-icon name="chevron-up-outline" />
                                    ) : (
                                        <ion-icon name="chevron-down-outline" />
                                    )}
                                </span></li>
                        </button>
                        {isToggleDropdownOpen["gstr"] && (
                            <div className="mt-1 w-44 bg-white submenu gstr">
                                <ul>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "gstr1" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("gstr1")}>
                                        GSTR-1
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "gstr2" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("gstr2")}>
                                        GSTR-2
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "gstr3" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("gstr3")}>
                                        GSTR-3B
                                    </li>
                                </ul>
                            </div>
                        )}

                        <button onClick={() => SubMenuDropdown("reports")} className="hover:border-r-4 hover:border-r-red-600 flex items-center justify-between w-full text-left text-ssm  text-gray-800 bg-white hover:bg-gray-100 focus:outline-none">
                            <li className="pl-5  pr-4 text-left text-ssm py-2 my-1 hover:text-red-500"><FontAwesomeIcon icon={faBook} /><span className="pl-4 pr-5">Reports</span>
                                <span className="ml-auto pr-2 pl-8">
                                    {isToggleDropdownOpen["reports"] ? (
                                        <ion-icon name="chevron-up-outline" />
                                    ) : (
                                        <ion-icon name="chevron-down-outline" />
                                    )}
                                </span></li>
                        </button>
                        {isToggleDropdownOpen["reports"] && (
                            <div className="mt-1 w-44 bg-white submenu reports">
                                <ul>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "inv" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("inv")}>
                                        Invoice Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "tds" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("tds")}>
                                        TDS Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "exp" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("exp")}>
                                        Expense Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "flagreport" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("flagreport")}>
                                        Flag Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "aging" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("aging")}>
                                        Aging Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "outstanding" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("outstanding")}>
                                        Outstanding Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "prodsales" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("prodsales")}>
                                        Product Sales Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "usersales" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("usersales")}>
                                        User Sales Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "dcitems" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("dcitems")}>
                                        Dc Items Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "pireport" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("pireport")}>
                                        PI Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "quoterep" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("quoterep")}>
                                        Quote Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "prof/loss" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("prof/loss")}>
                                        Profit/Loss Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "purrep" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("purrep")}>
                                        Purchase Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "smslogs" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("smslogs")}>
                                        SMS Logs
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "receiptrep" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("receiptrep")}>
                                        Receipt Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "performa" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("performa")}>
                                        Perfoma
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "comparison" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("comparison")}>
                                        Comparison
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "soreport" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("soreport")}>
                                        Sales Order Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "deliveryrepo" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("deliveryrepo")}>
                                        Delivery Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "wisesale" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("wisesale")}>
                                        PGroup Wise Sales
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "report" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("report")}>
                                        Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "loginlog" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("loginlog")}>
                                        Login Logs
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "sorep" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("sorep")}>
                                        SO Report
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "porep" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("porep")}>
                                        PO Report
                                    </li>
                                </ul>
                            </div>
                        )}

                        <button onClick={() => SubMenuDropdown("settings")} className="hover:border-r-4 hover:border-r-red-600 flex items-center justify-between w-full text-left text-ssm text-gray-800 bg-white hover:bg-gray-100 focus:outline-none">
                            <li className="pl-5  pr-4 text-left text-ssm py-2 my-1 hover:text-red-500 hover:text-red-500"><FontAwesomeIcon icon={faGear} /><span className="pl-4 pr-2">Settings</span>
                                <span className="ml-auto pr-2 pl-10">
                                    {isToggleDropdownOpen["settings"] ? (
                                        <ion-icon name="chevron-up-outline" />
                                    ) : (
                                        <ion-icon name="chevron-down-outline" />
                                    )}
                                </span></li>
                        </button>
                        {isToggleDropdownOpen["settings"] && (
                            <div className="mt-1 w-44 bg-white submenu settings">
                                <ul>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "corp" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("corp")}>
                                        Corp Profile
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "general" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("general")}>
                                        General Setting
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "integration" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("integration")}>
                                        Integration
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "mail" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("mail")}>
                                        Mail
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "sms" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("sms")}>
                                        SMS
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "wts" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("wts")}>
                                        Whatsapp
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "invoice" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("invoice")}>
                                        Invoice
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "perf" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("perf")}>
                                        Proforma
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "challan" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("challan")}>
                                        Delivery Challan
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "po" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("po")}>
                                        Purchase Order
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "poackn" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("poackn")}>
                                        PO Acknowledgement
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "crenote" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("crenote")}>
                                        Credit Note
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "debnote" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("debnote")}>
                                        Debit Note
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "receiptset" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("receiptset")}>
                                        Receipt
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "payrec" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("payrec")}>
                                        Payment Receipt
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "alert" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("alert")}>
                                        Alert
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "quoteset" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("quoteset")}>
                                        Quote
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "smtp" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("smtp")}>
                                        SMTP Settings
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "approval" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("approval")}>
                                        Approval Config
                                    </li>
                                </ul>
                            </div>
                        )}

                    </ul>
                </div>
            )}

            {/* Collapse Mode  */}
            {!isToggle && (
                <div className={`${isToggle ? 'w-48' : 'w-14'} collapsed-dropdown cursor-pointer absolute left-0 top-16 h-screen bg-white shadow-lg`}>
                    <ul className="fixed">

                        <li className={`pl-5 pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "dashboard" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("dashboard")}>
                            <ion-icon name="pulse-outline" />
                        </li>

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "master" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("master")}>
                            <ion-icon name="bookmark-sharp" />
                        </li>
                        {isToggleDropdownOpen["master"] && (
                            <div className="mt-1 w-44 bg-white submenu master">
                                <ul>
                                    <li className={`flex items-center justify-start pl-12 pr-0 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "Products" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("Products")}>
                                        Products
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "Industry" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("Industry")}>
                                        Industry
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "excat" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("excat")}>
                                        Expense Category
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "uom" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("uom")}>
                                        UOM
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "terms" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("terms")}>
                                        Terms
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "flag" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("flag")}>
                                        Flag
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "pgroup" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("pgroup")}>
                                        Product Group
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "psubgroup" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("psubgroup")}>
                                        Product SubGroup
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "sosource" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("sosource")}>
                                        SalesOrder Source
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "category" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("category")}>
                                        Category
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "sostatus" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("sostatus")}>
                                        SalesOrder Status
                                    </li>
                                    <li className={`flex items-center justify-start pl-12 pr-2 py-2 text-xs hover:text-red-500 hover:border-r-4 hover:border-r-red-600 ${isClicked === "variant" ? "bg-red-600 text-white hover:text-white" : ""}`} onClick={() => handleMenuClick("variant")}>
                                        Variant
                                    </li>
                                </ul>
                            </div>
                        )}

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "sales" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("sales")}>
                            <FontAwesomeIcon icon={faWindowRestore} />
                        </li>

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "purchase" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("purchase")}>
                            <ion-icon name="cart" />
                        </li>

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "ewaybill" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("ewaybill")}>
                            <FontAwesomeIcon icon={faTruckFast} />
                        </li>

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "expense" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("expense")}>
                            <FontAwesomeIcon icon={faCreditCard} />
                        </li>

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "automation" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("automation")}>
                            <FontAwesomeIcon icon={faGears} />
                        </li>

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "search" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("search")}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </li>

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "gstr" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("gstr")}>
                            <FontAwesomeIcon icon={faMoneyBill1} />
                        </li>

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "report" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("report")}>
                            <FontAwesomeIcon icon={faBook} />
                        </li>

                        <li className={`pl-5  pr-4 text-left text-ssm py-2 my-1 hover:border-r-4 hover:border-r-red-600 ${isClicked === "setting" ? "bg-red-600 text-white" : ""}`} onClick={() => handleMenuClick("setting")}>
                            <FontAwesomeIcon icon={faGear} />
                        </li>

                    </ul>
                </div>
            )}
        </div >
    )
}
export default Toggle;