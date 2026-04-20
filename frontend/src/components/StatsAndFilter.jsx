import React from "react";
import { Badge } from "./ui/badge";
import { filterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StatsAndFilter = ({
  completedTaskCount = 0,
  activeTaskCount = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
      {/* Phần thống kê */}
      <div className="flex gap-3 ">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTaskCount} {filterType.active}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {completedTaskCount} {filterType.complete}
        </Badge>
      </div>
      {/* Phần filter */}
      <div className="flex flex-row gap-2 sm:flex-row ">
        {Object.keys(filterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className="capitalize cursor-pointer"
            onClick={() => setFilter(type)}
          >
            <Filter className="size-4" /> {/* icon lọc */}
            {filterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilter;
