import React from 'react'
import Header from '../Components/header'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv';
import BulpTips from '../assets/img/bulp_tips.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faCaretDown, faMagnifyingGlass, faPencil, faCopy } from '@fortawesome/free-solid-svg-icons';
import { faFileExcel, faPenToSquare, faNewspaper, faTrashCan } from '@fortawesome/free-regular-svg-icons';


const importProduct = () => {

    const headers = [
        { label: 'Product Name', key: 'ProductName' },
        { label: 'ProductDesc', key: 'ProductName' },
        { label: 'HSN Code', key: 'ProductName' },
        { label: 'ProductCode', key: 'ProductName' },
        { label: 'Product Type', key: 'ProductName' },
        { label: 'AddToInventory', key: 'ProductName' },
        { label: 'ProductFor', key: 'ProductName' },
        { label: 'Tax', key: 'ProductName' },
        { label: 'PurchaseTax', key: 'ProductName' },
        { label: 'UOMId', key: 'ProductName' },
        { label: 'PGroupId', key: 'ProductName' },
        { label: 'PSubGroupId', key: 'ProductName' },
        { label: 'IsTaxInclusive', key: 'ProductName' },
        { label: 'SalesRate', key: 'ProductName' },
        { label: 'PurchaseRate', key: 'ProductName' },
        { label: 'OpeningStockQty', key: 'ProductName' },
        { label: 'OpeningStockValue', key: 'ProductName' },
        { label: 'SalesRate1', key: 'ProductName' },
        { label: 'PurchaseRate1', key: 'ProductName' },
        { label: 'OpeningStockQty1', key: 'ProductName' },
        { label: 'OpeningStockValue1', key: 'ProductName' },
        { label: 'UOMId2', key: 'ProductName' },
        { label: 'SalesRate2', key: 'ProductName' },
        { label: 'PurchaseRate2', key: 'ProductName' },
        { label: 'OpeningStockQty2', key: 'ProductName' },
        { label: 'OpeningStockValue2', key: 'ProductName' },
        { label: 'MRP', key: 'ProductName' },
        { label: 'VariantId1', key: 'ProductName' },
        { label: 'VariantValue1', key: 'ProductName' },
        { label: 'VariantId2', key: 'ProductName' },
        { label: 'VariantValue2', key: 'ProductName' },
        { label: 'VariantId3', key: 'ProductName' },
        { label: 'VariantValue3', key: 'ProductName' },
        { label: 'ProductCategoryId', key: 'ProductName' },
    ];

    const exportData = () => {
        // You can format your data here as needed
        const data = [
            { 'Product Name': '', 'ProductDesc': '' },
            { 'Product Name': '', 'ProductDesc': '' },
            // Add other data rows here
        ];
        return data;
    };
    return (
        <div>
            <Header />
            <div className={`p-2  bg-[#d9d9d9] h-screen custom-class font-roboto `}>
                <div className={`ml-52 bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl`}>
                    <div className="mb-4 p-2 ">
                        <div className='panel-heading row py-2 px-5 text-gray border-b border-b-[#0000001f] flex items-center justify-between'>
                            <h3 className='text-base font-medium'>IMPORT EXCEL FILE</h3>
                        </div>

                        <div className='m-5 flex justify-between'>
                            <Link to='/product' className='bg-[#005bac] text-white px-3 py-1.5 hover:scale-105 transform transition duration-200'>Back</Link>
                            <CSVLink data={exportData()} headers={headers} filename={'SampleProducts.csv'}><FontAwesomeIcon icon={faFileExcel} className='border-light-gray border p-2.5 rounded hover:bg-[#e6e6e6] hover:border-[#adadad] hover:scale-105 transform transition duration-200' /></CSVLink>
                        </div>

                        <div className='flex items-center justify-center m-5'>
                            <img src={BulpTips} className='w-12 h-12'/>
                            <h3 className='ml-10 text-2xl text-dark-gray font-medium'>Tips to remember</h3>
                        </div>
                        <div className='text-left text-sm flex items-center justify-center text-dark-gray'>
                            <ul className='list-disc list-inside'>
                                <li>Download Excel template from right corner link.</li>
                                <li>Fill all product details in excel file.</li>
                                <li>Do not change Headers in Excel file.</li>
                                <li>Upload in below link and click Import button.</li>
                                <li>Data's will be uploaded after confirmation.</li>
                            </ul>
                        </div>

                        <div className='m-3'>
                            <input type="file" name="file" className='text-ssm border border-light-gray w-5/12 py-1 px-3'/>
                        </div>

                        <div className='m-3'>
                            <button type="submit" className="bg-hover-red text-white p-1 flex items-center"><ion-icon name="cloud-done"/><span className='ml-2.5 text-ssm'>Import</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default importProduct