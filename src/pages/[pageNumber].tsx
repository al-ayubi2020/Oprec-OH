import axios from 'axios'
import type { NextPage } from 'next'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import PictureCard from '../components/elements/PictureCard'
import { useRouter } from 'next/router'
import Pagination from '../components/elements/Pagination'

const Page: NextPage = () => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  useEffect(() => {
    axios
      .get(`https://oh-oprec-be.rorre.xyz/api/post/`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      })
      .then(res => {
        setPosts(res.data)
        setCount(res.data.length)
        enqueueSnackbar('Berhasil mengambil data!', {
          variant: 'success',
        })
      })
  }, [])

  const { pageNumber } = router.query

  const intPageNumber = Number(pageNumber)
  const totalPage = Math.ceil(count / 10)

  const paginations = []
  for (let i = 1; i <= totalPage; i++) {
    paginations.push({ number: i })
  }

  return (
    <div>
      <div className=" min-h-screen p-20">
        <div className=" w-full lg:columns-3 md:columns-2 columns-1 space-y-5">
          {posts.map(post => (
            <PictureCard
              id={post?.id}
              key={post?.id}
              title={post.title}
              imageSrc={`https://oh-oprec-be.rorre.xyz${post.url}`}
            />
          ))}
        </div>
        <Pagination intPageNumber={intPageNumber} paginations={paginations} />
      </div>
    </div>
  )
}

export default Page
