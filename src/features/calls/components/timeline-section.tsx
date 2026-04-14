import { CheckCircle2 } from "lucide-react";

export function TimelineSection({ steps }: { steps: any[] }) {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-hover:bg-[#be8a34] text-slate-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300">
            <CheckCircle2 size={20} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <div className="font-bold text-[#030a50]">{step.actividad}</div>
            <time className="text-sm font-medium text-[#be8a34]">{step.fecha}</time>
          </div>
        </div>
      ))}
    </div>
  );
}
