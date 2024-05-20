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

const Expense = () => {
  const [hoveredRows, setHoveredRows] = useState(null);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [newCategory, setNewCategory] = useState('');
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
    const storedExpense = JSON.parse(localStorage.getItem('expenseCategory')) || [];
    console.log('Stored Expense:', storedExpense);
    setExpenseCategory(storedExpense);
  }, []);

  const handleAddExpense = () => {
    if (!newCategory.trim()) {
      // setIsErrorPopupOpen(true);
      return;
    }

    // setIsErrorPopupOpen(false);
    const updatedExpense = [...expenseCategory, { id: uuidv4(), expenseCategory: newCategory.trim(), modified_by: defaultModifiedBy }];
    console.log('Updated Expense:', updatedExpense);
    setExpenseCategory(updatedExpense);
    setNewCategory('');
    localStorage.setItem('expenseCategory', JSON.stringify(updatedExpense));
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
    return expenseCategory.slice().sort((a, b) => {
      const aValue = a.expenseCategory;
      const bValue = b.expenseCategory;
      return aValue.localeCompare(bValue);
    });
  }, [expenseCategory]);

  const handleConfirmDelete = () => {
    if (!expenseCategory) {
      console.error('Expense array is undefined');
      return;
    }

    const expenseCategoryToDelete = sortedData[deleteRowIndex];
    const updatedExpense = expenseCategory.filter(e => e.id !== expenseCategoryToDelete.id);
    setExpenseCategory(updatedExpense);
    localStorage.setItem('expenseCategory', JSON.stringify(updatedExpense));
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

  const visibleProducts = expenseCategory.slice(startIndex, endIndex);

  const [editedExpense, setEditedExpense] = useState('');

  const handleRowClick = (expenseCategory) => {
    if (selectedExpenseForEdit === expenseCategory) {
      setSelectedExpenseForEdit([]);
      setEditedExpense('');
      console.log('Row clicked if: ', editedExpense);
    } else {
      setSelectedExpenseForEdit(expenseCategory);
      setEditedExpense(expenseCategory.expenseCategory);
      console.log('Row clicked else: ', editedExpense);
    }
  };

  const handleUpdateExpense = () => {
    const updatedExpenseList = expenseCategory.map((e) =>
      e.id === selectedExpenseForEdit.id ? { ...e, expenseCategory: editedExpense } : e
    );

    const updatedExpenseListWithDefault = updatedExpenseList.map(e => ({
      ...e,
      modified_by: e.modified_by || defaultModifiedBy
    }));

    setExpenseCategory(updatedExpenseListWithDefault);
    setSelectedExpenseForEdit(null);
    localStorage.setItem('expenseCategory', JSON.stringify(updatedExpenseListWithDefault));
    toast.success('Expense Updated Successfully');
  };

  const handleCancelUpdate = () => {
    setSelectedExpenseForEdit(null);
    setEditedExpense('');
  };
  const [selectedExpenseForEdit, setSelectedExpenseForEdit] = useState();

  const columns = [
    { title: 'Expense Category', key: 'expenseCategory' },
    { title: 'Modified By', key: 'modified_by' }
  ];

  return (
    <div>
      <Headers />
      <div className={`p-2 bg-[#d9d9d9] custom-class font-roboto `}>
        <div className={`ml-52 bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl`}>
          <div className="mb-4">
            <div className='panel-heading row py-2 px-5 text-gray border-b border-b-[#0000001f] flex items-center justify-between'>
              <h3 className='text-base font-medium uppercase'>Expense Category Settings</h3>
            </div>
            <div className='my-10 mx-10'>
              {selectedExpenseForEdit && (
                <><div className='flex'>
                  <label className='text-dark-gray text-ssm font-medium'>Expense Category<span className="text-red-500">&nbsp;*</span></label>
                </div><div className='flex items-center'>
                    <input
                      type="text"
                      placeholder='Expense Category'
                      name='expenseCategory'
                      className='expenseCategory border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
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
                  <label className='text-dark-gray text-ssm font-medium'>Expense Category<span className="text-red-500">&nbsp;*</span></label>
                </div><div className='flex items-center'>
                    <input
                      type="text"
                      placeholder='Expense Category'
                      name='expenseCategory'
                      className='expenseCategory border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)} />
                    <button type='button' className='add-btn bg-hover-red ml-6 px-6 py-1.5 text-white disabled:opacity-80' onClick={handleAddExpense} disabled={!newCategory.trim()}>
                      Add
                    </button>
                  </div></>
              )}
            </div>

            <div className="relative overflow-x-auto shadow-md my-10 mx-10">

              <SortingTable
                data={expenseCategory}
                columns={columns}
                onUpdateExpense={handleUpdateExpense}
                actions={{
                  delete: true,
                  onDelete: handleTrashClick,
                  edit: true,
                  onEdit: (rowData) => handleRowClick(rowData)
                }}

              />

              {expenseCategory && deleteRowIndex !== null && (
                <ConfirmModal
                  isConfirmOpen={true}
                  isConfirmClose={closeConfirmModal}
                  expenseCategory={expenseCategory}
                  rowIndex={deleteRowIndex}
                  onConfirm={handleConfirmDelete}
                />
              )}

              <TablePagination
                totalItems={expenseCategory.length}
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

export default Expense;
