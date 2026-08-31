"use client";

export type FilterStatus = "all" | "active" | "completed";

interface TodoTombolFilternyaProps {
  remainingCount: number;
  currentFilter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
}

export default function TodoTombolFilternya({
  remainingCount,
  currentFilter,
  setFilter,
}: TodoTombolFilternyaProps) {
  const FilterButton: FilterStatus[] = ["all", "active", "completed"];

  return (
    <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100 text-xs font-medium">
      {/* Sisa tugas */}
      <span className="text-gray-400">
        {remainingCount} {remainingCount === 1 ? "task" : "tasks"} remaining
      </span>

      {/* Group tombol filter */}
      <div className="flex items-center gap-1 bg-stone-100/70 p-1 rounded-full">
        {FilterButton.map((filter) => {
          const isActive = currentFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setFilter(filter)}
              className={`px-3 py-1 rounded-full transition-all text-[11px] uppercase tracking-wider ${
                isActive
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
