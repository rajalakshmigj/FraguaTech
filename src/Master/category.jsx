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

const Category = () => {
  const [hoveredRows, setHoveredRows] = useState(null);
  const [category, setCategory] = useState([]);
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
    const storedCategory = JSON.parse(localStorage.getItem('category')) || [];
    console.log('Stored Category:', storedCategory);
    setCategory(storedCategory);
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      // setIsErrorPopupOpen(true);
      return;
    }

    // setIsErrorPopupOpen(false);
    const updatedCategory = [...category, { id: uuidv4(), category: newCategory.trim()}];
    console.log('Updated Category:', updatedCategory);
    setCategory(updatedCategory);
    setNewCategory('');
    localStorage.setItem('category', JSON.stringify(updatedCategory));
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
    return category.slice().sort((a, b) => {
      const aValue = a.category;
      const bValue = b.category;
      return aValue.localeCompare(bValue);
    });
  }, [category]);

  const handleConfirmDelete = () => {
    if (!category) {
      console.error('Category array is undefined');
      return;
    }

    const categoryToDelete = sortedData[deleteRowIndex];
    const updatedCategory = category.filter(c => c.id !== categoryToDelete.id);
    setCategory(updatedCategory);
    localStorage.setItem('category', JSON.stringify(updatedCategory));
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

  const visibleProducts = category.slice(startIndex, endIndex);

  const [editedCategory, setEditedCategory] = useState('');

  const handleRowClick = (category) => {
    if (selectedCategoryForEdit === category) {
      setSelectedCategoryForEdit([]);
      setEditedCategory('');
    } else {
      setSelectedCategoryForEdit(category);
      setEditedCategory(category.category);
    }
  };

  const handleUpdateCategory = () => {
    const updatedCategoryList = category.map((c) =>
      c.id === selectedCategoryForEdit.id ? { ...c, category: editedCategory} : c
    );
    setCategory(updatedCategoryList);
    setSelectedCategoryForEdit(null);
    localStorage.setItem('category', JSON.stringify(updatedCategoryList));
    toast.success('Category Updated Successfully');

  };

  const handleCancelUpdate = () => {
    setSelectedCategoryForEdit(null);
    setEditedCategory('');
  };
  const [selectedCategoryForEdit, setSelectedCategoryForEdit] = useState();

  const columns = [
    { title: 'Category', key: 'category' }
  ];

  return (
    <div>
      <Headers />
      <div className={`p-2 bg-[#d9d9d9] custom-class font-roboto `}>
        <div className={`ml-52 bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl`}>
          <div className="mb-4">
            <div className='panel-heading row py-2 px-5 text-gray border-b border-b-[#0000001f] flex items-center justify-between'>
              <h3 className='text-base font-medium uppercase'>Category</h3>
            </div>
            <div className='my-10 mx-10'>
              {selectedCategoryForEdit && (
                <><div className='flex'>
                  <label className='text-dark-gray text-ssm font-medium'>Category<span className="text-red-500">&nbsp;*</span></label>
                </div><div className='flex items-center'>
                    <input
                      type="text"
                      placeholder='Category'
                      name='category'
                      className='category border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                    />
                    <button className='bg-yellow-500 text-white px-3 py-1 ml-2' onClick={handleUpdateCategory}>
                      Update
                    </button>
                    <button className='bg-red-500 text-white px-3 py-1 ml-2' onClick={handleCancelUpdate}>
                      Cancel
                    </button>
                  </div></>
              )}
              {!selectedCategoryForEdit && (
                <><div className='flex'>
                  <label className='text-dark-gray text-ssm font-medium'>Category<span className="text-red-500">&nbsp;*</span></label>
                </div><div className='flex items-center'>
                    <input
                      type="text"
                      placeholder='Category'
                      name='category'
                      className='category border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)} />
                    <button type='button' className='add-btn bg-hover-red ml-6 px-6 py-1.5 text-white disabled:opacity-80' onClick={handleAddCategory} disabled={!newCategory.trim()}>
                      Add
                    </button>
                  </div></>
              )}
            </div>

            <div className="relative overflow-x-auto shadow-md my-10 mx-10">

              <SortingTable
                data={category}
                columns={columns}
                onUpdateCategory={handleUpdateCategory}
                actions={{
                  delete: true,
                  onDelete: handleTrashClick,
                  edit: true,
                  onEdit: (rowData) => handleRowClick(rowData)
                }}

              />

              {category && deleteRowIndex !== null && (
                <ConfirmModal
                  isConfirmOpen={true}
                  isConfirmClose={closeConfirmModal}
                  category={category}
                  rowIndex={deleteRowIndex}
                  onConfirm={handleConfirmDelete}
                />
              )}

              <TablePagination
                totalItems={category.length}
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

export default Category;
