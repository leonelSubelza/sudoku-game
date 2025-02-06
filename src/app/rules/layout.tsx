import { ModeToggle } from '@/components/mode-toggle';
import { CornerDownLeft } from 'lucide-react';
import { Raleway } from 'next/font/google'
import Link from 'next/link';
import React from 'react'

const ptSans = Raleway({
  subsets: ["latin"],
  weight: '400'
})

function layout({ children }: { children: React.ReactNode;}) {
  return (
    <div
      className={`${ptSans.className} flex flex-col w-full`}
    >
      <nav className="w-full flex fixed top-[0px] bg-secondary">
        <div
          className="w-[98%] flex m-auto py-2 justify-between items-center 
        md:w-[60%] md:h-auto
        lg:w-[60%]"
        >
          <span className=''>
            <Link
              href={"/"}
              className="flex justify-between items-center hover:cursor-pointer"
            >
              <CornerDownLeft className="mr-1" />
              Volver
            </Link>
          </span>
          <span className="flex justify-between items-center">
            <ModeToggle />
          </span>
        </div>
      </nav>
      <main className="mt-[45px] w-[98%] flex m-auto justify-between items-center
      md:w-[60%] md:h-auto
        lg:w-[60%]">{children}</main>
    </div>
  );
}

export default layout