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
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VerifiedIcon from '@mui/icons-material/Verified';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function CertCard({ cert, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(!cert.name);
  const [draft, setDraft] = useState({ ...cert });

  const handleSave = () => { onUpdate(draft); setEditing(false); };
  const handleCancel = () => { setDraft({ ...cert }); setEditing(false); };
  const handleField = (f) => (e) => setDraft((p) => ({ ...p, [f]: e.target.value }));

  const isExpired = cert.expiryDate && new Date(cert.expiryDate) < new Date();

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: editing ? 'secondary.main' : 'divider', transition: 'border-color 0.2s', position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, bgcolor: isExpired ? 'error.main' : 'success.main' } }}>
      <Box sx={{ pl: 1.5 }}>
        {editing ? (
          <Stack spacing={1.5}>
            <Grid container spacing={1.5}>
              <Grid item xs={8}><TextField size="small" fullWidth label="Certification Name" value={draft.name || ''} onChange={handleField('name')} autoFocus /></Grid>
              <Grid item xs={4}><TextField size="small" fullWidth label="Issuer" value={draft.issuer || ''} onChange={handleField('issuer')} /></Grid>
            </Grid>
            <Grid container spacing={1.5}>
              <Grid item xs={4}><TextField size="small" fullWidth label="Issue Date" type="month" value={draft.issueDate ? new Date(draft.issueDate).toISOString().slice(0, 7) : ''} onChange={(e) => setDraft((p) => ({ ...p, issueDate: e.target.value }))} InputLabelProps={{ shrink: true }} /></Grid>
              <Grid item xs={4}><TextField size="small" fullWidth label="Expiry Date" type="month" value={draft.expiryDate ? new Date(draft.expiryDate).toISOString().slice(0, 7) : ''} onChange={(e) => setDraft((p) => ({ ...p, expiryDate: e.target.value }))} InputLabelProps={{ shrink: true }} /></Grid>
              <Grid item xs={4}><TextField size="small" fullWidth label="Credential ID" value={draft.credentialId || ''} onChange={handleField('credentialId')} /></Grid>
            </Grid>
            <TextField size="small" fullWidth label="Credential URL" value={draft.url || ''} onChange={handleField('url')} />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <IconButton size="small" onClick={handleSave} sx={{ color: 'success.main', bgcolor: 'rgba(0,200,150,0.08)' }}><CheckIcon fontSize="small" /></IconButton>
              <IconButton size="small" onClick={handleCancel} sx={{ color: 'error.main', bgcolor: 'rgba(255,71,87,0.08)' }}><CloseIcon fontSize="small" /></IconButton>
            </Box>
          </Stack>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <VerifiedIcon sx={{ fontSize: 18, color: isExpired ? 'error.main' : 'success.main', mt: 0.3, flexShrink: 0 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{cert.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono"' }}>
                {cert.issuer}{cert.issueDate ? ` · ${new Date(cert.issueDate).getFullYear()}` : ''}
                {cert.expiryDate ? ` — ${isExpired ? 'Expired' : `Expires ${new Date(cert.expiryDate).getFullYear()}`}` : ''}
              </Typography>
              {cert.credentialId && <Typography variant="caption" sx={{ display: 'block', color: 'text.disabled', fontFamily: '"IBM Plex Mono"' }}>ID: {cert.credentialId}</Typography>}
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {cert.url && <IconButton size="small" component="a" href={cert.url} target="_blank" sx={{ color: 'secondary.main' }}><OpenInNewIcon sx={{ fontSize: 14 }} /></IconButton>}
              <IconButton size="small" onClick={() => setEditing(true)} sx={{ color: 'text.secondary' }}><EditIcon fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => onDelete(cert)} sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}><DeleteIcon fontSize="small" /></IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default function CertificationsSection({ certifications, onChange }) {
  const handleUpdate = (updated) => onChange(certifications.map((c) => (c === updated || c._id === updated._id ? updated : c)));
  const handleDelete = (toDelete) => onChange(certifications.filter((c) => c !== toDelete && c._id !== toDelete._id));
  const handleAdd = () => onChange([{ name: '', _tempId: Date.now() }, ...(certifications || [])]);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 3, height: 22, bgcolor: 'success.main', borderRadius: 1 }} />
          <Typography variant="h6" sx={{ fontFamily: '"IBM Plex Mono"', fontWeight: 600 }}>Certifications</Typography>
          <Chip label={certifications?.length || 0} size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontFamily: '"IBM Plex Mono"', fontSize: '0.65rem', height: 20 }} />
        </Box>
        <Button startIcon={<AddIcon />} size="small" onClick={handleAdd} variant="outlined" sx={{ fontFamily: '"IBM Plex Mono"', fontSize: '0.72rem', borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'transparent' } }}>
          Add Certification
        </Button>
      </Box>

      {(!certifications || certifications.length === 0) ? (
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', borderStyle: 'dashed', borderColor: 'divider', bgcolor: 'background.default' }}>
          <VerifiedIcon sx={{ fontSize: 32, color: 'text.disabled', mb: 0.5 }} />
          <Typography variant="body2" color="text.secondary">No certifications added yet.</Typography>
        </Paper>
      ) : (
        <Stack spacing={1.2}>
          {certifications.map((cert, i) => (
            <CertCard key={cert._id || cert._tempId || i} cert={cert} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
