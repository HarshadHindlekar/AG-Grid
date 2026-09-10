import { X, Mail, Layers, Check, ArrowRight } from "lucide-react";
import type { DashboardDialogProps } from "../types/layout";
import { money } from "../utils/format";
import { Avatar } from "./Avatar";

export function DashboardDialog({
  selected,
  onClose,
  totalEmployees,
}: DashboardDialogProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172f2466] p-5 backdrop-blur-[3px]"
      onClick={() => {
        onClose();
      }}
    >
      <section
        className="relative max-h-[90vh] w-[480px] overflow-auto rounded-[15px] bg-white p-8 shadow-[0_20px_80px_#10271933] max-[600px]:p-[25px]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-dialog-title"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
          if (e.key === "Tab") {
            const items = e.currentTarget.querySelectorAll<HTMLElement>(
              "button, a[href], input, select",
            );
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
        }}
      >
        <button
          autoFocus
          className="absolute right-[17px] top-4 text-[#85917b]"
          aria-label="Close dialog"
          onClick={() => {
            onClose();
          }}
        >
          <X size={20} />
        </button>
        <div>
          {selected ? (
            <>
              <Avatar person={selected} large />
              <h2
                id="dashboard-dialog-title"
                className="font-display text-[24px] tracking-[-.7px]"
              >
                {selected.firstName} {selected.lastName}
              </h2>
              <p className="my-[7px] mb-[13px] text-[12px] leading-[1.7] text-[#8c9782]">
                {selected.position} · {selected.department}
              </p>
              <a
                className="flex items-center gap-[7px] text-[12px] text-[#337555]"
                href={`mailto:${selected.email}`}
              >
                <Mail size={15} />
                {selected.email}
              </a>
              <div className="my-[25px] grid grid-cols-2 gap-[22px] border-y border-[#e6ebdf] py-[22px]">
                {[
                  ["Status", selected.isActive ? "Active" : "Inactive"],
                  ["Location", selected.location],
                  ["Annual salary", money(selected.salary)],
                  ["Performance", `${selected.performanceRating} / 5`],
                  ["Projects completed", selected.projectsCompleted],
                  ["Hire date", selected.hireDate],
                  ["Manager", selected.manager || "No manager"],
                  ["Age", selected.age],
                ].map(([k, v]) => (
                  <div key={k}>
                    <small className="mb-1.5 block text-[10px] text-[#9aa58d]">
                      {k}
                    </small>
                    <strong className="text-[12px] font-medium">{v}</strong>
                  </div>
                ))}
              </div>
              <h3 className="mb-3 text-[12px]">Skills & expertise</h3>
              <div className="flex flex-wrap gap-[7px]">
                {selected.skills.map((s) => (
                  <span
                    className="rounded-[5px] border border-[#e2e9d8] bg-[#f0f4ea] px-[9px] py-1.5 text-[10px] text-[#6c805a]"
                    key={s}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="mb-4 block text-[#397956]">
                <Layers size={28} />
              </span>
              <h2
                id="dashboard-dialog-title"
                className="font-display text-[24px] tracking-[-.7px]"
              >
                A clearer view of your team.
              </h2>
              <p className="my-[7px] mb-[13px] text-[12px] leading-[1.7] text-[#8c9782]">
                Explore the {totalEmployees} employees provided in your
                assessment dataset.
              </p>
              <ul className="my-[22px] list-none p-0">
                <li className="my-4 flex items-center gap-2.5 text-[12px] text-[#7f8c70]">
                  <Check size={16} />
                  Search names, emails, roles, and skills.
                </li>
                <li className="my-4 flex items-center gap-2.5 text-[12px] text-[#7f8c70]">
                  <Check size={16} />
                  Filter by department, status, and location.
                </li>
                <li className="my-4 flex items-center gap-2.5 text-[12px] text-[#7f8c70]">
                  <Check size={16} />
                  Sort or filter any column using its header.
                </li>
                <li className="my-4 flex items-center gap-2.5 text-[12px] text-[#7f8c70]">
                  <Check size={16} />
                  Show extra fields with the Columns menu.
                </li>
                <li className="my-4 flex items-center gap-2.5 text-[12px] text-[#7f8c70]">
                  <Check size={16} />
                  Select rows to export only those employees.
                </li>
              </ul>
              <button
                className="inline-flex min-h-[34px] items-center justify-center gap-2 whitespace-nowrap rounded-[6px] border border-[#28664f] bg-[#28664f] px-[15px] py-[11px] text-[11px] font-medium text-white shadow-[0_2px_3px_#28563a15] transition-colors hover:bg-[#1b513c]"
                onClick={onClose}
              >
                Explore your people <ArrowRight size={15} />
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
