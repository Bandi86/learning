import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const useTabFromUrl = () => {
  const location = useLocation()
  const [tab, setTab] = useState<string>('')

  useEffect(() => {
    const urlParams = new URLSearchParams(
      location.search
    )
    const tabFromUrl = urlParams.get('tab')

    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return tab
}

export default useTabFromUrl
