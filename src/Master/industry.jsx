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

const Industry = () => {
  const [hoveredRows, setHoveredRows] = useState(null);
  
  const [industryName, setIndustryName] = useState([]);
  const [newIndustry, setNewIndustry] = useState('');

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
    const storedExpense = JSON.parse(localStorage.getItem('industryName')) || [];
    console.log('Stored Industry:', storedExpense);
    setIndustryName(storedExpense);
  }, []);

  const handleAddExpense = () => {
    if (!newIndustry.trim()) {
      // setIsErrorPopupOpen(true);
      return;
    }

    // setIsErrorPopupOpen(false);
    const updatedExpense = [...industryName, { id: uuidv4(), industryName: newIndustry.trim(), modified_by: defaultModifiedBy }];
    console.log('Updated Industry:', updatedExpense);
    setIndustryName(updatedExpense);
    setNewIndustry('');
    localStorage.setItem('industryName', JSON.stringify(updatedExpense));
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
    return industryName.slice().sort((a, b) => {
      const aValue = a.industryName;
      const bValue = b.industryName;
      return aValue.localeCompare(bValue);
    });
  }, [industryName]);

  const handleConfirmDelete = () => {
    if (!industryName) {
      console.error('Industry array is undefined');
      return;
    }

    const industryNameToDelete = sortedData[deleteRowIndex];
    const updatedExpense = industryName.filter(i => i.id !== industryNameToDelete.id);
    setIndustryName(updatedExpense);
    localStorage.setItem('industryName', JSON.stringify(updatedExpense));
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

  const visibleProducts = industryName.slice(startIndex, endIndex);

  const [editedExpense, setEditedExpense] = useState('');

  const handleRowClick = (industryName) => {
    if (selectedExpenseForEdit === industryName) {
      setSelectedExpenseForEdit([]);
      setEditedExpense('');
      console.log('Row clicked if: ', editedExpense);
    } else {
      setSelectedExpenseForEdit(industryName);
      setEditedExpense(industryName.industryName);
      console.log('Row clicked else: ', editedExpense);
    }
  };

  const handleUpdateExpense = () => {
    const updatedExpenseList = industryName.map((i) =>
      i.id === selectedExpenseForEdit.id ? { ...i, industryName: editedExpense } : i
  );

    const updatedExpenseListWithDefault = updatedExpenseList.map(i => ({
      ...i,
      modified_by: i.modified_by || defaultModifiedBy
    }));

    setIndustryName(updatedExpenseListWithDefault);
    setSelectedExpenseForEdit(null);
    localStorage.setItem('industryName', JSON.stringify(updatedExpenseListWithDefault));
    toast.success('Industry Updated Successfully');
  };

  const handleCancelUpdate = () => {
    setSelectedExpenseForEdit(null);
    setEditedExpense('');
  };
  const [selectedExpenseForEdit, setSelectedExpenseForEdit] = useState();

  const columns = [
    { title: 'Industry', key: 'industryName' },
    { title: 'Modified By', key: 'modified_by' }
  ];

  return (
    <div>
      <Headers />
      <div className={`p-2 bg-[#d9d9d9] custom-class font-roboto `}>
        <div className={`ml-52 bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl`}>
          <div className="mb-4">
            <div className='panel-heading row py-2 px-5 text-gray border-b border-b-[#0000001f] flex items-center justify-between'>
              <h3 className='text-base font-medium uppercase'>Industry Settings</h3>
            </div>
            <div className='my-10 mx-10'>
              {selectedExpenseForEdit && (
                <><div className='flex'>
                  <label className='text-dark-gray text-ssm font-medium'>Industry<span className="text-red-500">&nbsp;*</span></label>
                </div><div className='flex items-center'>
                    <input
                      type="text"
                      placeholder='Industry'
                      name='industryName'
                      className='industryName border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                      value={editedExpense}
                      onChange={(e) => setEditedExpense(e.target.value)}
                    />
                    <button className='bg-yellow-500 text-white px-3 py-1 ml-2' onClick={handleUpdateExpense}>
                      Update
                    </button>
                    <button className='bg-red-500 text-white px-3 py-1 ml-2' onClick={handleCancelUpdate}>
                      Cancel
                    </button>
                  </div></>
              )}
              {!selectedExpenseForEdit && (
                <><div className='flex'>
                  <label className='text-dark-gray text-ssm font-medium'>Industry<span className="text-red-500">&nbsp;*</span></label>
                </div><div className='flex items-center'>
                    <input
                      type="text"
                      placeholder='Industry'
                      name='industryName'
                      className='industryName border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                      value={newIndustry}
                      onChange={(e) => setNewIndustry(e.target.value)} />
                    <button type='button' className='add-btn bg-hover-red ml-6 px-6 py-1.5 text-white disabled:opacity-80' onClick={handleAddExpense} disabled={!newIndustry.trim()}>
                      Add
                    </button>
                  </div></>
              )}
            </div>

            <div className="relative overflow-x-auto shadow-md my-10 mx-10">

              <SortingTable
                data={industryName}
                columns={columns}
                onUpdateExpense={handleUpdateExpense}
                actions={{
                  delete: true,
                  onDelete: handleTrashClick,
                  edit: true,
                  onEdit: (rowData) => handleRowClick(rowData)
                }}

              />

              {industryName && deleteRowIndex !== null && (
                <ConfirmModal
                  isConfirmOpen={true}
                  isConfirmClose={closeConfirmModal}
                  industryName={industryName}
                  rowIndex={deleteRowIndex}
                  onConfirm={handleConfirmDelete}
                />
              )}

              <TablePagination
                totalItems={industryName.length}
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

export default Industry;
