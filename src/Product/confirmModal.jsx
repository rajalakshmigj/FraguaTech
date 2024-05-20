import React, { useState } from 'react'
import './confirmModal.scss'

function ConfirmModal ({ isConfirmOpen, isConfirmClose, products, rowIndex, onConfirm }) {

    const [deleteRowIndex, setDeleteRowIndex] = useState(null);
    const [isExiting, setIsExiting] = useState(false);
    const handleConfirmDelete = () => {
        setIsExiting(true);
        setTimeout(() => {
            onConfirm();
            isConfirmClose();
        }, 300);
        
        if (!products) {
            console.error('Products array is undefined');
            return;
        }
        const updatedProducts = products.filter((_, i) => i !== deleteRowIndex);
        onConfirm(updatedProducts);    

        console.log('deleteRowIndex in modal', updatedProducts);
    };
    

    return (
        <>
          {isConfirmOpen &&  (

                <div className={` confirmation-modal ${isConfirmOpen ? 'open' : ''}  ${isExiting ? 'exit' : ''} fixed overflow-y-auto bg-[#00000080] overflow-x-hidden top-0 right-0 left-0 z-50 flex items-center justify-center w-full inset-0 h-[calc(100%-1rem)] max-h-full`} tabIndex="-1" aria-hidden="true">
                    <div className="relative pt-0 pb-4 top-[-230px] w-5/12">

                        <div className="relative  bg-white rounded-lg shadow modal-content">

                            <div className=" rounded-t ">
                                <h2 className='px-4 py-3 text-2xl font-medium text-dark-gray text-left border-b border-b-light-gray'>Confirm</h2>


                                <p className='border-b border-b-light-gray p-3.5'>Do you want to delete?</p>

                                <div className='flex items-center justify-end p-1' >
                                    <button onClick={handleConfirmDelete} className='text-white rounded px-3 py-1.5  bg-hover-red m-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-hover-red duration-75'>Confirm</button>
                                    <button onClick={isConfirmClose} className='border border-light-gray px-3 py-1.5 rounded m-2 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConfirmModal