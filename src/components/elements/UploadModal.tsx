import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { TailSpin } from 'react-loader-spinner'
import axios from 'axios'

interface UploadModalProps {
  isModalOpen: any
  setIsModalOpen: any
}

type FormData = {
  title: string
  image: string
  category: string
}

const UploadModal: React.FC<UploadModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm<FormData>()
  const onSubmit = handleSubmit(data => handlePost(data))

  const handlePost = async (datapost: any) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', datapost.title)
      formData.append('image', datapost.image[0])
      formData.append('category', datapost.category)
      console.log('data', formData)
      const { data } = await axios
        .post(`https://oh-oprec-be.rorre.xyz/api/post/`, formData, {
          headers: {
            Authorization: `Bearer 8890430f-990a-43da-af7b-71aa0dbfc4b5`,
          },
        })
        .then(res => {
          console.log(res)
          enqueueSnackbar('Berhasil Upload!', {
            variant: 'success',
          })
        })
      setLoading(false)
      return data
    } catch (error) {
      console.log('err', error)
      setLoading(false)
    }
  }

  console.log(process.env.NEXT_PUBLIC_TOKEN)

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-red-300 p-6 text-left align-middle shadow-xl transition-all space-y-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Upload Image
                </Dialog.Title>
                <form className="space-y-5" onSubmit={onSubmit}>
                  <input
                    type="file"
                    {...register('image')}
                    className="w-full h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    id="inline-date"
                  />
                  <input
                    {...register('title')}
                    className="w-full h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    id="inline-date"
                    type="text"
                    placeholder="title"
                  />
                  <select
                    {...register('category')}
                    className="w-full h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <option value="">Select Category...</option>
                    <option value="artwork">Artwork</option>
                    <option value="anime">Anime</option>
                    <option value="meme">Meme</option>
                    <option value="photography">Photography</option>
                    <option value="furry">Furry</option>
                  </select>
                  <div className="flex items-center justify-end">
                    {/* <button
                      onClick={() => {
                        enqueueSnackbar('Berhasil register, silahkan login!', {
                          variant: 'success',
                        })
                        setLoading(!loading)
                      }}
                      type="button"
                      disabled={loading}
                      className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      {loading ? (
                        <TailSpin color="#fca5a5" height={20} width={20} />
                      ) : (
                        'Upload'
                      )}
                    </button> */}
                    <input
                      type="submit"
                      value="Upload"
                      className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UploadModal
