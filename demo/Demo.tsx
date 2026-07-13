import { useState } from 'react';

const devices = [
  { id: 'TEMP-001', name: 'Rooftop Sensor A', value: '23.4Â°C', icon: 'ðŸŒ¡', status: 'online', battery: 87 },
  { id: 'TEMP-002', name: 'Server Room', value: '19.8Â°C', icon: 'ðŸŒ¡', status: 'online', battery: 92 },
  { id: 'HUM-001', name: 'Warehouse 1', value: '62%', icon: 'ðŸ’§', status: 'online', battery: 74 },
  { id: 'PRESS-001', name: 'Hydraulic Line 3', value: '4.2 bar', icon: 'â±', status: 'online', battery: 65 },
  { id: 'MOT-001', name: 'Conveyor Motor', value: '1,450 RPM', icon: 'âš™', status: 'offline', battery: 0 },
  { id: 'VIB-001', name: 'Turbine Bearing', value: '0.8 mm/s', icon: 'ã€°', status: 'online', battery: 51 },
  { id: 'LIGHT-001', name: 'Production Floor', value: '320 lux', icon: 'ðŸ’¡', status: 'online', battery: 43 },
  { id: 'SOUND-001', name: 'Assembly Line', value: '72 dB', icon: 'ðŸ”Š', status: 'online', battery: 28 },
];

export default function IoTDemo() {
  const [filter, setFilter] = useState<'all' | 'online' | 'offline'>('all');
  const filtered = filter === 'all' ? devices : devices.filter((d) => d.status === filter);

  const online = devices.filter((d) => d.status === 'online').length;

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 flex items-center justify-center text-sm">ðŸ“¡</div>
          <div>
            <h3 className="text-sm font-semibold">IoT Nexus</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Device Monitoring Â· Fleet: 8 sensors</div>
          </div>
        </div>
        <span className="text-[10px] text-[var(--color-text-muted)]">{online}/{devices.length} online</span>
      </div>

      <div className="flex gap-2">
        {(['all', 'online', 'offline'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer capitalize border ${filter === f ? 'bg-white/[0.06] border-white/[0.1] text-white' : 'bg-white/[0.01] border-white/[0.04] text-[var(--color-text-muted)] hover:text-white'}`}>{f}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.map((d) => (
          <div key={d.id} className="flex items-center gap-3 p-3 bg-white/[0.015] rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all">
            <span className="text-lg">{d.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-white truncate">{d.name}</p>
              <p className="text-[10px] font-mono text-[var(--color-text-muted)]">{d.id} Â· {d.value}</p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-[9px] font-mono text-[var(--color-text-muted)]">{d.battery > 0 ? `${d.battery}%` : '--'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

