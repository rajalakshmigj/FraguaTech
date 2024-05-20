import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faCaretDown, faMagnifyingGlass, faPencil, faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modal.scss'

function Modal({ isOpen, onClose, addProduct }) {
    const [isGroupDropdown, setIsGroupDropdown] = useState(false);
    const [isSubGroupDropdown, setIsSubGroupDropdown] = useState(false);
    const [isCategoryDropdown, setIsCategoryDropdown] = useState(false);
    const [isTypeDropdown, setIsTypeDropdown] = useState(false);
    const [isSelectUom, setIsSelectUom] = useState(false);

    const [product, setProduct] = useState([]);

    function typeDropdown(selectedType) {
        setProductDetails({
            ...productDetails,
            productType: selectedType
        });
        setIsTypeDropdown(false);
    }

    const [isGroupOpen, setIsGroupOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [productGroups, setProductGroups] = useState(['Select Product Group']);

    const [isGroupSelected, setIsGroupSelected] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('Search Product Group');


    const handleGroupSelection = (group) => {
        // setProductGroups(group);
        // setIsSubGroupDropdown(true);
        // setIsGroupSelected(true);

        // setProductGroups(prevGroups => [...prevGroups, group]);
        setSelectedGroup(group);    
        setIsGroupDropdown(false);
        
    };

    //Product Group Selection 
    function grpDropdown() {
        setIsGroupDropdown(!isGroupDropdown);
    }

    // Add Product Group
    const groupModal = () => {
        setIsGroupOpen(!isGroupOpen);
    };

    const handleAddGroup = () => {
        if (newGroupName.trim() !== '') {
            const updatedGroups = [...productGroups, newGroupName.trim()];
            setProductGroups(updatedGroups);
            setNewGroupName('');
            setIsGroupOpen(false);

            // Save updated productGroups array to local storage
            localStorage.setItem('productGroups', JSON.stringify(updatedGroups));

            toast.success('Successfully Inserted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    // useEffect(() => {
    //     const storedProductGroups = JSON.parse(localStorage.getItem('productGroups'));
    //     console.log("Stored Product Groups:", storedProductGroups);
    //     if (Array.isArray(storedProductGroups)) {
    //         setProductGroups(storedProductGroups);
    //     }
    // }, []);



    function subGrpDropdown() {
        setIsSubGroupDropdown(!isSubGroupDropdown);
    }

    function CateDropdown() {
        setIsCategoryDropdown(!isCategoryDropdown);
    }

    function SelectUom() {
        setIsSelectUom(!isSelectUom);
    }

    const [isToggleChecked, setIsToggleChecked] = useState(false);

    const handleToggleSwitch = () => {
        setIsToggleChecked(!isToggleChecked);
    };

    const openAddUOMModal = () => {
        // Logic to open the modal for adding a new UOM
        // You can set a state variable to control the visibility of the modal
    };

    const [productDetails, setProductDetails] = useState({
        productName: '',
        hsnCode: '',
        productType: 'Goods',
        tax: '',
        addToInventory: true
    });

    const handleProductInputChange = (e) => {
        const { name, value, checked } = e.target;
        // let updatedProductDetails = { ...productDetails, [name]: value };
        setProductDetails({ ...productDetails, [name]: value });
        // setProductDetails(updatedProductDetails);
        // setProductDetails(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }));
    };

    // Main Add Product 
    const handleAddProduct = () => {
        const newProduct = {
            productName: productDetails.productName,
            hsnCode: productDetails.hsnCode,
            productType: productDetails.productType,
            tax: productDetails.tax,
            addToInventory: productDetails.addToInventory,
        };
        //   console.log('Product added:', newProduct);
        //   console.log('ProductDetails updated:', productDetails);
        addProduct(newProduct);
        setProductDetails({
            productName: '',
            hsnCode: '',
            productType: 'Goods',
            tax: '',
            addToInventory: true,

        });

        //   handleCloseAddProduct();
    };

    const [isTaxInclusiveChecked, setIsTaxInclusiveChecked] = useState(false);

    const handleTaxInclusiveChange = () => {
        setIsTaxInclusiveChecked(!isTaxInclusiveChecked);
        // setIsTaxInclusiveChecked(...prevState => !prevState);       
    };


    const [addToInventory, setAddToInventory] = useState(true);



    // const handleAddToInventoryChange = () => {
    //     setAddToInventoryChecked(prevState => !prevState);
    // };




    // useEffect(() => {
    //     if (rowData) {
    //         setProductDetails(rowData);
    //     }
    // }, [rowData]);

    return (
        <>
            {isOpen && (
                <div id="default-modal" tabIndex="-1" aria-hidden="true" className="fixed overflow-y-auto bg-[#00000080] overflow-x-hidden top-0 right-0 left-0 z-50 flex items-center w-screen inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative pt-0 pb-4 px-20 w-full  max-h-full">

                        <div className="relative bg-white rounded-lg shadow">

                            <div className="flex items-center justify-between p-2 md:p-3 border-b border-b-light-gray rounded-t">
                                <h1 className="px-4 text-2xl font-medium text-dark-gray">
                                    Add Product
                                </h1>
                                <button type="button" className="dark:text-[#337ab7] hover:text-[#23527c] bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={onClose}>
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="p-2 md:p-5 space-y-4 grid grid-cols-2 divide-x divide-light-gray">
                                <div className='px-2' aria-required>
                                    <label className='text-dark-gray text-ssm font-medium'>Product Name<span className="text-red-500">&nbsp;*</span></label>
                                    <div className='relative py-1 w-full'>
                                        <input type="text" name="productName" placeholder='Product Name' required value={productDetails.productName}
                                            onChange={handleProductInputChange} className='w-full border border-light-gray py-2 pl-2.5 focus:text-dark-gray text-ssm focus:outline-none focus:border-light-gray foucs:rounded ' />
                                        <button class="absolute top-1 right-0 flex items-center px-2.5 bg-slate-100 border border-light-gray">
                                            {/* {(!isFocused && inputValue === '') && ( */}
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className='py-2.5 text-dark-gray text-ssm ' />
                                            {/* )} */}
                                        </button>
                                    </div>

                                    <div>
                                        <label className='text-dark-gray text-ssm font-medium'>Description</label>
                                        <div className=''>
                                            <textarea type='text' placeholder='Description' className='w-full border border-light-gray px-2 py-2 focus:text-dark-gray text-ssm focus:outline-none focus:border-light-gray resize-none focus:rounded'  ></textarea>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2 gap-x-5'>
                                        <div className="inline-block text-left py-2 mr-1.5 ">
                                            <div>
                                                <label className='text-dark-gray text-ssm font-medium'>Product Group</label>
                                                <button type="button" className="border border-light-gray text-dark-gray text-ssm inline-flex w-full items-center justify-between gap-x-1.5 px-2.5 py-1.5  shadow-sm " id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={grpDropdown} >
                                                    {/* Search Product Group */}
                                                    {/* {productGroups.length > 0 ? productGroups : 'Search Product Group'} */}
                                                      {selectedGroup}
                                                    <ion-icon name="caret-down-sharp" className="-mr-1 h-3 w-3  bg-red-700" />
                                                </button>
                                            </div>

                                            {isGroupDropdown && (
                                                <div className="relative" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                                    <ul className="py-1 pl-2 absolute z-10 mt-1 w-56 origin-top-right  rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="none">
                                                        {Array.isArray(productGroups) && productGroups.map((group, index) => (
                                                            <li key={index} className='flex items-center pl-2 hover:bg-[#f5f5f5]' onClick={() => handleGroupSelection(group)}>
                                                                <span className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" >{group}</span>
                                                            </li>
                                                        ))}

                                                        <div className='border-t border-t-light-gray'>
                                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'>
                                                                <span className="hover:text-hover-blue text-blue font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" onClick={groupModal}>Add Product Group</span>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </div>

                                            )}

                                            {isGroupOpen && (
                                                <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 z-50">
                                                    <h2 className="text-base text-dark-gray font-medium mb-4">Product Group</h2>
                                                    <div className="mb-4">
                                                        <label htmlFor="groupName" className="text-sm font-medium">Product Name <span className="text-red-500">*</span></label>
                                                        <input type="text" id="groupName" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} className="border border-light-gray px-2 py-1 w-full focus:outline-none placeholder:text-ssm" placeholder='Product Group Name' />
                                                    </div>
                                                    <button onClick={handleAddGroup} className="bg-hover-red text-white py-1 px-4 hover:bg-blue-600 float-end">Add</button>
                                                    {newGroupName.trim() === '' && (
                                                        <div className="text-red-500 text-sm mb-2">Product field is empty</div>
                                                    )}
                                                </div>
                                            )}

                                            <ToastContainer className="toast-container" />

                                            <div className='my-2'>
                                                <label className='text-dark-gray text-ssm font-medium'>Product Code</label>
                                                <input type="text" className='w-full border border-light-gray  px-2.5 text-sm py-1.5 focus:rounded focus:outline-none' placeholder='Product Code'></input>
                                            </div>

                                            <div className='grid grid-cols-2'>
                                                <div className='mt-2 mb-1 mr-5'>
                                                    <label className='text-dark-gray text-ssm font-medium'>Product Type<span className="text-red-500">&nbsp;*</span></label>
                                                    <button type="button" name='productType' className="hover:rounded border border-light-gray text-ssm text-gray inline-flex w-full items-center justify-between gap-x-1.5 px-2.5 py-1.5  shadow-sm" id="menu-button" aria-expanded={isTypeDropdown}
                                                        aria-haspopup="true" onClick={() => setIsTypeDropdown(!isTypeDropdown)}
                                                        value={productDetails.productType} onChange={handleProductInputChange}>
                                                        {productDetails.productType}
                                                        <ion-icon name="caret-down-sharp" className="-mr-1 h-3 w-3  bg-red-700" />
                                                    </button>
                                                </div>

                                                <div className='mt-2 mx-1 ml-2'>
                                                    <label className='text-dark-gray text-ssm font-medium'>HSN Code</label>
                                                    <input type="text" name='hsnCode' className='border border-light-gray w-full px-2.5 text-sm py-1.5 focus:rounded focus:outline-none' placeholder='HSN Code' value={productDetails.hsnCode}
                                                        onChange={handleProductInputChange}></input>
                                                </div>

                                                {isTypeDropdown && (
                                                    <div className="relative" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                                        <ul className="py-1 absolute -top-0 -left-0 z-10 w-32 origin-top-right  rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="none">

                                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <span className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => typeDropdown('Goods')}>Goods</span></li>

                                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <span className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" id="menu-item-1" onClick={() => typeDropdown('Services')}>Services</span></li>
                                                        </ul>
                                                    </div>

                                                )}

                                            </div>

                                            <div>
                                                <div>
                                                    <label className='text-dark-gray text-ssm font-medium'>Product For</label>
                                                </div>
                                                <div class="flex">
                                                    <div class="flex items-center me-4">
                                                        <input defaultChecked id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="inline-radio" class="ms-2 text-sm font-normal text-gray dark:text-gray-300">All</label>
                                                    </div>
                                                    <div class="flex items-center me-4">
                                                        <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="inline-2-radio" class="ms-2 text-sm font-normal text-gray dark:text-gray-300">Sales</label>
                                                    </div>
                                                    <div class="flex items-center me-4">
                                                        <input id="inline-checked-radio" type="radio" value="" name="inline-radio-group" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="inline-checked-radio" class="ms-2 text-sm font-normal text-gray dark:text-gray-300">Purchase</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-2 mt-20'>
                                                <div className='mt-2 mr-5 flex items-center'>
                                                    <input type="checkbox" value="checked" className='h-5 w-5 mr-2' /><label className='text-dark-gray text-ssm'>Is Tax Inclusive</label>
                                                </div>

                                                <div className='mt-2 mx-1 flex items-center'>
                                                    <input type="checkbox" name="addToInventory" className='h-5 w-5 mr-2' checked={productDetails.addToInventory}
                                                        onChange={handleProductInputChange}
                                                    /><label className='text-dark-gray text-ssm'>Add To Inventory</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Sub Group grid layout */}
                                        <div className="inline-block text-left py-2 ">
                                                <div className=''>
                                                    <label className='text-dark-gray text-ssm font-medium'>Product Sub Group</label>
                                                    <button type="button" className={`border border-light-gray inline-flex w-full items-center justify-between gap-x-1.5 px-2.5 text-sm py-1.5 text-gray shadow-sm disabled:bg-[#eee] disabled:border-transparent  ${!isGroupSelected ? 'disabled:bg-[#eee] disabled:border-transparent' : ''
                                                        }`} id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={subGrpDropdown} disabled={!isGroupSelected || !selectedGroup}>
                                                        Search Product Sub Group
                                                        <ion-icon name="caret-down-sharp" className="-mr-1 h-3 w-3  bg-red-700" />
                                                    </button>
                                                </div>

                                                {isSubGroupDropdown && isGroupSelected && (
                                                    <div className="relative" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                                        <ul className="py-1 pl-2 absolute z-10 mt-1 w-56 origin-top-right  rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="none">

                                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <span className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" id="menu-item-0">Export</span></li>
                                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <span className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" id="menu-item-1">Bulk Product Update</span></li>
                                                        </ul>
                                                    </div>

                                                )}

                                            <div className='my-2'>
                                                <label className='text-dark-gray text-ssm font-medium'>Product Category<span className="text-red-500">&nbsp;*</span></label>
                                                <button type="button" className="border border-light-gray text-gray inline-flex w-full items-center justify-between gap-x-1.5 px-2.5 text-sm py-1.5 shadow-sm" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={CateDropdown}>
                                                    Search Product Category
                                                    <ion-icon name="caret-down-sharp" className="-mr-1 h-3 w-3  bg-red-700" />
                                                </button>
                                            </div>

                                            {isCategoryDropdown && (
                                                <div className="relative" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                                    <ul className="py-1 pl-2 absolute z-10 mt-1 w-56 origin-top-right  rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="none">

                                                        <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <span className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" id="menu-item-0">Export</span></li>
                                                        <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <span className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" id="menu-item-1">Bulk Product Update</span></li>
                                                        <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <span className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" id="menu-item-2">Bulk Price Update</span></li>
                                                        <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <span className="text-[#262626] font-normal block pl-2 py-1 text-sm  disabled:text-gray cursor-not-allowed" role="menuitem" tabIndex="-1" id="menu-item-2" aria-disabled="true"
                                                        >Material Requierment(MRP)</span></li>
                                                    </ul>
                                                </div>

                                            )}

                                            <div className='grid grid-cols-2'>

                                                <div className='mt-2 mb-1 mr-5'>
                                                    <label className='text-dark-gray text-ssm font-medium '>Sales GST(%)</label>
                                                    <input type="text" name='tax' className='border border-light-gray  px-2.5 text-sm py-1.5 w-full focus:rounded focus:outline-none' placeholder='eg: 12 or 18' value={productDetails.tax}
                                                        onChange={handleProductInputChange}></input>
                                                </div>
                                                <div className='my-2 mx-1 ml-2'>
                                                    <label className='text-dark-gray text-ssm font-medium'>Purchase GST(%)</label>
                                                    <input type="text" className='border border-light-gray  px-2.5 text-sm py-1.5 w-full focus:rounded focus:outline-none' placeholder='eg: 12 or 18'></input>
                                                </div>

                                                <div className='relative group border-2 border-dashed border-light-gray w-32 py-10 px-1'>

                                                    <input type="file" name="" className=' opacity-0 text-white  '></input>
                                                    <span className='absolute top-0 text-red-500 left-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300'><ion-icon name="close-sharp"></ion-icon></span>
                                                </div>

                                                <div>

                                                </div>

                                                <div>
                                                    <div>
                                                        <label className='text-dark-gray text-ssm font-medium'>Reorder Qantity</label>
                                                    </div>
                                                    <input type="text" name="" className='border border-light-gray focus:outline-none px-1.5 focus:rounded w-32'></input>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className='px-4'>

                                    <div className='grid grid-cols-2'>

                                        <div className='flex items-center'>
                                            <label className='text-dark-gray text-ssm font-medium mr-2'>Multilevel UOM</label>
                                            <label className="inline-flex items-center cursor-pointer relative">
                                                <input type="checkbox" value="" className="sr-only peer" checked={isToggleChecked} onChange={handleToggleSwitch} />
                                                <div className={`relative w-14 h-8 ${isToggleChecked ? 'bg-[#c9302c] border border-[#c9302c]' : 'bg-[#449d44] border border-[#398439]'} peer-focus:outline-none rounded peer`}>
                                                    <span className={`absolute top-1/2 transform -translate-y-1/2  ${isToggleChecked ? 'left-5' : 'right-6'} text-ssm text-white`}>{isToggleChecked ? 'No' : 'Yes'}</span>
                                                    <span className={`absolute top-0 ${isToggleChecked ? 'start-[0px]' : 'end-[0px]'} bg-white border rounded h-8 w-4 transition-all `}></span>
                                                </div>
                                            </label>
                                        </div>

                                        <div className='flex items-center'>
                                            <label className='text-dark-gray text-ssm font-medium mr-2'>UOM Conversion</label>
                                            <label className="inline-flex items-center cursor-pointer relative">
                                                <input type="checkbox" value="" className="sr-only peer" checked={isToggleChecked} onChange={handleToggleSwitch} />
                                                <div className={`relative w-14 h-8 ${isToggleChecked ? 'bg-[#c9302c] border border-[#c9302c]' : 'bg-[#449d44] border border-[#398439]'} peer-focus:outline-none rounded peer`}>
                                                    <span className={`absolute top-1/2 transform -translate-y-1/2  ${isToggleChecked ? 'left-5' : 'right-6'} text-ssm text-white`}>{isToggleChecked ? 'No' : 'Yes'}</span>
                                                    <span className={`absolute top-0 ${isToggleChecked ? 'start-[0px]' : 'end-[0px]'} bg-white border rounded h-8 w-4 transition-all `}></span>
                                                </div>
                                            </label>
                                        </div>

                                    </div>


                                    <div className='mt-10'>
                                        <table>
                                            <thead className=' bg-slate-200 border border-gray text-left'>
                                                <th required className='border border-gray px-2 py-1 font-normal  '>UOM<span className="text-red-500">&nbsp;*</span></th>
                                                <th className='border border-gray  pl-2 py-1 font-normal  '>MRP</th>
                                                <th required className='border border-gray pl-2 py-1 font-normal  '>Sales Rate<span className="text-red-500">&nbsp;*</span></th>
                                                <th required className='border border-gray pl-2 py-1 font-normal  '>Purchase Rate<span className="text-red-500">&nbsp;*</span></th>
                                            </thead>
                                            <tbody>
                                                <tr className='border border-gray px-2 py-1 font-normal '>
                                                    <td>
                                                        <div class="relative inline-block text-left ">
                                                            <div className=''>
                                                                <button type="button" className="border border-gray text-sm text-gray inline-flex w-36 items-center justify-between gap-x-1.5 px-0.5 py-1.5 shadow-sm" id="menu-button" aria-expanded="true" aria-haspopup="false" onClick={SelectUom}>
                                                                    Select UOM
                                                                    <ion-icon name="caret-down-sharp" className="-mr-1 h-3 w-3  bg-red-700" />
                                                                </button>

                                                            </div>
                                                            {isSelectUom && (
                                                                <div class="overflow-y-scroll overflow-x-hidden absolute left-0 z-10 mt-2 origin-top-right divide-y divide-gray rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="horizontal" aria-labelledby="menu-button" tabIndex="-1">
                                                                    <div class="py-1 pl-3" role="none">
                                                                        <div class="relative ">
                                                                            <input type="text" class="border border-gray py-0.5 focus:outline-none" />
                                                                            <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                                                                                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-dark-gray h-3 w-3' />
                                                                            </div>
                                                                        </div>
                                                                        <a href="#" class="text-gray-700 block px-2 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">NOs</a>
                                                                        <a href="#" class="text-gray-700 block px-2 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Kgs</a>
                                                                        <a href="#" class="text-gray-700 block px-2 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Liters</a>
                                                                        <a href="#" class="text-gray-700 block px-2 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">MTR</a>
                                                                        <a href="#" class="text-gray-700 block px-2 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-4">CMS</a>
                                                                        <a href="#" class="text-gray-700 block px-2 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-5">mm</a>
                                                                        <a href="#" class="text-gray-700 block px-2 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-6">meter</a>
                                                                        <a href="#" class="text-gray-700 block px-2 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-7">km</a>
                                                                    </div>
                                                                    <div class="py-1" role="none">
                                                                        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-8" onClick={openAddUOMModal}>Add UOM</a>
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </td>

                                                    <td className='border border-gray pl-1.5 py-1'>
                                                        <input type="text" name="mrp" placeholder='MRP'
                                                            className=' focus:text-dark-gray focus:outline-none focus:border-white text-sm' />
                                                    </td>

                                                    <td className='border border-gray pl-1 py-1'>
                                                        <input type="text" name="mrp" placeholder='Price'
                                                            className=' focus:text-dark-gray focus:outline-none focus:border-white text-sm' />
                                                    </td>

                                                    <td className='border border-gray pl-0.5 py-1'>
                                                        <input type="text" name="mrp" placeholder='Price'
                                                            className=' focus:text-dark-gray focus:outline-none focus:border-white text-sm' />
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>

                                    <div className='flex items-center text-white my-3'>
                                        <button className='text-white bg-hover-red font-medium text-ssm px-3 py-1.5 text-center'> <ion-icon name="add-circle-outline" /><span className='pl-1'>Add Price</span></button>
                                    </div>
                                </div>


                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center justify-end pr-5 py-2 md:py-2">
                                <button type="button" className="text-white bg-hover-red font-medium text-sm px-3 py-1.5 text-center" onClick={handleAddProduct}><ion-icon name="cloud-done" />
                                    <span className='pl-1'>Add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            )
            }
        </>
    );
}

export default Modal;
