import { db } from "@/app/lib/firebase/admin";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const doc = await db.doc(`videos/${params.id}`).get();

  if (!doc.exists) {
    return new Response(JSON.stringify({ message: "Video not found" }), {
      status: 404,
    });
  }

  const data = { ...doc.data(), playlist: doc.data()!.playlist.id };

  return Response.json(data);
}
