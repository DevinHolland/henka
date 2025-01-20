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
    adjPredicateNonPastPoliteAffirmative: FormOption;
    adjPredicateNonPastPoliteNegative: FormOption;
    verbNonPastPlainNegative: FormOption;
    verbNonPastPoliteAffirmative: FormOption;
    verbNonPastPoliteNegative: FormOption;
    verbPastPoliteAffirmative: FormOption;
    verbPastPoliteNegative: FormOption;
    verbVolitionalPolite: FormOption;
    adjPredicateNonPastPlainAffirmative: FormOption;
    adjPredicateNonPastPlainNegative: FormOption;
    adjPredicatePastPlainAffirmative: FormOption;
    adjPredicatePastPlainNegative: FormOption;
    adjPredicatePastPoliteAffirmative: FormOption;
    adjPredicatePastPoliteNegative: FormOption;
    verbPastPlainAffirmative: FormOption;
    verbPastPlainNegative: FormOption;
    verbPotentialPlain: FormOption;
    verbVolitionalPlain: FormOption;
}

const formsBitMask = new BitMask();
export const FORM_OPTIONS: FormOptions = {
    adjPredicateNonPastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate Non-Past Polite Affirmative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    adjPredicateNonPastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate Non-Past Polite Negative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'negative',
    },
    verbNonPastPlainNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Non-Past Plain Negative',
        tense: 'nonPast',
        politeness: 'plain',
        polarity: 'negative',
    },
    verbNonPastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Non-Past Polite Affirmative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    verbNonPastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Non-Past Polite Negative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'negative',
    },
    verbPastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Past Polite Affirmative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    verbPastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Past Polite Negative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'negative',
    },
    verbVolitionalPolite: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Volitional Polite',
        tense: 'volitional',
        politeness: 'polite',
    },
    adjPredicateNonPastPlainAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate Non-Past Plain Affirmative',
        tense: 'nonPast',
        politeness: 'plain',
        polarity: 'affirmative',
    },
    adjPredicateNonPastPlainNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate Non-Past Plain Negative',
        tense: 'nonPast',
        politeness: 'plain',
        polarity: 'negative',
    },
    adjPredicatePastPlainAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate Past Plain Affirmative',
        tense: 'past',
        politeness: 'plain',
        polarity: 'affirmative',
    },
    adjPredicatePastPlainNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate Past Plain Negative',
        tense: 'past',
        politeness: 'plain',
        polarity: 'negative',
    },
    adjPredicatePastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate Past Polite Affirmative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    adjPredicatePastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'adjective',
        label: 'Predicate Past Polite Negative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'negative',
    },
    verbPastPlainAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Past Plain Affirmative',
        tense: 'past',
        politeness: 'plain',
        polarity: 'affirmative',
    },
    verbPastPlainNegative: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Past Plain Negative',
        tense: 'past',
        politeness: 'plain',
        polarity: 'negative',
    },
    verbPotentialPlain: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Potential Plain',
        tense: 'potential',
        politeness: 'plain',
    },
    verbVolitionalPlain: {
        bitMaskId: formsBitMask.nextId(),
        vocabType: 'verb',
        label: 'Volitional Plain',
        tense: 'volitional',
        politeness: 'plain',
    },
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

    chapter4IAdjectives: VocabOption;
    chapter4NaAdjectives: VocabOption;

    chapter5NaAdjectives: VocabOption;

    chapter6IAdjectives: VocabOption;

    // Verbs
    chapter3GodanVerbs: VocabOption;
    chapter3IchidanVerbs: VocabOption;
    chapter3IrregularVerbs: VocabOption;

    chapter4GodanVerbs: VocabOption;

    chapter5GodanVerbs: VocabOption;
    chapter5IchidanVerbs: VocabOption;

    chapter6GodanVerbs: VocabOption;
    chapter6IchidanVerbs: VocabOption;
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

    chapter4IAdjectives: {
        ...iAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 4,
    },
    chapter4NaAdjectives: {
        ...naAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 4,
    },

    chapter5NaAdjectives: {
        ...naAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 5,
    },

    chapter6IAdjectives: {
        ...iAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 6,
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

    chapter4GodanVerbs: {
        ...godanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 4
    },

    chapter5GodanVerbs: {
        ...godanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 5
    },
    chapter5IchidanVerbs: {
        ...ichidanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 5
    },

    chapter6GodanVerbs: {
        ...godanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 6
    },
    chapter6IchidanVerbs: {
        ...ichidanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 6
    },
}