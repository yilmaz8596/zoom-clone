"use client";

import React from "react";
import { useGetCalls } from "@/hooks/useGetCalls";
import MeetingTypeList from "@/components/MeetingTypeList";

function Home() {
  const { upcomingCalls } = useGetCalls();

  const recentCall = upcomingCalls?.sort(
    (a: any, b: any) =>
      new Date(a.state.startsAt).getTime() -
      new Date(b.state.startsAt).getTime()
  )[0];
  console.log(recentCall);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="w-full h-[300px] rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] min-w-fit rounded py-2 px-2 text-center text-base font-normal">
            Upcoming Meeting at:{" "}
            {recentCall?.state.startsAt &&
              new Date(recentCall?.state.startsAt).toLocaleTimeString("en-GB", {
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {new Date().toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h1>
          </div>
          <p className="text-lg font-medium text-sky-1 lg:text-2xl">
            {new Date().toLocaleString("en-US", {
              year: "numeric",
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
}

export default Home;
