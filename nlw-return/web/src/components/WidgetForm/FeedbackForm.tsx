import { FormEvent, useState } from "react";

import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from ".";
import { CloseButton } from "../CloseButton";
import { ScreenshotButton } from "./ScreenshotButton";
import { api } from "../../lib/api";
import { Loading } from "./Loading";

interface FeedbackFormProps {
  selectedFeedbackType: FeedbackType;
  onBackPressed: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackForm({ selectedFeedbackType, onBackPressed, onFeedbackSent }: FeedbackFormProps) {

  const feedback = feedbackTypes[selectedFeedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: selectedFeedbackType,
      comment,
      screenshot
    });

    setIsSendingFeedback(false);

    onFeedbackSent();
  }

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

      <form className="my-4 w-full" onSubmit={handleSubmitForm}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton 
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={comment.length === 0 || isSendingFeedback}
            type="submit"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}