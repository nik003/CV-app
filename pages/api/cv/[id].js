import connectDB from '../../../lib/mongodb';
import CV from '../../../models/CV';

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  if (req.method === 'GET') {
    try {
      const cv = await CV.findById(id);
      if (!cv) return res.status(404).json({ error: 'CV not found' });
      return res.status(200).json(cv);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch CV', details: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const cv = await CV.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!cv) return res.status(404).json({ error: 'CV not found' });
      return res.status(200).json(cv);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update CV', details: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const cv = await CV.findByIdAndDelete(id);
      if (!cv) return res.status(404).json({ error: 'CV not found' });
      return res.status(200).json({ message: 'CV deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete CV', details: error.message });
    }
  }

  // PATCH for partial updates (e.g., updating a single skill)
  if (req.method === 'PATCH') {
    try {
      const cv = await CV.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!cv) return res.status(404).json({ error: 'CV not found' });
      return res.status(200).json(cv);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to patch CV', details: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
