import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


interface MeetingModalProps{
  isOpen:boolean;
  onClose:()=>void;
  title:string;
  className?:string;
  children?: ReactNode;
  handleClick?:()=>void;
  buttonText?:string;
  image?:string;
  buttonIcon?:string;
  flag?:boolean;
}
const MeetingModal = ({isOpen, onClose,title,className,buttonText,handleClick,children,image,buttonIcon,flag}:MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className='flex w-fu;; max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white '>
    <div className='flex flex-col gap-6'>
     {
      image && (
        <div>
          <Image
          src={image} alt="image" 
          height={72}
          width={72}/> 
        </div>
      )
     }
     <DialogTitle className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</DialogTitle>
     {children}
     {flag ? (
            <Button
              className="bg-blue-500 rounded cursor-pointer hover:bg-blue-800"
              onClick={handleClick}
            >
              {buttonIcon && (
                <Image src={buttonIcon} alt="icon" width={13} height={13} />
              )}
              &nbsp;
              {buttonText || "Schedule Meeting"}
            </Button>
          ) : (
            <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
          )}
    </div>
  </DialogContent>
</Dialog>

  )
}

export default MeetingModal