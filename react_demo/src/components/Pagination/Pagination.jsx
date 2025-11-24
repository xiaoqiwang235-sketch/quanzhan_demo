import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { generatePageNumbers } from '../../utils/helpers';

export const Pagination = ({
  currentPage,
  totalPages,
  total,
  handlePageChange,
  theme,
  c
}) => {
  const [jumpPage, setJumpPage] = useState('');

  const handleJump = () => {
    const page = parseInt(jumpPage);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setJumpPage('');
    }
  };

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <div className={`border-t-2 ${c.border} px-6 py-4 ${c.secondary}`}>
      <div className="flex items-center justify-between text-xs mb-4">
        <div className={`${c.textSecondary} font-mono`}>
          PAGE [{currentPage}/{totalPages}] | TOTAL: {total} RECORDS
        </div>

        <div className="flex items-center gap-2">
          <span className={`${c.textSecondary} font-mono`}>JUMP TO:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleJump();
              }
            }}
            placeholder="#"
            className={`w-16 px-2 py-1 ${c.inputBg} border-2 ${c.inputBorder} ${c.text} text-center focus:outline-none ${c.borderHover} font-mono`}
          />
          <button
            onClick={handleJump}
            className={`px-3 py-1 border-2 ${c.buttonBorder} ${c.primaryText} ${c.primaryHover} transition font-bold uppercase`}
          >
            GO
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`p-2 border-2 ${c.buttonBorder} ${c.primaryText} ${c.primaryHover} disabled:opacity-30 disabled:cursor-not-allowed transition font-bold`}
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`px-3 py-2 ${c.textSecondary} font-bold`}
              >
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 font-bold transition ${
                currentPage === page
                  ? `${c.primary} ${theme === 'light' ? 'text-white' : theme === 'hacker' ? 'text-black' : 'text-white'} border-2 ${c.buttonBorder} shadow-lg`
                  : `border-2 ${c.buttonBorder} ${c.primaryText} ${c.primaryHover}`
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`p-2 border-2 ${c.buttonBorder} ${c.primaryText} ${c.primaryHover} disabled:opacity-30 disabled:cursor-not-allowed transition font-bold`}
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
