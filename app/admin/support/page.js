import Table from "@/app/Components/Table/Table";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const Page = () => {
  const headers = [
    {
      title: "name",
      key: "name",
    },
    {
      title: "Email",
      key: "name",
    },
    {
      title: "Phone number",
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
      text: "Active",
      value: "all",
    },
    {
      text: "Inactive",
      value: "all",
    },
  ];
  const cards = [
    {
      title: "Open tickets",
      value: "120",
    },
    {
      title: "Pending",
      value: "120",
    },
    {
      title: "Closed",
      value: "120",
    },
    {
      title: "High Priority",
      value: "120",
    },
  ];
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-[1.2rem] font-bold">Support</h3>
        <Link
          href="/admin/support/add"
          className="flex items-center gap-3 py-2 px-4 rounded text-white hover:bg-main hover:text-white duration-500 hover:shadow-light border border-main"
        >
          New ticket
        </Link>
      </div>
      <div className="mt-5 flex items-center gap-5">
        {cards.map((data, index) => (
          <div
            key={index}
            className="bg-background2 hover:shadow-inner  duration-200 overflow-hidden relative  rounded  px-4 py-4 flex-1"
          >
            <p className="text-[1.2rem] font-medium text-white ">
              {data.value}
            </p>
            <p className="text-white text-[1rem] mt-6 font-light">
              {data.title}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-background2 rounded-lg p-5">
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
        <Table
          headers={headers}
          action
          editLink="/admin/support/edit/id"
          viewLink="/admin/support/view/id"
        />
      </div>
    </div>
  );
};

export default Page;
