import {
  addDuration,
  convertDuration,
  convertPlaylist,
  convertVideo,
} from "@/app/lib/convert-rawdata";
import { db } from "@/app/lib/firebase/admin";
import {
  CategoryType,
  PlaylistType,
  RawPlaylistType,
  RawVideoType,
  VideoType,
} from "@/app/type/playlist";
import { DocumentReference } from "firebase-admin/firestore";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const playlist: { id: string; title: string; category: CategoryType } =
    await request.json();

  const docRef = db.doc(`playlists/${playlist.id}`);
  const doc = await docRef.get();

  if (doc.exists) {
    const response = new Response(
      JSON.stringify({ message: "Playlist already exists" }),
      { status: 400 },
    );
    return response;
  }

  const rawPlaylist: RawPlaylistType = await (
    await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${process.env.YOUTUBE_API_KEY}&playlistId=${playlist.id}&part=snippet&part=id&part=contentDetails&maxResults=50`,
    )
  ).json();

  const videos = await Promise.all(
    convertPlaylist(rawPlaylist).videos.map(async (video) => {
      const rawVideo: RawVideoType = await (
        await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&id=${video}&part=contentDetails&part=snippet`,
        )
      ).json();
      if (!rawVideo.items[0]) return;
      const convertedVideo: VideoType = {
        ...convertVideo(rawVideo),
        duration: convertDuration(rawVideo.items[0].contentDetails.duration),
        playlist: playlist.id,
      };
      db.doc(`videos/${video}`).set({
        ...convertedVideo,
        playlist: db.doc(`playlists/${playlist.id}`),
      });
      return convertedVideo;
    }),
  );

  const convertedPlaylist: PlaylistType = {
    ...convertPlaylist(rawPlaylist),
    title: playlist.title,
    category: playlist.category,
    duration: addDuration(videos.map((v) => v!.duration)),
  };

  await docRef.set({
    ...convertedPlaylist,
    videos: videos.map((v) => db.doc(`videos/${v!.id}`)),
  });

  return Response.json(convertedPlaylist);
}

export async function GET(request: Request) {
  const userId = cookies().get("learnstream-user")?.value;
  const category = new URL(request.url).searchParams.get("category");
  const playlists: PlaylistType[] = [];
  const querySnapshot =
    category === "all"
      ? await db.collection("playlists").get()
      : category === "picked"
        ? await db
            .collection("playlists")
            .where("pickedUser", "array-contains", userId)
            .get()
        : await db
            .collection("playlists")
            .where("category", "==", category)
            .get();
  querySnapshot.forEach((doc) => {
    playlists.push({
      ...(doc.data() as PlaylistType),
      videos: doc.data().videos.map((v: DocumentReference) => v.id),
      isPicked: doc.data().pickedUser.includes(userId),
    });
  });

  return Response.json(playlists);
}
