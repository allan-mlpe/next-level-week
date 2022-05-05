export interface MailSenderData {
  to: string;
  body: string;
}

export interface MailSender {
  send: ({to, body}: MailSenderData) => Promise<void>;
}