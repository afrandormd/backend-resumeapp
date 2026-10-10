import express from "express";
import { CreateResume, DeleteResumeById, DetailResumeById, DetailResumePublicById, GetAllResume, UpdateResumeById } from "../controllers/resume.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import uploadFile from "../configs/multer.js";

const ResumeRouter = express.Router();

// /api/v1/resume

// POST /api/v1/resume
ResumeRouter.post('/', protectedRoute, CreateResume);
// GET /api/v1/resume
ResumeRouter.get('/', protectedRoute, GetAllResume);
// DELETE /api/v1/resume/:resumeId
ResumeRouter.delete('/:resumeId', protectedRoute, DeleteResumeById);
// GET /api/v1/resume/:resumeId
ResumeRouter.get('/:resumeId', protectedRoute, DetailResumeById);
// GET /api/v1/resume/public/:resumeId
ResumeRouter.get('/public/:resumeId', DetailResumePublicById);
// PUT /api/v1/resume/:resumeId
ResumeRouter.put('/:resumeId', protectedRoute, uploadFile.single("image"), UpdateResumeById);

export default ResumeRouter;
