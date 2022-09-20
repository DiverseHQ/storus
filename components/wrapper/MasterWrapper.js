import { ThemeProvider } from 'next-themes'
import React from 'react'
import CustomPopUpModalProvider from './CustomPopUpProvider'
import { NotifyProvider } from './NotifyContext'
import RainbowKitWrapper from './RainbowKitWrapper'

const MasterWrapper = ({ children }) => {
  return (
    <RainbowKitWrapper>
        <NotifyProvider>
            <ThemeProvider defaultTheme = 'system'>
                <CustomPopUpModalProvider>
                    {children}
                </CustomPopUpModalProvider>
            </ThemeProvider>
        </NotifyProvider>
    </RainbowKitWrapper>
  )
}

export default MasterWrapper
