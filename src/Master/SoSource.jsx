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

const SOSource = () => {
    const [hoveredRows, setHoveredRows] = useState(null);
    const [soSource, setSoSource] = useState([]);
    const [newSoSource, setNewSoSource] = useState('');
    const [deleteRowIndex, setDeleteRowIndex] = useState(null);
    // const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

    const handleMouseEnter = (index) => {
        setHoveredRows(index);
    };

    const handleMouseLeave = () => {
        setHoveredRows(null);
    };

    useEffect(() => {
        const storedSOSource = JSON.parse(localStorage.getItem('soSource')) || [];
        console.log('Stored SOSource:', storedSOSource);
        setSoSource(storedSOSource);
    }, []);

    const handleAddSOSource = () => {
        if (!newSoSource.trim()) {
            // setIsErrorPopupOpen(true);
            return;
        }

        // setIsErrorPopupOpen(false);
        const updatedSOSource = [...soSource, {  id: uuidv4(), soSource: newSoSource.trim()}];
        console.log('Updated SOSource:', updatedSOSource);
        setSoSource(updatedSOSource);
        setNewSoSource('');
        localStorage.setItem('soSource', JSON.stringify(updatedSOSource));
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
        return soSource.slice().sort((a, b) => {
            const aValue = a.soSource;
            const bValue = b.soSource;
            return aValue.localeCompare(bValue);
        });
    }, [soSource]);

    const handleConfirmDelete = () => {
        if (!soSource) {
            console.error('SOSource array is undefined');
            return;
        }

        const soSourceToDelete = sortedData[deleteRowIndex];
        const updatedSOSource = soSource.filter(s => s.id !== soSourceToDelete.id);
        setSoSource(updatedSOSource);
        localStorage.setItem('soSource', JSON.stringify(updatedSOSource));
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
    const visibleProducts = soSource.slice(startIndex, endIndex);

    const [editedSOSource, setEditedSOSource] = useState('');

    const handleRowClick = (soSource) => {
        if (selectedSOSourceForEdit === soSource) {
            setSelectedSOSourceForEdit([]);
            setEditedSOSource('');
        } else {
            setSelectedSOSourceForEdit(soSource);
            setEditedSOSource(soSource.soSource);
        }
    };

    const handleUpdateSOSource = () => {
        const updatedSOSourceList = soSource.map((s) =>
            s.id === selectedSOSourceForEdit.id  ? { ...s, soSource: editedSOSource} : s
        );
        setSoSource(updatedSOSourceList);
        setSelectedSOSourceForEdit(null);
        localStorage.setItem('soSource', JSON.stringify(updatedSOSourceList));
        toast.success('Updated Successfully');

    };

    const handleCancelUpdate = () => {
        setSelectedSOSourceForEdit(null);
        setEditedSOSource('');
    };
    const [selectedSOSourceForEdit, setSelectedSOSourceForEdit] = useState();

    const columns = [
        { title: 'SOSource', key: 'soSource' }
    ];

    return (
        <div>
            <Headers />
            <div className={`p-2 bg-[#d9d9d9] custom-class font-roboto `}>
                <div className={`ml-52 bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl`}>
                    <div className="mb-4">
                        <div className='panel-heading row py-2 px-5 text-gray border-b border-b-[#0000001f] flex items-center justify-between'>
                            <h3 className='text-base font-medium uppercase'>SO Source</h3>
                        </div>
                        <div className='my-10 mx-10'>
                            {selectedSOSourceForEdit && (
                                <><div className='flex'>
                                    <label className='text-dark-gray text-ssm font-medium'>SO Source Name<span className="text-red-500">&nbsp;*</span></label>
                                </div><div className='flex items-center'>
                                        <input
                                            type="text"
                                            placeholder='SOSource'
                                            name='soSource'
                                            className='soSource border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                                            value={editedSOSource}
                                            onChange={(e) => setEditedSOSource(e.target.value)}
                                            />
                                        <button className='bg-yellow-500 text-white px-3 py-0.5 ml-2 flex items-center' onClick={handleUpdateSOSource}>
                                        <ion-icon name="cloud-done" /><span className='m-1'>Update</span>
                                        </button>
                                        <button className='bg-red-500 text-white px-3 py-1.5 ml-2' onClick={handleCancelUpdate}>
                                            Cancel
                                        </button>
                                    </div></>
                            )}
                            {!selectedSOSourceForEdit && (
                                <><div className='flex'>
                                    <label className='text-dark-gray text-ssm font-medium'>SO Source Name<span className="text-red-500">&nbsp;*</span></label>
                                </div><div className='flex items-center'>
                                        <input
                                            type="text"
                                            placeholder='SOSource'
                                            name='soSource'
                                            className='soSource border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                                            value={newSoSource}
                                            onChange={(e) => setNewSoSource(e.target.value)} />
                                        <button type='button' className='add-btn flex items-center bg-hover-red ml-6 px-4 py-1 text-white disabled:opacity-80' onClick={handleAddSOSource} disabled={!newSoSource.trim()}>
                                        <ion-icon name="cloud-done" /><span className='m-1'>Add</span> 
                                        </button>
                                    </div></>
                            )}
                        </div>
                       
                        <div className="relative overflow-x-auto shadow-md my-10 mx-10">

                            <SortingTable
                                data={soSource}
                                columns={columns}
                                onUpdateSOSource={handleUpdateSOSource}
                                actions={{
                                    delete: true,
                                    onDelete: handleTrashClick,
                                    edit: true,
                                    onEdit : (rowData) => handleRowClick(rowData)
                                }}

                            />

                            {soSource && deleteRowIndex !== null && (
                                <ConfirmModal
                                    isConfirmOpen={true}
                                    isConfirmClose={closeConfirmModal}
                                    soSource={soSource}
                                    rowIndex={deleteRowIndex}
                                    onConfirm={handleConfirmDelete}
                                />
                            )}

                            <TablePagination
                                totalItems={soSource.length}
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

export default SOSource;
