import { MailSender, MailSenderData } from "./MailSender";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bdb053ecc6ee3d",
    pass: "92f48387cc7b14"
  }
});

export class NodemailerMailSender implements MailSender {
  async send({ to, body }: MailSenderData) {
    await transport.sendMail({
      from: 'Shaka <shaka@santuario.com>',
      subject: 'Novo Feedback',
      to,
      html: body
    });
  }
}