"use client";

import { useState, useEffect } from "react";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import React from "react";
import MeetingCard from "./MettingCard";
import Loader from "@/components/Loader";
import { toast } from "@/components/ui/use-toast";
import { deleteCall } from "@/actions/stream.actions";

function CallList({ type }: { type: "upcoming" | "ended" | "recordings" }) {
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { endedCalls, upcomingCalls, callRecordings, isLoading, refetchCalls } =
    useGetCalls();
  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recordings":
        return callRecordings;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No previous calls";
      case "upcoming":
        return "No upcoming calls";
      case "recordings":
        return "No recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
        if (type === "recordings") {
          fetchRecordings();
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to fetch recordings",
        });
      }
    };
    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  const handleDelete = async (callId: string) => {
    try {
      const res = await deleteCall(callId, "default");
      if (res.success) {
        toast({
          title: res.message,
        });
        setRefreshTrigger((prev) => prev + 1);
        await refetchCalls();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to delete call",
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!calls) {
    return <h1 className="text-center text-white">{noCallsMessage}</h1>;
  }

  console.log(calls);

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls?.length > 0 ? (
        calls?.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 26) ||
              "No title"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() || "No date"
            }
            isPreviousMeeting={type === "ended"}
            isUpcomingMeeting={type === "upcoming"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : ""}
            buttonText={type === "recordings" ? "Play" : "Join"}
            handleClick={
              type === "recordings"
                ? () =>
                    router.push(`/meeting/${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            handleDelete={() => handleDelete((meeting as Call).id)}
          />
        ))
      ) : (
        <h1 className="text-center text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
}

export default CallList;
