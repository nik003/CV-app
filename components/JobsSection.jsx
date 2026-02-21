import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import JobCard from './JobCard';

export default function JobsSection({ jobs, skills, onChange }) {
  const handleUpdateJob = (updatedJob) => {
    const updated = jobs.map((j) =>
      j._id === updatedJob._id || j === updatedJob ? updatedJob : j
    );
    onChange(updated);
  };

  const handleDeleteJob = (jobToDelete) => {
    onChange(jobs.filter((j) => j !== jobToDelete && j._id !== jobToDelete._id));
  };

  const handleAddJob = () => {
    const newJob = {
      title: '',
      company: '',
      location: '',
      current: true,
      skills: [],
      responsibilities: [],
      description: '',
      _tempId: Date.now(),
    };
    onChange([newJob, ...(jobs || [])]);
  };

  return (
    <Box>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 3, height: 22, bgcolor: 'primary.main', borderRadius: 1 }} />
          <Typography
            variant="h6"
            sx={{ fontFamily: '"IBM Plex Mono"', fontWeight: 600, letterSpacing: '-0.01em' }}
          >
            Experience
          </Typography>
          <Chip
            label={jobs?.length || 0}
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
          onClick={handleAddJob}
          variant="outlined"
          sx={{
            fontFamily: '"IBM Plex Mono"',
            fontSize: '0.72rem',
            borderColor: 'divider',
            color: 'text.secondary',
            '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'transparent' },
          }}
        >
          Add Job
        </Button>
      </Box>

      {/* Jobs List */}
      {(!jobs || jobs.length === 0) ? (
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
          <WorkHistoryIcon sx={{ fontSize: 36, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            No work experience added yet. Click <strong>Add Job</strong> to get started.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={1.5}>
          {jobs.map((job, i) => (
            <JobCard
              key={job._id || job._tempId || i}
              job={job}
              allSkills={skills}
              onUpdate={handleUpdateJob}
              onDelete={handleDeleteJob}
              defaultExpanded={!job.title}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
