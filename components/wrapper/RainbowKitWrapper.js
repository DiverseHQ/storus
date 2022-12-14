import React from 'react'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Storus',
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const RainbowKitWrapper = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains} theme={midnightTheme()}>
            {children}
        </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default RainbowKitWrapper
