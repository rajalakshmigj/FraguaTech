import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const SortingTable = ({ data, columns, actions }) => {
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (column) => {
        if (column === sortedColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedData = useMemo(() => {
        if (!sortedColumn) return data;

        return data.slice().sort((a, b) => {
            const aValue = a[sortedColumn];
            const bValue = b[sortedColumn];

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortedColumn, sortOrder]);

    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredRowIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredRowIndex(null);
    };

    const handleAction = (action, rowIndex) => {
        if (action === 'delete') {
            actions.onDelete(rowIndex);
        } else if (action === 'edit') {
            actions.onEdit(sortedData[rowIndex]);
        } else if (action === 'custom') {
            actions.customAction(rowIndex);
        }
    };    

    return (
        <table className="variant-table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className='variant-table-header text-xs text-white uppercase bg-hover-red dark:bg-gray-700 dark:text-white text-left cursor-pointer'>
                <tr className='flex items-center p-1'>
                    {columns.map((column, index) => (
                        <th key={index} onClick={() => handleSort(column.key)} className="pl-8 py-1 w-52">
                            {column.title}
                            {sortedColumn === column.key && (
                                <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className='text-left'>
                {sortedData.map((item, rowIndex) => (
                    <tr key={item.id} className={`${rowIndex % 2 === 0 ? 'bg-[#e6e6e6]' : 'bg-[#f2f2f2]'} flex items-center p-0.5 my-2 cursor-pointer `}  onMouseEnter={() => handleMouseEnter(rowIndex)}
                        onMouseLeave={handleMouseLeave}>
                        {/* <td className="w-3 py-2 pl-3">
                        {actions && actions.customActions && actions.customActions.map((action, actionIndex) => (
                            <FontAwesomeIcon
                                key={actionIndex}
                                icon={action.icon}
                                className={`hover:text-${action.color} cursor-pointer mr-2`}
                                onClick={() => handleAction(action.type, rowIndex)}
                            />
                        ))}
                        </td> */}
                        <td className="w-3 py-2 px-2">
                            {actions && actions.delete && (
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className={`hover:text-red-500 cursor-pointer ${hoveredRowIndex === rowIndex ? '' : 'invisible'}`}
                                    onClick={() => handleAction('delete', rowIndex)}
                                />
                            )}
                        </td>

                        {columns.map((column, colIndex) => ( 
                            <td key={colIndex} className={`px-6 py-1 w-52 dark:text-[#337ab7] hover:text-[#23527c] hover:w-52`} onClick={() => handleAction('edit', rowIndex)} >{item[column.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SortingTable;
