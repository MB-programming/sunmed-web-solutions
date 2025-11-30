import Table from "@/app/Components/Table/Table";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const Page = () => {
  const headers = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Email",
      key: "name",
    },
    {
      title: "Phone Number",
      key: "name",
    },
    {
      title: "Projects",
      key: "name",
    },
    {
      title: "Status",
      key: "name",
    },
  ];

  const filters = [
    {
      text: "All",
      value: "all",
    },
    {
      text: "Approved",
      value: "all",
    },
    {
      text: "Pending",
      value: "all",
    },
    {
      text: "Rejected",
      value: "all",
    },
  ];
  
  return (
    <div className="mt-3">
    
      <h3 className="text-white mt-5 text-[1.2rem] font-bold">
        Orders
      </h3>

      <div className="mt-4 bg-background2 rounded-lg p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center px-4 justify-start gap-3 flex-row-reverse border rounded w-[280px] h-max  border-stroke bg-white/5 ">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 border-none outline-none text-white bg-transparent p-2"
              />
              <Icon
                className="text-body"
                icon="ep:search"
                width="18"
                height="18"
              />
            </div>

            <div className="flex items-center gap-2 border border-stroke bg-white/5  rounded p-2">
              {filters.map((data, index) => (
                <button
                  key={index}
                  className="text-[0.8rem] text-body px-7 py-1 hover:text-white hover:bg-background2 duration-200"
                >
                  {data.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Table headers={headers} action viewLink="/admin/orders/view/id" />
      </div>
    </div>
  );
};

export default Page;
