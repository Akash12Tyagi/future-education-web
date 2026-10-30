export interface TrackerStage {
  key: string;
  label: string;
  ts: string;
}

// Demo stages — still used by the internal counsellor console.
export const trackerStages: TrackerStage[] = [
  { key: "enquiry_received", label: "Enquiry Received", ts: "01 May 2026" },
  { key: "shortlist_sent", label: "Shortlist Sent", ts: "03 May 2026" },
  { key: "documents_submitted", label: "Documents Submitted", ts: "10 May 2026" },
  { key: "application_filed", label: "Application Filed", ts: "—" },
  { key: "result", label: "Result", ts: "—" },
];

export interface ApplicationStage {
  /** Lead status in the admin panel that marks this stage as reached. */
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED";
  label: string;
  help: string;
}

// Public Application Tracker — each stage maps to the status a counsellor sets
// for the enquiry in Admin → Leads & Enquiries.
export const applicationStages: ApplicationStage[] = [
  { status: "NEW", label: "Enquiry received", help: "We have your details. A counsellor will call you within 24 hours." },
  { status: "CONTACTED", label: "Counselling done", help: "Your counsellor has spoken with you and is preparing a college shortlist." },
  { status: "QUALIFIED", label: "Shortlist & documents", help: "Shortlist shared. Submit your marksheets and documents so we can file your applications." },
  { status: "CONVERTED", label: "Admission confirmed", help: "Congratulations — your admission is confirmed. We'll guide you through joining." },
];
