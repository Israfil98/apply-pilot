export type TApplicationStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface IJobApplication {
  id: string;
  user_id: string;
  company: string;
  position: string;
  status: TApplicationStatus;
  applied_date: string;
  url: string | null;
  notes: string | null;
  salary: string | null;
  location: string | null;
  created_at: string;
}
