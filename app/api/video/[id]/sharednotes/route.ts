import { convertBlockToText } from "@/app/lib/convert-block-to-text";
import { db } from "@/app/lib/firebase/admin";
import { DocumentReference, Timestamp } from "firebase-admin/firestore";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const doc = await db.doc(`videos/${params.id}`).get();

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

  const sharedNotes = await Promise.all(
    notes
      .filter((note) => note.shared)
      .map(async (note) => {
        const userDoc = await db.doc(`user/${note.user}`).get();
        const userData = userDoc.data();

        return {
          id: note.id,
          contents: convertBlockToText(note.contents),
          userId: note.user,
          username: userData?.username || "deleted user",
          userProfile:
            userData?.image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9GSLnfE_4HXJkEft7W00jJDqp1u8gj0PcK8H8njYv1Q&s",
          lastSaved: (note.lastSaved as Timestamp).toDate().toISOString(),
        };
      }),
  );

  return Response.json({
    sharedNotes,
  });
}
