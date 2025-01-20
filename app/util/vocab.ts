export type Polarity = 'affirmative' | 'negative';
export type Politeness = 'polite' | 'plain';

export type VocabType = 'adjective' | 'verb';

export type AdjectiveCategory = 'i' | 'na' | 'irregular';
export function isAdjectiveCategory(obj: any): obj is AdjectiveCategory {
    return obj === 'i' || obj === 'na' || obj === 'irregular';
}

export type VerbCategory = 'godan' | 'ichidan' | 'irregular';
export function isVerbCategory(obj: any): obj is VerbCategory {
    return obj === 'godan' || obj === 'ichidan' || obj === 'irregular';
}

export type VocabCategory = AdjectiveCategory | VerbCategory;

export interface Vocab {
    type: VocabType;
    category: VocabCategory;
    dictionaryForm: string;
    root: string;
    furigana?: string;
    ending: string;
}

export type Tense = 'nonPast' | 'past' | 'volitional' | 'potential';
export interface VocabProps extends Vocab {
    polarity?: Polarity;
    politeness: Politeness;
    tense: Tense;
}