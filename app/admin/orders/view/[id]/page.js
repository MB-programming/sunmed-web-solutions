"use client"
import ConfirmModal from "@/app/Components/Modal/ConfirmModal";
import React, { useState } from "react";

const Page = () => {
  const [showModal , setShowModal] = useState(false)
  return (
    <>
    <div className="mt-3">
      <h3 className="text-white mt-5 text-[1.2rem] font-bold">
        Order Details (Approved)
      </h3>

      <div className="bg-background2 mt-6 px-5 py-5 rounded">
        <p className=" text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Order ID : </span> Redesign
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Client Name : </span>{" "}
          Redesigning the company website to improve the user experience.
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Services : </span>Design
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Description : </span>Active
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Date Request : </span>
          10/5/2025
        </p>
        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Date Approved : </span>
          10/5/2025
        </p>

        <div className="flex items-center gap-3 mt-4">
          <button className="text-base px-8 py-1 bg-main text-background rounded-sm">
            Start work
          </button>
          <button onClick={()=>setShowModal(true)} className="text-base px-5 py-1 border font-light text-white border-stroke rounded-sm">
            Mark as complete
          </button>
        </div>
      </div>
    </div>
    {
      showModal &&

    <ConfirmModal setShowModal={setShowModal} />
    }
    </>
  );
};

export default Page;
