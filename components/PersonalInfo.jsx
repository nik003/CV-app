import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Collapse,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ProfilePicture from './ProfilePicture';

const SOCIAL_PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
  { key: 'github', label: 'GitHub', Icon: GitHubIcon },
  { key: 'twitter', label: 'Twitter', Icon: LanguageIcon },
  { key: 'website', label: 'Website', Icon: LanguageIcon },
];

export default function PersonalInfo({ data, onChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(data);

  const handleEdit = () => {
    setDraft({ ...data });
    setEditing(true);
  };

  const handleSave = () => {
    onChange(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft({ ...data });
    setEditing(false);
  };

  const handleFieldChange = (field) => (e) => {
    setDraft((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSocialChange = (idx, field) => (e) => {
    const updated = [...(draft.socialLinks || [])];
    updated[idx] = { ...updated[idx], [field]: e.target.value };
    setDraft((prev) => ({ ...prev, socialLinks: updated }));
  };

  const handleAddSocial = () => {
    setDraft((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), { platform: '', url: '' }],
    }));
  };

  const handleRemoveSocial = (idx) => {
    const updated = (draft.socialLinks || []).filter((_, i) => i !== idx);
    setDraft((prev) => ({ ...prev, socialLinks: updated }));
  };

  const d = editing ? draft : data;

  return (
    <Box
      sx={{
        position: 'relative',
        p: { xs: 3, md: 4 },
        background: 'linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%)',
        color: 'white',
        borderRadius: 2,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          background:
            'radial-gradient(ellipse at top right, rgba(0,212,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Action buttons */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
        {editing ? (
          <>
            <Tooltip title="Save changes">
              <IconButton
                size="small"
                onClick={handleSave}
                sx={{
                  bgcolor: 'rgba(0,212,255,0.15)',
                  color: 'secondary.main',
                  '&:hover': { bgcolor: 'rgba(0,212,255,0.25)' },
                }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton
                size="small"
                onClick={handleCancel}
                sx={{
                  bgcolor: 'rgba(255,71,87,0.15)',
                  color: '#FF4757',
                  '&:hover': { bgcolor: 'rgba(255,71,87,0.25)' },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Edit personal info">
            <IconButton
              size="small"
              onClick={handleEdit}
              sx={{
                bgcolor: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', color: 'white' },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Profile Picture */}
        <Box sx={{ flexShrink: 0 }}>
          <ProfilePicture
            value={d.profilePicture}
            onChange={(val) => editing && setDraft((p) => ({ ...p, profilePicture: val }))}
            size={100}
            editable={editing}
          />
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1, minWidth: 240 }}>
          {editing ? (
            <Stack spacing={1.5}>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="First Name"
                    value={draft.firstName || ''}
                    onChange={handleFieldChange('firstName')}
                    sx={darkFieldSx}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Last Name"
                    value={draft.lastName || ''}
                    onChange={handleFieldChange('lastName')}
                    sx={darkFieldSx}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                size="small"
                label="Professional Title"
                value={draft.title || ''}
                onChange={handleFieldChange('title')}
                placeholder="e.g. Senior Full-Stack Developer"
                sx={darkFieldSx}
              />
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    value={draft.email || ''}
                    onChange={handleFieldChange('email')}
                    sx={darkFieldSx}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Phone"
                    value={draft.phone || ''}
                    onChange={handleFieldChange('phone')}
                    sx={darkFieldSx}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Location"
                    value={draft.location || ''}
                    onChange={handleFieldChange('location')}
                    sx={darkFieldSx}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Website"
                    value={draft.website || ''}
                    onChange={handleFieldChange('website')}
                    sx={darkFieldSx}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={3}
                label="Professional Summary"
                value={draft.summary || ''}
                onChange={handleFieldChange('summary')}
                sx={darkFieldSx}
              />
              {/* Social Links */}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block' }}>
                  SOCIAL LINKS
                </Typography>
                <Stack spacing={1}>
                  {(draft.socialLinks || []).map((link, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <TextField
                        size="small"
                        label="Platform"
                        value={link.platform || ''}
                        onChange={handleSocialChange(idx, 'platform')}
                        sx={{ ...darkFieldSx, width: 140 }}
                      />
                      <TextField
                        size="small"
                        label="URL"
                        value={link.url || ''}
                        onChange={handleSocialChange(idx, 'url')}
                        sx={{ ...darkFieldSx, flex: 1 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveSocial(idx)}
                        sx={{ color: 'rgba(255,71,87,0.7)', '&:hover': { color: '#FF4757' } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                  <Box>
                    <Chip
                      icon={<AddIcon />}
                      label="Add link"
                      size="small"
                      onClick={handleAddSocial}
                      sx={{
                        color: 'rgba(0,212,255,0.8)',
                        borderColor: 'rgba(0,212,255,0.3)',
                        bgcolor: 'rgba(0,212,255,0.07)',
                        fontFamily: '"IBM Plex Mono", monospace',
                        '& .MuiChip-icon': { color: 'inherit' },
                        '&:hover': { bgcolor: 'rgba(0,212,255,0.15)' },
                      }}
                      variant="outlined"
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          ) : (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: 'secondary.main',
                  fontFamily: '"IBM Plex Mono", monospace',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                }}
              >
                {d.title || 'IT Professional'}
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2, mt: 0.5, mb: 1.5 }}
              >
                {d.firstName || 'First'} {d.lastName || 'Last'}
              </Typography>

              {d.summary && (
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.65)', mb: 2, maxWidth: 600, lineHeight: 1.7 }}
                >
                  {d.summary}
                </Typography>
              )}

              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ gap: 1.5 }}>
                {d.email && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    <EmailIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"IBM Plex Mono"' }}>
                      {d.email}
                    </Typography>
                  </Box>
                )}
                {d.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    <PhoneIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"IBM Plex Mono"' }}>
                      {d.phone}
                    </Typography>
                  </Box>
                )}
                {d.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    <LocationOnIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"IBM Plex Mono"' }}>
                      {d.location}
                    </Typography>
                  </Box>
                )}
                {d.website && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    <LanguageIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                    <Typography
                      variant="caption"
                      component="a"
                      href={d.website}
                      target="_blank"
                      sx={{ color: 'secondary.main', fontFamily: '"IBM Plex Mono"', textDecoration: 'none' }}
                    >
                      {d.website.replace(/^https?:\/\//, '')}
                    </Typography>
                  </Box>
                )}
              </Stack>

              {(d.socialLinks || []).length > 0 && (
                <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                  {d.socialLinks.map((link, idx) => (
                    <Chip
                      key={idx}
                      label={link.platform}
                      size="small"
                      component="a"
                      href={link.url}
                      target="_blank"
                      clickable
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: '"IBM Plex Mono"',
                        fontSize: '0.65rem',
                        borderRadius: 1,
                        border: '1px solid rgba(255,255,255,0.12)',
                        '&:hover': { bgcolor: 'rgba(0,212,255,0.12)', color: 'secondary.main' },
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const darkFieldSx = {
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'secondary.main' },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: 'secondary.main', borderWidth: 2 },
  },
};
