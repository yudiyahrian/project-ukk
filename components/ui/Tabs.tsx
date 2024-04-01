"use client";

import React, { useEffect, useRef, useState } from "react";

type Tab = {
  id: string;
  name: string;
  element: React.ReactNode;
  selfOnly: boolean;
};

type TabsProps = {
  tabs: Tab[];
  onTabClick: (element: React.ReactNode) => void; // Callback function to handle tab clicks
  isSelf: boolean;
};

export const Tabs: React.FC<TabsProps> = ({ tabs, onTabClick, isSelf }) => {
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) {
      setActiveTabIndex(0);
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  const handleTabClick = (index: number, element: React.ReactNode) => {
    setActiveTabIndex(index);
    onTabClick(element); // Call the callback function with the clicked element
  };

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
            <button
              key={index}
              ref={(el) => (tabsRef.current[index] = el)}
              className={`${
                isActive ? `` : `hover:underline`
              } my-auto cursor-pointer select-none rounded-full px-4 text-center text-[#0f1a1c]`}
              onClick={() => handleTabClick(index, tab.element)} // Pass the tab id to the click handler
            >
              {tab.name}
            </button>
          );
        })}
    </div>
  );
};
