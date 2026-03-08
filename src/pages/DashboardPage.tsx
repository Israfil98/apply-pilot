import { Briefcase, CalendarCheck, Trophy, XCircle } from 'lucide-react';
import { RecentApplications, StatsCard } from '../components/Dashboard';
import useAuth from '../hooks/useAuth';

const MOCK_APPLICATIONS = [
  {
    id: '1',
    company: 'Google',
    position: 'Frontend Developer',
    status: 'Interview',
    appliedDate: 'Mar 1, 2026',
  },
  {
    id: '2',
    company: 'Meta',
    position: 'React Engineer',
    status: 'Applied',
    appliedDate: 'Feb 28, 2026',
  },
  {
    id: '3',
    company: 'Apple',
    position: 'UI Developer',
    status: 'Rejected',
    appliedDate: 'Feb 25, 2026',
  },
  {
    id: '4',
    company: 'Netflix',
    position: 'Senior Frontend Engineer',
    status: 'Offer',
    appliedDate: 'Feb 20, 2026',
  },
  {
    id: '5',
    company: 'Stripe',
    position: 'Full Stack Developer',
    status: 'Applied',
    appliedDate: 'Feb 18, 2026',
  },
];

const STATS = [
  {
    title: 'Total Applications',
    value: 24,
    icon: <Briefcase className="h-5 w-5" />,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    title: 'Interviews',
    value: 5,
    icon: <CalendarCheck className="h-5 w-5" />,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
  },
  {
    title: 'Offers',
    value: 2,
    icon: <Trophy className="h-5 w-5" />,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
  },
  {
    title: 'Rejections',
    value: 8,
    icon: <XCircle className="h-5 w-5" />,
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
  },
];

const DashboardPage = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Apply Pilot</h1>
            <p className="text-sm text-gray-500">
              Welcome back,{' '}
              {user?.user_metadata?.full_name ??
                user?.user_metadata?.name ??
                user?.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
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
          <RecentApplications applications={MOCK_APPLICATIONS} />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
