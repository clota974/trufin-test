import { Client } from "memjs";
import { HashAnswer } from "./hash-finder";

export enum KeyStatus {
    UNKNOWN = '-1', SEARCHING = '-2'
}

class CacheManager {
    private memcached = Client.create('db:11211');

    public async set(key: string, value: HashAnswer): Promise<void> {
        const json = JSON.stringify(value);
        await this.memcached.set(key, json, {
            expires: 60 * 60 * 24 * 7 // 1 week
        });
    };

    public async get(key: string): Promise<HashAnswer | KeyStatus> {
        try {
            const { value: buffer } = (await this.memcached.get(key));
            return JSON.parse(buffer.toString());
        } catch {
            return KeyStatus.UNKNOWN;
        }
    }
}

export default new CacheManager();