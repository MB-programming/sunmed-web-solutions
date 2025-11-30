import React from "react";

const Page = () => {
  const OrderSummary = [
    {
      header:"Services",
      text:"E-commerce Website Development"
    },
    {
      header:"Priority",
      text:"Medium"
    },
    {
      header:"Channel",
      text:"Website form"
    },
    {
      header:"Invoice Number",
      text:"INV-7843"
    },
    {
      header:"Invoice Amount",
      text:"12,500 EGP"
    },
  ]
  const CustomerInfo = [
  
    {
      header:"Name",
      text:"Medium"
    },
    {
      header:"Email",
      text:"Website form"
    },
    {
      header:"Company",
      text:"INV-7843"
    },
    {
      header:"Phone",
      text:"12,500 EGP"
    },
  ]
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-[1.3rem]">View Order #1001</h3>
        <div className="flex items-center gap-2">
          <button className="text-white bg-background2 border border-stroke px-8 py-2 rounded-sm text-sm">
            Back
          </button>
          <button className="text-white bg-background2 border border-stroke px-8 py-2 rounded-sm text-sm">
            Print
          </button>
          <button className="text-white bg-background2 border border-stroke px-6 py-2 rounded-sm text-sm">
            Export PDF
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <div className="bg-background2 h-[260px]  rounded p-5 flex-1">
          <h4 className="text-white text-[1.2rem]">Order summary</h4>
          {
            OrderSummary.map((data,index)=>(
          <div key={index} className="flex items-center justify-start gap-3 mt-4">
            <p className="text-white text-base font-medium">{data.header}</p>
            <p className="text-body text-base font-light">{data.text}</p>
          </div>

            ))
          }
        </div>
        <div className="bg-background2 h-[260px]  rounded p-5 flex-1">
          <h4 className="text-white text-[1.2rem]">Customer information</h4>
          {
            CustomerInfo.map((data,index)=>(
          <div key={index} className="flex items-center justify-start gap-3 mt-4">
            <p className="text-white text-base font-medium">{data.header}</p>
            <p className="text-body text-base font-light">{data.text}</p>
          </div>

            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
