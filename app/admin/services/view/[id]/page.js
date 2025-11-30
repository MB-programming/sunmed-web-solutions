import React from 'react';

const Page = () => {
  return (
    <div className='mt-3'>
        <h3 className="text-white mt-5 text-[1.2rem] font-bold">
          Service Overview
        </h3>

      <div className="bg-background2 mt-6 px-5 py-5 rounded">

        <p className=" text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Service Name : </span> Redesign
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Description : </span> Redesigning the company website to improve the user experience.
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Category : </span>Design
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Status : </span>Active
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Creation Date : </span>
          10/5/2025
        </p>

      </div>
    </div>
  );
}

export default Page;
