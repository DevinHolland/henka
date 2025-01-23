import { BitMask, getBitMaskBase64, type WithBitMaskId } from "./bitmask";
import type { Polarity, Politeness, Tense, VocabCategory } from "./vocab";

export type VocabType = 'verb' | 'adjective';
export interface FormOption extends WithBitMaskId {
    chapter: number;
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
        chapter: 2,
        vocabType: 'adjective',
        label: 'Predicate Non-Past Polite Affirmative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    adjPredicateNonPastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 2,
        vocabType: 'adjective',
        label: 'Predicate Non-Past Polite Negative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'negative',
    },
    verbNonPastPlainNegative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 3,
        vocabType: 'verb',
        label: 'Non-Past Plain Negative',
        tense: 'nonPast',
        politeness: 'plain',
        polarity: 'negative',
    },
    verbNonPastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 3,
        vocabType: 'verb',
        label: 'Non-Past Polite Affirmative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    verbNonPastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 3,
        vocabType: 'verb',
        label: 'Non-Past Polite Negative',
        tense: 'nonPast',
        politeness: 'polite',
        polarity: 'negative',
    },
    verbPastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 3,
        vocabType: 'verb',
        label: 'Past Polite Affirmative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    verbPastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 3,
        vocabType: 'verb',
        label: 'Past Polite Negative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'negative',
    },
    verbVolitionalPolite: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 3,
        vocabType: 'verb',
        label: 'Volitional Polite',
        tense: 'volitional',
        politeness: 'polite',
    },
    adjPredicateNonPastPlainAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 4,
        vocabType: 'adjective',
        label: 'Predicate Non-Past Plain Affirmative',
        tense: 'nonPast',
        politeness: 'plain',
        polarity: 'affirmative',
    },
    adjPredicateNonPastPlainNegative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 4,
        vocabType: 'adjective',
        label: 'Predicate Non-Past Plain Negative',
        tense: 'nonPast',
        politeness: 'plain',
        polarity: 'negative',
    },
    adjPredicatePastPlainAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 4,
        vocabType: 'adjective',
        label: 'Predicate Past Plain Affirmative',
        tense: 'past',
        politeness: 'plain',
        polarity: 'affirmative',
    },
    adjPredicatePastPlainNegative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 4,
        vocabType: 'adjective',
        label: 'Predicate Past Plain Negative',
        tense: 'past',
        politeness: 'plain',
        polarity: 'negative',
    },
    adjPredicatePastPoliteAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 4,
        vocabType: 'adjective',
        label: 'Predicate Past Polite Affirmative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'affirmative',
    },
    adjPredicatePastPoliteNegative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 4,
        vocabType: 'adjective',
        label: 'Predicate Past Polite Negative',
        tense: 'past',
        politeness: 'polite',
        polarity: 'negative',
    },
    verbPastPlainAffirmative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 4,
        vocabType: 'verb',
        label: 'Past Plain Affirmative',
        tense: 'past',
        politeness: 'plain',
        polarity: 'affirmative',
    },
    verbPastPlainNegative: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 4,
        vocabType: 'verb',
        label: 'Past Plain Negative',
        tense: 'past',
        politeness: 'plain',
        polarity: 'negative',
    },
    verbPotentialPlain: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 5,
        vocabType: 'verb',
        label: 'Potential Plain',
        tense: 'potential',
        politeness: 'plain',
    },
    verbVolitionalPlain: {
        bitMaskId: formsBitMask.nextId(),
        chapter: 6,
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
    chapter0IAdjectives: VocabOption;
    chapter0NaAdjectives: VocabOption;

    chapter2IAdjectives: VocabOption;
    chapter2NaAdjectives: VocabOption;

    chapter3IAdjectives: VocabOption;
    chapter3NaAdjectives: VocabOption;

    chapter4IAdjectives: VocabOption;
    chapter4NaAdjectives: VocabOption;

    chapter5IAdjectives: VocabOption;
    chapter5NaAdjectives: VocabOption;

    chapter6IAdjectives: VocabOption;

    chapter7IAdjectives: VocabOption;
    chapter7NaAdjectives: VocabOption;

    // Verbs
    chapter0GodanVerbs: VocabOption;
    chapter0IchidanVerbs: VocabOption;
    chapter0IrregularVerbs: VocabOption;

    chapter1GodanVerbs: VocabOption;
    chapter1IchidanVerbs: VocabOption;

    chapter2GodanVerbs: VocabOption;
    chapter2IchidanVerbs: VocabOption;

    chapter3GodanVerbs: VocabOption;
    chapter3IchidanVerbs: VocabOption;
    chapter3IrregularVerbs: VocabOption;

    chapter4GodanVerbs: VocabOption;
    chapter4IchidanVerbs: VocabOption;

    chapter5GodanVerbs: VocabOption;
    chapter5IchidanVerbs: VocabOption;

    chapter6GodanVerbs: VocabOption;
    chapter6IchidanVerbs: VocabOption;

    chapter7GodanVerbs: VocabOption;
    chapter7IchidanVerbs: VocabOption;
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
    label: ''
}

const vocabBitMask = new BitMask();
export const VOCAB_OPTIONS: VocabOptions = {
    // Adjectives
    chapter0IAdjectives: {
        ...iAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 0,
    },
    chapter0NaAdjectives: {
        ...naAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 0,
    },

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

    chapter5IAdjectives: {
        ...iAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 5,
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

    chapter7IAdjectives: {
        ...iAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 7,
    },
    chapter7NaAdjectives: {
        ...naAdjectiveBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 7,
    },

    // Verbs
    chapter0GodanVerbs: {
        ...godanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 0
    },
    chapter0IchidanVerbs: {
        ...ichidanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 0
    },
    chapter0IrregularVerbs: {
        ...irregularVerbBase,
        label: 'Class 3 (する)',
        bitMaskId: vocabBitMask.nextId(),
        chapter: 3
    },

    chapter1GodanVerbs: {
        ...godanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 1
    },
    chapter1IchidanVerbs: {
        ...ichidanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 1
    },

    chapter2GodanVerbs: {
        ...godanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 2
    },
    chapter2IchidanVerbs: {
        ...ichidanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 2
    },

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
        label: 'Class 3 (くる)',
        bitMaskId: vocabBitMask.nextId(),
        chapter: 3
    },

    chapter4GodanVerbs: {
        ...godanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 4
    },
    chapter4IchidanVerbs: {
        ...ichidanVerbBase,
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

    chapter7GodanVerbs: {
        ...godanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 7
    },
    chapter7IchidanVerbs: {
        ...ichidanVerbBase,
        bitMaskId: vocabBitMask.nextId(),
        chapter: 7
    },
}