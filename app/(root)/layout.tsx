import React from "react";
import { StreamVideoProvider } from "@/providers/StreamClientProvider";
function Rootlayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
}

export default Rootlayout;
