export default function VideoInfoLoading() {
  return (
    <div className="mt-4 px-6">
      <h1 className="h-6 animate-pulse rounded-full bg-base-200/50 font-bold" />
      <div className="my-4 h-3 rounded-full bg-base-200/50">
        {[...new Array(3)].map((line, i) => (
          <div key={i} className="w-2/3 first:w-1/2 last:w-3/4">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
