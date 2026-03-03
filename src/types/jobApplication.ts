export type TStatus = "application" | "interview" | "offer" | "rejected";

export type TJobSource =
  | "linkedin"
  | "indeed"
  | "glassdoor"
  | "company_website"
  | "referral"
  | "other";

export type TOutcome =
  | "pending"
  | "in_progress"
  | "successful"
  | "unsuccessful";

export interface IJobApplication {
  id: string;
  companyName: string;
  country: string;
  city: string;
  position: string;
  dateApplied: string;
  status: TStatus;
  contactPerson: string;
  jobSource: TJobSource;
  outcome: TOutcome;
  notes: string;
  jobUrl: string;
  userId: string;
  createdAt: string;
}
