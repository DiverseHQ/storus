import { ThemeProvider } from 'next-themes'
import React from 'react'
import CustomPopUpModalProvider from './CustomPopUpProvider'
import { NotifyProvider } from './NotifyContext'
import RainbowKitWrapper from './RainbowKitWrapper'
import StateProvider from "../../utils/StateContext"
const MasterWrapper = ({ children }) => {
  return (
    <RainbowKitWrapper>
        <NotifyProvider>
            <ThemeProvider defaultTheme = 'system'>
                  <StateProvider>
                <CustomPopUpModalProvider>
                    {children}
                </CustomPopUpModalProvider>
                  </StateProvider>
            </ThemeProvider>
        </NotifyProvider>
    </RainbowKitWrapper>
  )
}

export default MasterWrapper
