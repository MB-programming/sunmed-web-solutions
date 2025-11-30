import { Icon } from "@iconify/react";
import React from "react";
import Chart from "../Components/Chart/Chart";
import Image from "next/image";

const Page = () => {
  const cards = [
    {
      title: "Clients",
      value: "120",
      icon: "iconoir:user",
      bg: "rgb(26, 117, 255 , 0.1)",
    },
    {
      title: "Projects",
      value: "120",
      icon: "carbon:ibm-cloud-projects",
      bg: "rgb(133, 105, 255,0.1)",
    },
    {
      title: "Posts",
      value: "120",
      icon: "mdi:post-it-note-edit-outline",
      bg: "rgb(254, 131, 43 , 0.1)",
    },
    {
      title: "Revenue",
      value: "120",
      icon: "simple-icons:revenuecat",
      bg: "rgb(20, 152, 79 , 0.1)",
    },
  ];
  return (
    <div className="mt-4">
      <h3 className="text-white text-[1.2rem] font-bold">Main Dahboard</h3>
      <div className="mt-5 flex items-center gap-5">
        {cards.map((data, index) => (
          <div
            key={index}
            className="bg-background2 hover:shadow-inner  duration-200 overflow-hidden relative  rounded-md  py-3 px-5 flex-1"
          >
            <div className="flex items-center justify-between">
              <p className="text-white text-[1.2rem] font-light">
                {data.title}
              </p>
              <Icon
                className="text-main"
                icon={data.icon}
                width="24"
                height="24"
              />
            </div>
            <p className="text-[1.4rem] font-medium text-white mt-2">
              {data.value}
            </p>
          </div>
        ))}
      </div>
      <Chart />
      <div className="mt-4 p-5 bg-background2 rounded">
        <div className="flex items-center gap-2">
          <Icon
            className="text-main"
            icon="mdi:post-it-note-edit-outline"
            width="20"
            height="20"
          />
          <h4 className="text-white text-[1.2rem] font-semibold">
            Recent posts
          </h4>
        </div>
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          {Array.from({ length: 6 }).map((data, index) => (
            <div
              style={{
                background: "linear-gradient(180deg, #17182C 0%, #4C5092 100%)",
              }}
              className="rounded-xl border border-stroke h-[150px] flex p-4 items-start gap-3 flex-1 min-w-[250px]"
            >
              <div className="w-[40%] !h-[100%]">
                <Image
                  src="/blogs.png"
                  width={100}
                  height={200}
                  alt="demo"
                  className="!h-[100%] object-cover  w-[100%]"
                />
              </div>
              <div className="h-max">
                <h5 className="text-[0.85rem] text-white font-semibold">
                  Fashion Website Design
                </h5>
                <p className="text-white/80 mt-2 text-[0.7rem] font-light">
                  Aug 15, 2025
                </p>
                <p className="text-[0.6rem] bg-[#2F8E4C] bg-opacity-40 py-[3px] px-3 mt-2 border border-[#2F8E4C] rounded-3xl text-white w-max">
                  Published
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <button className="bg-background2 text-[0.8rem] duration-300 hover-main hover:rounded-3xl hover:text-background hover:border-main hover:bg-main text-white px-4 py-1 border border-stroke">
                    Edit
                  </button>
                  <button className="bg-background2 text-[0.8rem] duration-300 hover-main hover:rounded-3xl hover:text-background hover:border-main hover:bg-main text-white px-4 py-1 border border-stroke">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 p-5 bg-background2 rounded">
        <div className="flex items-center gap-2">
          <Icon
            className="text-main"
            icon="zondicons:notification"
            width="20"
            height="20"
          />
          <h4 className="text-white text-[1.2rem] font-semibold">
            Newest Notifications
          </h4>
        
        </div>
        <div className="mt-3">

        {Array.from({ length: 4 }).map((data, index) => (
          <div className="border-b border-stroke px-5 py-3">
              <h3 className="text-sm font-semibold text-white">
                New Post Published
              </h3>
              <p className="text-[0.7rem] mt-2 text-white/80 ">“ UI Design Basics “ is now live.</p>
            </div>
          ))}
          </div>
      </div>
    </div>
  );
};

export default Page;
