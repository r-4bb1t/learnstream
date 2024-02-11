import { db } from "@/app/lib/firebase/admin";

export async function PATCH(
  _: Request,
  { params }: { params: { id: string } },
) {
  const doc = await db.doc(`notes/${params.id}`).get();

  if (!doc.exists) {
    return new Response(JSON.stringify({ message: "Note not found" }), {
      status: 404,
    });
  }

  await db
    .doc(`notes/${params.id}`)
    .update({ shared: !doc.data()!.shared, lastSaved: new Date() });

  return Response.json({ message: "Note updated" });
}
