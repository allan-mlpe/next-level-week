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