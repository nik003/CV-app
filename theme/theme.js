import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0A0A0F',
      light: '#1a1a2e',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00D4FF',
      light: '#66E5FF',
      dark: '#0099BB',
      contrastText: '#000000',
    },
    background: {
      default: '#F4F4F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0A0A0F',
      secondary: '#5a5a72',
    },
    success: { main: '#00C896' },
    warning: { main: '#FFB347' },
    error: { main: '#FF4757' },
    divider: '#E0E0E8',
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"IBM Plex Mono", monospace',
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontFamily: '"IBM Plex Mono", monospace',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"IBM Plex Mono", monospace',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"IBM Plex Sans", sans-serif',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"IBM Plex Sans", sans-serif',
      lineHeight: 1.6,
    },
    caption: {
      fontFamily: '"IBM Plex Mono", monospace',
      fontSize: '0.7rem',
      letterSpacing: '0.08em',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 500,
          letterSpacing: '0.02em',
          borderRadius: 2,
        },
        containedPrimary: {
          background: '#0A0A0F',
          '&:hover': {
            background: '#1a1a2e',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '0.72rem',
          borderRadius: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid #E0E0E8',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            '&:hover fieldset': {
              borderColor: '#0A0A0F',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00D4FF',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          height: 4,
          backgroundColor: '#E0E0E8',
        },
        bar: {
          borderRadius: 2,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#00D4FF',
        },
        thumb: {
          color: '#0A0A0F',
        },
      },
    },
  },
});

export default theme;
