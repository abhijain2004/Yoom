import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
import { useRouter } from 'next/navigation';

{/* 'personal' => !'personal' =>false =>!false =>true
  undefined =>!undefined => true =>!true => false */}


type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'|'speaker-bottom';
const  MeetingRoom = () => {
  const router=useRouter();
  const searchParams=useSearchParams();
  const isPersonalRoom=!!searchParams.get('personal');
  const [showParticipants, setShowParticipants] = useState(false);
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const {useCallCallingState}=useCallStateHooks();
 const callingState = useCallCallingState(); //Utility hook providing the current calling state of the call. For example, RINGING or JOINED 

  if(callingState != CallingState.JOINED) return <Loader/>

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="left" />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="right" />;
      case 'speaker-bottom':
        return <SpeakerLayout participantsBarPosition="bottom" />;
      
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        
          
          <CallLayout />
        
        <div
          className={cn('h-[calc(100vh-86px)]  hidden ml-2', {
            'block': showParticipants,
          })}
        >{/*CallParticipantsList displays a real-time list of all call participants */}
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={()=> router.push('/') } />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right', 'Speaker-Bottom'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                className='cursor-pointer'
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={()=> setShowParticipants((prev)=>!prev)}>{/*true to false,false to true change the value on click */}
        <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton/>}
        </div>

        </section>
  )
}

export default MeetingRoom