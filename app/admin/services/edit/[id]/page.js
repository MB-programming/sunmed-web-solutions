import React from "react";

const Page = () => {
  return (
    <div className="mt-3">
      <h3 className="text-white mt-5 text-[1.2rem] font-bold">
  Edit services
      </h3>
      <from>
        <div className="mt-4 w-full p-5 bg-background2">
          <div>
            <label
              htmlFor="status"
              className="text-white text-base font-semibold"
            >
            Services name
            </label>
            <select
              id="status"
              className="w-full py-3 px-5   text-body rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light"
            >
              <option value="">UI Desgin</option>
              <option value="">UX Desgin</option>
              <option value="">Web Development</option>
            </select>
          </div>
          <div className="mt-4">
            <label
              htmlFor="discription"
              className="text-white text-base font-semibold"
            >
              Description
            </label>
            <textarea
              id="discription"
              className="w-full py-3 px-5 h-32 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light"
            />
          </div>
          <div className="mt-4">
          <label
              className="text-white  text-base font-semibold"
              htmlFor="status"
            >
        Status
            </label>
            <div className="flex mt-4 items-center gap-2">
              
            <input type="radio" name="status" id="active" className="accent-main"/>
            <label htmlFor="active" className="text-base text-body font-light">Active</label>
            </div>
            <div className="flex mt-4 items-center gap-2">
              
            <input type="radio" name="status" id="not-active" className="accent-main"/>
            <label htmlFor="not-active" className="text-base text-body font-light">Inactive</label>
            </div>
          
          </div>
        </div>
      </from>
    </div>
  );
};

export default Page;
