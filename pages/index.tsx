import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { createClient } from '@remixproject/plugin-webview'
import { PluginClient } from '@remixproject/plugin'
import { PluginApi } from '@remixproject/plugin-utils'
import { IRemixApi } from '@remixproject/plugin-api'
import Transpiler from '../src/Transpile'
import { useEffect, useState } from 'react'

export default function Home() {
  const [remixClient, setRemixClient] = useState<PluginClient<any, Readonly<IRemixApi>> & PluginApi<Readonly<IRemixApi>>>();
  useEffect(() => {
    const client = createClient(new PluginClient())
    setRemixClient(client)
  }, [])
  return (
    <>
      <Head>
        <title>Warp Remix Plugin</title>
        <meta name="description" content="Transpile Solidity code to Cairo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/warp.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
         Select a Solidity contract, then transpile it into Cairo by clicking the button. The transpiled contract will be copied to the keyboard.
        </div>
       <Transpiler remixClient={remixClient!} /> 
      </main>
    </>
  )
}
