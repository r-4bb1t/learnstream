import { db } from "@/app/lib/firebase/admin";
import { DocumentReference } from "firebase-admin/firestore";
import { cookies } from "next/headers";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const doc = await db.doc(`videos/${params.id}`).get();
  const userId = cookies().get("learnstream-user")?.value;

  if (!doc.exists) {
    return new Response(JSON.stringify({ message: "Video not found" }), {
      status: 404,
    });
  }

  const notes = await Promise.all(
    doc.data()!.notes?.map(async (note: DocumentReference) => ({
      ...(await note.get()).data(),
      id: note.id,
    })),
  );

  const noteId = notes.find((note) => note.user === userId)?.id || null;

  const data = {
    ...doc.data(),
    playlist: doc.data()!.playlist.id,
    noteId,
    sharedCnt: notes.length,
  };

  return Response.json(data);
}
