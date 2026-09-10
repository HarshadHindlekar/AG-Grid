import { workforceMetrics } from "../../config/workforceMetrics";
import type { WorkforceSummaryProps } from "../../types/dashboard";

export function WorkforceSummary({ stats }: WorkforceSummaryProps) {
  
  return (
    <section
      className="mb-[21px] grid grid-cols-4 gap-4 max-[900px]:gap-2.5 max-[600px]:grid-cols-2 min-[1500px]:gap-5"
      aria-label="Workforce summary"
    >
      {workforceMetrics.map(
        ({ id, label, getValue, icon: Icon, description, badge, suffix }) => (
          <article
            className="rounded-[9px] border border-[#e2e7dc] bg-white px-5 py-[18px] shadow-[0_2px_3px_#273d2803] transition-shadow duration-200 hover:shadow-md max-[1150px]:p-[15px] max-[900px]:p-3 min-[1500px]:p-[22px]"
            key={id}
          >
            <div className="flex items-center justify-between text-[11px] text-[#7e8879]">
              {label}
              <Icon size={17} />
            </div>
            <div className="mt-[11px] text-[29px] font-[650] leading-[1.4] tracking-[-1px] max-[1150px]:text-[26px] max-[900px]:text-[23px] max-[600px]:text-[26px]">
              {getValue(stats)}
              <small className="ml-[7px] text-[15px] font-normal text-[#9fa698]">
                {suffix}
              </small>
            </div>
            <div className="mt-2.5 flex min-h-[14px] items-center gap-1.5 whitespace-nowrap text-[9px] text-[#97a08f]">
              {badge && (
                <span
                  className={
                    badge.variant === "active"
                      ? "rounded bg-[#eff6e9] px-[5px] py-[3px] text-[#4c8157]"
                      : badge.variant === "stars"
                        ? "tracking-[1px] text-[11px] text-[#b8a778]"
                        : "whitespace-nowrap rounded border border-[#e9ede3] bg-[#f5f7f1] px-1.5 py-[3px] text-[9px] font-normal text-[#8b9583]"
                  }
                >
                  {badge.getText(stats)}
                </span>
              )}
              <span>{description}</span>
            </div>
          </article>
        ),
      )}
    </section>
  );
}
