export type Polarity = 'affirmative' | 'negative';
export type Politeness = 'polite' | 'plain';

export interface Vocab {
    dictionaryForm: string;
    root: string;
    furigana?: string;
    ending: string;
}

export interface VocabProps extends Vocab {
    polarity?: Polarity;
    politeness: Politeness;
}

export type AdjectiveType = 'i' | 'na' | 'irregular';
export interface AdjectiveVocab {
    type: AdjectiveType;
}

export type AdjectiveTense = 'nonPast' | 'past';
export interface AdjectiveVocabProps extends AdjectiveVocab, VocabProps {
    tense: AdjectiveTense;   
}

export type VerbType = 'godan' | 'ichidan' | 'irregular';
export interface VerbVocab {
    type: VerbType;
}

export type VerbTense = 'nonPast' | 'past' | 'volitional' | 'potential';
export interface VerbVocabProps extends VerbVocab, VocabProps  {
    tense: VerbTense;
}