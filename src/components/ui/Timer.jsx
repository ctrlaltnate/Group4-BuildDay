function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function Timer({
  seconds = 60,
  warningAt = 10,
  label = 'Time',
}) {
  const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
  const isWarning = safeSeconds <= warningAt;

  return (
    <div
      className={`flex shrink-0 items-center gap-2 border-2 border-black px-2 py-1 font-mono font-black shadow-[3px_3px_0_#000] sm:px-3 ${
        isWarning
          ? 'animate-pulse bg-rose-500 text-white'
          : 'bg-cyan-300 text-black'
      }`}
      role="timer"
      aria-label={`${label} ${formatTime(safeSeconds)}`}
      aria-live={isWarning ? 'polite' : 'off'}
    >
      <span className="text-[10px] uppercase sm:text-xs">{label}</span>
      <span className="min-w-10 text-right text-xs tabular-nums sm:text-base">
        {formatTime(safeSeconds)}
      </span>
    </div>
  );
}
