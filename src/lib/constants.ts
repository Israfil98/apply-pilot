import type { TApplicationStatus } from '../types';

// Badge styles — used in ApplicationsTable, RecentApplications, ApplicationView
export const STATUS_STYLES: Record<TApplicationStatus, string> = {
  Applied: 'bg-blue-100 text-blue-700',
  Interview: 'bg-amber-100 text-amber-700',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

// StatusFilter — inactive state
export const INACTIVE_STATUS_STYLES: Record<
  TApplicationStatus | 'All',
  string
> = {
  All: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  Applied: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  Interview: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  Offer: 'bg-green-100 text-green-700 hover:bg-green-200',
  Rejected: 'bg-red-100 text-red-700 hover:bg-red-200',
};

// StatusFilter — active state
export const ACTIVE_STATUS_STYLES: Record<TApplicationStatus | 'All', string> =
  {
    All: 'bg-gray-700 text-white hover:bg-gray-800',
    Applied: 'bg-blue-600 text-white hover:bg-blue-700',
    Interview: 'bg-amber-600 text-white hover:bg-amber-700',
    Offer: 'bg-green-600 text-white hover:bg-green-700',
    Rejected: 'bg-red-600 text-white hover:bg-red-700',
  };

// Status options for forms and filters
export const STATUS_OPTIONS: TApplicationStatus[] = [
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

export const STATUS_FILTER_OPTIONS: (TApplicationStatus | 'All')[] = [
  'All',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];
