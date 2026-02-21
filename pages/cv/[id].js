import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CVLayout from '../../components/CVLayout';

const EMPTY_CV = {
  firstName: '',
  lastName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  summary: '',
  profilePicture: null,
  socialLinks: [],
  skills: [],
  jobs: [],
  education: [],
  certifications: [],
};

export default function CVPage() {
  const router = useRouter();
  const { id } = router.query;
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchCV();
  }, [id]);

  const fetchCV = async () => {
    try {
      const res = await fetch(`/api/cv/${id}`);
      if (!res.ok) throw new Error('CV not found');
      const data = await res.json();
      setCv(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: 2 }}>
        <CircularProgress />
        <Typography variant="caption" sx={{ fontFamily: '"IBM Plex Mono"', color: 'text.secondary' }}>
          Loading CV...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: '"IBM Plex Mono"' }}>
          {error}
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.push('/')}>
          Back to CVs
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Back navigation */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          size="small"
          onClick={() => router.push('/')}
          sx={{
            bgcolor: 'rgba(10,10,15,0.85)',
            color: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: '"IBM Plex Mono"',
            fontSize: '0.72rem',
            '&:hover': { bgcolor: 'rgba(10,10,15,0.95)', color: 'white' },
          }}
        >
          All CVs
        </Button>
      </Box>

      <CVLayout
        initialData={cv || EMPTY_CV}
        cvId={id}
        onSaved={(savedCv) => {
          setCv(savedCv);
          // Optionally update URL if new ID
          if (savedCv._id && savedCv._id !== id) {
            router.replace(`/cv/${savedCv._id}`, undefined, { shallow: true });
          }
        }}
      />
    </Box>
  );
}
