import { db } from "@/app/lib/firebase/admin";
import { DocumentReference } from "firebase-admin/firestore";
import { cookies } from "next/headers";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const userId = cookies().get("learnstream-user")?.value;

  if (!userId) {
    return Response.json({ error: "User not found" });
  }

  const userRef = db.doc(`user/${userId}`);
  const userDoc = (await userRef.get()).data();
  const playlistRef = db.doc(`playlists/${params.id}`);
  const playlistDoc = (await playlistRef.get()).data();

  if (!userDoc) {
    return Response.json({ error: "User not found" });
  }

  if (!playlistDoc) {
    return Response.json({ error: "Playlist not found" });
  }

  userRef.set({
    ...userDoc,
    playlists:
      userDoc.playlists.filter((p: DocumentReference) => p.id === params.id)
        .length > 0
        ? userDoc.playlists.filter(
            (playlist: DocumentReference) => playlist.id !== params.id,
          )
        : [...userDoc.playlists, playlistRef],
  });

  playlistRef.set({
    ...playlistDoc,
    pickedUser: playlistDoc.pickedUser.includes(userId)
      ? playlistDoc.pickedUser.filter((user: string) => user !== userId)
      : [...playlistDoc.pickedUser, userId],
  });

  return Response.json({ isPicked: !userDoc.playlists.includes(params.id) });
}
