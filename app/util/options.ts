import type { AdjectiveTense, AdjectiveType, Polarity, Politeness, VerbTense, VerbType } from "./vocab";

let bitMaskPower = 0n;
function nextId(): bigint {
    return 2n ** bitMaskPower++;
}

interface WithBitMaskId {
    bitMaskId: bigint
}

export function findAllByMask<T extends WithBitMaskId>(mask: bigint, arr: T[]): T[] {
    return arr.filter(o => mask & o.bitMaskId);
}

export type VocabType = 'verb' | 'adjective';
export interface FormOption extends WithBitMaskId {
    vocabType: 'verb' | 'adjective';
    label: string;
    tense: VerbTense | AdjectiveTense;
    politeness: Politeness;
    polarity?: Polarity;
}

export interface FormOptions {
    predicateNonPastPoliteAffirmative: FormOption;
    predicateNonPastPoliteNegative: FormOption;
    nonPastPlainNegative: FormOption;
    nonPastPoliteAffirmative: FormOption;
    nonPastPoliteNegative: FormOption;
    pastPoliteAffirmative: FormOption;
    pastPoliteNegative: FormOption;
    volitionalPolite: FormOption;
}

export const FORM_OPTIONS: FormOptions = {
    predicateNonPastPoliteAffirmative: {
        bitMaskId: nextId(),
        vocabType: 'adjective',
        label: 'Predicate: Non-Past Polite Affirmative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    predicateNonPastPoliteNegative: {
        bitMaskId: nextId(),
        vocabType: 'adjective',
        label: 'Predicate: Non-Past Polite Negative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'negative',
    },
    nonPastPlainNegative: {
        bitMaskId: nextId(),
        vocabType: 'verb',
        label: 'Non-Past Plain Negative',
        tense: 'nonPast',
        politeness: 'plain',
        polarity: 'negative',
    },
    nonPastPoliteAffirmative: {
        bitMaskId: nextId(),
        vocabType: 'verb',
        label: 'Non-Past Polite Affirmative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    nonPastPoliteNegative: {
        bitMaskId: nextId(),
        vocabType: 'verb',
        label: 'Non-Past Polite Negative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'negative',
    },
    pastPoliteAffirmative: {
        bitMaskId: nextId(),
        vocabType: 'verb',
        label: 'Past Polite Affirmative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    pastPoliteNegative: {
        bitMaskId: nextId(),
        vocabType: 'verb',
        label: 'Past Polite Negative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'negative',
    },
    volitionalPolite: {
        bitMaskId: nextId(),
        vocabType: 'verb',
        label: 'Volitional Polite',
        tense: 'volitional',
        politeness: 'polite',
    }
};

// reset bitmask keep url shorter
bitMaskPower = 0n;
export interface VocabOption extends WithBitMaskId {
    vocabType: VocabType;
    chapter: number;
    category: AdjectiveType | VerbType
}