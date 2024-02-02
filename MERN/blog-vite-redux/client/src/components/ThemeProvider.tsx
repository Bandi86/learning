import { useSelector } from 'react-redux'

interface ThemeProviderProps {
  children: React.ReactNode
}
export interface Theme {
  theme: {
    theme: string
  }
}

const ThemeProvider = ({
  children,
}: ThemeProviderProps) => {
  const { theme } = useSelector(
    (state: Theme) => state.theme
  )

  return (
    <div className={theme}>
      <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
        {children}
      </div>
    </div>
  )
}

export default ThemeProvider
