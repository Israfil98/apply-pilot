import type { TApplicationStatus } from '../../../types';

const STATUSES: (TApplicationStatus | 'All')[] = [
  'All',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

interface IStatusFilterProps {
  activeStatus: TApplicationStatus | 'All';
  onStatusChange: (status: TApplicationStatus | 'All') => void;
}

const statusStyles: Record<string, string> = {
  All: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  Applied: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  Interview: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  Offer: 'bg-green-100 text-green-700 hover:bg-green-200',
  Rejected: 'bg-red-100 text-red-700 hover:bg-red-200',
};

const activeStyles: Record<string, string> = {
  All: 'bg-gray-700 text-white hover:bg-gray-800',
  Applied: 'bg-blue-600 text-white hover:bg-blue-700',
  Interview: 'bg-amber-600 text-white hover:bg-amber-700',
  Offer: 'bg-green-600 text-white hover:bg-green-700',
  Rejected: 'bg-red-600 text-white hover:bg-red-700',
};

const StatusFilter = ({ activeStatus, onStatusChange }: IStatusFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onStatusChange(status)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            activeStatus === status
              ? activeStyles[status]
              : statusStyles[status]
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
