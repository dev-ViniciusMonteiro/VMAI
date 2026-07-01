import React from "react";
import "@/styles/home.css";

type QuickSuggestionsProps = {
  onSelect: (value: string) => void;
};

const suggestions = [
  "Quem é Vinicius Monteiro?",
  "Qual é o seu currículo?",
  "Quais projetos você já fez?",
  "Conte-me sobre sua carreira",
];

export default function QuickSuggestions({ onSelect }: QuickSuggestionsProps) {
  return (
    <div className="quick-suggestions">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          className="quick-suggestion"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
