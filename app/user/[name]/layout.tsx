import UserAvatar from "@components/UserAvatar";
import { Camera, Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants, Tabs, allTabs } from "@components/ui";
import Image from "next/image";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { getAuthSession } from "@utils/auth";
import UserFollowButton from "@components/user/UserFollowButton";
import { prisma } from "@utils/prisma";
import { prismaExclude } from "@utils/prisma_function";
import React from "react";

const getUser = async (name: string) => {
  const session = await getAuthSession();

  const formattedUrl = decodeURIComponent(name);

  const user = await prisma.user.findUnique({
    where: {
      name: formattedUrl,
    },
    select: prismaExclude("User", ["password", "role", "emailVerified"]),
  });
  if (!user) return notFound();

  const isSelf = session?.user.id === user.id;

  const userFollow = await prisma.userFollow.findFirst({
    where: {
      followerId: session?.user.id,
      followedUserId: user.id,
    },
  });

  const followersCount = await prisma.userFollow.count({
    where: {
      followedUserId: user.id,
    },
  });
  const followedCount = await prisma.userFollow.count({
    where: {
      followerId: user.id,
    },
  });
  const postsCount = await prisma.post.count({
    where: {
      userId: user.id,
    },
  });

  return {
    user,
    isSelf,
    userFollow,
    followersCount,
    followedCount,
    postsCount,
  };
};

export default async function Layout({
  children,
  params,
}: {
  children: JSX.Element;
  params: { name: string };
}) {
  const data = await getUser(params.name);

  const userData = data.user;
  const isSelf: boolean = data.isSelf;

  const followed = !!data.userFollow;

  return (
    <>
      <div className="flex w-full pb-4 justify-between gap-12">
        <main className="w-full overflow-x-auto">
          <div className="px-4 relative pt-4 flex pb-5 items-center">
            <div className="flex items-center flex-shrink-0 pr-4 relative">
              <UserAvatar
                user={{
                  name: userData.name || null,
                  image: userData.image || null,
                }}
                className="block m-0 rounded-full border-2 border-solid border-border overflow-hidden w-16 h-16"
              />
              <div
                className={`bottom-0 right-2 ${
                  isSelf == false ? "hidden" : "absolute"
                }`}
              >
                <div>
                  ``
                  <Link
                    aria-label="Edit profile avatar"
                    className={buttonVariants({
                      className: "items-center justify-center inline-flex",
                      size: "verySmall",
                      rounded: "full",
                      variant: "subtle",
                    })}
                    href=""
                  >
                    <span className="flex items-center justify-center">
                      <span className="flex">
                        <Camera className="h-4 w-4" />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full min-w-0 mt-2 xs:mt-0">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <div className="flex items-center justify-start w-full">
                      <div className="flex items-baseline justify-start">
                        <h1 className="leading-7 text-2xl font-bold m-0">
                          {userData.name}
                        </h1>
                      </div>
                    </div>
                    <p className="m-0 text-sm text-[#576f76] font-semibold">
                      {userData.description ?? "No description"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Tabs tabs={allTabs} isSelf={isSelf} name={params.name} />
          {isSelf === true && (
            <Link
              className={buttonVariants({
                className: "mt-4 mb-2",
                variant: "outline",
                rounded: "full",
              })}
              href="/create"
            >
              <Plus className="mr-1 h-7" />
              Create Post
            </Link>
          )}
          <hr
            className={`border-0 border-b-[.065rem] border-solid border-b-black/10 ${
              isSelf !== true && "mt-4"
            }`}
          />
          {children}{" "}
        </main>
        <div className="w-[316px] min-w-[316px] md:block styled-scrollbars md:sticky hidden md:top-[56px] md:max-h-[calc(100vh-54px-1px)] md:overflow-y-auto md:overflow-x-hidden">
          <aside className="mt-4 rounded-2xl bg-white relative">
            {userData.bannerImage && (
              <Image
                src={userData.bannerImage || ""}
                alt={userData.name}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[114px] absolute z-10"
              />
            )}
            <div
              className={`overflow-hidden w-full rounded-t-[1rem] h-[114px] ${
                isSelf === false && userData.bannerImage === null
                  ? "hidden"
                  : "relative"
              }`}
              style={{
                background:
                  "linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 111.72%), #0045AC",
              }}
            >
              <div
                className={`bottom-2 right-2 ${
                  isSelf == false ? "hidden" : "absolute"
                }`}
              >
                <div>
                  <Link
                    aria-label="Edit profile avatar"
                    className={buttonVariants({
                      className: "items-center justify-center inline-flex",
                      size: "verySmall",
                      rounded: "full",
                      variant: "subtle",
                    })}
                    href="/"
                  >
                    <span className="flex items-center justify-center">
                      <span className="flex">
                        <Camera className="h-4 w-4" />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="m-0 text-base text-[#0f1a1c] font-bold truncate">
                  {userData.name}
                </h2>
              </div>
              {isSelf ||
                (isSelf === false && (
                  <UserFollowButton
                    userId={userData.id}
                    initialFollow={followed}
                  />
                ))}

              <div className="grid gap-y-6 grid-cols-2 my-4">
                <div className="flex flex-col min-w-0">
                  <p className="m-0 text-sm text-[#0f1a1c] font-semibold whitespace-nowrap">
                    <span className="font-semibold text-sm">
                      {data.followersCount}
                    </span>
                  </p>
                  <p className="m-0 text-[#576f76] text-xs whitespace-nowrap truncate">
                    Followers
                  </p>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="m-0 text-sm text-[#0f1a1c] font-semibold whitespace-nowrap">
                    <span className="font-semibold text-sm">
                      {data.followedCount}
                    </span>
                  </p>
                  <p className="m-0 text-[#576f76] text-xs whitespace-nowrap truncate">
                    Followed
                  </p>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="m-0 text-sm text-[#0f1a1c] font-semibold whitespace-nowrap">
                    <span className="font-semibold text-sm">
                      {data.postsCount}
                    </span>
                  </p>
                  <p className="m-0 text-[#576f76] text-xs whitespace-nowrap truncate">
                    Posts
                  </p>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="m-0 text-sm text-[#0f1a1c] font-semibold whitespace-nowrap">
                    <span className="font-semibold text-sm">
                      {format(userData.createdAt, "MMMM d, yyyy")}
                    </span>
                  </p>
                  <p className="m-0 text-[#576f76] text-xs whitespace-nowrap truncate">
                    Cake day
                  </p>
                </div>
              </div>
              <hr className="border-0 border-b-[.065rem] border-solid border-b-black/10" />
              {isSelf === true && (
                <>
                  <h2 className="text-[#576f76] text-xs font-semibold uppercase my-4">
                    Settings
                  </h2>
                  <ul className="pl-0 my-0">
                    <li className="relative list-none mt-0 -mx-4 pointer-events-none">
                      <div className="flex justify-between relative px-4 gap-[0.5rem] text-[#0F1A1C] py-2 pr-4 -outline-offset-1">
                        <span className="flex items-center gap-2 min-w-0 shrink">
                          <span className="flex shrink-0 items-center justify-center">
                            <UserAvatar
                              user={{
                                name: userData.name || null,
                                image: userData.image || null,
                              }}
                              className="h-8 w-8"
                            />
                          </span>
                          <span className="flex flex-col justify-center min-w-0 shrink py-[var(--rem6)]">
                            <span className="text-sm">Profile</span>
                            <span className="text-xs text-[#576f76]">
                              Customize your profile
                            </span>
                          </span>
                        </span>
                        <span className="flex items-center shrink-0">
                          <Link
                            className={buttonVariants({
                              className: "text-xs px-2",
                              variant: "outline",
                              rounded: "full",
                              size: "customXs",
                            })}
                            href="/"
                          >
                            Edit Profile
                          </Link>
                        </span>
                      </div>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
