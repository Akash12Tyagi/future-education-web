export interface TrackerStage {
  key: string;
  label: string;
  ts: string;
}

export const trackerStages: TrackerStage[] = [
  { key: "enquiry_received", label: "Enquiry Received", ts: "01 May 2026" },
  { key: "shortlist_sent", label: "Shortlist Sent", ts: "03 May 2026" },
  { key: "documents_submitted", label: "Documents Submitted", ts: "10 May 2026" },
  { key: "application_filed", label: "Application Filed", ts: "—" },
  { key: "result", label: "Result", ts: "—" },
];
