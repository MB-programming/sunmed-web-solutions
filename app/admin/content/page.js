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
    <div className="flex items-center justify-between">

      <h3 className="text-white mt-5 text-[1.2rem] font-bold">
        Manage Content
      </h3>
      <Link
            href="/admin/content/add"
            className="flex items-center gap-3 py-2 px-4 rounded text-white hover:bg-main hover:text-white duration-500 hover:shadow-light border border-main"
          >
            <Icon icon="ic:sharp-add" width="18" height="18" />
            <span>add new content</span>
          </Link>
    </div>
      <div className="mt-4 bg-background2 rounded-lg p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3  border-stroke bg-white/5 w-full p-5 rounded">
            <div className="flex items-center px-4 justify-start gap-3 flex-row-reverse  rounded w-[50%] h-max bg-background2 ">
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

          <select className="text-white bg-background2 pr-10 py-2 pl-4">
            <option value="">Status</option>
          </select>
          <select className="text-white bg-background2 pr-10 py-2 pl-4">
            <option value="">Category</option>
          </select>
          </div>
        </div>

        <Table headers={headers} action editLink="/admin/content/edit/id" trash  viewLink="/admin/content/view/id" />
      </div>
    </div>
  );
};

export default Page;
