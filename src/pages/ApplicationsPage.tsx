import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ApplicationsTable, StatusFilter } from '../components/JobApplications';
import useApplications from '../hooks/useApplications';
import type { TApplicationStatus } from '../types';

const ApplicationsPage = () => {
  const { applications, loading, error, deleteApplication } = useApplications();
  const [activeStatus, setActiveStatus] = useState<TApplicationStatus | 'All'>(
    'All',
  );

  const filteredApplications = useMemo(() => {
    if (activeStatus === 'All') return applications;
    return applications.filter((app) => app.status === activeStatus);
  }, [applications, activeStatus]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?',
    );
    if (!confirmed) return;

    await deleteApplication(id);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Applications</h1>
          <Link
            to="/applications/new"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Application
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Filters */}
        <div className="mb-6">
          <StatusFilter
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
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
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : (
          <ApplicationsTable
            applications={filteredApplications}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
};

export default ApplicationsPage;
