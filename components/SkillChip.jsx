import { useState } from 'react';
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Slider,
  LinearProgress,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';

const SKILL_LEVELS = [
  { label: 'Beginner', value: 0, color: '#94a3b8', description: 'Just getting started' },
  { label: 'Elementary', value: 20, color: '#60a5fa', description: 'Basic understanding' },
  { label: 'Intermediate', value: 40, color: '#34d399', description: 'Can work independently' },
  { label: 'Advanced', value: 60, color: '#fbbf24', description: 'Strong expertise' },
  { label: 'Expert', value: 80, color: '#f97316', description: 'Deep mastery & mentoring' },
  { label: 'Master', value: 100, color: '#a855f7', description: 'Industry-level authority' },
];

function getLevelData(levelName) {
  return SKILL_LEVELS.find((l) => l.label === levelName) || SKILL_LEVELS[2];
}

function getLevelFromValue(value) {
  const sorted = [...SKILL_LEVELS].sort(
    (a, b) => Math.abs(a.value - value) - Math.abs(b.value - value)
  );
  return sorted[0];
}

export default function SkillChip({ skill, onUpdate, onDelete, linkedJobs = [] }) {
  const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(
    getLevelData(skill.level).value
  );

  const levelData = getLevelData(skill.level);
  const previewLevel = getLevelFromValue(sliderValue);

  const handleOpen = () => {
    setSliderValue(getLevelData(skill.level).value);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    onUpdate({ ...skill, level: previewLevel.label });
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        title={
          <Box>
            <Typography variant="caption" sx={{ fontFamily: '"IBM Plex Mono"' }}>
              Level: {levelData.label}
            </Typography>
            {linkedJobs.length > 0 && (
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                Used in: {linkedJobs.join(', ')}
              </Typography>
            )}
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
              Click to change level
            </Typography>
          </Box>
        }
        arrow
      >
        <Chip
          icon={<CodeIcon sx={{ fontSize: '14px !important', color: `${levelData.color} !important` }} />}
          label={skill.name}
          onClick={handleOpen}
          onDelete={onDelete ? () => onDelete(skill) : undefined}
          deleteIcon={
            onDelete ? (
              <DeleteIcon
                sx={{
                  fontSize: '14px !important',
                  opacity: 0.4,
                  '&:hover': { opacity: 1, color: 'error.main !important' },
                }}
              />
            ) : undefined
          }
          sx={{
            bgcolor: `${levelData.color}14`,
            color: 'text.primary',
            border: `1.5px solid ${levelData.color}50`,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.72rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: `${levelData.color}22`,
              borderColor: levelData.color,
              transform: 'translateY(-1px)',
              boxShadow: `0 4px 12px ${levelData.color}25`,
            },
            '& .MuiChip-label': { px: 1.2 },
          }}
        />
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 420,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
          },
        }}
      >
        {/* Dialog Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%)',
            px: 3,
            py: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{ color: 'secondary.main', fontFamily: '"IBM Plex Mono"', letterSpacing: '0.12em' }}
            >
              SKILL LEVEL
            </Typography>
            <Typography variant="h5" sx={{ color: 'white', mt: 0.3, fontWeight: 700 }}>
              {skill.name}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: 'white' } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <DialogContent sx={{ pt: 3, pb: 1 }}>
          {/* Current Level Display */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: `${previewLevel.color}0D`,
              border: `2px solid ${previewLevel.color}30`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: previewLevel.color,
                fontFamily: '"IBM Plex Mono"',
                fontWeight: 700,
                transition: 'color 0.3s ease',
              }}
            >
              {previewLevel.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {previewLevel.description}
            </Typography>
          </Box>

          {/* Progress bar */}
          <LinearProgress
            variant="determinate"
            value={sliderValue}
            sx={{
              mb: 1,
              height: 8,
              borderRadius: 4,
              bgcolor: '#E0E0E8',
              '& .MuiLinearProgress-bar': {
                bgcolor: previewLevel.color,
                transition: 'all 0.3s ease',
              },
            }}
          />

          {/* Slider */}
          <Box sx={{ px: 0.5, mt: 3 }}>
            <Slider
              value={sliderValue}
              onChange={(_, val) => setSliderValue(val)}
              step={null}
              marks={SKILL_LEVELS.map((l) => ({ value: l.value }))}
              min={0}
              max={100}
              sx={{
                color: previewLevel.color,
                '& .MuiSlider-thumb': {
                  bgcolor: previewLevel.color,
                  transition: 'background-color 0.3s ease',
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0 0 0 8px ${previewLevel.color}22`,
                  },
                },
                '& .MuiSlider-track': {
                  bgcolor: previewLevel.color,
                  transition: 'background-color 0.3s ease',
                },
                '& .MuiSlider-mark': {
                  bgcolor: 'rgba(0,0,0,0.2)',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                },
              }}
            />
          </Box>

          {/* Level Labels */}
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1, px: 0.5 }}>
            {SKILL_LEVELS.map((l) => (
              <Typography
                key={l.label}
                variant="caption"
                sx={{
                  fontFamily: '"IBM Plex Mono"',
                  fontSize: '0.6rem',
                  color: previewLevel.label === l.label ? l.color : 'text.disabled',
                  fontWeight: previewLevel.label === l.label ? 700 : 400,
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  width: 0,
                  overflow: 'visible',
                  whiteSpace: 'nowrap',
                  transform: 'translateX(-50%)',
                }}
              >
                {l.label}
              </Typography>
            ))}
          </Stack>

          {/* Years of experience */}
          {linkedJobs.length > 0 && (
            <Box
              sx={{
                mt: 3,
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono"' }}>
                USED IN JOBS
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 0.5, gap: 0.5 }}>
                {linkedJobs.map((job, i) => (
                  <Chip
                    key={i}
                    label={job}
                    size="small"
                    sx={{ bgcolor: 'background.default', fontFamily: '"IBM Plex Mono"', fontSize: '0.65rem' }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1, gap: 1 }}>
          <Button onClick={handleClose} variant="outlined" size="small" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            size="small"
            sx={{
              bgcolor: previewLevel.color,
              color: 'white',
              '&:hover': { bgcolor: previewLevel.color, filter: 'brightness(1.1)' },
            }}
          >
            Set as {previewLevel.label}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
