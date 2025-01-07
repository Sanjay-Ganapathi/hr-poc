import Link from "next/link";

import RadialPatternWithRadar from "@/components/radar";
import { ShinyButton } from "@/components/ui/shiny-button";




export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-black flex-col gap-4">
      <RadialPatternWithRadar />

      <Link href="/chat" >
        <ShinyButton text="Chat ✨" />
      </Link>


    </div>
  );
}
