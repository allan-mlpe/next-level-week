import { useState } from "react";

import { CloseButton } from "../CloseButton";

import bugImage from "../../assets/bug.svg";
import ideaImage from "../../assets/idea.svg";
import thoughtImage from "../../assets/thought.svg";
import { FeedbackSelector } from "./FeedbackSelector";
import { FeedbackForm } from "./FeedbackForm";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      src: bugImage,
      alt: 'Imagem de um inseto'
    }
  },

  IDEA: {
    title: 'Ideia',
    image: {
      src: ideaImage,
      alt: 'Imagem de uma lâmpada'
    }
  },

  OTHER: {
    title: 'Outro',
    image: {
      src: thoughtImage,
      alt: 'Imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

  function resetFeedbackType() {
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {
        feedbackType ? (
          <FeedbackForm
            selectedFeedbackType={feedbackType}
            onBackPressed={() => resetFeedbackType()}
          />
        ) : (
          <FeedbackSelector onFeedbackSelection={setFeedbackType} />
        )
      }

      <footer>
        Feito com muito carinho para <span className="underline underline-offset-2">você</span>!
      </footer>
    </div>
  )
}