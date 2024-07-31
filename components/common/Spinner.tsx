import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-30">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900" />
    </div>
  )
}

export default Spinner