// Photos from the Future Education team's university visits and partner meets.
// Used as the default full-screen home slider and in the public gallery when
// no admin-uploaded albums exist yet.

export interface VisitPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  album: "Campus visits" | "Partner meets";
}

export const visitPhotos: VisitPhoto[] = [
  { id: "andijan-gate", src: "/images/new/andijan-medical-gate.jpeg", alt: "Future Education counsellor at the gate of Andijan State Medical Institute, Uzbekistan", caption: "Andijan State Medical Institute, Uzbekistan", album: "Campus visits" },
  { id: "partner-meet-group", src: "/images/new/partner-meet-group.jpeg", alt: "Future Education team with international university representatives at a partner meet", caption: "Partner meet with international university delegates", album: "Partner meets" },
  { id: "ferghana", src: "/images/new/ferghana-medical.jpeg", alt: "Counsellor outside Ferghana Medical Institute of Public Health", caption: "Ferghana Medical Institute of Public Health, Uzbekistan", album: "Campus visits" },
  { id: "namangan-entrance", src: "/images/new/namangan-university-entrance.jpeg", alt: "Counsellor at the entrance steps of Namangan State University", caption: "Namangan State University, Uzbekistan", album: "Campus visits" },
  { id: "partner-meet-certificates", src: "/images/new/partner-meet-certificates.jpeg", alt: "Future Education receiving partnership certificates from university representatives", caption: "Receiving official partnership certificates", album: "Partner meets" },
  { id: "andijan-building", src: "/images/new/andijan-medical-building.jpeg", alt: "Counsellor in front of the Andijan State Medical Institute main building", caption: "Andijan State Medical Institute — main building", album: "Campus visits" },
  { id: "guliston", src: "/images/new/guliston-university.jpeg", alt: "Counsellor at the gate of Guliston State University", caption: "Guliston State University, Uzbekistan", album: "Campus visits" },
  { id: "partner-meet-handshake", src: "/images/new/partner-meet-handshake.jpeg", alt: "Handshake between Future Education and a university representative at a partner meet", caption: "Signing a new university partnership", album: "Partner meets" },
  { id: "sports-visit", src: "/images/new/campus-sports-visit.jpeg", alt: "Counsellor shaking hands with university staff at the campus sports ground", caption: "Meeting university staff at the campus sports complex", album: "Campus visits" },
  { id: "namangan-campus", src: "/images/new/namangan-university-campus.jpeg", alt: "Counsellor on the Namangan State University campus grounds", caption: "Namangan State University campus", album: "Campus visits" },
];
