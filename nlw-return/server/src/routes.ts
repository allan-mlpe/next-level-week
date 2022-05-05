import express from "express";
import { NodemailerMailSender } from "./infrastructure/NodemailerMailSender";
import { PrismaFeedbackRepository } from "./repository/PrismaFeedbackRepository";
import { CreateFeedbackUseCase } from "./usecase/CreateFeedbackUseCase";


export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailSender = new NodemailerMailSender();

  const createFeedbackUseCase = new CreateFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailSender
  );

  createFeedbackUseCase.execute({ type, comment, screenshot })
  return res.status(201).send();
});