import type { Polarity, Politeness, VerbTense, VerbType, VerbVocab } from "./vocab"

const A_COLUMN_MAP: Record<string, string> = {
    'う': 'わ',
    'く': 'か',
    'ぐ': 'が',
    'す': 'さ',
    'つ': 'た',
    'ぬ': 'な',
    'ぶ': 'ば',
    'む': 'ま',
    'る': 'ら',
}

const I_COLUMN_MAP: Record<string, string> = {
    'う': 'い',
    'く': 'き',
    'ぐ': 'ぎ',
    'す': 'し',
    'つ': 'ち',
    'ぬ': 'に',
    'ぶ': 'び',
    'む': 'み',
    'る': 'り',
}

const E_COLUMN_MAP: Record<string, string> = {
    'う': 'え',
    'く': 'け',
    'ぐ': 'げ',
    'す': 'せ',
    'つ': 'て',
    'ぬ': 'ね',
    'ぶ': 'べ',
    'む': 'め',
    'る': 'れ',
}

const PLAIN_PAST_MAP: Record<string, string> = {
    'う': 'った',
    'く': 'いた',
    'ぐ': 'いだ',
    'す': 'した',
    'つ': 'った',
    'ぬ': 'んだ',
    'ぶ': 'んだ',
    'む': 'んだ',
    'る': 'った',
}

const DROP_RU_MAP: Record<string, string> = {
    'る': '',
}

interface Conjugation {
    endingChange: Record<string, string>;
    ending: string | string[];
}

interface TenseConjugation {
    affirmative?: Conjugation | string;
    negative: Conjugation | string;
}

interface PolitenessConjugation {
    nonPast: TenseConjugation;
    past: TenseConjugation;
    volitional: Conjugation | string;
    potential?: Conjugation | string | string[];
}

interface VerbTypeConjugation {
    plain: PolitenessConjugation;
    polite: PolitenessConjugation;
}

interface IrregularConjugation {
    suru: VerbTypeConjugation;
    kuru: VerbTypeConjugation;
}

interface VerbConjugations {
    godan: VerbTypeConjugation;
    ichidan: VerbTypeConjugation;
    irregular: IrregularConjugation;
}

const verbConjugations: VerbConjugations = {
    godan: {
        plain: {
            nonPast: {
                negative: {
                    endingChange: A_COLUMN_MAP,
                    ending: 'ない',
                },
            },
            past: {
                affirmative: {
                    endingChange: PLAIN_PAST_MAP,
                    ending: '',
                },
                negative: {
                    endingChange: A_COLUMN_MAP,
                    ending: 'なかった',
                },
            },
            volitional: {
                endingChange: A_COLUMN_MAP,
                ending: 'う',
            },
            potential: {
                endingChange: E_COLUMN_MAP,
                ending: 'る',
            },
        },
        polite: {
            nonPast: {
                affirmative: {
                    endingChange: I_COLUMN_MAP,
                    ending: 'ます',
                },
                negative: {
                    endingChange: A_COLUMN_MAP,
                    ending: 'ません',
                },
            },
            past: {
                affirmative: {
                    endingChange: I_COLUMN_MAP,
                    ending: 'ました',
                },
                negative: {
                    endingChange: I_COLUMN_MAP,
                    ending: 'ませんでした',
                }
            },
            volitional: {
                endingChange: I_COLUMN_MAP,
                ending: 'ましょう',
            }
        },
    },
    ichidan: {
        plain: {
            nonPast: {
                negative: {
                    endingChange: DROP_RU_MAP,
                    ending: 'ない',
                },
            },
            past: {
                affirmative: {
                    endingChange: DROP_RU_MAP,
                    ending: 'た',
                },
                negative: {
                    endingChange: DROP_RU_MAP,
                    ending: 'なかった',
                },
            },
            volitional: {
                endingChange: DROP_RU_MAP,
                ending: 'よう',
            },
            potential: {
                endingChange: DROP_RU_MAP,
                ending: ['れる', 'られる'],
            },
        },
        polite: {
            nonPast: {
                affirmative: {
                    endingChange: DROP_RU_MAP,
                    ending: 'ます',
                },
                negative: {
                    endingChange: DROP_RU_MAP,
                    ending: 'ません',
                },
            },
            past: {
                affirmative: {
                    endingChange: DROP_RU_MAP,
                    ending: 'ました',
                },
                negative: {
                    endingChange: DROP_RU_MAP,
                    ending: 'ませんでした',
                }
            },
            volitional: {
                endingChange: DROP_RU_MAP,
                ending: 'ましょう',
            }
        },
    },
    irregular: {
        suru: {
            plain: {
                nonPast: {
                    negative: 'しない',
                },
                past: {
                    affirmative: 'した',
                    negative: 'しなかった',
                },
                volitional: 'しよう',
                potential: 'できる',
            },
            polite: {
                nonPast: {
                    affirmative: 'します',
                    negative: 'しません',
                },
                past: {
                    affirmative: 'しました',
                    negative: 'しませんでした',
                },
                volitional: 'しましょう',
            },
        },
        kuru: {
            plain: {
                nonPast: {
                    negative: 'こない',
                },
                past: {
                    affirmative: 'きた',
                    negative: 'こなかった',
                },
                volitional: 'こよう',
                potential: ['これる', 'こられる'],
            },
            polite: {
                nonPast: {
                    affirmative: 'きます',
                    negative: 'きません',
                },
                past: {
                    affirmative: 'きました',
                    negative: 'きませんでした',
                },
                volitional: 'きましょう',
            },
        },
    },
};


// TODO finish implementing this function, fix array type
/**
 * 
 * @param verb 
 * @param type 
 * @param politeness 
 * @param tense 
 * @param polarity 
 * @returns List of possible values for conjugation (for example, られる vs. れる for potential form)
 */
export function conjugateVerb(verb: VerbVocab, type: VerbType, politeness: Politeness, tense: VerbTense, polarity?: Polarity): ConjugatedVerb[] {
    if(type === 'godan' || type === 'ichidan') {
        return conjugateRegularVerb(verb, politeness, tense, polarity);
    } else {
        return conjugateIrregularVerb(verb, politeness, tense, polarity);
    }
}

function conjugateRegularVerb(verb: VerbVocab, politeness: Politeness, tense: VerbTense, polarity?: Polarity): ConjugatedVerb[] {
    const conjugation = verbConjugations.godan[politeness][tense];

    if(tense === 'volitional' || tense === 'potential') {
        return conjugate(verb, conjugation as Conjugation);
    } else {
        const tenseConjugation = (conjugation as TenseConjugation)[polarity ?? 'affirmative'];

        if(tenseConjugation === undefined) {
            throw new Error('Invalid tense or polarity');
        } else {
            return conjugate(verb, tenseConjugation);
        }
    }
}

function conjugateIrregularVerb(verb: VerbVocab, politeness: Politeness, tense: VerbTense, polarity?: Polarity): ConjugatedVerb[] {
    const conjugation = verbConjugations.irregular[verb.dictionaryForm === 'する' ? 'suru' : 'kuru'][politeness][tense];

    
}

export interface ConjugatedVerb {
    unchangedPart: string;
    changedPart: string;
    conjugated: string;
}

function conjugate(verb: VerbVocab, conjugation: Conjugation | string): ConjugatedVerb[] {
    if(typeof conjugation === 'string') {
        return {
            unchangedPart: '',
            changedPart: conjugation,
        };
    }

    const unchangedPart = verb.dictionaryForm.slice(0, -1);
    const changedPart = conjugation.endingChange[verb.dictionaryForm.slice(-1)] + conjugation.ending;

    return [{
        unchangedPart,
        changedPart,
        conjugated: unchangedPart + changedPart,
    }]
}