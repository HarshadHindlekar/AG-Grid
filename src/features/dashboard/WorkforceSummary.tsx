import { workforceMetrics } from "../../config/workforceMetrics";
import type { WorkforceSummaryProps } from "../../types/dashboard";

export function WorkforceSummary({ stats }: WorkforceSummaryProps) {
  return (
    <section
      className="mb-[21px] grid grid-cols-4 gap-4 max-[900px]:gap-2.5 max-[600px]:grid-cols-2 max-[600px]:gap-2 min-[1500px]:gap-5"
      aria-label="Workforce summary"
    >
      {workforceMetrics.map(
        ({ id, label, getValue, icon: Icon, description, badge, suffix }) => (
          <article
            className="flex min-w-0 flex-col justify-between rounded-[9px] border border-[#e2e7dc] bg-white px-5 py-[18px] shadow-[0_2px_3px_#273d2803] transition-shadow duration-200 hover:shadow-md max-[1150px]:p-[15px] max-[900px]:p-3 max-[600px]:p-2.5 min-[1500px]:p-[22px]"
            key={id}
          >
            <div className="flex items-center justify-between gap-1 text-[11px] text-[#7e8879] max-[600px]:text-[10px]">
              <span className="truncate">{label}</span>
              <Icon
                size={17}
                className="shrink-0 max-[600px]:h-3.5 max-[600px]:w-3.5"
              />
            </div>
            <div className="mt-[11px] text-[29px] font-[650] leading-[1.4] tracking-[-1px] max-[1150px]:text-[26px] max-[900px]:text-[23px] max-[600px]:mt-1.5 max-[600px]:text-[20px] max-[600px]:tracking-tight">
              {getValue(stats)}
              <small className="ml-[7px] text-[15px] font-normal text-[#9fa698] max-[600px]:ml-1 max-[600px]:text-[11px]">
                {suffix}
              </small>
            </div>
            <div className="mt-2.5 flex min-h-[14px] flex-wrap items-center gap-x-1.5 gap-y-1 text-[9px] leading-[1.35] text-[#97a08f] max-[600px]:mt-1.5 max-[600px]:text-[8.5px]">
              {badge && (
                <span
                  className={
                    badge.variant === "active"
                      ? "shrink-0 rounded bg-[#eff6e9] px-[5px] py-[3px] text-[#4c8157]"
                      : badge.variant === "stars"
                        ? "shrink-0 tracking-[1px] text-[11px] text-[#b8a778]"
                        : "shrink-0 whitespace-nowrap rounded border border-[#e9ede3] bg-[#f5f7f1] px-1.5 py-[3px] text-[9px] font-normal text-[#8b9583]"
                  }
                >
                  {badge.getText(stats)}
                </span>
              )}
              <span className="break-words">{description}</span>
            </div>
          </article>
        ),
      )}
    </section>
  );
}
