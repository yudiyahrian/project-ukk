"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

export const allTabs = [
  {
    id: "overview",
    name: "Overview",
    url: "",
    selfOnly: false,
  },
  {
    id: "posts",
    name: "Posts",
    url: "posts",
    selfOnly: false,
  },
  {
    id: "comments",
    name: "Comments",
    url: "comments",

    selfOnly: false,
  },
  {
    id: "albums",
    name: "Albums",
    url: "albums",

    selfOnly: false,
  },
  {
    id: "liked",
    name: "Liked",
    url: "liked",

    selfOnly: true,
  },
  {
    id: "saved",
    name: "Saved",
    url: "saved",

    selfOnly: true,
  },
];

type Tab = {
  id: string;
  name: string;
  url: string;
  selfOnly: boolean;
};

type TabsProps = {
  tabs: Tab[];
  name: string;
  isSelf: boolean;
};

export const Tabs: FC<TabsProps> = ({ tabs, isSelf, name }) => {
  const pathname = usePathname();
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const setTabPosition = () => {
    const currentTab = tabsRef.current[activeTabIndex ?? 0] as HTMLElement;

    setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
    setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
  };

  useEffect(() => {
    const parts = pathname.split("/");
    const url = parts[parts.length - 1];
    const activeIndex = tabs.findIndex((tab) => tab.url === url);
    if (activeTabIndex === null) {
      setActiveTabIndex(activeIndex !== -1 ? activeIndex : 0);
      return;
    } else if (activeIndex !== activeTabIndex) {
      setActiveTabIndex(activeIndex !== -1 ? activeIndex : 0);
    }
    const activeTab = tabsRef.current[activeIndex !== -1 ? activeIndex : 0];
    if (
      activeTab &&
      tabs[activeIndex !== -1 ? activeIndex : 0].name === activeTab.innerText
    ) {
      setTabPosition();
    } else {
      setTimeout(() => {
        setTabPosition();
      }, 1000);
    }
  }, [activeTabIndex, pathname]);

  return (
    <div
      className="flew-row relative mx-auto flex h-12 rounded-3xl px-2 backdrop-blur-sm"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-1 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-3xl bg-[#d2dadd]" />
      </span>
      {tabs
        .filter((tab) => !tab.selfOnly || isSelf) // Filter tabs based on selfOnly and isSelf
        .map((tab, index) => {
          const isActive = activeTabIndex === index;

          return (
            <Link
              key={index}
              ref={(el) => (tabsRef.current[index] = el)}
              className={`${
                isActive ? `` : `hover:underline`
              } my-auto cursor-pointer select-none rounded-full px-4 text-center text-[#0f1a1c]`}
              href={`/user/${name}/${tab.url}`}
            >
              {tab.name}
            </Link>
          );
        })}
    </div>
  );
};
