export type Polarity = 'affirmative' | 'negative';
export type Politeness = 'polite' | 'plain';

export interface Vocab {
    dictionaryForm: string;
    root: string;
    furigana?: string;
    ending: string;
    polarity: Polarity;
    politeness: Politeness;
}

export type AdjectiveTense = 'nonPast' | 'past';
export type AdjectiveType = 'i' | 'na' | 'irregular';
export interface AdjectiveVocab extends Vocab {
    tense: AdjectiveTense;
    type: AdjectiveType;
}

export type VerbTense = 'nonPast' | 'past' | 'volitional' | 'potential';
export type VerbType = 'godan' | 'ichidan' | 'irregular';
export interface VerbVocab extends Vocab {
    tense: VerbTense;
    type: VerbVocab;
}