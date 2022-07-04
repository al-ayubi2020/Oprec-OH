import axios from 'axios'
import type { NextPage } from 'next'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import PictureCard from '../components/elements/PictureCard'
import { useRouter } from 'next/router'
import Pagination from '../components/elements/Pagination'
import { useNavbarContext } from '../components/elements/NavbarContext'

const Page: NextPage = () => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { arrayFilter, setArrayFilter, isSearch } = useNavbarContext()

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
    paginations.push({
      number: i,
      start: i == 1 ? 0 : (i - 1) * 10,
      end: i == 1 ? 9 : i * 10 - 1,
    })
  }

  const newPost = posts.slice(
    intPageNumber == 1 ? 0 : (intPageNumber - 1) * 10,
    intPageNumber == 1 ? 9 : intPageNumber * 10 - 1
  )

  setArrayFilter(posts)

  const usePost = isSearch ? arrayFilter : newPost

  return (
    <div>
      <div className=" min-h-screen p-20">
        <div className=" w-full lg:columns-3 md:columns-2 columns-1 space-y-5">
          {usePost.map(post => (
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
