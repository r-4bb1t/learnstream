import { db } from "@/app/lib/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const doc = await db.doc(`notes/${params.id}`).get();

  if (!doc.exists) {
    return new Response(JSON.stringify({ message: "Note not found" }), {
      status: 404,
    });
  }

  const data = doc.data();

  return Response.json({
    ...data,
    id: doc.id,
    lastSaved: (data!.lastSaved as Timestamp).toDate().toISOString(),
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { contents } = await request.json();
  const doc = await db.doc(`notes/${params.id}`).get();

  if (!doc.exists) {
    return new Response(JSON.stringify({ message: "Note not found" }), {
      status: 404,
    });
  }

  await db
    .doc(`notes/${params.id}`)
    .update({ contents, lastSaved: new Date() });

  return Response.json({ message: "Note updated" });
}
