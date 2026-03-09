import { Briefcase, CalendarCheck, Trophy, XCircle } from 'lucide-react';
import { useMemo } from 'react';
import { RecentApplications, StatsCard } from '../components/Dashboard';
import useApplications from '../hooks/useApplications';

// Static config for stats cards — defined outside the component
// The `countStatus` field tells us which status to count, or null for total
const STATS_CONFIG = [
  {
    title: 'Total Applications',
    countStatus: null,
    icon: <Briefcase className="h-5 w-5" />,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    title: 'Interviews',
    countStatus: 'Interview',
    icon: <CalendarCheck className="h-5 w-5" />,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
  },
  {
    title: 'Offers',
    countStatus: 'Offer',
    icon: <Trophy className="h-5 w-5" />,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
  },
  {
    title: 'Rejections',
    countStatus: 'Rejected',
    icon: <XCircle className="h-5 w-5" />,
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
  },
];

const DashboardPage = () => {
  const { applications, loading, error } = useApplications();

  // Compute stats from real data — recalculates only when applications change
  const stats = useMemo(
    () =>
      STATS_CONFIG.map((config) => ({
        ...config,
        value:
          config.countStatus === null
            ? applications.length
            : applications.filter((app) => app.status === config.countStatus)
                .length,
      })),
    [applications],
  );

  // Show only the 5 most recent applications on the dashboard
  const recentApplications = useMemo(
    () => applications.slice(0, 5),
    [applications],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
          />
        ))}
      </div>

      {/* Recent Applications */}
      <div className="mt-8">
        <RecentApplications applications={recentApplications} />
      </div>
    </div>
  );
};

export default DashboardPage;
