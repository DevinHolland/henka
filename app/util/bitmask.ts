import { base64ToBigint, bigintToBase64 } from "bigint-conversion";

export interface WithBitMaskId {
    bitMaskId: bigint
}

export class BitMask {
    private bitMaskPower = 0n;

    nextId(): bigint {
        return 2n ** this.bitMaskPower++;
    }
}

export function getBitMaskBase64(arr: WithBitMaskId[]): string {
    return bigintToBase64(arr.reduce((acc, o) => acc + (o.bitMaskId ? o.bitMaskId : 0n), 0n), true, false);
}

export function findAllByMask<T extends WithBitMaskId>(base64Mask: string, arr: T[]): T[] {
    const mask = base64ToBigint(base64Mask);
    return arr.filter(o => mask & o.bitMaskId);
}