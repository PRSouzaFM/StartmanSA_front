import OutTable from '../Components/OutTable'
import React from 'react'
import Navbar from '../Components/Navbar'
function page() {
  return (
    <>
      <Navbar />
      <div className="grid items-center m-20">
        <OutTable />
      </div>
    </>
  )
}

export default page
