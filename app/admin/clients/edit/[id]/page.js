import React from "react";

const Page = () => {
  return (
    <div className="mt-3">
      <h3 className="text-white text-[1.2rem] font-bold">
      Edit client
      </h3>
      <form className="mt-5  bg-background2   rounded px-4 pb-6 pt-1">
        <div className="mt-5">
          <label htmlFor="name" className="text-base text-white font-light">
    Full name
          </label>
          <input type="text" id="name" className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5" />
        </div>
        <div className="mt-5">
          <label htmlFor="email" className="text-base text-white font-light">
  Email
          </label>
          <input type="email" id="email" className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5" />
        </div>
        <div className="mt-5">
          <label htmlFor="phone" className="text-base text-white font-light">
      Phone number
          </label>
          <input type="text" id="phone" className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5" />
        </div>
        <div className="mt-5">
          <label htmlFor="company" className="text-base text-white font-light">
    Company
          </label>
          <input type="text" id="company" className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5" />
        </div>
        <button type="submit" className="mt-10 bg-main p-2 w-full text-[1rem] font-medium rounded hover-main duration-300 text-black">Update Client</button>
      </form>
    </div>
  );
};

export default Page;
