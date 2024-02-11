import { VideoType } from "@/app/type/playlist";

export default function VideoInfo({ video }: { video: VideoType }) {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <h1 className="text-xl font-bold lg:text-2xl">{video.title}</h1>
      {video.description && (
        <div className="h-24 overflow-y-auto break-all text-sm leading-6 opacity-80 lg:h-full lg:overflow-y-visible">
          {video.description.split("\n").map((line, i) => (
            <div
              key={i}
              dangerouslySetInnerHTML={{
                __html: line
                  .replaceAll(
                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g,
                    `<a href="$1" class="link">$1</a>`,
                  )
                  .replaceAll(
                    /#(\w+)/g,
                    `<a href="/search?query=%23$1" class="hashtag"># $1</a>`,
                  ), // hashtag
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
