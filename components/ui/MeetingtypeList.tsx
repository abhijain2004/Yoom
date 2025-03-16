'use client'
import React, { useState } from "react";
import Image from "next/image";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, name, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import ReactDatePicker from 'react-datepicker';
import { Textarea } from "./textarea";
import { Input } from "./input"



const MeetingtypeList = () => {
  const router=useRouter();
  const [meetingState, setMeetingState] = useState("");
  const { user } =useUser();
  const client = useStreamVideoClient();
  const [values,setValues]= useState({
    dateTime:new Date(),
    description:'',
    link:''
  })
  const [callDetail,setCallDetail]=useState<Call>();
  const[flag,setflag]=useState(true);
  const { toast } = useToast();



  const createMeeting= async ()=>{
    setflag(false);
    if(!client || !user ) return;
    try{
      if(!values.dateTime){
        toast({
          title: "Please select date and time",
        })
        return;
      }
      const id=crypto.randomUUID();
      const call=client.call('default',id);
      if(!call){
        throw new Error('Failed to create call');
      } 

      const startsAt = values.dateTime
      ? values.dateTime.toISOString()
      : new Date().toISOString();
    
     const description =values.description || 'Instant Meeting';
     
     // Create call with user information in custom data
     await call.getOrCreate({
      data: {
        starts_at: startsAt,
        custom: {
          description,
          name:user.fullName,
        },
      },
    });

    
   setCallDetail(call);
   
   if(!values.description){
     router.push(`/meeting/${call.id}`);
   }
   setMeetingState("");
   setflag(true);

   toast({
    title: "Meeting Created",
  })
   
    }catch(error) {
      console.log(error);
      toast({
        title: "Failed to create Meeting",
      })
    }
  }

 const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <div
        className="bg-orange-500 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
        onClick={()=>setMeetingState("new")}
      >
        <div className="flex justify-center glassmorphism rounded-[10px] size-12">
          <Image
            src={"/icons/add-meeting.svg"}
            alt="add meeting"
            width={27}
            height={27}
          ></Image>
        </div>
        <div className="text-3xl font-semibold ">
          New Meeting
          <div className="text-lg font-normal mt-2">
          Start an Instant Meeting
        </div>
        </div>
        
      </div>
      <div
        className="bg-sky-600 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
        onClick={()=>setMeetingState("schedule")}
      >
        <div className="flex justify-center glassmorphism rounded-[10px] size-12">
          <Image
            src={"/icons/schedule.svg"}
            alt="schedule"
            width={27}
            height={27}
          ></Image>
        </div>
        <div className="text-3xl font-semibold ">
          Schedule Meeting
          <div className="text-lg font-normal mt-2">
          Plan your meeting
        </div>
        </div>
      </div>
      <div
        className="bg-purple-700 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
        onClick={()=>{
          setMeetingState("recordings")
          router.push('/recordings')
          }}
      >
        <div className="flex justify-center glassmorphism rounded-[10px] size-12">
          <Image
            src={"/icons/recordings.svg"}
            alt="recordings"
            width={27}
            height={27}
          ></Image>
        </div>
        <div className="text-3xl font-semibold ">
          View Recordings
          <div className="text-lg font-normal mt-2">
          Check out your recordings
        </div>
        </div>
      </div>
      <div
        className="bg-yellow-500 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
        onClick={()=>setMeetingState("join")}
      >
        <div className="flex justify-center glassmorphism rounded-[10px] size-12">
          <Image
            src={"/icons/join-meeting.svg"}
            alt="join meeting"
            width={27}
            height={27}
          ></Image>
        </div>
        <div className="text-3xl font-semibold ">
          Join Meeting
          <div className="text-lg font-normal mt-2">
          via Invitation link
        </div>
        </div>
      </div>
      {!callDetail ?(
        <MeetingModal 
        isOpen={meetingState=== "schedule"}
        onClose={()=>setMeetingState("")}
        title="Create Meeting"
        handleClick={createMeeting}
        flag={true}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
            </div>
          </MeetingModal>
      ):<MeetingModal 
      isOpen={meetingState=== "schedule"}
      onClose={()=>setMeetingState("")}
      title="Meeting Created"
      className="text-center"
      handleClick={
        ()=>{
          navigator.clipboard.writeText(meetingLink);
          toast({title:'Link Copied'})
        }
      }
      image="/icons/checked.svg"
      buttonIcon="/icons/copy.svg"
      buttonText="Copy Meeting Link"
      flag={true}
      />}

<MeetingModal
        isOpen={meetingState === 'join'}
        onClose={() => setMeetingState("")}
        title="Type the link here"
        className="text-center "
        buttonText="Join Meeting"
        handleClick={() => router.push(`http://${values.link}`)}
        flag={true}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal 
      isOpen={meetingState=== "new"}
      onClose={()=>setMeetingState("")}
      title="Start an Instant Meeting"
      className="text-center"
      buttonText="Start Meeting"
      handleClick={createMeeting}
      flag={flag}
      />
    </section>
  );
};

export default MeetingtypeList;
