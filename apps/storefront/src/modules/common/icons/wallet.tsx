import React, { SVGProps } from 'react'

const Wallet = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE */}
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 20H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z" />
        <path
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 14a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"
        />
        <path d="M18 7V5.603a2 2 0 0 0-2.515-1.932l-11 2.933A2 2 0 0 0 3 8.537V9" />
      </g>
    </svg>
  )
}

export default Wallet
