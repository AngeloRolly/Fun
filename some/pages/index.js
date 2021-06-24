import React, { useState } from "react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { FileSelector, Button } from 'react-rainbow-components';
import supabase from "../src/supabase"
import {nanoid} from "nanoid"

export default function Home() {
  const [files, setFiles] = useState([]);


  const handleChange = value => {
    setFiles(value);
  }

  const upload =  async () => {
    const name = `${files[0].name}${nanoid(4)}`
    const {data, error} = await supabase.storage.from('avatars').upload(name, files[0])
    console.log("data", data, "error", error);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <FileSelector
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          label="File selector"
          placeholder="Drag & Drop or Click to Browse"
          bottomHelpText="Select only one file"
          variant="multiline"
          onChange={handleChange}
        />

        <Button onClick={upload} style={{margin: "30px auto"}} variant="base" label="Upload" />

      </main>
    </div>
  )
}
