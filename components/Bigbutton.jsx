import React from 'react'

const Bigbutton = ({ text }) => {
  return (
    <button
      className="w-full rounded-lg bg-yellow-600 
          py-4 
          px-6 text-xl font-extrabold uppercase tracking-wide hover:bg-[#fabd17]"
    >
      {text}
    </button>
  )
}

export default Bigbutton
