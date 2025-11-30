"use client"
import React, { useState } from "react";
import "./SideBar.css";
import Logo from "../Logo/Logo";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { data } from "autoprefixer";
const SideBar = () => {
  const [open, setOpen] = useState();
  const pathname = usePathname();

  const SideData = [
    {
      title: "Dashboard",
      icon: "material-symbols:dashboard",
      link: "/admin",
    },
    {
      title: "Projects",
      icon: "bytesize:work",
      link: "/admin/projects",
    },
    {
      title: "Services",
      icon: "famicons:server-outline",
      link: "/admin/services",
    },
    {
      title: "FAQs",
      icon: "mdi:help-circle",
      link: "/admin/faqs/manage",
    },
    {
      title: "Benefits",
      icon: "mdi:star",
      link: "/admin/benefits/manage",
    },
    {
      title: "Attributes",
      icon: "mdi:tag",
      link: "/admin/attributes/manage",
    },
    {
      title: "Bookings",
      icon: "mdi:book",
      link: "/admin/books/manage",
    },
    {
      title: "Steps",
      icon: "mdi:stairs",
      link: "/admin/steps/manage",
    },
    {
      title: "Futures",
      icon: "mdi:rocket",
      link: "/admin/futures/manage",
    },
    {
      title: "Users",
      icon: "ph:user-bold",
      link: "/admin/users/manage",
    },
    {
      title: "Settings",
      icon: "lets-icons:setting-line",
      link: "/admin/settings",
    },

  ];
  return (
    <div className="  SideBar py-12 ">
      <div className="w-[60%] mx-auto">
        <Logo />
      </div>
      <div className="px-[5%] mt-16">
      {
        SideData.map((data , index)=>(
          <>
          <Link href={data.link} className={`flex ${index === 10 && "mt-auto"} ${pathname === data.link && "bg-main"} mt-1  items-center gap-2 px-5 py-3 cursor-pointer group  hover:bg-main duration-200 rounded-sm`}>
          <Icon icon={data.icon} width="16" height="16" className={`text-body ${pathname === data.link && "!text-black"} group-hover:text-black duration-200`} />
            <p className={`text-[0.9rem]  text-body group-hover:text-black duration-200 ${pathname === data.link && "!text-black"}`}>{data.title}</p>
          </Link>
          {
            index === 9 && <div>      <button
            onClick={() => setOpen((prev) => !prev)}
            className={`flex items-center mt-1 justify-between gap-2 group duration-300 cursor-pointer hover:bg-main w-full px-5 py-3 rounded-sm ${
              open && "bg-main"
            }`}
          >
            <div className="flex items-center gap-2 ">
              <Icon
                className={`text-body group-hover:text-black duration-300 cursor-pointer ${
                  open && "!text-black"
                }`}
                icon="lsicon:order-outline"
                width="15"
                height="15"
              />
              <span
                className={`text-sm font-light text-body duration-300 cursor-pointer group-hover:text-black ${
                  open && "!text-black"
                }`}
              >
                Orders Manage
              </span>
            </div>
            <Icon
              className={`text-body ${
                open ? "rotate-90 !text-black" : "rotate-0 "
              } group-hover:text-black duration-300 cursor-pointer`}
              icon="weui:arrow-outlined"
              width="22"
              height="22"
            />
          </button>
          <div
            className={`flex flex-col  gap-3 ml-8 duration-300 overflow-hidden ${
              open ? "h-12  my-2 " : "h-0"
            }`}
          >
            <Link
              className={`text-sm font-light text-body hover:text-main duration-200 mr-6 ${
                pathname === "/admin/orders" && "text-main"
              }`}
              href="/admin/orders"
            >
          Orders
            </Link>
            <Link
              className={`text-sm font-light text-body hover:text-main duration-200 mr-6 ${
                pathname === "/admin/ordersCompleted" && "text-main"
              }`}
              href="/admin/ordersCompleted"
            >
        Completed Orders
            </Link>
          </div></div>
          }
          </>
        ))
      }
          <button className={`flex w-full ${pathname === data.link && "bg-main"}  items-center gap-2 mt-1 px-5 py-3 cursor-pointer group  hover:bg-main duration-200 rounded-sm`}>
          <Icon icon="clarity:logout-line" width="16" height="16" className="text-body group-hover:text-black duration-200" />
            <p className="text-[0.9rem]  text-body group-hover:text-black duration-200">Logout</p>
          </button>
      </div>
    </div>
  );
};

export default SideBar;
