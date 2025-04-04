import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const NavBar = () => {
  return (
    <nav className='fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 flex  justify-between items-center'>
      <Link href={"/"} className='flex items-center gap-1'>
      <Image src="/icons/logo.svg" alt="logo" width={32} height={32} className='max-sm:size-10'
      ></Image>
      <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Yoom</p>
      </Link>
       <div className='flex justify-between items-center gap-4'>
        <SignedIn>
          <UserButton appearance={{elements:{avatarBox:"h-[38px] w-[38px]"}}}></UserButton>
        </SignedIn>
        <MobileNav></MobileNav>
       </div>
    </nav>
  )
}

export default NavBar