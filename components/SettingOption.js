import { useTheme } from 'next-themes'
import React from 'react'

const SettingOption = () => {

    const { theme, setTheme } = useTheme()


    const themesArray = ['light', 'dark', 'system']
    let themeIndex = themesArray.indexOf(theme)

    const changeTheme = () => {
        themeIndex = (themeIndex + 1)%3
        setTheme(themesArray[themeIndex])
    }

  return (
    <div className='flex flex-col py-2 bg-s-bg rounded-md'>
        <button className='p-2 my-2' onClick={changeTheme}>Change Theme : {theme}</button>
      </div>
  )
}

export default SettingOption