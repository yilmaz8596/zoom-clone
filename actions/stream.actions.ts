"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (!apiKey) {
    throw new Error("Stream API Key is not set");
  }

  if (!apiSecret) {
    throw new Error("Stream Secret Key is not set");
  }

  const client = new StreamClient(apiKey, apiSecret);
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;
  const token = client.createToken(user.id, exp, issued);

  return token;
};

export const deleteCall = async (callId: string, callType: string) => {
  if (!apiKey || !apiSecret) {
    throw new Error("Stream API Key or Secret Key is not set");
  }

  try {
    const client = new StreamClient(apiKey, apiSecret);
    const call = client.video.call(callType, callId);

    await call.delete({ hard: true });

    return { success: true, message: `Call ${callId} deleted successfully` };
  } catch (error) {
    console.error("Error deleting call:", error);
    throw new Error(`Failed to delete call: ${(error as Error).message}`);
  }
};
