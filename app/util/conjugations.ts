import type { Polarity, Politeness, VerbTense, VerbType, VerbVocabProps } from "./vocab";

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
};

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
};

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
};

const VERB_PLAIN_PAST_MAP: Record<string, string> = {
    'う': 'った',
    'く': 'いた',
    'ぐ': 'いだ',
    'す': 'した',
    'つ': 'った',
    'ぬ': 'んだ',
    'ぶ': 'んだ',
    'む': 'んだ',
    'る': 'った',
};

const VERB_NO_OP_MAP: Record<string, string> = {
    'う': 'う',
    'く': 'く',
    'ぐ': 'ぐ',
    'す': 'す',
    'つ': 'つ',
    'ぬ': 'ぬ',
    'ぶ': 'ぶ',
    'む': 'む',
    'る': 'る',
};

const DROP_RU_MAP: Record<string, string> = {
    'る': '',
};

interface Conjugation {
    endingChange: Record<string, string>;
    endings: string[];
}

interface TenseConjugation {
    affirmative: Conjugation | string;
    negative: Conjugation | string;
}

interface PolitenessConjugation {
    nonPast: TenseConjugation;
    past: TenseConjugation;
    volitional: Conjugation | string;
    potential?: Conjugation | string[];
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
                affirmative: {
                    endingChange: VERB_NO_OP_MAP,
                    endings: [''],
                },
                negative: {
                    endingChange: A_COLUMN_MAP,
                    endings: ['ない'],
                },
            },
            past: {
                affirmative: {
                    endingChange: VERB_PLAIN_PAST_MAP,
                    endings: [''],
                },
                negative: {
                    endingChange: A_COLUMN_MAP,
                    endings: ['なかった'],
                },
            },
            volitional: {
                endingChange: A_COLUMN_MAP,
                endings: ['う'],
            },
            potential: {
                endingChange: E_COLUMN_MAP,
                endings: ['る'],
            },
        },
        polite: {
            nonPast: {
                affirmative: {
                    endingChange: I_COLUMN_MAP,
                    endings: ['ます'],
                },
                negative: {
                    endingChange: A_COLUMN_MAP,
                    endings: ['ません'],
                },
            },
            past: {
                affirmative: {
                    endingChange: I_COLUMN_MAP,
                    endings: ['ました'],
                },
                negative: {
                    endingChange: I_COLUMN_MAP,
                    endings: ['ませんでした'],
                }
            },
            volitional: {
                endingChange: I_COLUMN_MAP,
                endings: ['ましょう'],
            }
        },
    },
    ichidan: {
        plain: {
            nonPast: {
                affirmative: {
                    endingChange: VERB_NO_OP_MAP,
                    endings: [''],
                },
                negative: {
                    endingChange: DROP_RU_MAP,
                    endings: ['ない'],
                },
            },
            past: {
                affirmative: {
                    endingChange: DROP_RU_MAP,
                    endings: ['た'],
                },
                negative: {
                    endingChange: DROP_RU_MAP,
                    endings: ['なかった'],
                },
            },
            volitional: {
                endingChange: DROP_RU_MAP,
                endings: ['よう'],
            },
            potential: {
                endingChange: DROP_RU_MAP,
                endings: ['れる', 'られる'],
            },
        },
        polite: {
            nonPast: {
                affirmative: {
                    endingChange: DROP_RU_MAP,
                    endings: ['ます'],
                },
                negative: {
                    endingChange: DROP_RU_MAP,
                    endings: ['ません'],
                },
            },
            past: {
                affirmative: {
                    endingChange: DROP_RU_MAP,
                    endings: ['ました'],
                },
                negative: {
                    endingChange: DROP_RU_MAP,
                    endings: ['ませんでした'],
                }
            },
            volitional: {
                endingChange: DROP_RU_MAP,
                endings: ['ましょう'],
            }
        },
    },
    irregular: {
        suru: {
            plain: {
                nonPast: {
                    affirmative: 'する',
                    negative: 'しない',
                },
                past: {
                    affirmative: 'した',
                    negative: 'しなかった',
                },
                volitional: 'しよう',
                potential: ['できる'],
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
                    affirmative: 'くる',
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



export interface ConjugatedVocab {
    unchangedPart: string;
    changedPart: string;
    conjugated: string;
}

export function conjugateVerb(verb: VerbVocabProps): ConjugatedVocab[] {
    const verbTypeConjugation = verb.type === 'irregular'
        ? (verb.dictionaryForm === 'する' ? verbConjugations.irregular.suru : verbConjugations.irregular.kuru)
        : verbConjugations[verb.type];

    const verbTense = verbTypeConjugation[verb.politeness][verb.tense];

    if (typeof verbTense === 'string') {
        return [{
            unchangedPart: '',
            changedPart: verbTense,
            conjugated: verbTense,
        }];
    } else if (Array.isArray(verbTense)) {
        return verbTense.map(conjugated => ({
            unchangedPart: '',
            changedPart: conjugated,
            conjugated,
        }));
    } else if (isConjugation(verbTense)) {
        return conjugate(verb.dictionaryForm, verbTense);
    } else if(verb.polarity && isTenseConjugation(verbTense)) {
        const conjugationOrConjugated = verbTense[verb.polarity];

        if(typeof conjugationOrConjugated === 'string') {
            return [{
                unchangedPart: '',
                changedPart: conjugationOrConjugated,
                conjugated: conjugationOrConjugated,
            }];
        } else {
            return conjugate(verb.dictionaryForm, conjugationOrConjugated);
        }
    }

    throw new Error('Unhandled conjugation');
}

function conjugate(dictionaryForm: string, conjugation: Conjugation): ConjugatedVocab[] {
    const unchangedPart = dictionaryForm.slice(0, -1);
    return conjugation.endings.map(ending => {
        const changedPart = conjugation.endingChange[dictionaryForm.slice(-1)] + ending;
        return { unchangedPart, changedPart, conjugated: unchangedPart + changedPart };
    });
}

function isTenseConjugation(obj: any): obj is TenseConjugation {
    return obj && typeof obj === 'object' && ('affirmative' in obj || 'negative' in obj);
}

function isConjugation(obj: any): obj is Conjugation {
    return obj && typeof obj === 'object' && 'endingChange' in obj && 'endings' in obj;
}