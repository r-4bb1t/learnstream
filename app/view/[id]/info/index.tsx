import { VideoType } from "@/app/type/playlist";

export default function VideoInfo({ video }: { video: VideoType }) {
  return (
    <div className="flex shrink-0 flex-col gap-4 px-6 py-4">
      <h1 className="text-xl font-bold md:text-2xl">{video.title}</h1>
      {video.description && (
        <div className="text-sm opacity-80">
          {video.description.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}
