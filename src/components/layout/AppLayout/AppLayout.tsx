import { LayoutDashboard, List, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { ToastContainer } from '../../common';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/applications', label: 'Applications', icon: List },
];

const AppLayout = () => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    setIsMobileMenuOpen(false);
    await signOut();
  };

  // Close menu when a nav link is clicked
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Left side — brand + desktop nav links */}
          <div className="flex items-center gap-8">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-xl font-bold text-gray-900"
            >
              <img
                src="/logo.svg"
                alt="Apply Pilot"
                className="h-8 w-8 rounded-lg"
              />
              Apply Pilot
            </Link>

            {/* Desktop nav — hidden on mobile */}
            <nav className="hidden items-center gap-1 sm:flex">
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

          {/* Right side — desktop: user info + sign out, mobile: hamburger */}
          <div className="flex items-center gap-4">
            {/* Desktop controls — hidden on mobile */}
            <p className="hidden text-sm text-gray-500 sm:block">
              {user?.user_metadata?.full_name ??
                user?.user_metadata?.name ??
                user?.email}
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="hidden rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:block"
            >
              Sign out
            </button>

            {/* Mobile hamburger button — hidden on desktop */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 sm:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu — slides down below the header */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-4 sm:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
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

            {/* User info + sign out */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="mb-3 px-3 text-sm text-gray-500">
                {user?.user_metadata?.full_name ??
                  user?.user_metadata?.name ??
                  user?.email}
              </p>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <Outlet />

      {/* Toasts */}
      <ToastContainer />
    </div>
  );
};

export default AppLayout;
