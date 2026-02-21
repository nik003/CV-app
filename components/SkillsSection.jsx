import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import SkillChip from './SkillChip';

const CATEGORIES = [
  'Languages',
  'Frameworks',
  'Databases',
  'Cloud & DevOps',
  'Tools',
  'Soft Skills',
  'General',
];

const LEVEL_LABELS = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert', 'Master'];

export default function SkillsSection({ skills, jobs, onChange }) {
  const [addOpen, setAddOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate', category: 'General' });

  // Build a map: skillName → jobs it's used in
  const skillToJobs = {};
  (jobs || []).forEach((job) => {
    (job.skills || []).forEach((skillName) => {
      if (!skillToJobs[skillName]) skillToJobs[skillName] = [];
      skillToJobs[skillName].push(job.title + (job.company ? ` @ ${job.company}` : ''));
    });
  });

  // Group skills by category
  const grouped = {};
  (skills || []).forEach((skill) => {
    const cat = skill.category || 'General';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(skill);
  });

  const handleUpdateSkill = (updatedSkill) => {
    const updated = skills.map((s) => (s._id === updatedSkill._id || s.name === updatedSkill.name ? updatedSkill : s));
    onChange(updated);
  };

  const handleDeleteSkill = (skillToDelete) => {
    onChange(skills.filter((s) => s.name !== skillToDelete.name));
  };

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    onChange([...skills, { ...newSkill, name: newSkill.name.trim() }]);
    setNewSkill({ name: '', level: 'Intermediate', category: 'General' });
    setAddOpen(false);
  };

  return (
    <Box>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 3,
              height: 22,
              bgcolor: 'secondary.main',
              borderRadius: 1,
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontFamily: '"IBM Plex Mono"', fontWeight: 600, letterSpacing: '-0.01em' }}
          >
            Skills
          </Typography>
          <Chip
            label={skills?.length || 0}
            size="small"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontFamily: '"IBM Plex Mono"',
              fontSize: '0.65rem',
              height: 20,
            }}
          />
        </Box>
        <Button
          startIcon={<AddIcon />}
          size="small"
          onClick={() => setAddOpen(true)}
          variant="outlined"
          sx={{
            fontFamily: '"IBM Plex Mono"',
            fontSize: '0.72rem',
            borderColor: 'divider',
            color: 'text.secondary',
            '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'transparent' },
          }}
        >
          Add Skill
        </Button>
      </Box>

      {/* Grouped Skills */}
      {Object.keys(grouped).length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: 'center',
            borderStyle: 'dashed',
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          <TuneIcon sx={{ fontSize: 36, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            No skills added yet. Click <strong>Add Skill</strong> to get started.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2.5}>
          {Object.entries(grouped).map(([category, catSkills]) => (
            <Box key={category}>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mb: 1,
                  color: 'text.secondary',
                  fontFamily: '"IBM Plex Mono"',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {catSkills.map((skill, i) => (
                  <SkillChip
                    key={skill._id || skill.name + i}
                    skill={skill}
                    onUpdate={handleUpdateSkill}
                    onDelete={handleDeleteSkill}
                    linkedJobs={skillToJobs[skill.name] || []}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      )}

      {/* Add Skill Dialog */}
      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        PaperProps={{ sx: { width: 400, borderRadius: 2 } }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%)',
            px: 3,
            py: 2.5,
          }}
        >
          <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: '"IBM Plex Mono"', letterSpacing: '0.12em' }}>
            NEW SKILL
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', mt: 0.3, fontWeight: 700 }}>
            Add a Skill
          </Typography>
        </Box>

        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. React, PostgreSQL, Docker..."
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newSkill.category}
                label="Category"
                onChange={(e) => setNewSkill((p) => ({ ...p, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <MenuItem key={c} value={c} sx={{ fontFamily: '"IBM Plex Mono"', fontSize: '0.85rem' }}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Initial Level</InputLabel>
              <Select
                value={newSkill.level}
                label="Initial Level"
                onChange={(e) => setNewSkill((p) => ({ ...p, level: e.target.value }))}
              >
                {LEVEL_LABELS.map((l) => (
                  <MenuItem key={l} value={l} sx={{ fontFamily: '"IBM Plex Mono"', fontSize: '0.85rem' }}>
                    {l}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setAddOpen(false)} variant="outlined" color="inherit" size="small">
            Cancel
          </Button>
          <Button
            onClick={handleAddSkill}
            variant="contained"
            size="small"
            disabled={!newSkill.name.trim()}
          >
            Add Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
