import React from "react";

export default function HeartIconFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.width || 22}
      viewBox="0 0 24 22"
      fill="none"
      {...props}
    >
      <path fillRule="evenodd" d="M12 3.642 6 0 0 3.642v7.803l12 10.231 12-10.23V3.641L18 0l-6 3.642Z" clipRule="evenodd"/>
    </svg>
  );
}