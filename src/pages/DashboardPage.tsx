import useAuth from '../hooks/useAuth';

const DashboardPage = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-blue-50 to-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">Welcome, {user?.email}</p>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-6 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Sign out
        </button>
      </div>
    </main>
  );
};

export default DashboardPage;
