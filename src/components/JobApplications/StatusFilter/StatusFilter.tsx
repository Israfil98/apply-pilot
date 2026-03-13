import {
  ACTIVE_STATUS_STYLES,
  INACTIVE_STATUS_STYLES,
  STATUS_FILTER_OPTIONS,
} from '../../../lib/constants';
import type { TApplicationStatus } from '../../../types';

interface IStatusFilterProps {
  activeStatus: TApplicationStatus | 'All';
  onStatusChange: (status: TApplicationStatus | 'All') => void;
}

const StatusFilter = ({ activeStatus, onStatusChange }: IStatusFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_FILTER_OPTIONS.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onStatusChange(status)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            activeStatus === status
              ? ACTIVE_STATUS_STYLES[status]
              : INACTIVE_STATUS_STYLES[status]
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
