import { Injectable } from '@nestjs/common';
import { timestamp } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
@Injectable()
export class RateLimitingService {
  private requestsMap = new Map<string, number[]>();
  private readonly limit = 3;
  private readonly windowsMs = 10_000;

  isAllowed(userId: string): boolean {
    const now = Date.now();
    const timestamps = this.requestsMap.get(userId) || [];

    const recent = timestamps.filter((ts) => now - ts <= this.windowsMs);

    if (recent.length < this.limit) {
      recent.push(now);
      this.requestsMap.set(userId, recent);
      return true;
    } else {
      return false;
    }
  }
}
