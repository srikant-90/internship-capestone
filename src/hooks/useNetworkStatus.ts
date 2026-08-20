import { useState, useEffect, useCallback } from 'react';
import { NetworkHealth } from '../types';
import { networkManager } from '../services/networkManager';

export function useNetworkStatus() {
  const [health, setHealth] = useState<NetworkHealth>(() => networkManager.getHealth());
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(() => networkManager.isSimulatedOffline());
  const [simulatedLatency, setSimulatedLatency] = useState(() => networkManager.getSimulatedLatency());

  useEffect(() => {
    const unsubscribe = networkManager.subscribe((newHealth) => {
      setHealth(newHealth);
    });
    return unsubscribe;
  }, []);

  const toggleSimulatedOffline = useCallback(() => {
    const next = !networkManager.isSimulatedOffline();
    networkManager.setSimulatedOffline(next);
    setIsSimulatedOffline(next);
  }, []);

  const updateSimulatedLatency = useCallback((ms: number) => {
    networkManager.setSimulatedLatency(ms);
    setSimulatedLatency(ms);
  }, []);

  const pingNow = useCallback(async () => {
    return await networkManager.measureLatency();
  }, []);

  return {
    health,
    isOnline: health.isOnline,
    latencyMs: health.latencyMs,
    status: health.status,
    isSimulatedOffline,
    simulatedLatency,
    toggleSimulatedOffline,
    updateSimulatedLatency,
    pingNow,
  };
}
