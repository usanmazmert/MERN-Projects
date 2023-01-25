import React from 'react'

const Counter = ({type, options, handleOption}) => {
  return (
    <div className="w-[200px] flex justify-between m-2.5">
      <span className='capitalize'>{type}</span>
      <div className="flex items-center justify-between gap-2.5 text-xs text-black">
        <button
          disabled={type === "adult" ? options.adult <= 1 : type === "children" ? options.children <= 0 : options.room <= 1}
          className="w-[30px] h-[30px] border border-solid border-[#0071c2] cursor-pointer bg-white disabled:cursor-not-allowed"
          onClick={() => handleOption(type, "d")}
        >
          -
        </button>
        <span>
          {options[type]}
        </span>
        <button
          className="w-[30px] h-[30px] border border-solid border-[#0071c2] cursor-pointer bg-white disabled:cursor-not-allowed"
          onClick={() => handleOption(type, "i")}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Counter