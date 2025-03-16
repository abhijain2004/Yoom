import MeetingtypeList from "@/components/ui/MeetingtypeList";
import React from "react";

const Home = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const formattedDate = now.toLocaleDateString('en-US', options);
  
  const options1: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  const formattedTime: string = now.toLocaleTimeString('en-US', options1);
  
  
  

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 md:p-8 lg:p-11 ">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-6xl">{formattedTime}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl  lg:ml-2 ">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
      <MeetingtypeList></MeetingtypeList>
    </section>
  );
};

export default Home;
