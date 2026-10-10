import ImageKitStorage from "../configs/imagekit.js";
import Resume from "../models/resume.model.js";

export const CreateResume = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title } = req.body;

    // Create Resume
    const newResume = await Resume.create({
      userId: userId,
      title: title,
    })

    return res.status(201).json({
      message: "Create Resume Success",
      resume: newResume
    })

  } catch (error) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message
      });
    }
    return res.status(500).json({
      message: error.message
    });

  }

}

export const GetAllResume = async (req, res) => {
  try {
    const userId = req.user.id;

    const resumes = await Resume.find({ userId: userId });

    return res.status(200).json({
      message: "Get All Resume Success",
      resumes: resumes
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export const DeleteResumeById = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const { resumeId } = req.params;
    const checkResume = await Resume.findById(resumeId);

    if (!checkResume) {
      return res.status(404).json({
        message: "Data not found"
      });
    }

    if(checkResume.personalInfo.imageId) {
      await ImageKitStorage.files.delete(checkResume.personalInfo.imageId);
    }

    await Resume.findOneAndDelete({ _id: resumeId, userId: currentUser });

    return res.status(200).json({
      message: "Delete Resume Success",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export const DetailResumeById = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, userId: currentUser });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    return res.status(200).json({
      message: "Detail Resume Success",
      resume: resume
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export const DetailResumePublicById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, public: true });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    return res.status(200).json({
      message: "Detail Resume Public Success",
      resume: resume
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export const UpdateResumeById = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { resumeId } = req.params;
    const { resumeData, removeBackground } = req.body;

    let resumeDataJSON = JSON.parse(resumeData);

    const checkResume = await Resume.findById(resumeId);

    if (!checkResume) {
      return res.status(404).json({
        message: "Data not found"
      });
    }

    if (req.file) {
      resumeDataJSON.personalInfo.image = "";
      resumeDataJSON.personalInfo.imageId = "";

      const result = await ImageKitStorage.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "/resume",
        transformation: {
          pre: "w-300, h-300, fo-face, z-0.75" + (removeBackground ? ", e-bgremove" : "")
        },
      })

      resumeDataJSON.personalInfo.image = result.url;
      resumeDataJSON.personalInfo.imageId = result.fileId;
    }

    const resume = await Resume.findOneAndUpdate({
      _id: resumeId,
      userId: currentUserId
    }, resumeDataJSON, { returnDocument: 'after' });

    if (!resume) {
      return res.status(400).json({
        message: "Update resume failed"
      });
    }

    return res.status(200).json({
      message: "Update Resume Success",
      resume: resume
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }

}
