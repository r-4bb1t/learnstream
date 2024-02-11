import Link from "next/link";
import SignIn from "./sign-in";
import Logo from "@/app/logo.svg";

export default function Header() {
  return (
    <div className="navbar fixed inset-x-0 top-0 z-20 h-16 justify-between bg-base-100">
      <Link href={"/"} className="btn btn-ghost gap-0 text-xl">
        <Logo className="h-6 fill-white" />
      </Link>
      <SignIn />
    </div>
  );
}
