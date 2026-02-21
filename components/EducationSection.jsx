import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  IconButton,
  Paper,
  Chip,
  Divider,
  Collapse,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SchoolIcon from '@mui/icons-material/School';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function EducationCard({ edu, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(!edu.degree);
  const [expanded, setExpanded] = useState(!edu.degree);
  const [draft, setDraft] = useState({ ...edu });

  const handleSave = () => { onUpdate(draft); setEditing(false); };
  const handleCancel = () => { setDraft({ ...edu }); setEditing(false); };
  const handleField = (f) => (e) => setDraft((p) => ({ ...p, [f]: e.target.value }));

  const d = editing ? draft : edu;
  const duration = d.current
    ? `${formatDate(d.startDate)} — Present`
    : d.startDate
    ? `${formatDate(d.startDate)} — ${formatDate(d.endDate) || 'Present'}`
    : '';

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: editing ? 'secondary.main' : 'divider', transition: 'border-color 0.2s' }}>
      <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, cursor: 'pointer' }} onClick={() => !editing && setExpanded((p) => !p)}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flex: 1 }}>
          <Box sx={{ width: 38, height: 38, bgcolor: 'rgba(0,0,0,0.04)', border: '1px solid', borderColor: 'divider', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.3 }}>
            <SchoolIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            {editing ? (
              <Stack spacing={1.5} onClick={(e) => e.stopPropagation()}>
                <TextField size="small" fullWidth label="Degree / Qualification" value={draft.degree || ''} onChange={handleField('degree')} />
                <TextField size="small" fullWidth label="Field of Study" value={draft.field || ''} onChange={handleField('field')} />
                <TextField size="small" fullWidth label="Institution" value={draft.institution || ''} onChange={handleField('institution')} />
                <TextField size="small" fullWidth label="Location" value={draft.location || ''} onChange={handleField('location')} />
              </Stack>
            ) : (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                  {d.degree || 'Degree'}{d.field ? `, ${d.field}` : ''}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{d.institution || 'Institution'}{d.location ? ` · ${d.location}` : ''}</Typography>
                {duration && <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: '"IBM Plex Mono"', display: 'block', mt: 0.3 }}>{duration}</Typography>}
                {d.grade && <Chip label={d.grade} size="small" sx={{ mt: 0.5, fontFamily: '"IBM Plex Mono"', fontSize: '0.65rem', height: 20, bgcolor: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)' }} />}
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
          {editing ? (
            <>
              <IconButton size="small" onClick={handleSave} sx={{ color: 'success.main', bgcolor: 'rgba(0,200,150,0.08)' }}><CheckIcon fontSize="small" /></IconButton>
              <IconButton size="small" onClick={handleCancel} sx={{ color: 'error.main', bgcolor: 'rgba(255,71,87,0.08)' }}><CloseIcon fontSize="small" /></IconButton>
            </>
          ) : (
            <>
              <IconButton size="small" onClick={() => { setEditing(true); setExpanded(true); }} sx={{ color: 'text.secondary' }}><EditIcon fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => onDelete(edu)} sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}><DeleteIcon fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: 'text.disabled' }}>{expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}</IconButton>
            </>
          )}
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Divider />
        <Box sx={{ px: 2.5, py: 2.5 }}>
          {editing ? (
            <Stack spacing={2} onClick={(e) => e.stopPropagation()}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <TextField size="small" label="Start Date" type="month" value={draft.startDate ? new Date(draft.startDate).toISOString().slice(0, 7) : ''} onChange={(e) => setDraft((p) => ({ ...p, startDate: e.target.value }))} InputLabelProps={{ shrink: true }} sx={{ flex: 1 }} />
                {!draft.current && <TextField size="small" label="End Date" type="month" value={draft.endDate ? new Date(draft.endDate).toISOString().slice(0, 7) : ''} onChange={(e) => setDraft((p) => ({ ...p, endDate: e.target.value }))} InputLabelProps={{ shrink: true }} sx={{ flex: 1 }} />}
                <FormControlLabel control={<Checkbox size="small" checked={!!draft.current} onChange={(e) => setDraft((p) => ({ ...p, current: e.target.checked }))} />} label={<Typography variant="caption" sx={{ fontFamily: '"IBM Plex Mono"' }}>Current</Typography>} />
              </Stack>
              <TextField size="small" fullWidth label="Grade / GPA" value={draft.grade || ''} onChange={handleField('grade')} />
              <TextField size="small" fullWidth multiline rows={2} label="Description" value={draft.description || ''} onChange={handleField('description')} />
            </Stack>
          ) : (
            <Box>
              {d.description && <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{d.description}</Typography>}
              {!d.description && <Typography variant="body2" color="text.disabled" fontStyle="italic">Click edit to add details.</Typography>}
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
}

export default function EducationSection({ education, onChange }) {
  const handleUpdate = (updated) => {
    onChange(education.map((e) => (e === updated || e._id === updated._id ? updated : e)));
  };
  const handleDelete = (toDelete) => {
    onChange(education.filter((e) => e !== toDelete && e._id !== toDelete._id));
  };
  const handleAdd = () => {
    onChange([{ degree: '', institution: '', current: false, _tempId: Date.now() }, ...(education || [])]);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 3, height: 22, bgcolor: 'warning.main', borderRadius: 1 }} />
          <Typography variant="h6" sx={{ fontFamily: '"IBM Plex Mono"', fontWeight: 600 }}>Education</Typography>
          <Chip label={education?.length || 0} size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontFamily: '"IBM Plex Mono"', fontSize: '0.65rem', height: 20 }} />
        </Box>
        <Button startIcon={<AddIcon />} size="small" onClick={handleAdd} variant="outlined" sx={{ fontFamily: '"IBM Plex Mono"', fontSize: '0.72rem', borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'transparent' } }}>
          Add Education
        </Button>
      </Box>

      {(!education || education.length === 0) ? (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderStyle: 'dashed', borderColor: 'divider', bgcolor: 'background.default' }}>
          <SchoolIcon sx={{ fontSize: 36, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">No education added yet.</Typography>
        </Paper>
      ) : (
        <Stack spacing={1.5}>
          {education.map((edu, i) => (
            <EducationCard key={edu._id || edu._tempId || i} edu={edu} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
