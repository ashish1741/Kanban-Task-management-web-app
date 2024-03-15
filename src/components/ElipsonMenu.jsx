import React from 'react'

function ElipsonMenu({ isElipsOpen ,  setIsElipsOpen , type , setopenEditModel, setOpenDeleteModel}) {
  return (
    <div className={type === 'Boards' ? 'absolute top-16  right-5' : 'absolute top-6 right-4 '} onClick={() => setIsElipsOpen(false)}>
      <div className="flex justify-end items-center" >
        <div className="w-40 text-sm z-50 font-medium shadow-md bg-white dark:bg-[#20212c] space-y-4 py-4 px-4 rounded-lg h-auto pr-12">
          <p className='cursor-pointer dark:text-gray-400  text-gray-700 capitalize ' onClick={() => setopenEditModel()}>Edit {type}</p>
          <p className='cursor-pointer text-red-700 capitalize' onClick={() => setopenEditModel}>Delete {type}</p>
        </div>
      </div>

    </div>
  )
}

export default ElipsonMenu 