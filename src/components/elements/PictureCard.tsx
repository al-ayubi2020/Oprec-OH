import Link from 'next/link'
import React from 'react'

export interface PictureCardProps {
  id?: any
  title?: string
  imageSrc?: string
}

const PictureCard: React.FC<PictureCardProps> = ({ id, title, imageSrc }) => {
  return (
    <Link href={`/post/${id}`}>
      <div className="w-fit h-fit shadow-md break-inside-avoid rounded-b-2xl cursor-pointer">
        <div className="h-fit relative">
          <img src={imageSrc} alt={title} className="rounded-t-2xl" />
          <div className="bg-[#3E405B] w-full rounded-b-2xl p-[24px]">
            <div className="h-full w-full flex flex-col justify-between">
              <p className="text-white truncate text-lg font-bold">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PictureCard
