import { getSelectedLowestLevelOptions, NestedCheckbox, type NestedCheckboxOption, type NestedCheckboxOptions } from "~/components/nested-checkbox";
import type { Route } from "./+types/_index";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { FORM_OPTIONS, type FormOption } from "~/util/options";
import { getBitMaskBase64 } from "~/util/bitmask";


function optionsAsNestedCheckboxes(): NestedCheckboxOptions {
  const options: NestedCheckboxOptions = {};

  (Object.values(FORM_OPTIONS) as FormOption[]).sort((a, b) => {
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    if (a.vocabType === 'adjective' && b.vocabType === 'verb') return -1;
    if (a.vocabType === 'verb' && b.vocabType === 'adjective') return 1;
    return 0;
  }).forEach((option: FormOption) => {
    const parentKey = `chapter${option.chapter}${option.vocabType}`;
    if(!options[parentKey]) {
      options[parentKey] = {
        label: `Chapter ${option.chapter} ${option.vocabType.charAt(0).toUpperCase()}${option.vocabType.slice(1)}s`,
        bitMaskId: BigInt(option.chapter),
      }
    }

    if(!options[parentKey].children) {
      options[parentKey].children = {}
    }

    options[parentKey].children[option.bitMaskId.toString()] = option;
  });

  return options;
}

const initialState: NestedCheckboxOptions = optionsAsNestedCheckboxes();

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Japanese Conjugation Practice" },
    { name: "description", content: "Practice Japanese Conjugation" },
  ];
}

export default function Home() {
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
      navigate(`/vocab/${getBitMaskBase64(selectedOptions)}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="space-y-2 bg-slate-700 p-4 m-4 max-w-prose">
        <h2 className="text-xl font-medium">Welcome!</h2>
        <p>
          The purpose of this site is to practice conjugating Japanese adjectives and verbs. 
        </p>
        <p>
          You'll choose which forms and vocabularly lists to practice. 
          The site will then choose a random vocab word and ask you to conjugate it in a random form you have chosen.
        </p>
        <p>
          The site uses a built in Japanese IME for converting romaji to hiragana. 
          If you are unfamiliar with how to type in Japanese,{' '}
          <a href="https://www.tofugu.com/japanese/how-to-type-in-japanese/" target="_blank">Tofugu has a great guide</a>{' '}
          (only hiragana is supported on this site).
        </p>
      </div>
      <h2 className="mb-4">Select which forms you wish to practice<br />(vocabulary will be chosen on the next page):</h2>      
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
