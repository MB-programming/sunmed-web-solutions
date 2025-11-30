"use client";
import LoadingPage from "@/app/Components/Loader/Loader";
import Notifcation from "@/app/Components/Notification";
import Axios from "@/app/lib/Axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = ({params}) => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false);
  const clickRef = useRef();
  const clickRef2 = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [seoImage, setSeoImage] = useState(null);
  const [seoPreview, setSeoPreview] = useState(null);

  // Form state
  useEffect(()=>{
    Axios.get("/projects").then(data =>
      {
      console.log(data)
      
      const filtered = data.data.data.filter(data => data.slug == id )
      console.log(filtered);
        setFormData({
      name: filtered[0].title,
      client: filtered[0].client_name,
      description: filtered[0].description,
      status: filtered[0].status,
      services: filtered[0].services_id ,
      start: filtered[0].start_date,
      end: filtered[0].end_date,
      team: filtered[0].team,
      seoTitle: filtered[0].seo.title,
      seoDescription: filtered[0].description,
      headCode: filtered[0].header,
      bodyCode: filtered[0].body
    })})
  },[])
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    description: "",
    status: "",
    services: "",
    start: "",
    end: "",
    team: "",
    seoTitle: "",
    seoDescription: "",
    headCode: "",
    bodyCode: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleClick = () => {
    clickRef.current.click();
  };

  const handleClick2 = () => {
    clickRef2.current.click();
  };

  // Handle multiple file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Handle SEO image selection and preview
  const handleSeoImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSeoImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setSeoPreview(previewUrl);
    }
  };

  // --------------------- SUBMIT FUNCTION ---------------------
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { name, client, description, status, services, start, end, team, seoTitle, seoDescription, headCode, bodyCode } = formData;

    // ---------------- VALIDATION ----------------
    if (!name) return toast.error("Project title is required!");
    if (!description) return toast.error("Project description is required!");
    if (!status) return toast.error("Project status is required!");
    if (!services) return toast.error("Project services is required!");
    if (!start) return toast.error("Start date is required!");
    if (!end) return toast.error("End date is required!");
    if (new Date(end) < new Date(start))
      return toast.error("End date cannot be before start date!");

    if (selectedFiles.length === 0)
      return toast.error("Please upload at least one file!");

    const submitFormData = new FormData();

    submitFormData.append("title", name);
    submitFormData.append("client_name", client);
    submitFormData.append("slug", name);
    submitFormData.append("description", description);
    submitFormData.append("status", status);
    submitFormData.append("service_id", services);
    submitFormData.append("start_date", start);
    submitFormData.append("end_date", end);
    submitFormData.append("team", team);

    // Append multiple files
    selectedFiles.forEach((file) => {
      submitFormData.append("images[]", file);
    });

    // Append SEO data
    if (seoImage) {
      submitFormData.append("seo[images]", seoImage);
    }
    submitFormData.append("seo[title]", seoTitle);
    submitFormData.append("seo[description]", seoDescription);
    submitFormData.append("head_code", headCode);
    submitFormData.append("body_code", bodyCode);

    try {
      for (let pair of submitFormData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await Axios.post("/projects", submitFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      toast.success("Project saved successfully!");
      console.log("Success:", res.data);
      
      // Reset form
      setSelectedFiles([]);
      setSeoImage(null);
      setSeoPreview(null);
      setFormData({
        name: "",
        client: "",
        description: "",
        status: "",
        services: "",
        start: "",
        end: "",
        team: "",
        seoTitle: "",
        seoDescription: "",
        headCode: "",
        bodyCode: ""
      });
      
    } catch (error) {
      setLoading(false);
      console.error("Submit Error:", error);
      toast.error("Network error — please try again!");
    }
  };
  // ------------------------------------------------------------

  return (
    <div className=" mt-3 px-5 py-6 rounded">
      {loading && <LoadingPage />}
      <Notifcation />
      <h3 className="text-[1.3rem] font-bold text-white">Edit Project</h3>

      <form onSubmit={handleSubmit}>
        {/* --- Project Info Section --- */}
        <div className="mt-4 bg-background2 rounded px-4 py-5">
          <div className="mt-4">
            <label htmlFor="name" className="text-white text-base font-medium">
              Project Title
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter the project title"
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="description"
              className="text-white text-base font-medium"
            >
              Project Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter the project description"
              className="w-full py-3 px-5 h-32 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="client" className="text-white text-base font-medium">
              Client Name
            </label>
            <input
              type="text"
              id="client"
              value={formData.client}
              onChange={handleInputChange}
              placeholder="Enter the client name"
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="status"
              className="text-white text-base font-medium"
            >
              Project Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            >
              <option value="" className="text-body">Select Status</option>
              <option value="pending" className="text-body">pending</option>
              <option value="completed" className="text-body">Completed</option>
              <option value="in_progress" className="text-body">In Progress</option>
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="services"
              className="text-white text-base font-medium"
            >
              Services
            </label>
            <select
              id="services"
              value={formData.services}
              onChange={handleInputChange}
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            >
              <option value="" className="text-body">Select Services</option>
              <option value="1" className="text-body">Active</option>
              <option value="1" className="text-body">Completed</option>
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="start" className="text-white text-base font-medium">
              Start Date
            </label>
            <input
              type="date"
              id="start"
              value={formData.start}
              onChange={handleInputChange}
              placeholder="Enter project start date"
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="end" className="text-white text-base font-medium">
              End Date
            </label>
            <input
              type="date"
              id="end"
              value={formData.end}
              onChange={handleInputChange}
              placeholder="Enter project end date"
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="team" className="text-white text-base font-medium">
              Assigned Team Members
            </label>
            <textarea
              id="team"
              value={formData.team}
              onChange={handleInputChange}
              placeholder="List assigned team members..."
              className="w-full py-3 px-5 h-32 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="file" className="text-white text-base font-medium">
              Upload Files
            </label>
            <input 
              ref={clickRef} 
              type="file" 
              id="file" 
              hidden 
              multiple 
              onChange={handleFileChange}
            />
            <div className="w-full py-3 flex items-center gap-4 px-5 rounded border border-stroke bg-white/5 mt-3">
              <button
                onClick={handleClick}
                type="button"
                className="px-6 duration-300 py-1 text-base font-medium bg-background text-white rounded border border-stroke hover:text-black hover:bg-main hover:text-white"
              >
                Choose Files
              </button>
              <div className="flex-1">
                {selectedFiles.length > 0 ? (
                  <div className="text-white text-base font-medium">
                    <div>{selectedFiles.length} file(s) selected:</div>
                    <div className="text-sm mt-1 max-h-20 overflow-y-auto text-white">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="truncate text-white">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-white text-base font-medium">
                    No files selected
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- SEO Section --- */}
        <div className="mt-5 bg-background2 rounded px-4 py-5">
          <div className="mt-4">
            <label
              htmlFor="seoTitle"
              className="text-white text-base font-medium"
            >
              SEO Title
            </label>
            <input
              type="text"
              id="seoTitle"
              value={formData.seoTitle}
              onChange={handleInputChange}
              placeholder="Enter SEO title here..."
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="seoDescription"
              className="text-white text-base font-medium"
            >
              SEO Description
            </label>
            <input
              type="text"
              id="seoDescription"
              value={formData.seoDescription}
              onChange={handleInputChange}
              placeholder="Enter SEO description here..."
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="seoImage"
              className="text-white text-base font-medium"
            >
              SEO Image
            </label>
            <input 
              ref={clickRef2} 
              type="file" 
              id="seoImage" 
              hidden 
              onChange={handleSeoImageChange}
              accept="image/*"
            />
            
            {/* SEO Image Upload Area */}
            <div
              onClick={handleClick2}
              className="w-full py-4 flex flex-col items-center justify-center border-dashed gap-4 px-5 rounded border border-stroke bg-transparent mt-3 cursor-pointer"
            >
              {seoPreview ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-2">
                    <Image
                      src={seoPreview}
                      alt="SEO Preview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <span className="text-white text-sm font-medium">
                    {seoImage?.name}
                  </span>
                  <span className="text-white text-xs mt-1">
                    Click to change image
                  </span>
                </div>
              ) : (
                <span className="text-white text-base font-medium">
                  Click to upload image
                </span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="headCode"
              className="text-white text-base font-medium"
            >
              Head Code
            </label>
            <input
              type="text"
              id="headCode"
              value={formData.headCode}
              onChange={handleInputChange}
              placeholder="Enter head code here..."
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="bodyCode"
              className="text-white text-base font-medium"
            >
              Body Code
            </label>
            <input
              type="text"
              id="bodyCode"
              value={formData.bodyCode}
              onChange={handleInputChange}
              placeholder="Enter body code here..."
              className="w-full py-3 px-5 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light text-white"
            />
          </div>
        </div>

        {/* --- Buttons --- */}
        <div className="mt-8 flex gap-5 items-center">
          <button
            type="submit"
            className="text-base font-medium text-black bg-main border border-main px-7 hover-main duration-500 py-2 rounded"
          >
            Save Project
          </button>
          <Link
            href="/admin/projects"
            className="text-base bg-white/5 font-medium text-white bg-white border border-main px-14 py-2 rounded hover:bg-main hover:text-white duration-500"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Page;