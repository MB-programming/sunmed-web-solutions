import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
const Table = ({ headers, action, editLink, viewLink }) => {
  return (
    <table className="w-full mt-5 text-center">
      <thead>
        <tr className="bg-white/15 bg-opacity-10 ">
          <th className="py-6  text-white text-[0.8rem] font-light">SN</th>
          {headers.map((data, index) => (
            <th
              key={index}
              className="py-6 text-white text-[0.8rem] font-light"
            >
              {data.title}
            </th>
          ))}
          {action && (
            <th className="py-6 text-white text-[0.8rem] font-light">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody className="">
        {Array.from({ length: 5 }).map((data, index) => (
          <tr className="border-b border-stroke">
            <td className="py-8 text-white text-[0.8rem] font-light">
              {index + 1}
            </td>
            {[
              '"Jerry Gibson-Miller',
              "Jerry.Gibson-Miller@gmail.com",
              "01018883449",
              "3",
              "active",
            ].map((data, index) => (
              <td className="py-8 text-white text-[0.8rem] font-light">
                {data}
              </td>
            ))}
            <td className="py-8 flex items-center justify-center gap-2 text-textColor text-[0.8rem] font-light">
              {editLink && (
                <Link
                  href={editLink}
                  className="w-[28px] h-[28px] border rounded flex items-center justify-center border-[#FF9B00] hover:bg-[#FF9B00] duration-500 group"
                >
                  <Icon
                    className="text-white group-hover:text-white"
                    icon="la:edit-solid"
                    width="18"
                    height="18"
                  />
                </Link>
              )}
              {viewLink && (
                <Link
                  href={viewLink}
                  className="w-[28px] h-[28px] border rounded flex items-center justify-center border-main hover:bg-main duration-500 group"
                >
                  <Icon
                    className="text-white group-hover:text-white"
                    icon="clarity:eye-show-line"
                    width="18"
                    height="18"
                  />
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
