import { AdminCard } from "@/components/admin/AdminCard";
import { AlbumForm } from "../AlbumForm";
import { createAlbum } from "../actions";

export default function NewAlbumPage() {
  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add album</h1>
      <AdminCard>
        <AlbumForm action={createAlbum} />
      </AdminCard>
    </div>
  );
}
