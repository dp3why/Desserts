import React, { useState } from 'react'
import '../styles/globals.css'

export const AppContext = React.createContext({
  darkMode: false,
})

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(AppContext.darkMode)

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
