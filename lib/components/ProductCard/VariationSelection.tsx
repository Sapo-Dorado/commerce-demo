"use client";
import { Variation } from "@/lib/models";
import { ChangeEvent, ReactElement, useState } from "react";

interface IProps {
  variations: Variation[];
  buttons: Record<string, ReactElement>;
}

export default function VariationSelection({ variations, buttons }: IProps) {
  const [selectedVariationId, setSelectedVariationId] = useState<string>(
    variations[0].id
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariationId(e.currentTarget.value);
  };

  return (
    <>
      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2" onChange={handleChange}>
        {variations.map((variation) => (
          <option value={variation.id} key={variation.id}>
            {variation.name}
          </option>
        ))}
      </select>
      {buttons[selectedVariationId]}
    </>
  );
}
