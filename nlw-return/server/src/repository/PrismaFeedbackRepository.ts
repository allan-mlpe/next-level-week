import { FeedbackData, FeedbackRepository } from "./FeedbackRepository";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query']
});

export class PrismaFeedbackRepository implements FeedbackRepository {
  async create({ type, comment, screenshot }: FeedbackData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      } 
    });
  }
}