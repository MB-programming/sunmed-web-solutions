import Table from "@/app/Components/Table/Table";
import Image from "next/image";
import React from "react";

const Page = () => {
  const boxes = [
    {
      title: "Total projects",
      value: "4",
    },
    {
      title: "Total payments",
      value: "3000 جنيه مصري",
    },
    {
      title: "Last login",
      value: "13-8-2015",
    },
  ];
  const invoices = [
    {
      title: "Invoices",
      value: "0",
    },
    {
      title: "Paid",
      value: "300",
    },
    {
      title: "Pending",
      value: "300",
    },
    {
      title: "Overdue",
      value: "300",
    },
  ];
  return (
    <div className="mt-3">
      <h3 className="text-white text-[1.2rem] font-bold">View Client Profile</h3>
      <div className="mt-8 bg-background2 rounded p-5">
        <Image
          src="/user.png"
          width={129}
          height={129}
          className="rounded-full"
        />
        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1">
            <label
              htmlFor="name"
              className="text-base text-white font-light"
            >
          Full name
            </label>
            <input
              type="text"
              id="name"
              className="p-2 w-full border text-white focus:border-main border-stroke rounded mt-2 outline-none bg-white/5"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="ُemail"
              className="text-base text-white font-light"
            >
      Email
            </label>
            <input
              type="ُemail"
              id="ُemail"
              className="p-2 w-full border focus:border-main text-white border-stroke rounded mt-2 outline-none bg-white/5"
            />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <div className="flex-1">
            <label
              htmlFor="phone"
              className="text-base text-white font-light"
            >
          Phone number
            </label>
            <input
              type="text"
              id="phone"
              className="p-2 w-full border focus:border-main text-white border-stroke rounded mt-2 outline-none bg-white/5"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="company"
              className="text-base text-white font-light"
            >
          Company
            </label>
            <input
              type="text"
              id="company"
              className="p-2 w-full border focus:border-main text-white border-stroke rounded mt-2 outline-none bg-white/5"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-start gap-4">
        <div className="flex-1 p-5 rounded bg-background2">
          <h3 className="text-white text-[1.1rem] font-bold">Projects</h3>
          <table className="text-center mt-5 w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="text-white/80 text-sm py-4  font-medium ">
          Project name
                </th>
                <th className="text-white/80 text-sm py-4  font-medium ">
                  status
                </th>
                <th className="text-white/80 text-sm py-4  font-medium ">
          Deadline
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((data, index) => (
                <tr className="border-b border-stroke">
                  <td className="text-[0.7rem] font-medium text-body py-6">
                  Mobile app
                  </td>
                  <td className="py-6">
                    <span className="text-[0.7rem] font-medium px-4 rounded-3xl py-1  text-white border border-main bg-[#2F8E4C] bg-opacity-70">
                      Completed
                    </span>
                  </td>
                  <td className="text-[0.7rem] font-medium text-body py-6">
                    1056468
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-1  py-5 px-8 rounded bg-background2">
          <h3 className="text-white text-[1.1rem] font-bold">
          Invoices & Payment
          </h3>
          <h3 className="mt-5 bg-white/5 text-base font-medium text-white p-4">
            Total
          </h3>
          {invoices.map((data, index) => (
            <div className="flex items-center justify-between px-4 py-6 border-b border-stroke">
              <span className="text-base font-medium text-body">
                {data.title}
              </span>
              <span className="text-base font-medium text-body">
                {data.value} 
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 bg-background2 rounded px-4 py-5">
        <h3 className="text-white text-[1.1rem] font-medium">
        Support & Communication
        </h3>
        <p className="mt-4 border w-[500px] bg-white/5 border-stroke rounded py-4 px-5 text-[0.85rem] font-medium text-body">
        Lorem ipsum dolor sit amet consectetur. Nam egestas .
        </p>
      </div>
      <div className="mt-5 bg-background2 rounded px-4 py-5">
        <h3 className="text-white text-[1.1rem] font-medium">
  Quick stats
        </h3>
        <div className="flex items-center gap-4 mt-4">
          {boxes.map((data, index) => (
            <div className={`flex-1 py-4 px-3 ${index === 1 && "border-x"} border-stroke bg-card`}>
              <h4 className="text-[1.2rem] font-medium text-white">
                {data.title}
              </h4>
              <p className="text-[1.1rem] mt-3 font-medium text-body">
                {data.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
