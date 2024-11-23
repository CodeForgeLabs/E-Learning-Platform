import React from 'react'

const CardSkeleton = () => {
  return (
    <div className="px-4 border rounded-md border-gray-600 border-opacity-40">
  <div className="border-b-[1px] border-gray-600 border-opacity-30 py-4 my-3">
    <p className="text-2xl py-2 skeleton h-6 w-1/2"></p>
    <p className="flex text-gray-400 text-sm space-x-2 mt-2">
      <span className="skeleton h-4 w-12"></span>
      <span>&#183;</span>
      <span className="skeleton h-4 w-12"></span>
      <span>&#183;</span>
      <span className="skeleton h-4 w-12"></span>
    </p>
  </div>

  <div className="flex max-tablet:flex-col">
    <div className="flex tablet:flex-col max-pc:items-center max-tablet:w-full tablet:w-12 mb-4">
      <div className="skeleton mask rounded-full max-tablet:w-11 tablet:w-12 tablet:h-12"></div>
      <p className="text-secondary ml-2 tablet:hidden skeleton h-4 w-28"></p>
      <div className="flex flex-col items-center w-full mt-4 max-tablet:hidden">
        <button className="flex justify-center items-center w-full h-12 rounded-t-md">
          <div className="skeleton w-4 h-4"></div>
        </button>
        <span className="skeleton h-4 w-6"></span>
        <button className="flex justify-center items-center w-full h-12 rounded-b-md">
          <div className="skeleton w-5 h-5"></div>
        </button>
      </div>
    </div>

    <div className="px-6 tablet:w-[85%]">
      <p className="text-secondary max-tablet:hidden mb-1 skeleton h-4 w-28"></p>
      <p className="skeleton h-4 w-full mb-2"></p>
      <p className="skeleton h-4 w-full mb-2"></p>
      <p className="skeleton h-4 w-full mb-2"></p>
      <p className="skeleton h-4 w-full mb-2"></p>
      <p className="skeleton h-4 w-3/4"></p>
    </div>
  </div>
</div>

  )
}

export default CardSkeleton
