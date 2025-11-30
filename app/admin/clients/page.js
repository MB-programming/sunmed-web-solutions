"use client"
import Table from "@/app/Components/Table/Table";
import Axios from "@/app/lib/Axios";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(()=>{
    Axios.get("/client").then(data => console.log(data))
  },[])
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
      title: "Total Clients",
      value: "120",
    },
    {
      title: "Active Projects",
      value: "120",
    },
    {
      title: "Pending requests",
      value: "120",
    },
  ];
  return (
    <div className="mt-3">
      <h3 className="text-white text-[1.2rem] font-bold">Clients management</h3>
      <div className="mt-5 flex items-center gap-5">
        {cards.map((data, index) => (
          <div
            key={index}
            className="bg-background2 hover:shadow-inner  duration-200 overflow-hidden relative  rounded  px-4 py-8 flex-1"
          >
            <p className="text-white text-[1.2rem] font-light">{data.title}</p>
            <p className="text-[1.4rem] font-medium text-white mt-2">
              {data.value}
            </p>
          </div>
        ))}
      </div>
      <h3 className="text-white mt-5 text-[1.2rem] font-bold">Clients list</h3>
      <div className="mt-4 bg-background2 rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center px-4 bg-white/5 justify-start gap-3 flex-row-reverse border rounded w-[230px] h-max border-stroke">
              <input
                type="text"
                placeholder="search"
                className="flex-1 border-none outline-none text-white bg-transparent p-2"
              />
              <Icon
                className="text-body"
                icon="ep:search"
                width="18"
                height="18"
              />
            </div>
            <div className="flex items-center gap-2 border border-stroke bg-white/5 rounded p-1">
              {filters.map((data, index) => (
                <button
                  key={index}
                  className="text-[0.8rem] text-body px-8 py-2 hover:text-white hover:bg-background2 duration-200"
                >
                  {data.text}
                </button>
              ))}
            </div>
          </div>
          <Link
            href="/admin/clients/add"
            className="flex items-center gap-3 py-2 px-4 rounded text-white hover:bg-main hover:text-white duration-500 hover:shadow-light border border-main"
          >
            <Icon icon="ic:sharp-add" width="18" height="18" />
            <span>add new client</span>
          </Link>
        </div>
        <Table
          headers={headers}
          action
          editLink="/admin/clients/edit/id"
          viewLink="/admin/clients/view/id"
        />
      </div>
    </div>
  );
};

export default Page;
