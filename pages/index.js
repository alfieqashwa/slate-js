import Head from 'next/head'

import { FirstHalf } from '../components/FirstHalf'
import { SecondHalf } from '../components/SecondHalf'

export default function Home() {
  return (
    <div className='min-h-screen py-16 bg-gray-200'>
      <Head>
        <title>SlateJS + NextJS</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-center flex-1 w-full px-20 text-center'>
        <h1 className='text-6xl font-bold'>
          Start <span className='text-blue-600'>Slate.js!</span>
        </h1>
        <section className='w-1/4 max-w-lg mt-16'>
          <h2 className='text-2xl font-semibold text-gray-700'>First Half</h2>
          <div className='w-full px-4 py-2 mt-2 text-gray-500 border-2 border-gray-300 rounded-md shadow-md bg-gray-50'>
            <FirstHalf />
          </div>
        </section>
        <section className='max-w-full mt-16'>
          <h2 className='text-2xl font-semibold text-gray-700'>Second Half</h2>
          <SecondHalf />
        </section>
      </main>
    </div>
  )
}
