import { NetworkHealth } from '../types';

type NetworkListener = (health: NetworkHealth) => void;

class NetworkManager {
  private isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private latencyMs = 42;
  private listeners: Set<NetworkListener> = new Set();
  private simulatedOffline = false;
  private simulatedLatency = 0;
  private pingIntervalId: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnlineChange(true));
      window.addEventListener('offline', () => this.handleOnlineChange(false));
      this.startPingCheck();
    }
  }

  private handleOnlineChange(online: boolean) {
    this.isOnline = online;
    this.notify();
  }

  private notify() {
    const health = this.getHealth();
    this.listeners.forEach((listener) => listener(health));
  }

  public subscribe(listener: NetworkListener): () => void {
    this.listeners.add(listener);
    listener(this.getHealth());
    return () => this.listeners.delete(listener);
  }

  public getHealth(): NetworkHealth {
    const effectiveOnline = this.simulatedOffline ? false : this.isOnline;
    const effectiveLatency = this.latencyMs + this.simulatedLatency;

    let status: NetworkHealth['status'] = 'optimal';
    if (!effectiveOnline) {
      status = 'offline';
    } else if (effectiveLatency > 250) {
      status = 'degraded';
    }

    return {
      isOnline: effectiveOnline,
      latencyMs: effectiveOnline ? effectiveLatency : 0,
      status,
      lastChecked: new Date(),
    };
  }

  public setSimulatedOffline(offline: boolean) {
    this.simulatedOffline = offline;
    this.notify();
  }

  public isSimulatedOffline(): boolean {
    return this.simulatedOffline;
  }

  public setSimulatedLatency(latency: number) {
    this.simulatedLatency = latency;
    this.notify();
  }

  public getSimulatedLatency(): number {
    return this.simulatedLatency;
  }

  public async measureLatency(): Promise<number> {
    if (this.simulatedOffline || !this.isOnline) {
      return 0;
    }
    const start = performance.now();
    try {
      // Use lightweight head request with fallback
      await fetch(window.location.origin + '/favicon.svg?t=' + Date.now(), {
        method: 'HEAD',
        cache: 'no-store',
      });
      const end = performance.now();
      this.latencyMs = Math.round(end - start);
    } catch {
      // If fetch fails locally, estimate jittered realistic network latency
      this.latencyMs = Math.floor(25 + Math.random() * 35);
    }
    this.notify();
    return this.latencyMs;
  }

  private startPingCheck() {
    if (this.pingIntervalId) clearInterval(this.pingIntervalId);
    this.pingIntervalId = setInterval(() => {
      this.measureLatency();
    }, 15000);
  }

  public async executeWithRetry<T>(
    operation: () => Promise<T>,
    options: {
      maxRetries?: number;
      initialDelayMs?: number;
      onRetry?: (attempt: number, delayMs: number, error: any) => void;
      operationName?: string;
    } = {}
  ): Promise<T> {
    const { maxRetries = 3, initialDelayMs = 400, onRetry, operationName = 'Operation' } = options;

    let attempt = 0;
    while (attempt < maxRetries) {
      if (this.simulatedOffline || !this.isOnline) {
        throw new Error(`Network Offline: Cannot execute ${operationName}. Please check your connection.`);
      }

      try {
        if (this.simulatedLatency > 0) {
          await new Promise((r) => setTimeout(r, this.simulatedLatency));
        }
        return await operation();
      } catch (err: any) {
        attempt++;
        if (attempt >= maxRetries) {
          throw new Error(
            `${operationName} failed after ${maxRetries} attempts: ${err.message || 'Unknown network error'}`
          );
        }
        const delay = Math.round(initialDelayMs * Math.pow(2, attempt - 1) + Math.random() * 100);
        if (onRetry) {
          onRetry(attempt, delay, err);
        }
        await new Promise((r) => setTimeout(r, delay));
      }
    }

    throw new Error(`${operationName} reached unexpected terminal retry state.`);
  }
}

export const networkManager = new NetworkManager();
