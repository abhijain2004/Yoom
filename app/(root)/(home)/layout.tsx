import SideBar from '@/components/ui/SideBar'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

const HomeLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='relative'>
      <NavBar/>
      <div className='flex '>
        <SideBar />
        <section className='flex flex-1 min-h-screen flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
         <div className='w-full'>
         {children}
         </div>
        </section>
      </div>
      
    </main>
  )
}

export default HomeLayout