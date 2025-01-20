import { useState } from "react";
import { isHiragana, toHiragana } from 'wanakana';
import { conjugateVocab, type ConjugatedVocab } from "~/util/conjugations";
import { fetchVocab, type Vocab, type VocabProps } from "~/util/vocab";
import type { Route } from "./+types/practice.$formsMask.$vocabMask";
import { BitMask, findAllByMask } from "~/util/bitmask";
import { FORM_OPTIONS, VOCAB_OPTIONS, type FormOption, type VocabOption } from "~/util/options";

interface FormState {
    inputValue: string;
    vocab: Vocab;
    vocabForm: FormOption;
    submitted: boolean;
    correct?: boolean;
    conjugations?: ConjugatedVocab[];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
    const vocab = await fetchVocab();
    const vocabOptions = findAllByMask(params.vocabMask, Object.values(VOCAB_OPTIONS) as VocabOption[]);
    const selectedForms = findAllByMask(params.formsMask, Object.values(FORM_OPTIONS));

    const selectedVocab = vocab.filter(candidate =>
        vocabOptions.some(option =>
            candidate.chapter === option.chapter &&
            candidate.type === option.vocabType &&
            candidate.category === option.category
        )
    );

    return { selectedForms, selectedVocab };
}

function getRandomVocab(vocabList: Vocab[]): Vocab {
    const randomIndex = Math.floor(Math.random() * vocabList.length);
    return vocabList[randomIndex];
}


function getRandomSuitableForm(forms: FormOption[], vocab: Vocab, excluding?: bigint): FormOption {
    let suitableForms = forms.filter(form => form.vocabType === vocab.type);

    // If there's only one suitable form, don't exlude it from the list, otherwise there won't be a form to pick!
    if (suitableForms.length > 1 && excluding !== undefined) {
        suitableForms = forms.filter(form => form.bitMaskId !== excluding);
    }

    const randomIndex = Math.floor(Math.random() * suitableForms.length);
    return suitableForms[randomIndex];
}

export default function Practice({
    loaderData
}: Route.ComponentProps) {
    const { selectedForms, selectedVocab } = loaderData;

    const starterVocab = getRandomVocab(selectedVocab);
    const starterVocabForm = getRandomSuitableForm(selectedForms, starterVocab);
    const initialFormState: FormState = {
        inputValue: '',
        submitted: false,
        vocab: starterVocab,
        vocabForm: starterVocabForm,
    }

    const [formState, setFormState] = useState(initialFormState);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (formState.submitted) {
            const newVocab = getRandomVocab(selectedVocab.length > 1 ? selectedVocab.filter(v => v.kanaForm !== formState.vocab.kanaForm) : selectedVocab);
            const newForm = getRandomSuitableForm(selectedForms, newVocab, formState.vocabForm.bitMaskId);

            setFormState({ inputValue: '', vocab: newVocab, vocabForm: newForm, submitted: false });
        } else if (!isHiragana(formState.inputValue)) {
            setError('Non-hiragana input, try again.');
        } else {
            const conjugations = conjugateVocab({ ...formState.vocab, ...formState.vocabForm });

            setFormState({
                ...formState,
                submitted: true,
                correct: conjugations.some(conjugation => conjugation.conjugated === formState.inputValue),
                conjugations
            });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setFormState({
            ...formState,
            inputValue: toHiragana(event.target.value, {
                // Allows N column kana to be entered
                customKanaMapping: {
                    n: 'n',
                    nn: 'ん'
                }
            })
        });
    };

    const renderAnswer = () => {
        return (
            <div className="flex flex-col items-center space-y-1">
                <h3>You entered:</h3>
                <p className="text-2xl">{formState.inputValue}</p>
                <h3>The correct answer{formState.conjugations && formState.conjugations.length > 1 ? 's are' : ' is'}:</h3>
                {formState.conjugations?.map(conjugation => (
                    <p key={conjugation.conjugated} className="text-2xl">
                        {conjugation.unchangedPart}<span className="font-bold">{conjugation.changedPart}</span>
                    </p>
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center space-y-2">
            <h1 className="text-2xl">{formState.vocabForm.label} form of:</h1>
            <p className="text-4xl">
                <ruby>{formState.vocab.root}<rt className="pb-1">{formState.vocab.furigana}</rt></ruby>{formState.vocab.ending}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-2">
                {error && <p className="text-red-500">{error}</p>}
                {!formState.submitted && <input type="text" value={formState.inputValue} onChange={handleChange}></input>}
                {formState.submitted && (!formState.correct ? renderAnswer() : <p>Correct!</p>)}
                <button>{formState.submitted ? 'Next' : 'Submit'}</button>
            </form>
        </div>
    );
}
