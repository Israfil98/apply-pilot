import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import type { IJobApplication, TApplicationStatus } from '../../../types';

interface IRecentApplicationsProps {
  applications: IJobApplication[];
}

const statusStyles: Record<TApplicationStatus, string> = {
  Applied: 'bg-blue-100 text-blue-700',
  Interview: 'bg-amber-100 text-amber-700',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

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
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[app.status]}`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(app.applied_date + 'T00:00:00').toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    },
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentApplications;
