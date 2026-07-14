import { Suspense } from "react";
import { CollegesDirectoryClient } from "@/components/colleges/CollegesDirectoryClient";

export default function CollegesPage() {
  return (
    <Suspense fallback={null}>
      <CollegesDirectoryClient />
    </Suspense>
  );
}
