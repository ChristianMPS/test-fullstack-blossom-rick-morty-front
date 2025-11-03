"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter } from "./icons/Filter";

interface FilterPanelProps {
  activeStatus: string;
  activeSpecie: string;
  activeGender: string;
  tempStatus: string;
  tempSpecie: string;
  tempGender: string;
  statusOptions: string[];
  specieOptions: string[];
  genderOptions: string[];
  setTempStatus: (value: string) => void;
  setTempSpecie: (value: string) => void;
  setTempGender: (value: string) => void;
  applyFilter: () => void;
}

export const FilterPanel = ({
  activeStatus,
  activeSpecie,
  activeGender,
  tempStatus,
  tempSpecie,
  tempGender,
  statusOptions,
  specieOptions,
  genderOptions,
  setTempStatus,
  setTempSpecie,
  setTempGender,
  applyFilter,
}: FilterPanelProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className={
          activeStatus !== "All" || activeSpecie !== "All" || activeGender !== "All"
            ? "bg-[#EEE3FF]"
            : ""
        }
      >
        <Filter width={20} height={20} className="text-gray-500" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-64 p-4">
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Status</h3>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((option) => (
            <Button
              key={option}
              size="sm"
              variant="outline"
              className={tempStatus === option ? "bg-[#EEE3FF]" : ""}
              onClick={() => setTempStatus(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Specie</h3>
        <div className="flex gap-2 flex-wrap">
          {specieOptions.map((option) => (
            <Button
              key={option}
              size="sm"
              variant="outline"
              className={tempSpecie === option ? "bg-[#EEE3FF]" : ""}
              onClick={() => setTempSpecie(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Gender</h3>
        <div className="flex gap-2 flex-wrap">
          {genderOptions.map((option) => (
            <Button
              key={option}
              size="sm"
              variant="outline"
              className={tempGender === option ? "bg-[#EEE3FF]" : ""}
              onClick={() => setTempGender(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-2">
        <Button
          size="sm"
          className="w-full bg-purple-100 hover:bg-purple-600"
          onClick={applyFilter}
        >
          Apply Filter
        </Button>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);
