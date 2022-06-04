import React from "react";

export const SandClock = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="w-6 h-6 mr-2 text-red-900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 6H11V7C11 7.55228 11.4477 8 12 8C12.5523 8 13 7.55228 13 7V6Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 2V4H7V7C7 9.76142 9.23858 12 12 12C9.23858 12 7 14.2386 7 17V20H6V22H18V20H17V17C17 14.2386 14.7614 12 12 12C14.7614 12 17 9.76142 17 7V4H18V2H6ZM9 4H15V7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7V4ZM9 17V20H15V17C15 15.3431 13.6569 14 12 14C10.3431 14 9 15.3431 9 17Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const Crown = () => (
  <svg
    className="w-6 h-6 mr-2 text-red-900"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.5 6.09143L7.21997 10.8114L12.0005 6.03088L16.7811 10.8114L21.5 6.09245V14.9691C21.5 16.626 20.1569 17.9691 18.5 17.9691H5.5C3.84314 17.9691 2.5 16.626 2.5 14.9691V6.09143ZM19.5 10.9087V14.9691C19.5 15.5214 19.0523 15.9691 18.5 15.9691H5.5C4.94771 15.9691 4.5 15.5214 4.5 14.9691V10.9077L7.21997 13.6277L12.0005 8.84717L16.7811 13.6277L19.5 10.9087Z"
      fill="currentColor"
    />
  </svg>
);

export const Users = () => (
  <svg
    className="w-6 h-6 mr-2 text-red-900"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
      fill="currentColor"
    />
    <path
      d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
      fill="currentColor"
    />
  </svg>
);
