import React from 'react';

const TablePagination = ({ totalItems, currentPage, itemsPerPage, onPageChange, onRowsPerPageChange }) => {
    // Calculate total pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Handle click event for previous page button
    const handlePreviousPage = () => {
        const newPage = currentPage - 1;
        if (newPage >= 1) {
            onPageChange(newPage);
        }
    };

    // Handle click event for next page button
    const handleNextPage = () => {
        const newPage = currentPage + 1;
        if (newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className='mt-3 mb-10'>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <div>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li key="play-skip-back" className="page-item">
                            <button className="page-link  m-2  border border-[#ccc] rounded text-[#333] text-ssm px-2 py-0.5 bg-[#f3f3f3] hover:bg-[dadada] hover:border-[adadad] focus:outline-none focus:border-sky-blue focus:shadow-2xl focus:shadow-sky-blue" onClick={() => onPageChange(1)}>
                                <ion-icon name="play-skip-back-sharp"></ion-icon>
                            </button>
                        </li>
                        <li key="caret-back" className="page-item">
                            <button className="page-link  m-2  border border-[#ccc] rounded text-[#333] text-ssm px-2 py-0.5 bg-[#f3f3f3] hover:bg-[dadada] hover:border-[adadad] focus:outline-none focus:border-sky-blue focus:shadow-2xl focus:shadow-sky-blue" onClick={handlePreviousPage}>
                                <ion-icon name="caret-back-sharp"></ion-icon>
                            </button>
                        </li>
                        <li key="input-page" className="page-item ">
                            <input
                                type="number"
                                value={currentPage}
                                onChange={(e) => onPageChange(parseInt(e.target.value))}
                                className=' w-12  m-2  border border-[#ccc] text-[#555] rounded text-ssm text-center px-2 py-0.5 bg-[#f3f3f3] focus:outline-none focus:border-sky-blue focus:shadow-2xl focus:shadow-sky-blue'
                            />
                        </li>
                        <li key="caret-forward" className="page-item ">
                            <button className="page-link  m-2  border border-[#ccc] rounded text-[#333] text-ssm px-2 py-0.5 bg-[#f3f3f3] hover:bg-[dadada] hover:border-[adadad] focus:outline-none focus:border-sky-blue focus:shadow-2xl focus:shadow-sky-blue" onClick={handleNextPage}>
                                <ion-icon name="caret-forward-sharp"></ion-icon>
                            </button>
                        </li>
                        <li key="play-skip-forward" className="page-item ">
                            <button className="page-link m-2 border border-[#ccc] rounded text-[#333] text-ssm px-2 py-0.5 bg-[#f3f3f3] hover:bg-[dadada] hover:border-[adadad] focus:outline-none focus:border-sky-blue focus:shadow-2xl focus:shadow-sky-blue" onClick={() => onPageChange(totalPages)}>
                                <ion-icon name="play-skip-forward-sharp"></ion-icon>
                            </button>
                        </li>
                    </ul>

                    <select
                        className='m-2 border border-[#ccc] rounded text-[#555] text-ssm p-0.5 focus:outline-none focus:border-sky-blue focus:shadow-2xl focus:shadow-sky-blue'
                        value={itemsPerPage}
                        onChange={(e) => onRowsPerPageChange(e)}
                    >
                        <option value={15}>15</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <label className="ml-0.5 text-dark-gray" htmlFor="rows-per-page-select">Items per page</label>

                </div>

                <div>
                    <span className="text-sm font-normal text-dark-gray dark:text-dark-gray mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    <span className="f dark:text-dark-gray">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="f dark:text-dark-gray">{totalItems}</span>    items 
                    </span>
                </div>
            </nav>
        </div>
    );
};

export default TablePagination;
