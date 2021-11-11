import Head from 'next/head'

import { FirstHalf } from '../components/FirstHalfEditor'
import { EditorSlate } from '../components/Editor'

export default function Home() {
  return (
    <div className='min-h-screen py-16'>
      <Head>
        <title>SlateJS + NextJS</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-center flex-1 w-full px-20 text-center'>
        <h1 className='text-6xl font-bold'>
          Start <span className='text-blue-600'>Slate.js!</span>
        </h1>

        <p className='mt-3 text-2xl'>
          Get started by editing{' '}
          <code className='p-3 font-mono text-lg bg-gray-100 rounded-md'>
            pages/index.js
          </code>
        </p>

        <section className='max-w-md mt-16'>
          <h2 className='text-2xl font-semibold'>First Half</h2>
          <div className='w-full px-4 py-2 mt-2 border border-gray-500 rounded-md'>
            <FirstHalf />
          </div>
        </section>
        <section className='mt-16'>
          <h2 className='text-2xl font-semibold'>Second Half</h2>
          <EditorSlate />
        </section>
      </main>
    </div>
  )
}
