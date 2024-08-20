"use client";

import React from "react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useGetCallById } from "@/hooks/useGetCallById";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import Loader from "@/components/Loader";
function Meeting({ params: { id } }: { params: { id: string } }) {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { user, isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default Meeting;
