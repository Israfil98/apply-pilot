import { useParams } from 'react-router';
import { ApplicationDetail } from '../components/ApplicationDetail';
import { LoadingSpinner } from '../components/common';
import useApplications from '../hooks/useApplications';

const ApplicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { applications, loading, error, updateApplication, deleteApplication } =
    useApplications();

  // Find the single application from the fetched list
  const application = applications.find((app) => app.id === id);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  if (!application) {
    return (
      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900">Not Found</h1>
          <p className="mt-2 text-gray-500">
            This application doesn't exist or was deleted.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-12">
      <ApplicationDetail
        application={application}
        onUpdate={updateApplication}
        onDelete={deleteApplication}
      />
    </main>
  );
};

export default ApplicationDetailPage;
