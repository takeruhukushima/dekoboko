"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { useState, useEffect } from "react";
import { PostType } from "@/types/post";

// Use a consistent date format for serialization
const DATE_FORMAT = 'yyyy-MM-dd';

// Helper to safely parse dates
const safeParseDate = (date: string | Date | undefined): Date | undefined => {
  if (!date) return undefined;
  return date instanceof Date ? date : parseISO(date);
};

interface FilterProps {
  onFilterChange: (type: PostType | null, date: Date | undefined) => void;
}

export default function TimelineFilter({ onFilterChange }: FilterProps) {
  const [selectedType, setSelectedType] = useState<PostType | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [isMounted, setIsMounted] = useState(false);

  // Only render date-related UI after mounting to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Format date consistently
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, DATE_FORMAT, { locale: ja });
  };

  const handleTypeChange = (type: PostType | null) => {
    setSelectedType(type);
    onFilterChange(type, date);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    // Ensure we're working with a proper Date object
    const normalizedDate = newDate ? new Date(newDate.setHours(0, 0, 0, 0)) : undefined;
    setDate(normalizedDate);
    onFilterChange(selectedType, normalizedDate);
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="space-x-2">
        <Button
          variant={selectedType === null ? "default" : "outline"}
          onClick={() => handleTypeChange(null)}
        >
          すべて
        </Button>
        <Button
          variant={selectedType === "totu" ? "default" : "outline"}
          onClick={() => handleTypeChange("totu")}
        >
          凸
        </Button>
        <Button
          variant={selectedType === "boko" ? "default" : "outline"}
          onClick={() => handleTypeChange("boko")}
        >
          凹
        </Button>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={date ? "default" : "outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isMounted && date ? format(date, "PPP", { locale: ja }) : "日付で絞り込み"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
            locale={ja}
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>

      {(selectedType || date) && (
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedType(null);
            setDate(undefined);
            onFilterChange(null, undefined);
          }}
        >
          フィルターをクリア
        </Button>
      )}
    </div>
  );
}
