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

// Form data shape — matches the fields the user fills in
// This is NOT the same as IJobApplication (which includes id, user_id, created_at from the DB)
export interface IApplicationFormData {
  company: string;
  position: string;
  status: TApplicationStatus;
  applied_date: string;
  url: string;
  notes: string;
  salary: string;
  location: string;
}
