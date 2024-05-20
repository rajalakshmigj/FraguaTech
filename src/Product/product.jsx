import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import Header from '../Components/header';
import TablePagination from '../Components/TablePagination';
import Modal from './modal';
import ConfirmModal from './confirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faCaretDown, faMagnifyingGlass, faPencil, faCopy } from '@fortawesome/free-solid-svg-icons';
import { faFileExcel, faPenToSquare, faNewspaper, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Product = () => {

    const [isNewDropdownOpen, setIsNewDropdownOpen] = useState(false);
    const [isActionDropdownOpen, setIsActionDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [hoveredRows, setHoveredRows] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredRows([...hoveredRows, index]);
    };

    const handleMouseLeave = (index) => {
        setHoveredRows(hoveredRows.filter((rowIndex) => rowIndex !== index));
    };

    const [productDetails, setProductDetails] = useState({
        productName: '',
        hsnCode: '',
        productType: 'Goods',
        tax: '',
        modifiedBy: '',
        addToInventory: true,
    });

    const [products, setProducts] = useState([]);


    const handleAddProduct = (newProduct) => {

        const updatedProducts = [...products, newProduct];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);

        setProductDetails({
            productName: '',
            hsnCode: '',
            productType: '',
            tax: '',
            addToInventory: true, 
        });

        closeModal();
    };


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    function newDropdown() {
        setIsNewDropdownOpen(!isNewDropdownOpen);
    }

    function actionDropdown() {
        setIsActionDropdownOpen(!isActionDropdownOpen);
    }

    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // Filter products based on the input value
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };



    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    const [deleteRowIndex, setDeleteRowIndex] = useState(null);

    const handleTrashClick = (index) => {
        setDeleteRowIndex(index);
        console.log('trash', index);
        console.log('Deleted Row State', deleteRowIndex)
    };

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setDeleteRowIndex(null);
    }

    const handleConfirmDelete = () => {

        if (!products) {
            console.error('Products array is undefined');
            return;
        }
        setProducts(prevProducts => prevProducts.filter((_, i) => i !== deleteRowIndex));
        setIsConfirmModalOpen(false);

        setDeleteRowIndex(null);
    };

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            if (parsedProducts && Array.isArray(parsedProducts)) {
                const filteredProducts = parsedProducts.filter(product => !product.deleted);
                setProducts(filteredProducts);
                if (filteredProducts && Array.isArray(filteredProducts)) {
                    localStorage.setItem('products', JSON.stringify(filteredProducts));
                } else {
                    console.error('Filtered products is not an array');
                }
            } else {
                console.error('Stored products is not an array');
            }
        } else {
            console.error('No products stored in localStorage');
        }
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    const handleChangeRowsPerPage = (event) => {
        const value = parseInt(event.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const visibleProducts = products.slice(startIndex, endIndex);

    const headers = [
        { label: 'Product Name', key: 'productName' },
        { label: 'HSN Code', key: 'hsnCode' },
        { label: 'Product Type', key: 'productType' },
        { label: 'Tax', key: 'tax' },
        { label: 'Modified By', key: 'modifiedBy' },
    ];

    const exportData = () => {
        return products.map(product => ({
            productName: product.productName,
            hsnCode: product.hsnCode,
            productType: product.productType,
            tax: product.tax,
            modifiedBy: product.modifiedBy,
        }));
    };

    return (
        <>
            <Header />
            <div className={`p-2  bg-[#d9d9d9] custom-class font-roboto `}>
                <div className={`ml-52 bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl`}>
                    <div className="mb-4">
                        <div className='panel-heading row py-2 px-5 text-gray border-b border-b-[#0000001f] flex items-center justify-between'>
                            <h3 className='text-base font-medium'>PRODUCT</h3>
                            <div className='panel-head-icon'>
                                <FontAwesomeIcon icon={faGear} size='lg' />
                            </div>
                        </div>

                        <div className='flex items-center justify-end pr-8 '>

                            <div className=" flex text-left p-3 mr-10">
                                <div>
                                    <button onClick={openModal} data-modal-target="default-modal" data-modal-toggle="default-modal" className='new-btn inline-flex w-full justify-center gap-x-1.5  bg-hover-red px-3 py-1.5 text-xs text-white shadow-sm  hover:bg-gray-50'>
                                        New
                                    </button>
                                </div>
                                <div className='bg-hover-red pt-1 px-1 text-white shadow-lg border border-hover-red' onClick={newDropdown}>
                                    <ion-icon name="caret-down-sharp" className="-mr-1 h-2 w-2" />
                                </div>

                                {isNewDropdownOpen && (
                                    <div className="relative " role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <ul className="py-1 pl-2 absolute  top-5 left-[-75px] z-10  origin-bottom-left mt-2.5 w-40 rounded bg-white shadow-lg border-[#c5c5c5]" role="none">
                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'><i class="glyphicon glyphicon-import" /><Link to="/importproduct"  className="text-[#262626] font-normal block px-4 py-1 text-sm ">Import Product</Link></li>
                                        </ul>
                                    </div>
                                )}
                                <Modal isOpen={isModalOpen} onClose={closeModal} addProduct={handleAddProduct} />

                            </div>


                            <div className="text-left p-3 mr-10 ">
                                <div>
                                    <button type="button" className="inline-flex w-full items-center justify-center gap-x-1.5  bg-hover-red px-3 py-1.5 text-xs text-white shadow-sm ring-1 ring-inset ring-red-700 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={actionDropdown}>
                                        Action
                                        <ion-icon name="caret-down-sharp" className="-mr-1 h-3 w-3  bg-red-700" />
                                    </button>
                                </div>

                                {isActionDropdownOpen && (
                                    <div className="relative" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <ul className="py-1 pl-2 absolute z-10 mt-1 w-56 origin-top-right rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="none">

                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <FontAwesomeIcon icon={faFileExcel} /> <CSVLink data={exportData()} headers={headers} filename={'products.csv'} className="text-[#262626] font-normal block pl-2 py-1 text-sm ">
                                                Export
                                            </CSVLink></li>
                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <FontAwesomeIcon icon={faPenToSquare} /><Link to="#" className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" id="menu-item-1">Bulk Product Update</Link></li>
                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'><FontAwesomeIcon icon={faPencil} /><Link to="#" className="text-[#262626] font-normal block pl-2 py-1 text-sm " role="menuitem" tabIndex="-1" id="menu-item-2">Bulk Price Update</Link></li>
                                            <li className='flex items-center pl-2 hover:bg-[#f5f5f5]'> <FontAwesomeIcon icon={faNewspaper} /><Link to="#" className="text-[#262626] font-normal block pl-2 py-1 text-sm  disabled:text-gray cursor-not-allowed" role="menuitem" tabIndex="-1" id="menu-item-2" aria-disabled="true"
                                            >Material Requierment(MRP)</Link></li>
                                        </ul>
                                    </div>

                                )}

                            </div>
                        
                            <div className='relative py-1 w-80'>
                                <input type="text" name="search-box" value={inputValue} placeholder={!isFocused && inputValue === '' ? 'Search by Name' : ''} onFocus={handleInputFocus}
                                    onBlur={handleInputBlur} onChange={handleInputChange} className='w-full border border-[#0000001f] p-1 focus:text-[#666666] focus:outline-none focus:border-[#c5c5c5] text-sm' />
                                <div class="absolute top-3 right-3 flex items-center pr-2 pointer-events-none">
                                    {(!isFocused && inputValue === '') && (
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className='text-[#666666]' />
                                    )}
                                </div>
                            </div>

                        </div>


                        <div className="relative overflow-x-auto shadow-md my-10 mx-10">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-white uppercase bg-hover-red dark:bg-gray-700 dark:text-white text-left cursor-pointer">
                                    <tr className='flex justify-between items-center'>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <span className="text-lg text-dark-gray ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className=" py-1 w-40" name="product">
                                            Product Name
                                        </th>
                                        <th scope="col" className=" py-1 w-36" name="hsncode">
                                            HSN Code
                                        </th>
                                        <th scope="col" className=" py-1 w-36" name="producttype">
                                            Product Type
                                        </th>
                                        <th scope="col" className="py-1 w-36" name="tax">
                                            Tax
                                        </th>
                                        <th scope="col" className=" py-1 w-36" name="modified by">
                                            Modified By
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product, index) => (
                                            <tr key={index} className={`${index % 2 === 0 ? 'bg-[#e6e6e6]' : 'bg-[#f2f2f2]'} flex justify-between items-center p-0.5 my-2 cursor-pointer`} onMouseEnter={() => setHoveredRows(index)}
                                                onMouseLeave={() => setHoveredRows(null)}>
                                                <td className="w-3 py-2 pl-4">
                                                    <div className="flex items-center relative">
                                                        <span className="text-lg focus:text-dark-gray ">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                            </svg>
                                                        </span>

                                                        {hoveredRows === index && (

                                                            <>
                                                                <div className='absolute left-7 flex'>
                                                                    <FontAwesomeIcon icon={faTrashCan} className='pl-5 hover:text-red-500' onClick={() => handleTrashClick(index)} />
                                                                    <FontAwesomeIcon icon={faCopy} className='ml-5 hover:text-red-500' onClick={() => openModal(product)} />
                                                                </div>
                                                            </>

                                                        )}
                                                    </div>
                                                </td>
                                                <td scope="row" className="px-6 py-2 w-40 dark:text-[#337ab7] hover:text-[#23527c] hover:w-40">{product.productName}</td>
                                                <td scope="row" className="px-6 py-2 w-36 dark:text-[#337ab7] hover:text-[#23527c] hover:w-36">{product.hsnCode}</td>
                                                <td scope="row" className="px-6 py-2 w-36 dark:text-[#337ab7] hover:text-[#23527c] hover:w-36">{product.productType}</td>
                                                <td scope="row" className="px-6 py-2 w-36 dark:text-[#337ab7] hover:text-[#23527c] hover:w-36">{product.tax}</td>
                                                <td scope="row" className="px-6 py-2 w-36 dark:text-[#337ab7] hover:text-[#23527c] hover:w-36">DEMO</td>
                                            </tr>

                                        ))
                                    ) : (
                                        products.slice(startIndex, endIndex).map((product, index) => (
                                            <tr key={index} className={`${index % 2 === 0 ? 'bg-[#e6e6e6]' : 'bg-[#f2f2f2]'} flex justify-between items-center p-0.5 my-2 cursor-pointer`} onMouseEnter={() => setHoveredRows(index)}
                                                onMouseLeave={() => setHoveredRows(null)}>
                                                <td className="w-3 py-2 pl-4">
                                                    <div className="flex items-center relative">
                                                        <span className="text-lg focus:text-dark-gray ">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                            </svg>
                                                        </span>

                                                        {hoveredRows === index && (

                                                            <>
                                                                <div className='absolute left-7 flex'>
                                                                    <FontAwesomeIcon icon={faTrashCan} className='pl-5 hover:text-red-500' onClick={() => handleTrashClick(index)} />
                                                                    <FontAwesomeIcon icon={faCopy} className='ml-5 hover:text-red-500' onClick={() => openModal(product)} />
                                                                </div>
                                                            </>

                                                        )}
                                                    </div>
                                                </td>
                                                <td scope="row" className="px-6 py-2 w-40 dark:text-[#337ab7] hover:text-[#23527c] hover:w-40">{product.productName}</td>
                                                <td scope="row" className="px-6 py-2 w-36 dark:text-[#337ab7] hover:text-[#23527c] hover:w-36">{product.hsnCode}</td>
                                                <td scope="row" className="px-6 py-2 w-36 dark:text-[#337ab7] hover:text-[#23527c] hover:w-36">{product.productType}</td>
                                                <td scope="row" className="px-6 py-2 w-36 dark:text-[#337ab7] hover:text-[#23527c] hover:w-36">{product.tax}</td>
                                                <td scope="row" className="px-6 py-2 w-36 dark:text-[#337ab7] hover:text-[#23527c] hover:w-36">DEMO</td>
                                            </tr>
                                        ))
                                    )}
                                    {/* ))} */}

                                    {products && deleteRowIndex !== null && (
                                        <ConfirmModal
                                            isConfirmOpen={true}
                                            isConfirmClose={closeConfirmModal}
                                            products={products}
                                            rowIndex={deleteRowIndex}
                                            onConfirm={handleConfirmDelete}
                                        />
                                    )}
                                </tbody>
                            </table>
                            <TablePagination
                                totalItems={products.length}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}

                            />
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Product