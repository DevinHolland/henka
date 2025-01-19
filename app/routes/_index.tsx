import { getOptionsBitmask, getSelectedLowestLevelOptions, NestedCheckbox, type NestedCheckboxOption, type NestedCheckboxOptions } from "~/components/nested-checkbox";
import type { Route } from "./+types/_index";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { FORM_OPTIONS } from "~/util/options";

const initialState: NestedCheckboxOptions = {
  chapter2Adjectives: {
    label: "Chapter 2 Adjectives",
    children: {
      predicateNonPastPoliteAffirmative: FORM_OPTIONS.predicateNonPastPoliteAffirmative,
      predicateNonPastPoliteNegative: FORM_OPTIONS.predicateNonPastPoliteNegative,
    }
  },
  chapter3Verbs: {
    label: "Chapter 3 Verbs",
    children: {
      nonPastPlainNegative: FORM_OPTIONS.nonPastPlainNegative,
      nonPastPoliteAffirmative: FORM_OPTIONS.nonPastPoliteAffirmative,
      nonPastPoliteNegative: FORM_OPTIONS.nonPastPoliteNegative,
      pastPoliteAffirmative: FORM_OPTIONS.pastPoliteAffirmative,
      pastPoliteNegative: FORM_OPTIONS.pastPoliteNegative,
      volitionalPolite: FORM_OPTIONS.volitionalPolite,
    }
  }
};

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Yookoso! Conjugation Practice" },
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
      navigate(`/vocab/${getOptionsBitmask(selectedOptions)}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4 ">Select which forms you wish to practice<br />(vocabulary will be chosen on the next page):</h2>
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
