import { db } from "@/app/lib/firebase/admin";
import { DocumentReference } from "firebase-admin/firestore";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const doc = await db.doc(`playlists/${params.id}`).get();

  console.log(params.id);

  if (!doc.exists) {
    return new Response(JSON.stringify({ message: "Playlist not found" }), {
      status: 404,
    });
  }

  console.log(doc.data());

  const data = {
    ...doc.data(),
    videos: await Promise.all(
      doc
        .data()!
        .videos.map(async (v: DocumentReference) => (await v.get()).data()),
    ),
  };

  return Response.json(data);
}
