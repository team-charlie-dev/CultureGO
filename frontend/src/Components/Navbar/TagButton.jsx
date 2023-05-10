import React from "react";

import LineIcon from "./LineIcon";

export default function TagButton({state:[currentPage, setCurrentPage]}) {
  const isSelected = currentPage === "tags";
  return (
    <div className="w-10 h-10 justify-center flex-row cursor-pointer">
      <svg
        onClick={() => setCurrentPage("tags")}
        width="100%"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.616 2.82843L2.74527 23.6992C2.32021 24.1242 2.10768 24.3368 1.96794 24.5979C1.82821 24.859 1.76926 25.1537 1.65137 25.7431L0.147087 33.2646C0.0805651 33.5972 0.047304 33.7635 0.141912 33.8581C0.23652 33.9527 0.402825 33.9194 0.735435 33.8529L8.25686 32.3486L8.2569 32.3486C8.84633 32.2307 9.14104 32.1718 9.40214 32.0321C9.66323 31.8923 9.87576 31.6798 10.3008 31.2547L31.1716 10.384C32.5049 9.05065 33.1716 8.38398 33.1716 7.55556C33.1716 6.72713 32.5049 6.06046 31.1716 4.72714L31.1716 4.72713L29.2729 2.82843C27.9395 1.49509 27.2729 0.828427 26.4444 0.828427C25.616 0.828427 24.9494 1.49509 23.616 2.82843Z"
          className={`${isSelected?'fill-primaryDark': 'fill-white'}  transition-all duration-500`}
        />
      </svg>
      {isSelected ? <LineIcon /> : ""}
    </div>
  );
}
