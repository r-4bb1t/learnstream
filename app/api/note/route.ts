import { db } from "@/app/lib/firebase/admin";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { contents, video } = await request.json();
  const userId = cookies().get("learnstream-user")?.value;

  const doc = await db
    .collection("notes")
    .add({ contents, user: userId, video, lastSaved: new Date() });

  const videoDoc = await db.doc(`videos/${video}`).get();
  const videoData = videoDoc.data();

  await db.doc(`videos/${video}`).update({
    notes: [...(videoData!.notes || []), doc],
  });

  const userDoc = await db.doc(`user/${userId}`).get();
  const userData = userDoc.data();

  await db.doc(`user/${userId}`).update({
    notes: [...(userData!.notes || []), doc],
  });

  return Response.json({ id: doc.id });
}
