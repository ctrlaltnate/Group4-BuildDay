import React from 'react';

export default function HealthBar({ currentHp, maxHp, label, variant = 'player' }) {
  const percentage = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));
  const barColor = variant === 'player' ? 'bg-green-500' : 'bg-red-500';

return (
    <div className="w-full my-2 p-2 border border-dashed border-gray-400 rounded-lg">
      <div className="flex justify-between text-sm mb-1">
        <span>{label || 'Mock Label'}</span>
        <span>{currentHp !== undefined ? currentHp : 500} / {maxHp !== undefined ? maxHp : 1000}</span>
      </div>
      <div className="w-full h-5 bg-gray-700 rounded-full overflow-hidden">
        {/* Fix ความกว้างของหลอดเลือดไว้ที่ 50% ชั่วคราว */}
        <div className="h-full bg-green-500 w-1/2"></div>
      </div>
      <p className="text-xs text-yellow-400 text-center mt-2">
      </p>
    </div>
  );
}