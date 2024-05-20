import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { IonIcon } from '@ionic/react';
import rednoteLogo from '../assets/img/rednote-logo.png';
import profile from '../assets/img/profile.jpg';
import DarkMode from '../assets/img/dark-mode.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faWindowRestore, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faPowerOff, faCaretRight, faUser, faBuilding, faUserPlus, faCaretUp, faTruckFast, faGears, faMagnifyingGlass, faGear, faBook, faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';

import Toggle from './toggle';


const Header = ({onToggleSidebar}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const navigate = useNavigate();

    const toggleProfileDropdown = () => {
        setIsOpen(!isOpen);
    };

    // const SubMenuDropdown = () => {
    //     setIsToggleDropdownOpen(!isToggleDropdownOpen);
    // };

    const handleCompanyClick = (companyName) => {
        setSelectedCompany(companyName);
        // navigate(`/company/${encodeURIComponent(companyName)}`);
    };
    return (
        <div className='border border-white shadow-xl font-roboto font-normal'>
            <nav className="fixed bg-white dark:bg-white w-full shadow-xl">
                <div className="max-w-screen-2xl flex items-center justify-between p-2.5 pl-5 pr-16">
                    {/* Logo and Menu */}
                    <div className="flex space-x-3 rtl:space-x-reverse">
                        <img src={rednoteLogo} className="w-40 h-9 cursor-auto" alt="Rednote Logo" />                        
                        <Toggle onToggleSidebar={onToggleSidebar}/>
                    </div>

                    {/* mode and profile */}
                    <div className="flex gap-3 items-center justify-end md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    

                        <div className="relative basis-1 cursor-pointer">
                            <div className="absolute left-[-5px] top-[-15px] bg-lite-red rounded-full">
                                <span className="text-[9px] text-white px-5 p-11">3</span>
                            </div>
                            <div className="p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="text-[#344563] w-4 h-4"
                                    viewBox="0 0 448 512"
                                >
                                    <path
                                        d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <button type="button" className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="true" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-5 h-5" src={DarkMode} alt="dark mode" />
                        </button>

                        {/* Profile  */}
                        <div className='relative'>
                            <button type="button" className="flex  text-sm md:me-0 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={isOpen}
                                onClick={toggleProfileDropdown} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-11 h-11 rounded-full border border-red-400" src={profile} alt="user photo" />

                            </button>

                            <div className={`z-1000 ${isOpen ? 'inline-block' : 'hidden'} w-44 absolute left-[-95px] border border-[#00000026] my-4 text-base list-none bg-white  rounded shadow dark:bg-white-700 dark:divide-gray-600`}
                                id="user-dropdown">
                                <FontAwesomeIcon icon={faCaretUp} size="2xl" style={{ color: "#cccccc", }} className='z-0 absolute top-[-18px] right-12' />

                                <ul className="" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="#" className="block pl-4 pr-5 py-1 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black">
                                            <FontAwesomeIcon icon={faHandshake} className='mr-1' />
                                            <span className='font-normal font-roboto'> Hi! Demo</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block pl-4 pr-5 py-1 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black">
                                            <FontAwesomeIcon icon={faBuilding} className='mr-1' />
                                            <span>  Company Info</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block pl-4 pr-5 py-1 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black">
                                            {/* <i className="ion-person-add"></i> */}
                                            <FontAwesomeIcon icon={faUserPlus} className='mr-1' />
                                            <span>  User Info </span>
                                        </a>
                                    </li>
                                    <li className="relative group">
                                        <a href="#" className="block  py-1 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black">
                                            <span className='pl-4 pr-3.5'>Select Company</span>
                                            <FontAwesomeIcon icon={faCaretRight} className='w-3.5 h-3.5 ml-5 group-hover:hidden' />
                                        </a>
                                        <div className="absolute hidden group-hover:block left-[-195px] top-0 bg-white shadow-md rounded mt-1 border border-[#00000026]">
                                            <a href="#" className="block px-7 py-1.5 text-sm text-gray hover:bg-[#f4fcff]  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black" onClick={() => handleCompanyClick('Demo Company')}>
                                                {/* {selectedCompany === 'Demo Company' && (
                                                    <FontAwesomeIcon icon={faCheck} className="pr-2" />
                                                )} */}
                                                Demo Company
                                            </a>
                                            <a href="#" className="block px-7 py-1.5 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black" onClick={() => handleCompanyClick('1st Company')}>
                                                1st Company
                                            </a>
                                            <a href="#" className="block px-7 py-1.5 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black" onClick={() => handleCompanyClick('2nd Company')}>
                                                {/* {selectedCompany === '2nd Company' && (
                                                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                                )} */}
                                                2nd Company
                                            </a>
                                            <a href="#" className="block px-7 py-1.5 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black" onClick={() => handleCompanyClick('TEST -Sales Order Grid')}>
                                                {/* {selectedCompany === 'TEST -Sales Order Grid' && (
                                                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                                )} */}
                                                TEST -Sales Order Grid
                                            </a>
                                        </div>
                                    </li>
                                    <li className="relative group">
                                        <a href="#" className="block py-1 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black">
                                            <span className='pl-4 pr-5'>Switch To</span>
                                            <FontAwesomeIcon icon={faCaretRight} className='w-3.5 h-3.5 ml-14 mr-1 group-hover:hidden' />
                                        </a>
                                        <div className="absolute hidden group-hover:block left-[-125px] top-0 bg-white shadow-md rounded mt-1 border border-[#00000026] ">
                                            <a href="#" className="block px-8 py-1.5 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black" onClick={() => handleCompanyClick('Finance')}>
                                                {selectedCompany === 'Finance' && (
                                                    <FontAwesomeIcon icon={faCheck} className="mx-2 px-1" />
                                                )}Finance</a>
                                            <a href="#" className="block px-8 py-1.5 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black" onClick={() => handleCompanyClick('CRM')}>
                                                {selectedCompany === 'CRM' && (
                                                    <FontAwesomeIcon icon={faCheck} className="mx-2 px-1" />
                                                )}CRM</a>
                                            <a href="#" className="block px-8 py-1.5 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black" onClick={() => handleCompanyClick('Inventory')}>
                                                {selectedCompany === 'Inventory' && (
                                                    <FontAwesomeIcon icon={faCheck} className="mx-2 px-1" />
                                                )}Inventory</a>
                                            <a href="#" className="block px-8 py-1.5 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black" onClick={() => handleCompanyClick('HRMS')}>
                                                {selectedCompany === 'HRMS' && (
                                                    <FontAwesomeIcon icon={faCheck} className="mx-2 px-1" />
                                                )}HRMS</a>
                                        </div>
                                    </li>
                                </ul>

                                <div className="pb-3 pt-1.5">
                                    <span className="block pl-4 pr-5 py-1 text-sm text-gray hover:bg-[#f4fcff] border-t border-[#00000033] dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-black">
                                        <FontAwesomeIcon icon={faUser} className='mr-1' />
                                        Profile
                                    </span>
                                    <span className="block pl-4 pr-5 py-1 text-sm text-gray hover:bg-[#f4fcff] dark:hover:bg-gray-600 dark:text-gray500 dark:hover:text-black">
                                        <FontAwesomeIcon icon={faPowerOff} className='mr-1' />
                                        Sign Out
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-[#f4fcff] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header