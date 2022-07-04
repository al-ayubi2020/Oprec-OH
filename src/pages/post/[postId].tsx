import axios from 'axios'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TailSpin } from 'react-loader-spinner'

type FormData = {
  title: string
  category: string
}

const Post = () => {
  const router = useRouter()
  const { postId } = router.query
  const { enqueueSnackbar } = useSnackbar()

  const [isEdit, setIsEdit] = useState(false)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm<FormData>()

  useEffect(() => {
    axios
      .get(`https://oh-oprec-be.rorre.xyz/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      })
      .then(res => {
        setData(res.data)
        enqueueSnackbar('Berhasil mengambil data!', {
          variant: 'success',
        })
      })
  }, [postId])

  const handleDelete = () => {
    setLoading(true)
    axios
      .delete(`https://oh-oprec-be.rorre.xyz/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      })
      .then(res => {
        enqueueSnackbar('Berhasil hapus data!', {
          variant: 'info',
        })
        router.push('/')
      })
  }

  const handleEdit = async (datapost: any) => {
    try {
      setLoading(true)
      const data = await axios
        .patch(`https://oh-oprec-be.rorre.xyz/api/post/${postId}`, datapost, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        })
        .then(res => {
          enqueueSnackbar('Berhasil Upload!', {
            variant: 'success',
          })
        })
      reset({ title: '', category: '' })
      setLoading(false)
      router.reload()
      return data
    } catch (error) {
      enqueueSnackbar('Terjadi kesalahan', {
        variant: 'error',
      })
      reset({ title: '', category: '' })
      setLoading(false)
      router.reload()
    }
  }

  const onSubmit = handleSubmit(data => handleEdit(data))

  return (
    <div>
      {data && (
        <div className="w-full flex justify-center mt-10 mb-10">
          <form
            className="lg:w-1/3 w-full sm:w-1/2 mx-10 sm:px-0 flex flex-col space-y-5 font-medium bg-[#3E405B] rounded-2xl"
            onSubmit={onSubmit}
          >
            <img
              src={`https://oh-oprec-be.rorre.xyz${data.url}`}
              alt=""
              className="rounded-t-2xl"
            />
            {isEdit ? (
              <div className="w-full px-5">
                <input
                  {...register('title')}
                  className="w-full h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  id="inline-date"
                  type="text"
                  placeholder="title"
                />
              </div>
            ) : (
              <p className="ml-5 text-white">Judul: {data.title}</p>
            )}
            {isEdit ? (
              <div className="w-full px-5">
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
              </div>
            ) : (
              <p className="ml-5 text-white">Category: {data.category}</p>
            )}
            <p className="ml-5 text-white">
              Waktu Upload: {new Date(data.uploaded_at).toDateString()}
            </p>
            <div className="w-full flex justify-end">
              {isEdit &&
                (loading ? (
                  <button
                    type="button"
                    disabled={loading}
                    className="text-xs rounded-md bg-black bg-opacity-20 px-4 py-2 md:text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-5 mr-5"
                  >
                    <TailSpin color="#fca5a5" height={20} width={20} />
                  </button>
                ) : (
                  <input
                    type="submit"
                    value="Upload"
                    className="text-xs rounded-md bg-black bg-opacity-20 px-4 py-2 md:text-sm font-medium text-green-500 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-5 mr-5"
                  />
                ))}
              {isEdit ? (
                <button
                  onClick={() => setIsEdit(false)}
                  type="button"
                  className="text-xs rounded-md bg-black bg-opacity-20 px-4 py-2 md:text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-5 mr-5"
                >
                  Batal
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  type="button"
                  className="text-xs rounded-md bg-black bg-opacity-20 px-4 py-2 md:text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-5 mr-5"
                >
                  Edit
                </button>
              )}
              {loading ? (
                <button
                  type="button"
                  disabled={loading}
                  className="text-xs rounded-md bg-black bg-opacity-20 px-4 py-2 md:text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-5 mr-5"
                >
                  <TailSpin color="#fca5a5" height={20} width={20} />
                </button>
              ) : (
                <button
                  onClick={() => handleDelete()}
                  type="button"
                  className="text-xs rounded-md bg-black bg-opacity-20 px-4 py-2 md:text-sm font-medium text-red-500 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-5 mr-5"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Post
