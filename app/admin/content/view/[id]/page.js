import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="mt-3">
      <h3 className="text-white mt-5 text-[1.2rem] font-bold">View content</h3>

      <div className="bg-background2 mt-6 px-5 py-5 rounded">
        <p className=" text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Title : </span> Redesign
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Slug : </span> Redesigning
          the company website to improve the user experience.
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Author : </span>Design
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Date : </span>Active
        </p>

        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Tags : </span>
          10/5/2025
        </p>
        <p className="mt-5 text-body text-base font-light">
          {" "}
          <span className="text-white font-medium">Cover image : </span>
          <Image
            src="/servicesDetails.png"
            width={300}
            height={400}
            alt="cover"
            className="mt-3"
          />
        </p>
        <p className="mt-5 text-body text-base font-light flex flex-col justify-start gap-2">
          {" "}
          <span className="text-white font-medium">Content : </span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nobis
          autem inventore deserunt qui laborum accusamus enim voluptatem neque
          repellat, doloribus quisquam dolore consectetur, consequatur sunt
          rerum dicta ipsa asperiores?
        </p>
      </div>
    </div>
  );
};

export default Page;
