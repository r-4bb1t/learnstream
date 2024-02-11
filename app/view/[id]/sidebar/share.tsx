export default function Share() {
  return (
    <ul className="divide-y divide-base-content/20">
      {[...new Array(5)].map((_, i) => (
        <li className="flex w-full flex-col gap-2 p-4" key={i}>
          <div className="flex flex-row gap-2">
            <div className="mask mask-squircle w-6">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
            <div className="text-sm font-light">@ username</div>
          </div>
          <div className="line-clamp-3 text-sm">
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </li>
      ))}
    </ul>
  );
}
