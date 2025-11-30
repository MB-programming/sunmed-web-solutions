"use client"
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ConfirmModal = ({ setShowModal }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      modalRef.current,
      { scale: 0.8, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
    );
  }, []);

  const closeModal = () => {
    const tl = gsap.timeline({
      onComplete: () => setShowModal(false),
    });

    tl.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 40,
      duration: 0.25,
      ease: "power2.in",
    });

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      },
      "-=0.15"
    );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed top-0 left-0 h-screen w-screen bg-[#151A20] bg-opacity-60 flex items-center justify-center"
    >
      <div
        ref={modalRef}
        className="border border-stroke bg-background2 rounded-lg py-8 px-16 text-center"
      >
        <h3 className="text-[1.2rem] text-white font-semibold">
          Confirm Completion
        </h3>

        <p className="max-w-[480px] text-[0.9rem] leading-6 text-center text-white/90 font-light mt-3">
          Are you sure you want to mark this order as Completed ? <br />
          This action cannot be undone.
        </p>

        <div className="mt-4 flex items-center justify-center gap-3 w-[95%] mx-auto">

          <button
            onClick={closeModal}
            className="bg-[#00FF29] text-[#00FF29] bg-opacity-30 text-[0.9rem] py-3 px-2 rounded-sm flex-1 
              transition duration-300 hover:bg-opacity-50 hover:shadow-[0_0_5px_#00FF29] hover:text-white"
          >
            Yes, Complete order
          </button>

          <button
            onClick={closeModal}
            className="bg-[#E80054] text-[#E80054] bg-opacity-20 text-base py-3 px-2 rounded-sm flex-1 
              transition duration-300 hover:bg-opacity-40  "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
