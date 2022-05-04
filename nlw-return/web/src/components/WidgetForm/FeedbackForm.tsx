import { ArrowLeft, Camera } from "phosphor-react";
import { FeedbackType, feedbackTypes } from ".";
import { CloseButton } from "../CloseButton";

interface FeedbackFormProps {
  selectedFeedbackType: FeedbackType
  onBackPressed: () => void
}

export function FeedbackForm({ selectedFeedbackType, onBackPressed }: FeedbackFormProps) {

  const feedback = feedbackTypes[selectedFeedbackType];

  return (
    <>
      <header>
        <button
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onBackPressed}
          type="button"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedback.image.src} alt={feedback.image.alt} className="h-6 w-6" />
          {feedback.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
        />

        <footer className="flex gap-2 mt-2">
          <button
            className="p-2 rounded-md bg-zinc-800 border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
            type="button"
          >
            <Camera className="h-6 w-6 text-zinc-100" />
          </button>

          <button
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
            type="submit"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  )
}