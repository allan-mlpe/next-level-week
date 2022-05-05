import { CreateFeedbackUseCase } from "./CreateFeedbackUseCase";

const feedbackRepositorySpy = jest.fn();
const mailSenderSpy = jest.fn();

const useCase = new CreateFeedbackUseCase(
  { create: feedbackRepositorySpy },
  { send: mailSenderSpy },
);

describe('Create feedback', () => {
  
  it('should create a new feedback', async () => {
    await expect(
      useCase.execute({
        type: 'BUG',
        comment: 'Tudo bugado',
        screenshot: 'data:image/png;base64'
      })
    ).resolves.not.toThrow();

    expect(feedbackRepositorySpy).toHaveBeenCalled();
    expect(mailSenderSpy).toHaveBeenCalled();
  });

  it('should not create a feedback without a type', async () => {
    await expect(
      useCase.execute({
        type: '',
        comment: 'Tudo bugado',
        screenshot: 'data:image/png;base64'
      })
    ).rejects.toThrow();

    expect(feedbackRepositorySpy).not.toHaveBeenCalled();
    expect(mailSenderSpy).not.toHaveBeenCalled();
  });

  it('should not create a feedback without a comment', async () => {
    await expect(
      useCase.execute({
        type: 'IDEA',
        comment: '',
        screenshot: 'data:image/png;base64'
      })
    ).rejects.toThrow();

    expect(feedbackRepositorySpy).not.toHaveBeenCalled();
    expect(mailSenderSpy).not.toHaveBeenCalled();
  });

  it('should not create a feedback with an invalid screenshot format', async () => {
    await expect(
      useCase.execute({
        type: 'IDEA',
        comment: 'Segura a ideia',
        screenshot: 'image.png'
      })
    ).rejects.toThrow();

    expect(feedbackRepositorySpy).not.toHaveBeenCalled();
    expect(mailSenderSpy).not.toHaveBeenCalled();
  });
})