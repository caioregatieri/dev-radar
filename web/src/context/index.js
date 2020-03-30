import React, { useState } from 'react'

export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: () => {}
})

export const ThemeContextProvider = (props) => {

  const setTheme = (theme) => {
    setState({...state, theme: theme})
  }

  const initState = {
    theme: 'light',
    setTheme: setTheme
  } 

  const [state, setState] = useState(initState)

  return (
    <ThemeContext.Provider value={state}>
      {props.children}
    </ThemeContext.Provider>
  )
}