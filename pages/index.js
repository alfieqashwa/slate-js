import Head from 'next/head'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Create Next App</title>
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

        <div className='flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full'></div>
      </main>
    </div>
  )
}
