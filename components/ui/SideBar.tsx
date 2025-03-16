'use client'
import React from 'react'
import { sidebarLinks } from '../constants'
import { usePathname } from 'next/navigation'
import Link  from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const SideBar = () => {
  const pathname = usePathname();
  return (
    <section className='sticky left-0 top-0 h-screen flex w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white lg:w-[290px] max-sm:hidden'>
      <div className='flex  flex-col text-white gap-6'>
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route ;
        return (
          <Link href={link.route} key={link.label} className={cn('flex gap-4 rounded items-center p-3  justify-start ',{'bg-blue-1  ':isActive},)}>
          
            <Image
            src={link.imgUrl}
            alt={link.label}
            width={24}
            height={24}
            />
          <p className='text-md font-semibold max-lg:hidden'>{link.label}</p>
          </Link>
        )
})}
      </div>
    </section>
  )
}

export default SideBar