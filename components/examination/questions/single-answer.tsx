import React from "react";
import { QuestionOption } from "@/types/question.type";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface SingleAnswerProps {
  option: QuestionOption;
  checked: boolean;
  onCheckedChange?: (optionId: string, checked: boolean) => void;
  id: string;
}

function SingleAnswer({
  option,
  checked,
  onCheckedChange,
  id,
}: SingleAnswerProps) {
  return (
    <div
      key={`single-${id}-${option.id}`}
      className="flex items-center space-x-2"
    >
      <Label
        htmlFor={`single-${id}-${option.id}`}
        className={cn(
          "flex items-center gap-3 bg-muted/20 p-3 rounded-md cursor-pointer w-full",
          checked && "bg-muted"
        )}
        key={`single-${id}-${option.id}`}
      >
        <Checkbox
          id={`single-${id}-${option.id}`}
          checked={checked}
          onCheckedChange={(checked) =>
            onCheckedChange?.(option.id, checked as boolean)
          }
        />
        {option.option}
      </Label>
    </div>
  );
}

export default SingleAnswer;
