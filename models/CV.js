import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: {
    type: String,
    enum: ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert', 'Master'],
    default: 'Intermediate',
  },
  category: { type: String, default: 'General' },
  yearsOfExperience: { type: Number, default: 0 },
  icon: { type: String }, // optional icon name or URL
});

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
  responsibilities: [{ type: String }],
  skills: [{ type: String }], // References skill names used in this job
});

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  field: { type: String },
  institution: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
  grade: { type: String },
});

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String },
  issueDate: { type: Date },
  expiryDate: { type: Date },
  credentialId: { type: String },
  url: { type: String },
});

const SocialLinkSchema = new mongoose.Schema({
  platform: { type: String }, // LinkedIn, GitHub, Twitter, etc.
  url: { type: String },
});

const CVSchema = new mongoose.Schema(
  {
    // Personal Info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: { type: String }, // e.g. "Senior Full-Stack Developer"
    email: { type: String },
    phone: { type: String },
    location: { type: String },
    website: { type: String },
    summary: { type: String },
    profilePicture: { type: String }, // Base64 or URL
    socialLinks: [SocialLinkSchema],

    // CV Sections
    skills: [SkillSchema],
    jobs: [JobSchema],
    education: [EducationSchema],
    certifications: [CertificationSchema],

    // Metadata
    isPublic: { type: Boolean, default: false },
    slug: { type: String, unique: true, sparse: true },
    template: { type: String, default: 'modern' },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from name
CVSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = `${this.firstName}-${this.lastName}-${Date.now()}`
      .toLowerCase()
      .replace(/\s+/g, '-');
  }
  next();
});

export default mongoose.models.CV || mongoose.model('CV', CVSchema);
