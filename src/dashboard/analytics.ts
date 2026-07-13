export interface DeviceStats { totalDevices: number; onlineDevices: number; offlineDevices: number; avgBatteryLevel: number; lastUpdated: string; telemetry: TelemetryPoint[]; alerts: Alert[]; }
export interface TelemetryPoint { timestamp: string; deviceId: string; metric: string; value: number; }
export interface Alert { id: string; severity: 'critical' | 'warning' | 'info'; message: string; timestamp: string; deviceId: string; acknowledged: boolean; }
export function calculateAggregates(points: TelemetryPoint[]): Record<string, { avg: number; min: number; max: number; count: number }> {
  const grouped: Record<string, number[]> = {};
  for (const p of points) { if (!grouped[p.metric]) grouped[p.metric] = []; grouped[p.metric].push(p.value); }
  const result: Record<string, any> = {};
  for (const [metric, values] of Object.entries(grouped)) { result[metric] = { avg: values.reduce((a, b) => a + b, 0) / values.length, min: Math.min(...values), max: Math.max(...values), count: values.length }; }
  return result;
}
