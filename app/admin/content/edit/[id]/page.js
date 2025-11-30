"use client";
import RichTextEditor from "@/app/Components/RichEditor/RichEditor";
import { Icon } from "@iconify/react";
import React, { useRef } from "react";

const Page = () => {
  const coverRef = useRef(null);
  const handleCoverClick = () => {
    coverRef.current.click();
  };
  return (
    <div className="my-3">
      <h3 className="text-white mt-5 text-[1.2rem] font-bold">
        Edit Content
      </h3>
      <div className="mt-3 flex items-start gap-3">
        <form className="flex-1">
          <div className=" bg-background2 rounded p-4">
            <h4 className="text-white text-[1.1rem] font-semibold">
              Post details
            </h4>
            <div className="flex justify-start mt-4 gap-3 flex-col">
              <label htmlFor="title" className="text-white text-base">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter your blog post title..."
                className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
              />
            </div>
            <div className="flex justify-start mt-4 gap-3 flex-col">
              <label htmlFor="slug" className="text-white text-base">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                placeholder="auto-generated-from-title"
                className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
              />
            </div>
            <div className="flex justify-start mt-4 gap-3 flex-col">
              <label htmlFor="category" className="text-white text-base">
                Category
              </label>
              <select
                id="category"
                className="p-3 text-body bg-white/5 border border-stroke rounded-md outline-none "
              >
                <option value=" " className="text-body">
                  Select category
                </option>
              </select>
            </div>
          </div>
          <div className="bg-background2 rounded p-4 pb-6 mt-4">
            <label htmlFor="title" className="text-white text-base">
              Cover Image
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
                Drop your image here, or click to browse
              </p>
            </div>
          </div>
          <div className=" bg-background2 rounded p-4 mt-4">
            <h4 className="text-white text-[1.1rem] font-semibold">
              SEO Optimization
            </h4>
            <div className="flex justify-start mt-4 gap-3 flex-col">
              <label htmlFor="seotitle" className="text-white text-base">
                SEO title
              </label>
              <input
                type="text"
                id="seotitle"
                placeholder="Enter SEO title here..."
                className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
              />
            </div>
            <div className="flex justify-start mt-4 gap-3 flex-col">
              <label htmlFor="seodesc" className="text-white text-base">
                SEO description
              </label>
              <input
                type="text"
                id="seodesc"
                placeholder="auto-generated-from-title"
                className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
              />
            </div>
            <label htmlFor="title" className="text-white text-base block mt-4">
              SEO Image
            </label>
            <input type="file" hidden ref={coverRef} />
            <div
              onClick={handleCoverClick}
              className="mt-3 cursor-pointer border-dashed border-stroke flex flex-col items-center justify-center h-32 border-2 rounded-md"
            >
              <p className="text-white text-[0.9rem]">Click to upload iamge</p>
            </div>
            <div className="flex justify-start mt-4 gap-3 flex-col">
              <label htmlFor="head" className="text-white text-base">
                Head code
              </label>
              <input
                type="text"
                id="head"
                placeholder='<meta name="description" content="your description here">'
                className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
              />
            </div>
            <div className="flex justify-start mt-4 gap-3 flex-col">
              <label htmlFor="body" className="text-white text-base">
                Body code
              </label>
              <input
                type="text"
                id="body"
                placeholder='<script>console.log("Body code here");</script>'
                className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
              />
            </div>
          </div>
          <div className="bg-background2 rounded p-4 pb-6 mt-4">
            <h3 className="text-white text-[1.3rem]">Google Preview</h3>
            <h4 className="text-base text-white mt-4">Example SEO Title</h4>
            <p className="text-main text-[0.9rem] font-light mt-2">
              www.example.com
            </p>
            <p className="text-body text-[0.8rem] font-light mt-2">
              This is an example SEO description that shows how your content
              will look in Google results.
            </p>
          </div>
          <div>
            <RichTextEditor />
          </div>
          <br />
          <div className=" bg-background2 rounded p-4 mt-40">
            <h4 className="text-white text-[1.1rem] font-semibold">Tags</h4>
            <div className="flex justify-start mt-4 gap-3 flex-col">
              <label htmlFor="tag" className="text-white text-base">
                add Tag
              </label>
              <input
                type="text"
                id="tag"
                placeholder="Type a tag and press enter..."
                className="p-3 text-white bg-white/5 border border-stroke rounded-md outline-none "
              />
              <p className="text-body text-sm font-light">
                Press enter to add tags. Tags help readers find your content
              </p>
            </div>
          </div>
        </form>
        <div className="w-[30%] bg-background2 rounded-sm p-4">
          <h4 className="text-white text-[1.1rem] font-semibold">
            Publish settings
          </h4>
          <button className="flex items-center gap-2 text-sm bg-white/5 w-full p-2 rounded border border-stroke text-white mt-4 hover:border-main duration-200">
            <Icon icon="lucide:save" width="20" height="20" />
            Save draft
          </button>
          <button className="flex items-center hover-main gap-2 text-sm bg-main w-full p-2 rounded border border-main text-black mt-4 hover:border-main duration-200">
            <Icon icon="icon-park-outline:send" width="20" height="20" />
            Puplish now
          </button>
          <h5 className="text-white text-base border-t border-stroke py-4 mt-4">
            Schedule for later
          </h5>
          <input
            type="date"
            className="w-full bg-white/5 border border-stroke outline-none text-white appearance-none p-1 rounded"
          />
            <h5 className="text-white text-base border-t border-stroke py-4 mt-4">
            Post status
          </h5>
          <div className="flex items-center justify-between">
            <span className="text-body text-[0.8rem] ">Status:</span>
            <span className="text-body text-[0.8rem] ">Draft</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-body text-[0.8rem] ">Visibility:</span>
            <span className="text-body text-[0.8rem] ">Public</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-body text-[0.8rem] ">Created:</span>
            <span className="text-body text-[0.8rem] ">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
