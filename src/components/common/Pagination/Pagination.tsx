import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: IPaginationProps) => {
  // Don't render pagination if everything fits on one page
  if (totalPages <= 1) return null;

  // Calculate the range of items being displayed
  // e.g., "Showing 1-10 of 24 applications"
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate an array of page numbers to display
  // For small page counts (≤ 7), show all pages
  // For larger counts, show first, last, current ± 1, with ellipsis gaps
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) {
      // Small enough to show every page: [1, 2, 3, 4, 5, 6, 7]
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      // Gap between first page and current range
      pages.push('...');
    }

    // Pages around the current page
    // Math.max/min ensures we don't go below 2 or above totalPages - 1
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      // Gap between current range and last page
      pages.push('...');
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Item count */}
      <p className="text-sm text-gray-500">
        Showing {startItem}–{endItem} of {totalItems} applications
      </p>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-sm text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`min-w-[36px] rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {page}
            </button>
          ),
        )}

        {/* Next button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
