import HashFinder from "../hash-finder";
import CacheManager, { KeyStatus } from "../cache-manager";

const input = '54e604787cbf194841e7b68d7cd28786f6c9a0a3ab9f8b0a0e87cb4387ab0107';
const output = {
    hash: '525feed5577ede78e3777653dd6f30f484e32eba8c4b944dda0b77039631d759',
    nonce: 5
}

jest.mock("../cache-manager");

describe("HashFinder", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should start searching as key is not in cache', () => {
        const hashFinder = new HashFinder(input);
        const cacheManagerMock = CacheManager as jest.Mocked<typeof CacheManager>;
        cacheManagerMock.get.mockResolvedValue(KeyStatus.UNKNOWN);

        expect(hashFinder.toResponse()).resolves.toEqual({
            type: 'success',
            message: 'Hash search has started',
        });
    })

    it('should idle as key is in cache', () => {
        const hashFinder = new HashFinder(input);
        const cacheManagerMock = CacheManager as jest.Mocked<typeof CacheManager>;
        cacheManagerMock.get.mockResolvedValue(KeyStatus.SEARCHING);
        
        expect(hashFinder.toResponse()).resolves.toEqual({
            type: 'warning',
            message: 'Hash search is in progress',
        });
    })

    it('should return answer', () => {
        const hashFinder = new HashFinder(input);
        const cacheManagerMock = CacheManager as jest.Mocked<typeof CacheManager>;
        cacheManagerMock.get.mockResolvedValue(output);
        
        expect(hashFinder.toResponse()).resolves.toEqual({
            type: 'success',
            message: `Found results : Hash = ${output.hash}, Nonce = ${output.nonce}`,
        });
    })
})