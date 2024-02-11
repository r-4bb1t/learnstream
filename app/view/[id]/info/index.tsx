import { VideoType } from "@/app/type/playlist";

export default function VideoInfo({ video }: { video: VideoType }) {
  return (
    <div className="mt-4 px-6">
      <h1 className="text-2xl font-bold">{video.title}</h1>
      <div className="py-4 text-sm opacity-80">
        {video.description.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
