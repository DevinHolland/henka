import { getSelectedLowestLevelOptions, NestedCheckbox, type NestedCheckboxOption, type NestedCheckboxOptions } from "~/components/nested-checkbox";
import type { Route } from "./+types/vocab";
import { useState } from 'react';
import { useNavigate, useParams } from "react-router";
import { findAllByMask, FORM_OPTIONS, type FormOption } from "~/util/options";

const adjectivesOptions: NestedCheckboxOption = {
    label: "Adjectives",
    children: {
        chapter2: {
            label: "Chapter 2",
            children: {
                iAdjectives: {
                    label: "い Adjectives",
                },
                naAdjectives: {
                    label: "な Adjectives",
                }
            }
        },
        chapter3: {
            label: "Chapter 3",
            children: {
                iAdjectives: {
                    label: "い Adjectives",
                },
                naAdjectives: {
                    label: "な Adjectives",
                }
            }
        }
    }
};

const verbsOptions: NestedCheckboxOption = {
    label: "Verbs",
    children: {
        chapter3: {
            label: "Chapter 3",
            children: {
                godanVerbs: {
                    label: "Class 1 (a.k.a. 五段)",
                },
                ichidanVerbs: {
                    label: "Class 2 (a.k.a. 一段)",
                },
                irregularVerbs: {
                    label: "Class 3 (する and くる)",
                }
            }
        }
    }
};

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Yookoso! Conjugation Practice" },
        { name: "description", content: "Practice Japanese Conjugation" },
    ];
}

export default function Vocab() {
    const { formsMask } = useParams();

    const selectedForms = findAllByMask(formsMask ? BigInt(formsMask) : 0n, Object.values(FORM_OPTIONS) as FormOption[]);

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
            navigate('/practice');
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
