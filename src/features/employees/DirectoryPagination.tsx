import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EmployeeDirectoryProps } from "../../types/employeeDirectory";

export function DirectoryPagination({ controller }: EmployeeDirectoryProps) {
  const { grid, selection, count, page, pages, pageSize, setPageSize } = controller;

  return (
    <footer className="grid-footer flex items-center justify-between border-t border-[#e5eadd] px-5 py-3.5 text-[10px] text-[#97a087] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2.5 max-[600px]:p-3">
      <span>
        {selection > 0 ? `${selection} selected · ` : ""}Showing{" "}
        <strong className="font-medium text-[#6e7c5e]">
          {count ? page * pageSize + 1 : 0}–
          {Math.min((page + 1) * pageSize, count)}
        </strong>{" "}
        of <strong>{count}</strong> employees
      </span>
      <div className="flex items-center gap-1.5 max-[600px]:w-full max-[600px]:justify-end">
        <label className="mr-3 max-[600px]:mr-auto">
          Rows per page{" "}
          <select
            className="ml-1.5 rounded border border-[#e3e9da] bg-white p-1 text-[10px] text-[#8c977c]"
            aria-label="Rows per page"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <button
          aria-label="Previous page"
          disabled={page === 0}
          onClick={() => grid.current?.api.paginationGoToPreviousPage()}
        >
          <ChevronLeft size={15} />
        </button>
        {Array.from({ length: Math.max(1, pages) }, (_, i) => (
          <button
            key={i}
            className={`grid h-[26px] min-w-[26px] place-items-center rounded border border-[#e7ebdf] text-[10px] ${i === page ? "border-[#dfe8d4] bg-[#eff4e8] text-[#658451]" : ""}`}
            onClick={() => grid.current?.api.paginationGoToPage(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          aria-label="Next page"
          disabled={page >= pages - 1}
          onClick={() => grid.current?.api.paginationGoToNextPage()}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </footer>
  );
}
