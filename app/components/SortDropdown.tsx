import React from 'react';

type SortOption = 'high-low' | 'low-high';

type SortDropdownProps = {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ currentSort, onSortChange }) => {
    return (
        <div className="flex items-center">
            <span className="text-sm font-bold mr-2">Sort by</span>
            <div className="relative">
                <select
                    value={currentSort}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                >
                    <option value="high-low">Price high-low</option>
                    <option value="low-high">Price low-high</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SortDropdown; 