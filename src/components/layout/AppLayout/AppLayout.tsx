import { LayoutDashboard, List } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { ToastContainer } from '../../common';

// NavLink gives us an `isActive` property, so we can highlight the current page
// This array keeps nav items as static data outside the component
const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/applications', label: 'Applications', icon: List },
];

const AppLayout = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Left side — brand + nav links */}
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="text-xl font-bold text-gray-900">
              Apply Pilot
            </Link>

            <nav className="flex items-center gap-1">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right side — user info + sign out */}
          <div className="flex items-center gap-4">
            <p className="hidden text-sm text-gray-500 sm:block">
              {user?.user_metadata?.full_name ??
                user?.user_metadata?.name ??
                user?.email}
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Page content — each protected page renders here */}
      <Outlet />

      {/* Toasts render above all page content */}
      <ToastContainer />
    </div>
  );
};

export default AppLayout;
