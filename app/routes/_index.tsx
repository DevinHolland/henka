import { NestedCheckbox, type NestedCheckboxOptions } from "~/components/nested-checkbox";
import type { Route } from "./+types/_index";
import { useState } from 'react';

const initialState = {
  verb: {
    selected: false,
    label: "Verb",
    children: {
      present: {
        selected: false,
        label: "Present",
      },
      past: {
        selected: false,
        label: "Past",
      },
    },
  },
  adjective: {
    selected: false,
    label: "Adjective",
    children: {
      positive: {
        selected: false,
        label: "Positive",
      },
      negative: {
        selected: false,
        label: "Negative",
        children: {
          present: {
            selected: false,
            label: "Present",
          },
          past: {
            selected: false,
            label: "Past",
          }
        }
      },
    },
  },
};

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Yookoso! Conjugation Practice" },
    { name: "description", content: "Practice Japanese Conjugation" },
  ];
}

export default function Home() {
  const [options, setOptions] = useState(initialState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // log form state
    console.log(options);
  };

  return (
    <form onSubmit={onSubmit}>
      <NestedCheckbox options={options} setOptions={setOptions} />
      <button type="submit">Submit</button>
    </form>
  )
}
