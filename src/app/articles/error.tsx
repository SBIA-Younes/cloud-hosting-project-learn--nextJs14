'use client'
import Link from 'next/link';

interface ErrorPagePropos {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({error, reset}:ErrorPagePropos) => {
  return (
    <div className='pt-7 text-center'>
      <div className='text-3xl text-red-600 font-semibold'>
        Something went wrong With Article
      </div>
      <h2 className='text-gray-700 my-3 text-xl'>
        Error Message : {error.message}
      </h2>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => reset()}>
        Try again
      </button>
      <Link className='text-xl underline text-blue-700 block mt-6' href={'/'}>
        Go to home page
      </Link>
    </div>
  )
}

export default ErrorPage