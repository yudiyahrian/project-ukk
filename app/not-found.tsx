import { buttonVariants } from "@components/ui";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-80 h-80 relative">
        <Image
          priority={true}
          src={"/assets/images/404.svg"}
          alt="assets from https://storyset.com/web "
          fill
          sizes="60vw"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <h1 className="leading-7 text-2xl font-bold m-0">
        Sorry, nobody on Breadit goes by that name.
      </h1>
      <p className="my-4 text-sm text-[#576f76] font-semibold">
        This account may have been banned or the username is incorrect.
      </p>
      <Link
        aria-label="Edit profile avatar"
        className={buttonVariants({
          className: "items-center justify-center inline-flex w-40",
          size: "sm",
          rounded: "md",
          variant: "outline",
        })}
        href="/"
      >
        Go to home
      </Link>
    </div>
  );
};

export default NotFound;
