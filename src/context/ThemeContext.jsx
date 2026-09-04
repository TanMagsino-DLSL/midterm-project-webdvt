import { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()
const THEME_KEY = 'budget-tracker-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'light'
  })

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}