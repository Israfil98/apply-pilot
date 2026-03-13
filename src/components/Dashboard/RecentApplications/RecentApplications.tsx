import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import { formatDateShort } from '../../../lib/formatDate';
import type { IJobApplication } from '../../../types';
import { StatusBadge } from '../../common';

interface IRecentApplicationsProps {
  applications: IJobApplication[];
}

const RecentApplications = ({ applications }: IRecentApplicationsProps) => {
  if (applications.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">
          No applications yet. Start tracking your job search!
        </p>
        <Link
          to="/applications/new"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Add your first application
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Applications
        </h2>
        <Link
          to="/applications"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 p-4 sm:hidden">
        {applications.map((app) => (
          <div key={app.id} className="rounded-lg border border-gray-100 p-4">
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
            <p className="mt-2 text-xs text-gray-400">
              {formatDateShort(app.applied_date)}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Applied</th>
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
                    {formatDateShort(app.applied_date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentApplications;
