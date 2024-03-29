"use client";

import UserAvatar from "@components/UserAvatar";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@components/ui";

export default function Page({ params }: { params: { name: string } }) {
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${params.name}`);
        if (!response.ok) {
          throw new Error("User Not Found");
        }
        const data: User = await response.json();
        setUserData(data);
      } catch (error: any) {
        setError(error.message || "Internal Server Error");
      }
    };

    fetchData();
  }, [params.name]);

  return (
    <div>
      {userData != null ? (
        <>
          <div className="px-4 relative pt-4 flex pb-4 items-center">
            <div className="flex items-center flex-shrink-0 pr-4 relative">
              <UserAvatar
                user={{
                  name: userData.name || null,
                  image: userData.image || null,
                }}
                className="block m-0 rounded-full border-2 border-solid border-border overflow-hidden w-16 h-16"
              />
              <div className="absolute bottom-0 right-2">
                <div>
                  <Link
                    aria-label="Edit profile avatar"
                    className={buttonVariants({
                      className: "items-center justify-center inline-flex",
                      size: "rounded",
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
                <div className="flex items-center justify-between ">
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
        </>
      ) : (
        <p>{error != null ? error : "Loading..."} </p>
      )}
      {/* Add other UI components as needed */}
    </div>
  );
}
