import { LeftPanel } from "@/components/layout/LeftPanel";
import { CenterPanel } from "@/components/layout/CenterPanel";
import { RightPanel } from "@/components/layout/RightPanel";

export default function Home() {
  return (
    <main className="h-screen w-full flex overflow-hidden bg-[#0f172a]">
      <div className="w-[320px] shrink-0 hidden lg:block">
        <LeftPanel />
      </div>
      
      <div className="flex-1 min-w-0">
        <CenterPanel />
      </div>
      
      <div className="w-[320px] shrink-0 hidden xl:block">
        <RightPanel />
      </div>
    </main>
  );
}
