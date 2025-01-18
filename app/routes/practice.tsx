import { useState } from "react";
import { useLocation } from "react-router";
import { isHiragana, toHiragana } from 'wanakana';
import { conjugateVerb, type ConjugatedVerb } from "~/util/conjugations";
import type { VerbVocabProps } from "~/util/vocab";

interface FormState {
    submitted: boolean;
    correct?: boolean;
    conjugations?: ConjugatedVerb[];
}

export default function Practice() {
    const { state } = useLocation();
    const [inputValue, setInputValue] = useState("");
    const [formState, setFormState] = useState({ submitted: false } as FormState)
    const [error, setError] = useState<string | null>(null);

    const verb: VerbVocabProps = {
        dictionaryForm: 'つかれる',
        root: '疲',
        furigana: 'つか',
        ending: 'れる',
        type: 'ichidan',
        tense: 'past',
        politeness: 'polite',
        polarity: 'negative',
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (formState.submitted) {
            setFormState({ submitted: false });
            setInputValue('');
        } else if (!isHiragana(inputValue)) {
            setError('Non-hiragana input, try again.');
        } else {
            const conjugations = conjugateVerb(verb);
            console.log(conjugations);
            setFormState({
                submitted: true,
                correct: conjugations.some(conjugation => conjugation.conjugated === inputValue),
                conjugations
            });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setInputValue(toHiragana(event.target.value, {
            // Allows N column kana to be entered
            customKanaMapping: {
                n: 'n', 
                nn: 'ん'
            }
        }));
    };

    const renderAnswer = () => {
        return (
            <div className="flex flex-col items-center space-y-1">
                <h3>You entered:</h3>
                <p className="text-2xl">{inputValue}</p>
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
            <h1 className="text-2xl">Past Polite Negative form of:</h1>
            <p className="text-4xl">
                <ruby>{verb.root}<rt className="pb-1">{verb.furigana}</rt></ruby>{verb.ending}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-2">
                {error && <p className="text-red-500">{error}</p>}
                {!formState.submitted && <input type="text" value={inputValue} onChange={handleChange}></input>}
                {formState.submitted && (!formState.correct ? renderAnswer() : <p>Correct!</p>)}
                <button>{formState.submitted ? 'Next' : 'Submit'}</button>
            </form>
        </div>
    );
}