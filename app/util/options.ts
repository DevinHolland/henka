import { BitMask, type WithBitMaskId } from "./bitmask";
import type { Polarity, Politeness, Tense, VocabCategory } from "./vocab";

export type VocabType = 'verb' | 'adjective';
export interface FormOption extends WithBitMaskId {
    vocabType: VocabType;
    label: string;
    tense: Tense;
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

const formsBitMask = new BitMask();
export const FORM_OPTIONS: FormOptions = {
    predicateNonPastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate: Non-Past Polite Affirmative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    predicateNonPastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate: Non-Past Polite Negative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'negative',
    },
    nonPastPlainNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Non-Past Plain Negative',
        tense: 'nonPast',
        politeness: 'plain',
        polarity: 'negative',
    },
    nonPastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Non-Past Polite Affirmative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    nonPastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Non-Past Polite Negative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'negative',
    },
    pastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Past Polite Affirmative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    pastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Past Polite Negative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'negative',
    },
    volitionalPolite: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Volitional Polite',
        tense: 'volitional',
        politeness: 'polite',
    }
};

interface VocabOptionBase {
    vocabType: VocabType;
    category: VocabCategory;
    label: string;
}

export interface VocabOption extends WithBitMaskId, VocabOptionBase {
    chapter: number;
}

export interface VocabOptions {
    // Adjectives
    chapter2IAdjectives: VocabOption;
    chapter2NaAdjectives: VocabOption;

    chapter3IAdjectives: VocabOption;
    chapter3NaAdjectives: VocabOption;

    // Verbs
    chapter3GodanVerbs: VocabOption;
    chapter3IchidanVerbs: VocabOption;
    chapter3IrregularVerbs: VocabOption;
}

const iAdjectiveBase: VocabOptionBase = {
    vocabType: 'adjective',
    category: 'i',
    label: 'い Adjectives'
}
const naAdjectiveBase: VocabOptionBase = {
    vocabType: 'adjective',
    category: 'na',
    label: 'な Adjectives'
}

const godanVerbBase: VocabOptionBase = {
    vocabType: 'verb',
    category: 'godan',
    label: 'Class 1 (a.k.a. 五段)'
}

const ichidanVerbBase: VocabOptionBase = {
    vocabType: 'verb',
    category: 'ichidan',
    label: 'Class 2 (a.k.a. 一段)'
}

const irregularVerbBase: VocabOptionBase = {
    vocabType: 'verb',
    category: 'irregular',
    label: 'Class 3 (する and くる)'
}

const vocabBitMask = new BitMask();
export const VOCAB_OPTIONS: VocabOptions = {
    // Adjectives
    chapter2IAdjectives: {
        ...iAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 2,
    },
    chapter2NaAdjectives: {
        ...naAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 2,
    },

    chapter3IAdjectives: {
        ...iAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 3,
    },
    chapter3NaAdjectives: {
        ...naAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 3,
    },

    // Verbs
    chapter3GodanVerbs: {
        ...godanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 3
    },
    chapter3IchidanVerbs: {
        ...ichidanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 3
    },
    chapter3IrregularVerbs: {
        ...irregularVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 3
    },
}