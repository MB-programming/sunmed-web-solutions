import { Icon } from "@iconify/react";
import React from "react";

const Page = () => {
  return (
    <div className="mt-3">
      <h3 className="text-white text-[1.3rem] font-semibold">Support view</h3>
      <div className="mt-3 bg-background2 p-4 rounded-md">
        <div className="flex items-center gap-2">
          <span className="text-body text-[0.8rem]">#TK-001</span>
          <span className="text-white text-[0.7rem] border px-3 py-[2px] rounded border-[#F53939] bg-[#DF3939] bg-opacity-20">
            High priority
          </span>
          <span className="text-white text-[0.7rem] border px-3 py-[2px] rounded border-[#2F8E4C] bg-[#2F8E4C] bg-opacity-20">
            Open
          </span>
        </div>
        <p className="text-white text-[1.1rem] mt-3">
          Website loading issues on mobile devices
        </p>
        <div className="flex items-center justify-between border-t mt-4 py-4 border-stroke">
          <p className="text-[0.8rem] text-white font-light">
            <span className="text-body">Created:</span> Jan 25, 2024, 12:30 PM
          </p>
          <p className="text-[0.8rem] text-white font-light">
            <span className="text-body">Last Updated:</span> 573 days ago
          </p>
          <p className="text-[0.8rem] text-white font-light">
            <span className="text-body">Assigned to:</span> Jerry Gibson-Miller
          </p>
        </div>
      </div>
      <div className="mt-3 bg-background2 p-4 rounded-md">
        <p className="text-white text-[1.1rem] mt-3">Client information</p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-[1rem] text-body font-light">
              <span className="text-white">Client name:</span> Jerry
              Gibson-Miller
            </p>
            <p className="text-[1rem] text-body font-light mt-4">
              <span className="text-white">Client email:</span> Jerry
              Gibson-Miller
            </p>
          </div>
          <div>
            <p className="text-[1rem] text-body font-light">
              <span className="text-white">Company:</span> Jerry Gibson-Miller
            </p>
            <p className="text-[1rem] text-body font-light mt-4">
              <span className="text-white">Phone number:</span> 05649864135
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 bg-background2 p-4 rounded-md">
        <p className="text-white text-[1.1rem] mt-3">Ticket details</p>
        <p className="text-[1rem] text-body mt-4 font-light">
          <span className="text-white ">Subject:</span> Website loading issues
          on mobile devices
        </p>
        <p className="text-[1rem] text-body mt-4 font-light">
          <span className="text-white block mb-4">Description:</span> Provide a
          detailed description of the issue, including stps to reproduce,
          expected behavior, and any error message...
        </p>
        <p className="text-[1rem] text-white mt-4 font-light">Attechments:</p>
        <div className="flex justify-between items-center mt-4 p-3 bg-white/5 border border-stroke rounded">
          <div className="flex items-center gap-3">
            <Icon
              icon="tabler:photo"
              width="24"
              height="24"
              className="text-main"
            />
            <div>
              <p className="text-white text-[0.9rem] font-medium">
                Mobile-loading-screenshot.png
              </p>
              <p className="text-body text-[0.8rem]">2.4 MB</p>
            </div>
          </div>
          <button className="flex text-body text-[0.8rem] items-center gap-1">
          <Icon icon="material-symbols:download-rounded" width="20" height="20" />
          Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
