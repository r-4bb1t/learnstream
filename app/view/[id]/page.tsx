import Sidebar from "./sidebar";

export default function VideoView({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="flex h-full min-h-screen w-full justify-between">
      <div className="w-full pt-16">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="mt-4 px-6">
          <h1 className="text-2xl font-bold">
            입문자를 위한 HTML 기초 강의 #0 강의 소개
          </h1>
        </div>
      </div>
      <Sidebar id={id} />
    </div>
  );
}
