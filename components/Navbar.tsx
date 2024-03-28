import Link from "next/link";
import Icons from "./Icons";
import { buttonVariants } from "./ui";
import { authOptions } from "@/utils/auth";
import UserAccountNav from "./UserAccountNav";
import { getServerSession } from "next-auth";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 inset-x-0 h-16 bg-zinc-100 border-b border-zinc-300 z-10 py-2">
      <div className="container max-w-7xl h-full flex items-center justify-between gap-2">
        {/* LOGO */}
        <Link href={`/`} className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Breadit
          </p>
        </Link>

        {/* <Searchbar /> */}

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href={"/sign-in"} className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;