import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { SnackbarProvider } from 'notistack'
import Navbar from '../components/elements/Navbar'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      classes={{
        variantSuccess: 'snackbar-sans',
        variantError: 'snackbar-sans',
        variantInfo: 'snackbar-sans',
        variantWarning: 'snackbar-sans',
      }}
      preventDuplicate={true}
    >
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </SnackbarProvider>
  )
}

export default MyApp
