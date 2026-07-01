"use client";

import SobreMim from "@/components/SobreMim";
import Chat from "@/components/Chat";
import useIsMobile from "@/hooks/useIsMobile";

export default function HomePage() {
  const { isMobile } = useIsMobile();

  if (isMobile) {
    return (
      <main className="home-page">
        <Chat />
      </main>
    );
  }

  return (
    <main className="home-page home-page-desktop">
      <div className="w-full md:w-1/2 bg-white">
        <SobreMim />
      </div>
      <div id="chat-section" className="w-full md:w-1/2 bg-gray-50">
        <Chat />
      </div>
    </main>
  );
}
