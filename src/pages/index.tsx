import type { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => <div></div>

export default Home

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/1',
      permanent: false,
    },
  }
}
