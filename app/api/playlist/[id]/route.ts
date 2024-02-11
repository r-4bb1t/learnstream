import { db } from "@/app/lib/firebase/admin";
import { DocumentReference } from "firebase-admin/firestore";
import { cookies } from "next/headers";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const doc = await db.doc(`playlists/${params.id}`).get();
  const userId = cookies().get("learnstream-user")?.value;

  if (!doc.exists) {
    return new Response(JSON.stringify({ message: "Playlist not found" }), {
      status: 404,
    });
  }

  const data = {
    ...doc.data(),
    videos: await Promise.all(
      doc
        .data()!
        .videos.map(async (v: DocumentReference) => (await v.get()).data()),
    ),
    isPicked: doc.data()!.pickedUser.includes(userId),
  };

  return Response.json(data);
}
