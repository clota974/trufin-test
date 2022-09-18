import keccak256 from 'keccak256';
import cacheManager, { KeyStatus } from './cache-manager';

export interface HashAnswer {
    hash: string;
    nonce: number;
}

interface CacheStatus {
    shouldStart: boolean;
    answer?: HashAnswer;
}

export default class HashFinder {
    target: string;
    targetAsNumber: bigint;

    constructor(target: string) {
        this.target = target;
        this.targetAsNumber = BigInt('0x' + target);
        
    }

    async toResponse() {
        const { shouldStart, answer = null } = await this.checkCache(this.target);
       if (shouldStart === true) {
            const answer = await this.startSearch();
            this.setCache(answer);
            return {
                type: 'success',
                message: 'Hash search has started',
            }
        } 
        
        if (!answer) {
            return {
                type: 'warning',
                message: 'Hash search is in progress'
            }
        } 

        return {
            type: 'success',
            message: `Found results : Hash = ${answer.hash}, Nonce = ${answer.nonce}`,
        }
        
    }

    /**
     * Checks if key is present in cache
     * @param key The target hash
     * @returns Answer or boolean as if should start to search
     */
    private async checkCache(key: string): Promise<CacheStatus> {
        const query = await cacheManager.get(key);
        switch (query) {
            case KeyStatus.UNKNOWN:
                return {
                    shouldStart: true
                };
            case KeyStatus.SEARCHING:
                return {
                    shouldStart: false,
                }
            default:
                return {
                    shouldStart: false,
                    answer: query
                }
        }
    }

    private setCache(answer: HashAnswer): Promise<void> {
        return cacheManager.set(this.target, answer);
    }

    private async startSearch(): Promise<HashAnswer> {
        await cacheManager.set(this.target, {
            hash: KeyStatus.SEARCHING,
            nonce: -1
        });

        return new Promise((resolve, reject) => {
            let nonce = -1;
            let int: bigint = BigInt(0);
            do {
                nonce++;
                
                int = this.calculateHash(nonce);
            } while (int > this.targetAsNumber);

            resolve({
                hash: int.toString(16),
                nonce
            });
        })
    }

    calculateHash(nonce: number): bigint {
        const sum = this.targetAsNumber + BigInt(nonce)
        return BigInt('0x' + keccak256('0x'+sum.toString(16)).toString('hex'));
    }
}