"use client"
import React, { use, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import MeetingSetup from '@/components/ui/MeetingSetup'
import MeetingRoom from '@/components/ui/MeetingRoom'
import { useGetCallById } from '@/hooks/useGetCallById'
import Loader from '@/components/ui/Loader'



const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {
  //in the updated version on nextjs params return promise
  const resolvedParams = use(params); 
  const id = resolvedParams.id;
  const {isLoaded}=useUser();
  const[isSetupComplete,setIsSetupComplete]=useState(false);
  const {call,isCallLoading}=useGetCallById(id);// return call object use for all functioning of call

  if(!isLoaded || isCallLoading) return <Loader/>

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetupComplete ? (
              <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
            ):(
              <MeetingRoom/>
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting