import { isAdjectiveCategory, isVerbCategory, type VerbCategory, type VocabProps } from "./vocab";
import { toHiragana } from 'wanakana';

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

const O_COLUMN_MAP: Record<string, string> = {
    'う': 'お',
    'く': 'こ',
    'ぐ': 'ご',
    'す': 'そ',
    'つ': 'と',
    'ぬ': 'の',
    'ぶ': 'ぼ',
    'む': 'も',
    'る': 'ろ',
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

const dropEnding = () => '';
const noop = (o: string) => o;

interface Conjugation {
    endingChange: Record<string, string> | ((dictionaryEnding: string) => string);
    endings: string[];
}

interface TenseConjugation {
    affirmative: Conjugation | string | string[];
    negative: Conjugation | string | string[];
}

interface PolitenessConjugation {
    nonPast: TenseConjugation;
    past: TenseConjugation;
    volitional?: Conjugation | string;
    potential?: Conjugation | string[];
}

interface CategoryConjugation {
    plain: PolitenessConjugation;
    polite: PolitenessConjugation;
}

interface IrregularAdjectiveConjugations {
    yoi: CategoryConjugation;
}

interface AdjectiveConjugations {
    i: CategoryConjugation;
    na: CategoryConjugation;
    irregular: IrregularAdjectiveConjugations;
}

interface IrregularVerbConjugations {
    suru: CategoryConjugation;
    kuru: CategoryConjugation;
}

interface VerbConjugations {
    godan: CategoryConjugation;
    ichidan: CategoryConjugation;
    irregular: IrregularVerbConjugations;
}

const verbConjugations: VerbConjugations = {
    godan: {
        plain: {
            nonPast: {
                affirmative: {
                    endingChange: noop,
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
                endingChange: O_COLUMN_MAP,
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
                    endingChange: I_COLUMN_MAP,
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
                    endingChange: noop,
                    endings: [''],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['ない'],
                },
            },
            past: {
                affirmative: {
                    endingChange: dropEnding,
                    endings: ['た'],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['なかった'],
                },
            },
            volitional: {
                endingChange: dropEnding,
                endings: ['よう'],
            },
            potential: {
                endingChange: dropEnding,
                endings: ['れる', 'られる'],
            },
        },
        polite: {
            nonPast: {
                affirmative: {
                    endingChange: dropEnding,
                    endings: ['ます'],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['ません'],
                },
            },
            past: {
                affirmative: {
                    endingChange: dropEnding,
                    endings: ['ました'],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['ませんでした'],
                }
            },
            volitional: {
                endingChange: dropEnding,
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

const adjectiveConjugations: AdjectiveConjugations = {
    i: {
        plain: {
            nonPast: {
                affirmative: {
                    endingChange: noop,
                    endings: [''],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['くない'],
                },
            },
            past: {
                affirmative: {
                    endingChange: dropEnding,
                    endings: ['かった'],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['くなかった'],
                },
            },
        },
        polite: {
            nonPast: {
                affirmative: {
                    endingChange: noop,
                    endings: ['です'],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['くないです', 'くありません'],
                },
            },
            past: {
                affirmative: {
                    endingChange: dropEnding,
                    endings: ['かったです'],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['くなかったです', 'くありませんでした'],
                },
            },
        },
    },
    na: {
        plain: {
            nonPast: {
                affirmative: {
                    endingChange: dropEnding,
                    endings: ['だ'],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['ではない', 'じゃない'],
                },
            },
            past: {
                affirmative: {
                    endingChange: dropEnding,
                    endings: ['だった'],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: ['ではなかった', 'じゃなかった'],
                },
            },
        },
        polite: {
            nonPast: {
                affirmative: {
                    endingChange: dropEnding,
                    endings: ['です'],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: [
                        'ではないです',
                        'じゃないです',
                        'ではありません',
                        'じゃありません',
                    ],
                },
            },
            past: {
                affirmative: {
                    endingChange: dropEnding,
                    endings: [
                        'ではなかった',
                        'じゃなかった',
                    ],
                },
                negative: {
                    endingChange: dropEnding,
                    endings: [
                        'ではありませんでした',
                        'じゃありませんでした',
                    ],
                },
            },
        },
    },
    irregular: {
        yoi: {
            plain: {
                nonPast: {
                    affirmative: ['よい', 'いい'],
                    negative: ['よくない'],
                },
                past: {
                    affirmative: ['よかった'],
                    negative: ['よくなかった'],
                },
            },
            polite: {
                nonPast: {
                    affirmative: ['よいです', 'いいです'],
                    negative: ['よくありません', 'よくないです'],
                },
                past: {
                    affirmative: ['よかったです'],
                    negative: ['よくありませんでした', 'よくなかったです'],
                },
            },
        },
    },
};

export interface ConjugatedVocab {
    unchangedPart: string;
    changedPart: string;
    conjugated: string;
}

export function conjugateVocab(vocab: VocabProps): ConjugatedVocab[] {
    if(vocab.kanaForm === 'いく' && vocab.politeness === 'plain' && vocab.tense === 'past' && vocab.polarity === 'affirmative') {
        // いく special case
        return [{
            unchangedPart: 'い',
            changedPart: 'った',
            conjugated: 'いった',
        }]
    }

    const vocabConjugation = getVocabConjugation(vocab);

    if (typeof vocabConjugation === 'string') {
        return [{
            unchangedPart: '',
            changedPart: vocabConjugation,
            conjugated: vocabConjugation,
        }];
    } else if (Array.isArray(vocabConjugation)) {
        return vocabConjugation.map(conjugated => ({
            unchangedPart: '',
            changedPart: conjugated,
            conjugated,
        }));
    } else if (isConjugation(vocabConjugation)) {
        return conjugate(vocab.kanaForm, vocabConjugation);
    } else if (vocab.polarity && isTenseConjugation(vocabConjugation)) {
        const conjugationOrConjugated = vocabConjugation[vocab.polarity];

        if (typeof conjugationOrConjugated === 'string') {
            return [{
                unchangedPart: '',
                changedPart: conjugationOrConjugated,
                conjugated: conjugationOrConjugated,
            }];
        } else if (Array.isArray(conjugationOrConjugated)) {
            return conjugationOrConjugated.map(conjugation => ({
                unchangedPart: '',
                changedPart: conjugation,
                conjugated: conjugation,
            }));
        } else {
            return conjugate(vocab.kanaForm, conjugationOrConjugated);
        }
    }

    throw new Error('Unhandled conjugation');
}

function getVocabConjugation(vocab: VocabProps) {
    let vocabConjugation: string | string[] | TenseConjugation | Conjugation | undefined;

    if (vocab.type === 'verb' && isVerbCategory(vocab.category)) {
        const verbCategoryConjugation = vocab.category === 'irregular'
            ? (vocab.kanaForm === 'する' ? verbConjugations.irregular.suru : verbConjugations.irregular.kuru)
            : verbConjugations[vocab.category];

        vocabConjugation = verbCategoryConjugation[vocab.politeness][vocab.tense];
    } else if (vocab.type === 'adjective' && isAdjectiveCategory(vocab.category)) {
        const adjectiveCategoryConjugation = vocab.category === 'irregular'
            ? adjectiveConjugations.irregular.yoi // only よい is known as an exception at the time of this writing
            : adjectiveConjugations[vocab.category];
        vocabConjugation = adjectiveCategoryConjugation[vocab.politeness][vocab.tense];
    }

    return vocabConjugation;
}

function conjugate(dictionaryForm: string, conjugation: Conjugation): ConjugatedVocab[] {
    const unchangedPart = toHiragana(dictionaryForm.slice(0, -1));
    
    return conjugation.endings.map(ending => {
        const changedPart = typeof conjugation.endingChange === 'function' ?
            conjugation.endingChange(dictionaryForm.slice(-1)) + ending:
            conjugation.endingChange[dictionaryForm.slice(-1)] + ending;
        return { unchangedPart, changedPart, conjugated: unchangedPart + changedPart };
    });
}

function isTenseConjugation(obj: any): obj is TenseConjugation {
    return obj && typeof obj === 'object' && ('affirmative' in obj || 'negative' in obj);
}

function isConjugation(obj: any): obj is Conjugation {
    return obj && typeof obj === 'object' && 'endingChange' in obj && 'endings' in obj;
}