import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { SnackbarProvider } from 'notistack'
import Navbar from '../components/elements/Navbar'
import { NavbarContextProvider } from '../components/elements/NavbarContext'

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
      <NavbarContextProvider>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </NavbarContextProvider>
    </SnackbarProvider>
  )
}

export default MyApp
