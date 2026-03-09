import { useState } from 'react';
import type { IJobApplication } from '../../types';
import ApplicationEdit from './ApplicationEdit';
import ApplicationView from './ApplicationView';

interface IApplicationDetailProps {
  application: IJobApplication;
  onUpdate: (
    id: string,
    updates: Partial<Omit<IJobApplication, 'id' | 'user_id' | 'created_at'>>,
  ) => Promise<{
    data: IJobApplication | null;
    error: { message: string } | null;
  }>;
  onDelete: (id: string) => Promise<{ error: { message: string } | null }>;
}

const ApplicationDetail = ({
  application,
  onUpdate,
  onDelete,
}: IApplicationDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ApplicationEdit
        application={application}
        onUpdate={onUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <ApplicationView
      application={application}
      onEdit={() => setIsEditing(true)}
      onDelete={onDelete}
    />
  );
};

export default ApplicationDetail;
