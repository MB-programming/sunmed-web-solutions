import { Icon } from "@iconify/react";
import React from "react";

const Topbar = () => {
  return (
    <div className="flex py-5 justify-between w-full items-center">
      <h3 className="text-white text-[1.2rem] font-bold">Dashboard</h3>
      <div className="flex items-center px-4 justify-between border rounded w-[500px] h-min border-stroke bg-background2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 border-none outline-none text-white bg-transparent p-1"
        />
      <Icon className="text-body" icon="ep:search" width="18" height="18" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-[36px] text-white h-[36px] cursor-pointer rounded-full flex justify-center items-center border border-stroke bg-background2">
        <Icon icon="ri:notification-2-line" width="18" height="18" />
        </div>
        <div className="w-[36px] text-white h-[36px] cursor-pointer rounded-full flex justify-center items-center border border-stroke bg-background2">
        <Icon icon="solar:user-outline" width="20" height="20" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
