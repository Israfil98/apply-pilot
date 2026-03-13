import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ConfirmModal, LoadingSpinner, Pagination } from '../components/common';
import { ApplicationsTable, StatusFilter } from '../components/JobApplications';
import useApplications from '../hooks/useApplications';
import useToastStore from '../stores/toastStore';
import type { TApplicationStatus } from '../types';

const ITEMS_PER_PAGE = 10;

const ApplicationsPage = () => {
  const { applications, loading, error, deleteApplication } = useApplications();
  const { addToast } = useToastStore();
  const [activeStatus, setActiveStatus] = useState<TApplicationStatus | 'All'>(
    'All',
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Step 1: Filter by status
  const filteredApplications = useMemo(() => {
    if (activeStatus === 'All') return applications;
    return applications.filter((app) => app.status === activeStatus);
  }, [applications, activeStatus]);

  // Step 2: Calculate total pages from filtered results
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);

  // Step 3: Slice the filtered array to get only the current page's items
  // This is the final data that gets passed to the table
  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredApplications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredApplications, currentPage]);

  // Reset to page 1 when filter changes — otherwise the user might be
  // on page 3 of "All" and switch to "Offer" which only has 1 page
  const handleStatusChange = (status: TApplicationStatus | 'All') => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    const { error: deleteError } = await deleteApplication(deleteId);
    setIsDeleting(false);
    setDeleteId(null);

    if (deleteError) {
      addToast(deleteError.message, 'error');
      return;
    }

    addToast('Application deleted successfully', 'success');
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Page header with add button */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">My Applications</h1>
        <Link
          to="/applications/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Application
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <StatusFilter
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ApplicationsTable
            applications={paginatedApplications}
            onDelete={(id) => setDeleteId(id)}
          />

          {/* Pagination — sits below the table */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredApplications.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        </>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <ConfirmModal
          title="Delete Application"
          message="Are you sure you want to delete this application? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          variant="danger"
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;
