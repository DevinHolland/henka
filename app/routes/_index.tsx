import { getSelectedLowestLevelOptions, NestedCheckbox, type NestedCheckboxOptions } from "~/components/nested-checkbox";
import type { Route } from "./+types/_index";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { FORM_OPTIONS } from "~/util/options";
import { getBitmaskBase64 } from "~/util/bitmask";

const initialState: NestedCheckboxOptions = {
  chapter2Adjectives: {
    label: "Chapter 2 Adjectives",
    bitMaskId: 0n,
    children: {
      predicateNonPastPoliteAffirmative: FORM_OPTIONS.adjPredicateNonPastPoliteAffirmative,
      predicateNonPastPoliteNegative: FORM_OPTIONS.adjPredicateNonPastPoliteNegative,
    }
  },
  chapter3Verbs: {
    label: "Chapter 3 Verbs",
    bitMaskId: 0n,
    children: {
      nonPastPlainNegative: FORM_OPTIONS.verbNonPastPlainNegative,
      nonPastPoliteAffirmative: FORM_OPTIONS.verbNonPastPoliteAffirmative,
      nonPastPoliteNegative: FORM_OPTIONS.verbNonPastPoliteNegative,
      pastPoliteAffirmative: FORM_OPTIONS.verbPastPoliteAffirmative,
      pastPoliteNegative: FORM_OPTIONS.verbPastPoliteNegative,
      volitionalPolite: FORM_OPTIONS.verbVolitionalPolite,
    }
  },
  chapter4Adjectives: {
    label: "Chapter 4 Adjectives",
    bitMaskId: 0n,
    children: {
      adjPredicateNonPastPlainAffirmative: FORM_OPTIONS.adjPredicateNonPastPlainAffirmative,
      adjPredicateNonPastPlainNegative: FORM_OPTIONS.adjPredicateNonPastPlainNegative,
      adjPredicatePastPlainAffirmative: FORM_OPTIONS.adjPredicatePastPlainAffirmative,
      adjPredicatePastPlainNegative: FORM_OPTIONS.adjPredicatePastPlainNegative,
      adjPredicatePastPoliteAffirmative: FORM_OPTIONS.adjPredicatePastPoliteAffirmative,
      adjPredicatePastPoliteNegative: FORM_OPTIONS.adjPredicatePastPoliteNegative,
    }
  },
  chapter4Verbs: {
    label: "Chapter 4 Verbs",
    bitMaskId: 0n,
    children: {
      verbPastPlainAffirmative: FORM_OPTIONS.verbPastPlainAffirmative,
      verbPastPlainNegative: FORM_OPTIONS.verbPastPlainNegative,
    }
  },
  chapter5Verbs: {
    label: "Chapter 5 Verbs",
    bitMaskId: 0n,
    children: {
      verbPotentialPlain: FORM_OPTIONS.verbPotentialPlain,
    }
  },
  chapter6Verbs: {
    label: "Chapter 6 Verbs",
    bitMaskId: 0n,
    children: {
      verbVolitionalPlain: FORM_OPTIONS.verbVolitionalPlain,
    }
  },
};

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
      navigate(`/vocab/${getBitmaskBase64(selectedOptions)}`);
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
          If you are unfamiliar with how to type in Japanese, Tofugu has a great guide <a href="https://www.tofugu.com/japanese/how-to-type-in-japanese/" target="_blank">here</a> (only hiragana is supported on this site).
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
