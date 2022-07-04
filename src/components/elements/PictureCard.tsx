import React from 'react'

export interface PictureCardProps {
  id?: any
  title?: string
  imageSrc?: string
}

const PictureCard: React.FC<PictureCardProps> = ({ id, title, imageSrc }) => {
  return (
    <div className="w-fit h-fit shadow-md break-inside-avoid rounded-b-2xl">
      <div className="h-fit relative">
        <img src={imageSrc} alt={title} className="rounded-t-2xl" />
        <div className="bg-[#3E405B] w-full h-[157px] rounded-b-2xl p-[24px]">
          <div className="h-full w-full flex flex-col justify-between">
            <p className="text-white truncate text-lg font-bold">{title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PictureCard
