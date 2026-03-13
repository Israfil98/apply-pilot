import { STATUS_STYLES } from '../../../lib/constants';
import type { TApplicationStatus } from '../../../types';

interface IStatusBadgeProps {
  status: TApplicationStatus;
}

const StatusBadge = ({ status }: IStatusBadgeProps) => {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
