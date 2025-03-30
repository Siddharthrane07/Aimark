export class NetworkMonitor {
  private static retryCount = 0;
  private static maxRetries = 3;
  private static retryDelay = 1000;

  static async checkConnection(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async withRetry<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`[Network] Retry attempt ${this.retryCount}/${this.maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * this.retryCount));
        return this.withRetry(operation);
      }
      throw error;
    }
  }
}