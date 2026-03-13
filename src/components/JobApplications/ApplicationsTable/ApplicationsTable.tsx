import { Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { formatDateShort } from '../../../lib/formatDate';
import type { IJobApplication } from '../../../types';
import { StatusBadge } from '../../common';

interface IApplicationsTableProps {
  applications: IJobApplication[];
  onDelete: (id: string) => void;
}

const ApplicationsTable = ({
  applications,
  onDelete,
}: IApplicationsTableProps) => {
  if (applications.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">
          No applications found. Try a different filter or add a new one!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {applications.map((app) => (
          <div key={app.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <Link
                to={`/applications/${app.id}`}
                className="text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                {app.company}
              </Link>
              <StatusBadge status={app.status} />
            </div>

            <p className="mt-1 text-sm text-gray-600">{app.position}</p>

            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-gray-500">
                  {app.location ?? 'No location'}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDateShort(app.applied_date)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(app.id)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm sm:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Applied</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/applications/${app.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600"
                    >
                      {app.company}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {app.position}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.location ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDateShort(app.applied_date)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => onDelete(app.id)}
                      className="text-gray-400 transition-colors hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApplicationsTable;
