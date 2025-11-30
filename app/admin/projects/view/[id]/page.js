"use client";
import Axios from "@/app/lib/Axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios.get("/projects");
        const filtered = response.data.data.filter(item => item.slug == id);
        setData(filtered[0]);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="bg-background2 px-5 py-6 rounded animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
        <div className="flex items-center gap-4">
          <div className="h-9 bg-gray-700 rounded w-20"></div>
          <div className="h-9 bg-gray-700 rounded w-20"></div>
        </div>
      </div>

      <div className="h-6 bg-gray-700 rounded w-1/4 mt-6"></div>

      <div className="mt-5 space-y-4">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>

      <div className="mt-5 h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="mt-5 h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="mt-5 h-4 bg-gray-700 rounded w-1/4"></div>

      <div className="h-6 bg-gray-700 rounded w-1/4 mt-6"></div>
      <div className="mt-4 h-4 bg-gray-700 rounded w-full"></div>

      <div className="h-6 bg-gray-700 rounded w-1/4 mt-6"></div>
      <div className="mt-4 border bg-gray-700 border-stroke rounded p-4 h-12"></div>

      <div className="h-10 bg-gray-700 rounded w-32 mt-5"></div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!data) {
    return (
      <div className="bg-background2 px-5 py-6 rounded text-center">
        <h3 className="text-[1.4rem] font-bold text-white">Project Not Found</h3>
        <p className="text-body mt-4">The project you're looking for doesn't exist.</p>
        <Link
          href="/admin/projects"
          className="inline-block text-black hover-main bg-main font-medium mt-5 px-6 py-2 rounded hover:shadow-light duration-300"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const team = [
    "Ahmed - Project Manager",
    "Nada - UI/UX Designer",
    "Omar - Frontend Developer",
    "Mohamed - Backend Developer",
  ];

  return (
    <div className="bg-background2 px-5 py-6 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-[1.4rem] font-bold text-white">
          {data.title || "E-commerce Platform"}
        </h3>
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/projects/edit/${data?.slug}`}
            className="text-base text-white font-medium border border-stroke px-5 hover:bg-main hover:text-white duration-500 py-1 "
          >
            Edit
          </Link>
          <button className="text-base text-[#E80054] font-medium bg-[#E80054] bg-opacity-10 px-5 hover:text-white hover:bg-opacity-100 duration-500 py-1 ">
            Delete
          </button>
        </div>
      </div>

      <h3 className="text-[1.1rem] font-medium text-white mt-6">
        Basic Information
      </h3>

      <p className="mt-5 text-body text-base font-light">
        <span className="text-white font-medium">Description: </span>
        {data?.description}
      </p>

      <p className="mt-5 text-body text-base font-light">
        <span className="text-white font-medium">Start Date: </span>
        {data?.start_date}
      </p>

      <p className="mt-5 text-body text-base font-light">
        <span className="text-white font-medium">End Date: </span>
        {data?.end_date}
      </p>

      <p className="mt-5 text-body text-base font-light">
        <span className="text-white font-medium">Priority: </span>
        High
      </p>

      <h4 className="text-[1.1rem] font-medium text-main mt-6">
        Team Members
      </h4>
      <p className="text-white text-base mt-4">

      {data?.team}
      </p>

      <h4 className="text-[1.1rem] font-medium text-main mt-6">
        Files and Attachments
      </h4>

      <div className="mt-4 border bg-white/5 border-stroke rounded p-4 text-[0.9rem] text-body font-light">
        requirements.pdf
      </div>

      <button className="text-black hover-main bg-main font-medium mt-5 px-6 py-2 rounded hover:shadow-light duration-300">
        Save Changes
      </button>
    </div>
  );
};

export default Page;