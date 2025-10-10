import React from 'react';
// import { Button } from "@/components/ui/button";
import { DynamicTooltip } from "@/components/atoms/Tooltip/index";
// import { Calender , Tooltip} from "@/assets/svg";


export default function HomePage() {
  // ...existing code...

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h1 className="text-3xl font-bold mb-8">Reusable Tooltip Examples</h1>


      <div className="flex items-center gap-4">
        {/* Example 1: Tooltip on a Button with simple text */}
        {/* <DynamicTooltip 
          content="Tooltip text"
          className="bg-blue-500 text-white p-2 rounded"
          side="top"    // Valid values are: top, right, bottom, left
          align="center" // You can also add align prop for better positioning
          
        >
          <button className="border">Hover me</button>
        </DynamicTooltip> */}

        {/* Example 2: Tooltip with side position */}
        <DynamicTooltip
          content="Tooltip text"
          className="bg-black rounded-[4px]"
          side="top"
          align="center"
        >
          <button className="border p-2">Hover me</button>
        </DynamicTooltip>
      </div>
    </main>
  );
}