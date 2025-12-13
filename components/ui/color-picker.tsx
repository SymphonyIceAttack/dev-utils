"use client";

import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-12 h-10 p-1 rounded-lg border-2", className)}
        >
          <div
            className="w-full h-full rounded-md border"
            style={{ backgroundColor: value }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <HexColorPicker color={value} onChange={onChange} />
        <div className="mt-3 flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-md border"
            style={{ backgroundColor: value }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-2 py-1 text-sm font-mono border rounded-md bg-background"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
