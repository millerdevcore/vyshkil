export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div
      className="pbar"
      role="progressbar"
      aria-label="Прогрес квізу"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      <div className="pbar__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
