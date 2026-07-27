type SectionTitleProps = {
  title: string;
  subtitle: string;
};

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="max-w-2xl">
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Premium AI Nutrition</p>
    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
    <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{subtitle}</p>
  </div>
);

export default SectionTitle;
