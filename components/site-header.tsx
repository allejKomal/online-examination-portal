"use client";

import { ClockIcon } from "lucide-react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useTime } from "@/hooks/use-time";
import { TOUR_STEP_IDS } from "@/lib/tour-constants";
import { useTour } from "./tour";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { isActive } = useTour();
  const { timeLeft } = useTime();
  const examMeta = useSelector((state: RootState) => state.exam.examMeta);
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-medium">{examMeta.examName}</h1>
          <span className="text-primary mt-1.75">
            Hello, <span className="font-medium">{examMeta.userName}</span>
          </span>
        </div>
        <div id={TOUR_STEP_IDS.TIME_LEFT} className={cn("flex gap-2 items-center", isActive && "p-2")}>
          <span className="flex gap-2 items-center">
            <span className="font-medium text-sm">Time Left:</span>
            <Button
              variant="outline"
              className="bg-destructive/50 hover:bg-destructive/70"
            >
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm font-bold">{timeLeft}</span>
            </Button>
          </span>
        </div>
      </div>
    </header>
  );
}
