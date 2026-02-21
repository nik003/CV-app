import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  IconButton,
  Collapse,
  Divider,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function JobCard({ job, allSkills, onUpdate, onDelete, defaultExpanded = false }) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [draft, setDraft] = useState({ ...job });
  const [newResponsibility, setNewResponsibility] = useState('');

  const handleEdit = () => {
    setDraft({ ...job });
    setEditing(true);
    setExpanded(true);
  };

  const handleSave = () => {
    onUpdate(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft({ ...job });
    setEditing(false);
  };

  const handleField = (field) => (e) => {
    setDraft((p) => ({ ...p, [field]: e.target.value }));
  };

  const handleAddResponsibility = () => {
    if (!newResponsibility.trim()) return;
    setDraft((p) => ({
      ...p,
      responsibilities: [...(p.responsibilities || []), newResponsibility.trim()],
    }));
    setNewResponsibility('');
  };

  const handleRemoveResponsibility = (idx) => {
    setDraft((p) => ({
      ...p,
      responsibilities: p.responsibilities.filter((_, i) => i !== idx),
    }));
  };

  const d = editing ? draft : job;
  const duration =
    d.current
      ? `${formatDate(d.startDate)} — Present`
      : d.startDate
      ? `${formatDate(d.startDate)} — ${formatDate(d.endDate) || 'Present'}`
      : '';

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: editing ? 'secondary.main' : 'divider',
        transition: 'border-color 0.2s ease',
        '&:hover': {
          borderColor: editing ? 'secondary.main' : 'rgba(0,0,0,0.2)',
        },
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          bgcolor: expanded ? 'rgba(0,0,0,0.015)' : 'transparent',
          cursor: 'pointer',
        }}
        onClick={() => !editing && setExpanded((p) => !p)}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flex: 1 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              bgcolor: 'primary.main',
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              mt: 0.3,
            }}
          >
            <WorkIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            {editing ? (
              <Stack spacing={1.5} onClick={(e) => e.stopPropagation()}>
                <TextField
                  fullWidth
                  size="small"
                  label="Job Title"
                  value={draft.title || ''}
                  onChange={handleField('title')}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Company"
                  value={draft.company || ''}
                  onChange={handleField('company')}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Location"
                  value={draft.location || ''}
                  onChange={handleField('location')}
                />
              </Stack>
            ) : (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                  {d.title || 'Job Title'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  {d.company || 'Company'}
                  {d.location ? ` · ${d.location}` : ''}
                </Typography>
                {duration && (
                  <Typography
                    variant="caption"
                    sx={{ color: 'secondary.main', fontFamily: '"IBM Plex Mono"', display: 'block', mt: 0.3 }}
                  >
                    {duration}
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* Actions */}
        <Box
          sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flexShrink: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {editing ? (
            <>
              <IconButton
                size="small"
                onClick={handleSave}
                sx={{ color: 'success.main', bgcolor: 'rgba(0,200,150,0.08)', '&:hover': { bgcolor: 'rgba(0,200,150,0.16)' } }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleCancel}
                sx={{ color: 'error.main', bgcolor: 'rgba(255,71,87,0.08)', '&:hover': { bgcolor: 'rgba(255,71,87,0.16)' } }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton size="small" onClick={handleEdit} sx={{ color: 'text.secondary' }}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => onDelete(job)} sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'text.disabled' }}>
                {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      {/* Expanded Content */}
      <Collapse in={expanded}>
        <Divider />
        <Box sx={{ px: 2.5, py: 2.5 }}>
          {editing ? (
            <Stack spacing={2} onClick={(e) => e.stopPropagation()}>
              {/* Dates */}
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono"', letterSpacing: '0.08em' }}>
                  DATES
                </Typography>
                <Stack direction="row" spacing={1.5} sx={{ mt: 1 }} alignItems="center">
                  <TextField
                    size="small"
                    label="Start Date"
                    type="month"
                    value={draft.startDate ? new Date(draft.startDate).toISOString().slice(0, 7) : ''}
                    onChange={(e) => setDraft((p) => ({ ...p, startDate: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1 }}
                  />
                  {!draft.current && (
                    <TextField
                      size="small"
                      label="End Date"
                      type="month"
                      value={draft.endDate ? new Date(draft.endDate).toISOString().slice(0, 7) : ''}
                      onChange={(e) => setDraft((p) => ({ ...p, endDate: e.target.value }))}
                      InputLabelProps={{ shrink: true }}
                      sx={{ flex: 1 }}
                    />
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={!!draft.current}
                        onChange={(e) => setDraft((p) => ({ ...p, current: e.target.checked }))}
                      />
                    }
                    label={<Typography variant="caption" sx={{ fontFamily: '"IBM Plex Mono"' }}>Current</Typography>}
                  />
                </Stack>
              </Box>

              {/* Description */}
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Description"
                value={draft.description || ''}
                onChange={handleField('description')}
              />

              {/* Responsibilities */}
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono"', letterSpacing: '0.08em' }}>
                  KEY RESPONSIBILITIES
                </Typography>
                <Stack spacing={0.8} sx={{ mt: 1 }}>
                  {(draft.responsibilities || []).map((r, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1, lineHeight: 1.5, pt: 0.5 }}>
                        • {r}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveResponsibility(i)}
                        sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}
                      >
                        <CloseIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  ))}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Add a responsibility..."
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddResponsibility()}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleAddResponsibility}
                      disabled={!newResponsibility.trim()}
                      sx={{ minWidth: 40, px: 1 }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </Box>
                </Stack>
              </Box>

              {/* Skills used in this job */}
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono"', letterSpacing: '0.08em' }}>
                  SKILLS USED
                </Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  size="small"
                  sx={{ mt: 1 }}
                  options={(allSkills || []).map((s) => s.name)}
                  value={draft.skills || []}
                  onChange={(_, newVal) => setDraft((p) => ({ ...p, skills: newVal }))}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                        sx={{ fontFamily: '"IBM Plex Mono"', fontSize: '0.7rem' }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Type or select skills..."
                      size="small"
                    />
                  )}
                />
              </Box>
            </Stack>
          ) : (
            <Stack spacing={2}>
              {d.description && (
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {d.description}
                </Typography>
              )}

              {(d.responsibilities || []).length > 0 && (
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono"', letterSpacing: '0.08em' }}>
                    KEY RESPONSIBILITIES
                  </Typography>
                  <Stack spacing={0.5} sx={{ mt: 1 }}>
                    {d.responsibilities.map((r, i) => (
                      <Typography key={i} variant="body2" sx={{ display: 'flex', gap: 1, color: 'text.secondary' }}>
                        <span style={{ color: '#00D4FF', flexShrink: 0 }}>›</span>
                        {r}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}

              {(d.skills || []).length > 0 && (
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono"', letterSpacing: '0.08em' }}>
                    SKILLS USED
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mt: 1 }}>
                    {d.skills.map((s, i) => (
                      <Chip
                        key={i}
                        label={s}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(0,212,255,0.06)',
                          border: '1px solid rgba(0,212,255,0.2)',
                          color: 'text.primary',
                          fontFamily: '"IBM Plex Mono"',
                          fontSize: '0.68rem',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {!d.description && !d.responsibilities?.length && !d.skills?.length && (
                <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                  Click edit to add details for this position.
                </Typography>
              )}
            </Stack>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
}
