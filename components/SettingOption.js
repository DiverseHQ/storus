import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import * as EpnsAPI from '@epnsproject/sdk-restapi'
import { IoNotificationsOutline, IoNotificationsOffOutline } from 'react-icons/io5'

import { CHANNEL_ADDRESS } from '../utils/utils';


const SettingOption = () => {

    const { theme, setTheme } = useTheme()
    const { data: signer, isError, isLoading } = useSigner()
    const {address, isDisconnected, isConnecting} = useAccount()
    const [isOptedIn, setIsOptedIn] = useState(false)

    const themesArray = ['light', 'dark', 'system']
    let themeIndex = themesArray.indexOf(theme)

    const handelOptIn = async() => {
      // await channels.optIn(signer, CHANNEL_ADDRESS, 80001, address, {
      //   onSuccess: () => {
      //     console.log("Opted in successfully")
      //     setIsOptedIn(true)
      //   }
      // })
      await EpnsAPI.channels.subscribe({
        signer: signer,
        channelAddress: `eip155:80001:${CHANNEL_ADDRESS}`, // channel address in CAIP
        userAddress: `eip155:80001:${address}`, // user address in CAIP
        onSuccess: () => {
         console.log('opt in success');
          setIsOptedIn(true)
        },
        onError: () => {
          console.error('opt in error');
        },
        env: 'staging'
      })
    }

    const handelOptOut = async() => {
      await EpnsAPI.channels.unsubscribe({
        signer: signer,
        channelAddress: `eip155:80001:${CHANNEL_ADDRESS}`, // channel address in CAIP
        userAddress: `eip155:820001:${address}`, // user address in CAIP
        onSuccess: () => {
         console.log('opt out success');
          setIsOptedIn(false)
        },
        onError: () => {
          console.error('opt out error');
        },
        env: 'staging'
      })
      // await channels.optOut(signer, CHANNEL_ADDRESS, 80001, address, {
      //   onSuccess: () => {
      //     console.log("Opted out successfully")
      //     setIsOptedIn(false)
      //   }
      // })

    }

    const checkIfOptedIn = async() => {
      // const isOptedIn = await channels.isUserSubscribed(address, CHANNEL_ADDRESS)
      const subscriptions = await EpnsAPI.user.getSubscriptions({
        user: `eip155:80001:${address}`,
        env: 'staging'
      })
      console.log(subscriptions)
      subscriptions.includes(CHANNEL_ADDRESS) ? setIsOptedIn(true) : setIsOptedIn(false)
      
      // setIsOptedIn(isOptedIn)
    }
    useEffect(() => {
      if(!address) return
      checkIfOptedIn()
    },[address])

    const changeTheme = () => {
        themeIndex = (themeIndex + 1)%3
        setTheme(themesArray[themeIndex])
    }

  return (
    <div className='flex flex-col py-2 bg-s-bg rounded-md'>
        <button className='p-2 px-4 my-2 hover:bg-h-bg' onClick={changeTheme}>Change Theme : {theme}</button>
        <button className='p-2 px-4 my-2 hover:bg-h-bg flex flex-row items-center' onClick={() => {
          if(isOptedIn) handelOptOut()
          else handelOptIn()
        }}>
          <div className='mr-2'>{isOptedIn ? "Opt Out" : "Opt In"}</div>
          {isOptedIn ? <IoNotificationsOffOutline /> : <IoNotificationsOutline />}
          </button>
      </div>
  )
}

export default SettingOption