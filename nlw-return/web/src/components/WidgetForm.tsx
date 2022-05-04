import { useState } from "react";

import { CloseButton } from "./CloseButton";

import bugImage from "../assets/bug.svg";
import ideaImage from "../assets/idea.svg";
import thoughtImage from "../assets/thought.svg";

const feedbackTypes = {
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

type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      <header>

        <span className="text-xl leading-6">
          Deixe o seu comentário
        </span>

        <CloseButton />
      </header>


      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
              onClick={() => setFeedbackType(key as FeedbackType)}
              type="button"
            >
              <img src={value.image.src} alt={value.image.alt} />
              <span>{ value.title }</span>
            </button>
          );
        })
        }
      </div>

      <footer>
        Feito para <span className="underline underline-offset-2">você</span>!
      </footer>
    </div>
  )
}