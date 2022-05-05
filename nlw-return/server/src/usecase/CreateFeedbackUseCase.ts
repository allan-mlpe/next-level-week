import { MailSender } from "../infrastructure/MailSender";
import { FeedbackRepository } from "../repository/FeedbackRepository";

export interface CreateFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class CreateFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailSender: MailSender,
  ) {} 

  async execute({type, comment, screenshot}: CreateFeedbackRequest) {    
    if (!type || !comment) {
      throw new Error('Invalid payload');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format');
    }
    
    await this.feedbackRepository.create({ type, comment, screenshot});

    await this.mailSender.send({
      to: `Saga <saga@santuario.com>`,
      body: [
        '<div>',
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '</div>'
      ].join('\n')
    });
  }
}