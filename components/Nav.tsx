"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/google.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Gallery</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {user ? (
          <div className="flex gap-3 md:gap-5">
            <p className="cursor-pointer outline_btn" onClick={() => signOut()}>
              Sign Out
            </p>

            <Link href="/profile">
              <Image
                src={user.image ?? "/assets/images/default.png"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex gap-3 md:gap-5">
              <Link href="/login" className="outline_btn">
                Login
              </Link>

              <Link href="/register" className="outline_btn">
                Register
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {user ? (
          <div className="flex">
            <Image
              src={user.image ?? "/assets/images/default.png"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex gap-3 md:gap-5">
              <Link href="/login" className="outline_btn">
                Login
              </Link>

              <Link href="/register" className="outline_btn">
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
