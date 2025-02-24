import { getSelectedLowestLevelOptions, NestedCheckbox, type NestedCheckboxOption, type NestedCheckboxOptions } from "~/components/nested-checkbox";
import type { Route } from "./+types/vocab.$formsMask";
import { useState } from 'react';
import { useNavigate, useParams } from "react-router";
import { FORM_OPTIONS, VOCAB_OPTIONS, type FormOption } from "~/util/options";
import { findAllByMask, getBitMaskBase64 } from "~/util/bitmask";

const adjectivesOptions: NestedCheckboxOption = {
    bitMaskId: 0n,
    label: "Adjectives",
    children: {
        gettingStarted: {
            bitMaskId: 0n,
            label: "Getting Started",
            children: {
                iAdjectives: VOCAB_OPTIONS.chapter0IAdjectives,
                naAdjectives: VOCAB_OPTIONS.chapter0NaAdjectives,
            }
        },
        chapter2: {
            bitMaskId: 0n,
            label: "Chapter 2",
            children: {
                iAdjectives: VOCAB_OPTIONS.chapter2IAdjectives,
                naAdjectives: VOCAB_OPTIONS.chapter2NaAdjectives,
            }
        },
        chapter3: {
            bitMaskId: 0n,
            label: "Chapter 3",
            children: {
                iAdjectives: VOCAB_OPTIONS.chapter3IAdjectives,
                naAdjectives: VOCAB_OPTIONS.chapter3NaAdjectives,
            }
        },
        chapter4: {
            bitMaskId: 0n,
            label: "Chapter 4",
            children: {
                iAdjectives: VOCAB_OPTIONS.chapter4IAdjectives,
                naAdjectives: VOCAB_OPTIONS.chapter4NaAdjectives,
            }
        },
        chapter5: {
            bitMaskId: 0n,
            label: "Chapter 5",
            children: {
                iAdjectives: VOCAB_OPTIONS.chapter5IAdjectives,
                naAdjectives: VOCAB_OPTIONS.chapter5NaAdjectives,
            }
        },
        chapter6: {
            bitMaskId: 0n,
            label: "Chapter 6",
            children: {
                iAdjectives: VOCAB_OPTIONS.chapter6IAdjectives,
            }
        },
        chapter7: {
            bitMaskId: 0n,
            label: "Chapter 7",
            children: {
                iAdjectives: VOCAB_OPTIONS.chapter7IAdjectives,
                naAdjectives: VOCAB_OPTIONS.chapter7NaAdjectives,
            }
        },
    }
};

const verbsOptions: NestedCheckboxOption = {
    bitMaskId: 0n,
    label: "Verbs",
    children: {
        gettingStarted: {
            bitMaskId: 0n,
            label: "Getting Started",
            children: {
                godanVerbs: VOCAB_OPTIONS.chapter0GodanVerbs,
                ichidanVerbs: VOCAB_OPTIONS.chapter0IchidanVerbs,
                irregularVerbs: VOCAB_OPTIONS.chapter0IrregularVerbs,
            }
        },
        chapter1: {
            bitMaskId: 0n,
            label: "Chapter 1",
            children: {
                godanVerbs: VOCAB_OPTIONS.chapter1GodanVerbs,
                ichidanVerbs: VOCAB_OPTIONS.chapter1IchidanVerbs,
            }
        },
        chapter2: {
            bitMaskId: 0n,
            label: "Chapter 2",
            children: {
                godanVerbs: VOCAB_OPTIONS.chapter2GodanVerbs,
                ichidanVerbs: VOCAB_OPTIONS.chapter2IchidanVerbs,
            }
        },
        chapter3: {
            bitMaskId: 0n,
            label: "Chapter 3",
            children: {
                godanVerbs: VOCAB_OPTIONS.chapter3GodanVerbs,
                ichidanVerbs: VOCAB_OPTIONS.chapter3IchidanVerbs,
                irregularVerbs: VOCAB_OPTIONS.chapter3IrregularVerbs,
            }
        },
        chapter4: {
            bitMaskId: 0n,
            label: "Chapter 4",
            children: {
                godanVerbs: VOCAB_OPTIONS.chapter4GodanVerbs,
                ichidanVerbs: VOCAB_OPTIONS.chapter4IchidanVerbs,
            }
        },
        chapter5: {
            bitMaskId: 0n,
            label: "Chapter 5",
            children: {
                godanVerbs: VOCAB_OPTIONS.chapter5GodanVerbs,
                ichidanVerbs: VOCAB_OPTIONS.chapter5IchidanVerbs,
            }
        },
        chapter6: {
            bitMaskId: 0n,
            label: "Chapter 6",
            children: {
                godanVerbs: VOCAB_OPTIONS.chapter6GodanVerbs,
                ichidanVerbs: VOCAB_OPTIONS.chapter6IchidanVerbs,
            }
        },
        chapter7: {
            bitMaskId: 0n,
            label: "Chapter 7",
            children: {
                godanVerbs: VOCAB_OPTIONS.chapter7GodanVerbs,
                ichidanVerbs: VOCAB_OPTIONS.chapter7IchidanVerbs,
            }
        },
    }
};

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Japanese Conjugation Practice" },
        { name: "description", content: "Practice Japanese Conjugation" },
    ];
}

export default function Vocab() {
    const { formsMask } = useParams();

    const selectedForms = formsMask ? findAllByMask(formsMask, Object.values(FORM_OPTIONS) as FormOption[]) : [];

    const initialState: NestedCheckboxOptions = {};
    if (selectedForms.some(form => form.vocabType === 'adjective')) {
        initialState.adjectives = adjectivesOptions;
    }
    if (selectedForms.some(form => form.vocabType === 'verb')) {
        initialState.verbs = verbsOptions;
    }

    const [options, setOptions] = useState(initialState);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const selectedOptions = getSelectedLowestLevelOptions(options);
        if (selectedOptions.length === 0) {
            setError("Please select at least one option.");
        } else {
            setError(null);
            navigate(`/practice/${formsMask}/${getBitMaskBase64(selectedOptions)}`);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="mb-4 ">Select which vocabulary to practice:</h2>
            <form onSubmit={onSubmit} className="flex flex-col items-center">
                <NestedCheckbox options={options} setOptions={setOptions} onChange={() => setError(null)} />
                {error && <p className="text-red-500">{error}</p>}
                <div className="w-full flex justify-end">
                    <button type="submit" className="mt-4">Next</button>
                </div>
            </form>
        </div>
    )
}
