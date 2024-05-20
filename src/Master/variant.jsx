import React, { useState, useEffect, useMemo } from 'react';
import Headers from '../Components/header';
import ConfirmModal from '../Product/confirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import TablePagination from '../Components/TablePagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import SortingTable from '../Components/SortingTable';
import { v4 as uuidv4 } from 'uuid';

const Variant = () => {
    const [hoveredRows, setHoveredRows] = useState(null);
    const [variant, setVariant] = useState([]);
    const [newVariant, setNewVariant] = useState('');
    const [deleteRowIndex, setDeleteRowIndex] = useState(null);
    // const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

    const handleMouseEnter = (index) => {
        setHoveredRows(index);
    };

    const handleMouseLeave = () => {
        setHoveredRows(null);
    };
    const defaultModifiedBy = "Demo";
    useEffect(() => {
        const storedVariant = JSON.parse(localStorage.getItem('variant')) || [];
        console.log('Stored Variant:', storedVariant);
        setVariant(storedVariant);
    }, []);

    const handleAddVariant = () => {
        if (!newVariant.trim()) {
            // setIsErrorPopupOpen(true);
            return;
        }

        // setIsErrorPopupOpen(false);
        const modifiedDate = moment().format('DD/MM/YYYY');
        const updatedVariant = [...variant, {  id: uuidv4(), variant: newVariant.trim(), modifiedDate, modified_by: defaultModifiedBy }];
        console.log('Updated Variant:', updatedVariant);
        setVariant(updatedVariant);
        setNewVariant('');
        localStorage.setItem('variant', JSON.stringify(updatedVariant));
        toast.success('Successfully Inserted');
    };
    const handleTrashClick = (index) => {
        setDeleteRowIndex(index);
    };

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setDeleteRowIndex(null);
    }

    const sortedData = useMemo(() => {
        return variant.slice().sort((a, b) => {
            const aValue = a.variant;
            const bValue = b.variant;
            return aValue.localeCompare(bValue);
        });
    }, [variant]);

    const handleConfirmDelete = () => {
        if (!variant) {
            console.error('Variant array is undefined');
            return;
        }

        const variantToDelete = sortedData[deleteRowIndex];
        const updatedVariant = variant.filter(v => v.id !== variantToDelete.id);
        setVariant(updatedVariant);
        localStorage.setItem('variant', JSON.stringify(updatedVariant));
        setIsConfirmModalOpen(false);
        setDeleteRowIndex(null);
    };


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

    const visibleProducts = variant.slice(startIndex, endIndex);

    const [editedVariant, setEditedVariant] = useState('');

    const handleRowClick = (variant) => {
        if (selectedVariantForEdit === variant) {
            setSelectedVariantForEdit([]);
            setEditedVariant('');
            console.log('Row clicked if: ',editedVariant);
        } else {
            setSelectedVariantForEdit(variant);
            setEditedVariant(variant.variant);
            console.log('Row clicked else: ',editedVariant);
        }
    };

    const handleUpdateVariant = () => {
        const updatedVariantList = variant.map((v) =>
            v.id === selectedVariantForEdit.id  ? { ...v, variant: editedVariant, modifiedDate: moment().format('DD/MM/YYYY') } : v
        );

        const updatedVariantListWithDefault = updatedVariantList.map(v => ({
            ...v,
            modified_by: v.modified_by || defaultModifiedBy
        }));

        setVariant(updatedVariantListWithDefault);
        setSelectedVariantForEdit(null);
        localStorage.setItem('variant', JSON.stringify(updatedVariantList));
        toast.success('Variant Updated Successfully');
    };

    const handleCancelUpdate = () => {
        setSelectedVariantForEdit(null);
        setEditedVariant('');
    };
    const [selectedVariantForEdit, setSelectedVariantForEdit] = useState();

    const columns = [
        { title: 'Variant', key: 'variant' },
        { title: 'Modified By', key: 'modified_by' },
        { title: 'Modified Date', key: 'modifiedDate' }
    ];

    return (
        <div>
            <Headers />
            <div className={`p-2 bg-[#d9d9d9] custom-class font-roboto `}>
                <div className={`ml-52 bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl`}>
                    <div className="mb-4">
                        <div className='panel-heading row py-2 px-5 text-gray border-b border-b-[#0000001f] flex items-center justify-between'>
                            <h3 className='text-base font-medium uppercase'>Variant</h3>
                        </div>
                        <div className='my-10 mx-10'>
                            {selectedVariantForEdit && (
                                <><div className='flex'>
                                    <label className='text-dark-gray text-ssm font-medium'>Variant<span className="text-red-500">&nbsp;*</span></label>
                                </div><div className='flex items-center'>
                                        <input
                                            type="text"
                                            placeholder='Variant'
                                            name='variant'
                                            className='variant border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                                            value={editedVariant}
                                            onChange={(e) => setEditedVariant(e.target.value)}
                                            />
                                        <button className='bg-yellow-500 text-white px-3 py-1 ml-2' onClick={handleUpdateVariant}>
                                            Update
                                        </button>
                                        <button className='bg-red-500 text-white px-3 py-1 ml-2' onClick={handleCancelUpdate}>
                                            Cancel
                                        </button>
                                    </div></>
                            )}
                            {!selectedVariantForEdit && (
                                <><div className='flex'>
                                    <label className='text-dark-gray text-ssm font-medium'>Variant<span className="text-red-500">&nbsp;*</span></label>
                                </div><div className='flex items-center'>
                                        <input
                                            type="text"
                                            placeholder='Variant'
                                            name='variant'
                                            className='variant border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                                            value={newVariant}
                                            onChange={(e) => setNewVariant(e.target.value)} />
                                        <button type='button' className='add-btn bg-hover-red ml-6 px-6 py-1.5 text-white disabled:opacity-80' onClick={handleAddVariant} disabled={!newVariant.trim()}>
                                            Add
                                        </button>
                                    </div></>
                            )}
                        </div>
                       
                        <div className="relative overflow-x-auto shadow-md my-10 mx-10">

                            <SortingTable
                                data={variant}
                                columns={columns}
                                onUpdateVariant={handleUpdateVariant}
                                actions={{
                                    delete: true,
                                    onDelete: handleTrashClick,
                                    edit: true,
                                    onEdit : (rowData) => handleRowClick(rowData)
                                }}

                            />

                            {variant && deleteRowIndex !== null && (
                                <ConfirmModal
                                    isConfirmOpen={true}
                                    isConfirmClose={closeConfirmModal}
                                    variant={variant}
                                    rowIndex={deleteRowIndex}
                                    onConfirm={handleConfirmDelete}
                                />
                            )}

                            <TablePagination
                                totalItems={variant.length}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Variant;
