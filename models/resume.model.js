import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String, default: "Untitle Resume",
  },
  public: {
    type: Boolean, default: false
  },
  template: {
    type: String, default: "classic"
  },
  accentColor: {
    type: String, default: 'darkblue'
  },
  summary: {
    type: String, default: ''
  },
  skills: [{
    type: String
  }],
  personalInfo: {
    image: {
      type: String, default: ''
    },
    imageId: {
      type: String, default: ''
    },
    fullname: {
      type: String, default: ''
    },
    jobTitle: {
      type: String, default: ''
    },
    email: {
      type: String, default: ''
    },
    phone: {
      type: String, default: ''
    },
    address: {
      type: String, default: ''
    },
    linkedinUrl: {
      type: String, default: ''
    },
    portfolioUrl: {
      type: String, default: ''
    },
  },
  experiences: [
    {
      company: { type: String },
      position: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      isCurrent: { type: Boolean },
      description: { type: String },
    }
  ],
  projects: [
    {
      name: { type: String },
      type: { type: String },
      description: { type: String },
    }
  ],
  educations: [
    {
      institueName: { type: String },
      degree: { type: String },
      fieldOfStudy: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      gpa: { type: String },
    }

  ],
}, {
  timestamps: true,
  minimize: false
})

const Resume = mongoose.model('Resume', ResumeSchema);
export default Resume
