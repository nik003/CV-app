import connectDB from '../../../lib/mongodb';
import CV from '../../../models/CV';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const cvs = await CV.find({}).sort({ updatedAt: -1 }).select('firstName lastName title profilePicture updatedAt slug skills jobs');
      return res.status(200).json(cvs);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch CVs', details: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const cv = new CV(req.body);
      await cv.save();
      return res.status(201).json(cv);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to create CV', details: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
