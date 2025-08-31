import React from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { TOUR_STEP_IDS } from "@/lib/tour-constants";
import { BookmarkIcon } from "lucide-react";
import { SaveIcon } from "lucide-react";
import { useExaminationContext } from "@/context/use-examination-context";

function QuestionFooter() {
  const {
    clearResponse,
    handleMarkForReviewAndNext,
    handleSaveAndNext,
  } = useExaminationContext();
  
  return (
    <div className="pb-3 pt-4 px-4 border-t mt-auto w-full flex justify-between">
      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={clearResponse}
          id={TOUR_STEP_IDS.CLEAR_RESPONSE}
        >
          <TrashIcon className="size-4" />
          Clear Response
        </Button>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={handleMarkForReviewAndNext}
          id={TOUR_STEP_IDS.MARK_FOR_REVIEW_AND_NEXT}
        >
          <BookmarkIcon className="size-4" />
          Mark for Review and Next
        </Button>
        <Button onClick={handleSaveAndNext} id={TOUR_STEP_IDS.SAVE_AND_NEXT}>
          <SaveIcon className="size-4" />
          Save & Next
        </Button>
      </div>
    </div>
  );
}

export default QuestionFooter;
