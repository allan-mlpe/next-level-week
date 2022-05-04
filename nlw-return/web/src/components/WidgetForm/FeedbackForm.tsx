import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from ".";
import { CloseButton } from "../CloseButton";

interface FeedbackFormProps {
  selectedFeedbackType: FeedbackType
  onBackPressed: () => void
}

export function FeedbackForm({ selectedFeedbackType, onBackPressed }: FeedbackFormProps) {

  const feedback = feedbackTypes[selectedFeedbackType] ; 

  return (
    <>
      <header>
        <button 
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onBackPressed}
          type="button"
        >
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedback.image.src} alt={feedback.image.alt} className="h-6 w-6"/>
          { feedback.title }
        </span>

        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        
      </div>
    </>
  )
}