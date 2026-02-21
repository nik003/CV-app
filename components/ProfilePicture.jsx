import { useState, useRef } from 'react';
import {
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProfilePicture({ value, onChange, size = 120, editable = true }) {
  const [hovering, setHovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target.result);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  const initials = '?';

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        cursor: editable ? 'pointer' : 'default',
      }}
      onMouseEnter={() => editable && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => editable && fileInputRef.current?.click()}
    >
      <Avatar
        src={value || undefined}
        sx={{
          width: size,
          height: size,
          border: '3px solid',
          borderColor: hovering ? 'secondary.main' : 'divider',
          transition: 'all 0.25s ease',
          fontSize: size * 0.35,
          bgcolor: 'primary.main',
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          boxShadow: hovering
            ? '0 0 0 4px rgba(0, 212, 255, 0.15)'
            : '0 2px 12px rgba(0,0,0,0.1)',
        }}
      >
        {!value && initials}
      </Avatar>

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
          }}
        >
          <CircularProgress size={24} sx={{ color: 'secondary.main' }} />
        </Box>
      )}

      {editable && hovering && !loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(10,10,15,0.65)',
            borderRadius: '50%',
            gap: 0.5,
          }}
        >
          <Tooltip title="Upload photo">
            <IconButton size="small" sx={{ color: 'white', p: 0.5 }}>
              <CameraAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {value && (
            <Tooltip title="Remove photo">
              <IconButton
                size="small"
                sx={{ color: 'error.light', p: 0.5 }}
                onClick={handleRemove}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}

      {editable && !value && !hovering && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            bgcolor: 'secondary.main',
            borderRadius: '50%',
            width: 26,
            height: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          <CameraAltIcon sx={{ fontSize: 14, color: 'primary.main' }} />
        </Box>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </Box>
  );
}
