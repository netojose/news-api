import {Injectable, Inject, PlatformCache} from "@tsed/common";
import hash from "object-hash";

@Injectable()
export default class Cache {
  @Inject()
  cache: PlatformCache;

  public async remember<T>(key: Record<string, unknown> | string, fn: () => Promise<T>): Promise<T> {
    const cacheKey = hash(key);
    const cachedData = await this.cache.get<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const data = await fn();
    await this.cache.set(cacheKey, data);
    return data;
  }
}
