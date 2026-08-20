
const HEART_PATH =
  'M0 1H1V0H3V1H5V0H7V1H8V4H7V5H6V6H5V7H3V6H2V5H1V4H0Z';

function PixelHeart({ fill }) {
  const fillPercentage = Math.round(fill * 10000) / 100;

  return (
    <span className="relative block h-6 w-7 shrink-0 sm:h-7 sm:w-8">
      <svg
        className="absolute inset-0 h-full w-full text-slate-600 drop-shadow-[2px_2px_0_#000]"
        viewBox="0 0 8 7"
        shapeRendering="crispEdges"
      >
        <path d={HEART_PATH} fill="currentColor" />
      </svg>

      <span
        className="absolute inset-y-0 left-0 overflow-hidden transition-[width] duration-200"
        style={{ width: `${fillPercentage}%` }}
      >
        <svg
          className="h-full w-7 max-w-none text-rose-500 sm:w-8"
          viewBox="0 0 8 7"
          shapeRendering="crispEdges"
        >
          <path d={HEART_PATH} fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}

export default function HealthBar({
  value = 0,
  max = 1000,
  label = 'HP',
  hearts = 5,
}) {
  const safeMax = Math.max(1, Number(max) || 1);
  const safeValue = Math.min(safeMax, Math.max(0, Number(value) || 0));
  const safeHearts = Math.max(1, Math.floor(Number(hearts) || 5));
  const filledHearts = (safeValue / safeMax) * safeHearts;

  return (
    <div
      className="min-w-0 flex-1 font-mono text-white"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue}
      aria-valuetext={`${safeValue} out of ${safeMax}`}
    >
      <div className="mb-1 flex items-center justify-between gap-3 text-[10px] font-black uppercase sm:text-xs">
        <span>{label}</span>

      </div>

      <div className="flex items-center gap-1" aria-hidden="true">
        {Array.from({ length: safeHearts }, (_, index) => {
          const fill = Math.min(1, Math.max(0, filledHearts - index));

          return (
            <PixelHeart fill={fill} key={index} />
          );
        })}
      </div>
    </div>
  );
}
