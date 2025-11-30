"use client";
import { Icon } from "@iconify/react";
import React, { useRef } from "react";

const Page = () => {
  const coverRef = useRef(null);
  const handleCoverClick = () => {
    coverRef.current.click();
  };
  return (
    <div>
      <h3 className="text-white text-[1.3rem] font-semibold">Edit ticket</h3>
      <form className="w-[70%] p-5 rounded-md mx-auto my-12 bg-background2">
        <div className="flex justify-start mt-4 gap-3 flex-col">
          <label htmlFor="subject" className="text-white text-base">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Brief description of the issue"
            className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
          />
        </div>
        <div className="flex justify-start mt-4 gap-3 flex-col">
          <label htmlFor="clientName" className="text-white text-base">
            Client name
          </label>
          <input
            type="text"
            id="clientName"
            placeholder="Enter client name"
            className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
          />
        </div>
        <div className="flex justify-start mt-4 gap-3 flex-col">
          <label htmlFor="clientEmail" className="text-white text-base">
            Client Email
          </label>
          <input
            type="email"
            id="clientEmail"
            placeholder="Enter client email"
            className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex justify-start mt-4 flex-1 gap-3 flex-col">
            <label htmlFor="category" className="text-white text-base">
              Priority
            </label>
            <select
              id="category"
              className="p-3 text-body bg-white/5 border border-stroke rounded-md outline-none "
            >
              <option value=" " className="text-body">
                Select Priority
              </option>
            </select>
          </div>
          <div className="flex justify-start mt-4 flex-1 gap-3 flex-col">
            <label htmlFor="category" className="text-white text-base">
              Status
            </label>
            <select
              id="category"
              className="p-3 text-body bg-white/5 border border-stroke rounded-md outline-none "
            >
              <option value=" " className="text-body">
                Select Status
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-start mt-4 gap-3 flex-col">
          <label htmlFor="description" className="text-white text-base">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Provide a detailed description of the issue, including stps to reproduce, expected behavior, and any error message..."
            className="p-3 text-white h-32 bg-white/5 border border-stroke rounded-md outline-none "
          />
        </div>
        <label
          htmlFor="title"
          className="text-white text-base mt-4 inline-block"
        >
          Attachments
        </label>
        <input type="file" hidden ref={coverRef} />
        <div
          onClick={handleCoverClick}
          className="mt-3 cursor-pointer border-dashed border-stroke flex flex-col items-center justify-center h-48 border-2 rounded-md"
        >
          <Icon
            icon="material-symbols:upload-rounded"
            width="51"
            height="51"
            className="text-body"
          />
          <p className="text-body text-[0.85rem]">
            Support for images, PDF, documents up to 10MB each
          </p>
        </div>
        <div className="flex items-center mt-4 gap-3">
          <button className="bg-main text-black text-[0.9rem] flex-1 border border-main text-center p-2 rounded">
            Submit tickt
          </button>
          <button className=" text-[0.9rem] text-white py-2 px-14 border border-white rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
