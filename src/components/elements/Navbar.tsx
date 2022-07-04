import React, { ReactNode, useState } from 'react'
import UploadModal from './UploadModal'
import Filter from './Filter'
import Link from 'next/link'

interface NavbarProps {
  children: ReactNode
}

const Navbar = ({ children }: NavbarProps) => {
  const [isModalOpen, setisModalOpen] = useState(false)
  const [isSearchOpen, setisSearchOpen] = useState(false)

  return (
    <div className="relative">
      <div className="sticky top-0 z-50 h-20 bg-red-300 flex justify-between items-center px-5 md:px-10">
        <Link href="/" className="cursor-pointer">
          <p className="text-xl md:text-4xl font-bold cursor-pointer">
            OPREC OH
          </p>
        </Link>
        <div className="space-x-3">
          <button
            type="button"
            onClick={() => setisModalOpen(true)}
            className="text-xs rounded-md bg-black bg-opacity-20 px-4 py-2 md:text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Upload Image
          </button>
          <button
            type="button"
            onClick={() => setisSearchOpen(!isSearchOpen)}
            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            {isSearchOpen ? 'Close' : 'Search'}
          </button>
        </div>
      </div>
      <div className="sticky top-20 z-50">
        <Filter isSearchOpen={isSearchOpen} />
      </div>
      <UploadModal isModalOpen={isModalOpen} setIsModalOpen={setisModalOpen} />
      <div>{children}</div>
    </div>
  )
}

export default Navbar
