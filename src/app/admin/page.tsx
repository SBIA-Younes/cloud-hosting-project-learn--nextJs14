import React from 'react'
import AddArticlFrom from './AddArticlFrom'

function AdminPage() {
  return (
    <div className='min-h-[calc(100vh-150px)] flex items-center justify-center px-5 lg:px-20'>
      <div className='shadow p-4 bg-purple-200 rounded w-full'>
        <h2 className='text-xl lg:text-2xl text-gray-700 font-semibold mb-4'>
          Add New Article
        </h2>
        <AddArticlFrom />
      </div>

    </div>
  )
}

export default AdminPage