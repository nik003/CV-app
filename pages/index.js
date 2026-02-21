import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Stack,
  Chip,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const res = await fetch('/api/cv');
      if (res.ok) {
        const data = await res.json();
        setCvs(data);
      }
    } catch (e) {
      console.error('Failed to load CVs:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const res = await fetch('/api/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'New',
          lastName: 'Developer',
          title: 'IT Professional',
          skills: [],
          jobs: [],
          education: [],
          certifications: [],
        }),
      });
      if (res.ok) {
        const cv = await res.json();
        router.push(`/cv/${cv._id}`);
      }
    } catch (e) {
      console.error('Failed to create CV:', e);
      setCreating(false);
    }
  };

  const handleDelete = async (e, cvId) => {
    e.stopPropagation();
    if (!confirm('Delete this CV?')) return;
    try {
      await fetch(`/api/cv/${cvId}`, { method: 'DELETE' });
      setCvs((prev) => prev.filter((c) => c._id !== cvId));
    } catch (e) {
      console.error('Failed to delete:', e);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%)',
          py: 6,
          px: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'rgba(255,255,255,0.08)',
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <AutoAwesomeIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono"',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'white',
                  }}
                >
                  CV<span style={{ color: '#00D4FF' }}>.</span>forge
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: 1,
                  fontFamily: '"IBM Plex Mono"',
                }}
              >
                Your CVs
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Build and manage your IT curriculum vitae
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={creating ? <CircularProgress size={16} color="inherit" /> : <AddIcon />}
              onClick={handleCreate}
              disabled={creating}
              sx={{
                bgcolor: 'secondary.main',
                color: 'primary.main',
                fontWeight: 700,
                px: 3,
                '&:hover': { bgcolor: 'secondary.light' },
              }}
            >
              {creating ? 'Creating...' : 'New CV'}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CV Grid */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : cvs.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 8,
              textAlign: 'center',
              borderStyle: 'dashed',
              borderColor: 'divider',
              bgcolor: 'transparent',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h5" sx={{ fontFamily: '"IBM Plex Mono"', mb: 1 }}>
              No CVs yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first IT CV to get started
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              disabled={creating}
            >
              Create First CV
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={2.5}>
            {cvs.map((cv) => (
              <Grid item xs={12} sm={6} md={4} key={cv._id}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => router.push(`/cv/${cv._id}`)}
                    sx={{ height: '100%', pb: 1 }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar
                          src={cv.profilePicture}
                          sx={{
                            width: 52,
                            height: 52,
                            bgcolor: 'primary.main',
                            fontFamily: '"IBM Plex Mono"',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                          }}
                        >
                          {cv.firstName?.[0]}{cv.lastName?.[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                            {cv.firstName} {cv.lastName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono"' }}>
                            {cv.title || 'IT Professional'}
                          </Typography>
                        </Box>
                      </Box>

                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        {cv.skills?.length > 0 && (
                          <Chip
                            label={`${cv.skills.length} skills`}
                            size="small"
                            sx={{ fontFamily: '"IBM Plex Mono"', fontSize: '0.65rem', bgcolor: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)' }}
                          />
                        )}
                        {cv.jobs?.length > 0 && (
                          <Chip
                            label={`${cv.jobs.length} jobs`}
                            size="small"
                            sx={{ fontFamily: '"IBM Plex Mono"', fontSize: '0.65rem', bgcolor: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)' }}
                          />
                        )}
                      </Stack>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: '"IBM Plex Mono"' }}>
                          Updated {new Date(cv.updatedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>

                  {/* Delete Button */}
                  <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <Tooltip title="Delete CV">
                      <IconButton
                        size="small"
                        onClick={(e) => handleDelete(e, cv._id)}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.8)',
                          color: 'text.disabled',
                          '&:hover': { bgcolor: 'rgba(255,71,87,0.1)', color: 'error.main' },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
