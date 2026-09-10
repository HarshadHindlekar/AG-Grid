import { workforceMetrics } from "../../config/workforceMetrics";
import type { WorkforceSummaryProps } from "../../types/dashboard";

const metricTheme: Record<string, { iconBg: string; badgeCls: string }> = {
  employees: {
    iconBg:
      "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30",
    badgeCls:
      "shrink-0 rounded-[5px] bg-emerald-50 px-[6px] py-[2px] text-[9px] font-medium text-emerald-700 border border-emerald-200/70",
  },
  departments: {
    iconBg:
      "bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/30",
    badgeCls:
      "shrink-0 rounded-[5px] bg-indigo-50 px-[6px] py-[2px] text-[9px] font-medium text-indigo-700 border border-indigo-200/70",
  },
  performance: {
    iconBg:
      "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/30",
    badgeCls:
      "shrink-0 tracking-[1.5px] text-[11px] text-amber-500 drop-shadow-sm",
  },
  salary: {
    iconBg:
      "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30",
    badgeCls:
      "shrink-0 rounded-[5px] border border-slate-200 bg-slate-100 px-1.5 py-[2px] text-[9px] font-medium text-slate-700",
  },
};

export function WorkforceSummary({ stats }: WorkforceSummaryProps) {
  return (
    <section
      className="mb-[25px] grid grid-cols-4 gap-4 max-[900px]:gap-2.5 max-[600px]:grid-cols-2 max-[600px]:gap-2 min-[1500px]:gap-5"
      aria-label="Workforce summary"
    >
      {workforceMetrics.map(
        ({ id, label, getValue, icon: Icon, description, badge, suffix }) => {
          const theme = metricTheme[id] ?? metricTheme.employees;
          return (
            <article
              className="group flex min-w-0 flex-col justify-between rounded-[12px] border border-slate-200/80 bg-white px-5 py-[18px] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.1),0_4px_10px_-2px_rgba(0,0,0,0.05)] max-[1150px]:p-[15px] max-[900px]:p-3 max-[600px]:p-2.5 min-[1500px]:p-[22px]"
              key={id}
            >
              <div className="flex items-center justify-between gap-1 text-[11px] font-medium text-slate-500 max-[600px]:text-[10px]">
                <span className="truncate">{label}</span>
                <div
                  className={`grid h-[28px] w-[28px] place-items-center rounded-[8px] transition-transform duration-200 group-hover:scale-110 max-[600px]:h-[22px] max-[600px]:w-[22px] ${theme.iconBg}`}
                >
                  <Icon
                    size={14}
                    className="shrink-0 max-[600px]:h-3 max-[600px]:w-3"
                  />
                </div>
              </div>
              <div className="mt-[10px] text-[30px] font-[750] leading-[1.3] tracking-[-1px] text-slate-900 max-[1150px]:text-[26px] max-[900px]:text-[23px] max-[600px]:mt-1.5 max-[600px]:text-[20px] max-[600px]:tracking-tight">
                {getValue(stats)}
                <small className="ml-[6px] text-[15px] font-normal text-slate-400 max-[600px]:ml-1 max-[600px]:text-[11px]">
                  {suffix}
                </small>
              </div>
              <div className="mt-2.5 flex min-h-[14px] flex-wrap items-center gap-x-1.5 gap-y-1 text-[9.5px] leading-[1.35] text-slate-500 max-[600px]:mt-1.5 max-[600px]:text-[8.5px]">
                {badge && (
                  <span className={theme.badgeCls}>{badge.getText(stats)}</span>
                )}
                <span className="break-words text-slate-500 font-normal">
                  {description}
                </span>
              </div>
            </article>
          );
        },
      )}
    </section>
  );
}
