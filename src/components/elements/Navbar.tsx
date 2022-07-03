import React, { ReactNode, useState } from 'react'
import UploadModal from './UploadModal'
import Filter from './Filter'

interface NavbarProps {
  children: ReactNode
}

const Navbar = ({ children }: NavbarProps) => {
  const [isModalOpen, setisModalOpen] = useState(false)
  const [isSearchOpen, setisSearchOpen] = useState(false)

  return (
    <div className="sticky top-0">
      <div className="h-20 w-screen bg-red-300 flex justify-between items-center px-5 md:px-10 z-10">
        <p className="text-xl md:text-4xl font-bold">OPREC OH</p>
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
      <Filter array={''} isSearchOpen={isSearchOpen} />
      <UploadModal isModalOpen={isModalOpen} setIsModalOpen={setisModalOpen} />
      <div>{children}</div>
    </div>
  )
}

export default Navbar
