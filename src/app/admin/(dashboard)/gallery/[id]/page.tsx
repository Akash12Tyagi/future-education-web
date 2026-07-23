import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { FormField, TextInput, SubmitButton, DeleteButton } from "@/components/admin/FormField";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { AlbumForm } from "../AlbumForm";
import { updateAlbum, addGalleryItem, deleteGalleryItem } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditAlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [album, mediaAssets] = await Promise.all([
    prisma.galleryAlbum.findUnique({ where: { id }, include: { items: { include: { media: true }, orderBy: { order: "asc" } } } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  if (!album) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit album</h1>
        <AdminCard>
          <AlbumForm
            action={updateAlbum.bind(null, album.id)}
            initial={{ title: album.title, slug: album.slug, category: album.category, active: album.active }}
          />
        </AdminCard>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-extrabold text-primary-900">Photos & videos</h2>
        <AdminCard className="mb-4">
          <DataTable
            rows={album.items}
            emptyMessage="No items in this album yet."
            columns={[
              {
                header: "Preview",
                render: (item) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.media.url} alt="" className="h-12 w-12 rounded-md object-cover" />
                ),
              },
              { header: "Caption", render: (item) => item.caption ?? "—" },
              {
                header: "Actions",
                render: (item) => (
                  <form action={deleteGalleryItem.bind(null, album.id, item.id)}>
                    <DeleteButton />
                  </form>
                ),
              },
            ]}
          />
        </AdminCard>

        <AdminCard>
          <form action={addGalleryItem.bind(null, album.id)} className="flex flex-col gap-4">
            <FormField label="Image or video" name="mediaId">
              <MediaPicker name="mediaId" assets={mediaAssets} folder="gallery" />
            </FormField>
            <FormField label="Caption" name="caption">
              <TextInput name="caption" />
            </FormField>
            <div>
              <SubmitButton>Add to album</SubmitButton>
            </div>
          </form>
        </AdminCard>
      </div>
    </div>
  );
}
