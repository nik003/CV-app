import { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
  Chip,
  Tooltip,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonalInfo from './PersonalInfo';
import SkillsSection from './SkillsSection';
import JobsSection from './JobsSection';
import EducationSection from './EducationSection';
import CertificationsSection from './CertificationsSection';

export default function CVLayout({ initialData, cvId, onSaved }) {
  const [cvData, setCvData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSection = useCallback((section) => (value) => {
    setCvData((prev) => ({ ...prev, [section]: value }));
    setHasChanges(true);
    setSaved(false);
  }, []);

  const updatePersonalInfo = useCallback((newData) => {
    setCvData((prev) => ({ ...prev, ...newData }));
    setHasChanges(true);
    setSaved(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const method = cvId ? 'PUT' : 'POST';
      const url = cvId ? `/api/cv/${cvId}` : '/api/cv';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cvData),
      });
      if (!res.ok) throw new Error('Failed to save');
      const saved = await res.json();
      setSaved(true);
      setHasChanges(false);
      if (onSaved) onSaved(saved);
    } catch (e) {
      setError(e.message || 'Failed to save CV');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top Bar */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          bgcolor: 'rgba(244,244,240,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              bgcolor: 'primary.main',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 15, color: 'secondary.main' }} />
          </Box>
          <Typography variant="h6" sx={{ fontFamily: '"IBM Plex Mono"', fontWeight: 700, fontSize: '0.95rem' }}>
            CV<span style={{ color: '#00D4FF' }}>.</span>forge
          </Typography>
          {hasChanges && (
            <Chip
              label="unsaved changes"
              size="small"
              sx={{
                bgcolor: 'rgba(255,179,71,0.12)',
                color: 'warning.main',
                border: '1px solid rgba(255,179,71,0.3)',
                fontFamily: '"IBM Plex Mono"',
                fontSize: '0.62rem',
                height: 20,
              }}
            />
          )}
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          {saved && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <CloudDoneIcon sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography variant="caption" sx={{ color: 'success.main', fontFamily: '"IBM Plex Mono"' }}>
                Saved
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            size="small"
            startIcon={saving ? <CircularProgress size={14} color="inherit" /> : <SaveIcon />}
            onClick={handleSave}
            disabled={saving || !hasChanges}
            sx={{
              minWidth: 90,
              opacity: hasChanges ? 1 : 0.5,
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Stack>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Personal Info (full width) */}
          <PersonalInfo
            data={{
              firstName: cvData.firstName,
              lastName: cvData.lastName,
              title: cvData.title,
              email: cvData.email,
              phone: cvData.phone,
              location: cvData.location,
              website: cvData.website,
              summary: cvData.summary,
              profilePicture: cvData.profilePicture,
              socialLinks: cvData.socialLinks,
            }}
            onChange={updatePersonalInfo}
          />

          {/* Two-column layout for Skills + Right column */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
              gap: 4,
              alignItems: 'start',
            }}
          >
            {/* Left column: Skills */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                p: 3,
              }}
            >
              <SkillsSection
                skills={cvData.skills || []}
                jobs={cvData.jobs || []}
                onChange={updateSection('skills')}
              />
            </Box>

            {/* Right column: Jobs + Education + Certifications */}
            <Stack spacing={3}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 3,
                }}
              >
                <JobsSection
                  jobs={cvData.jobs || []}
                  skills={cvData.skills || []}
                  onChange={updateSection('jobs')}
                />
              </Box>

              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 3,
                }}
              >
                <EducationSection
                  education={cvData.education || []}
                  onChange={updateSection('education')}
                />
              </Box>

              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 3,
                }}
              >
                <CertificationsSection
                  certifications={cvData.certifications || []}
                  onChange={updateSection('certifications')}
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)} sx={{ fontFamily: '"IBM Plex Mono"' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
