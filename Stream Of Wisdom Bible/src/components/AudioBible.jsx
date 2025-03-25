import  { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';

// --- API Configuration ---
const SPEECHIFY_API_KEY = 'Z4uYFD4S8528Own5yKs1aC0T1UKvOXkK5zpggQpiC_0='; // Your Speechify API Key
const SPEECHIFY_API_URL = 'https://api.sws.speechify.com/v1/audio/stream';

const AudioBible = () => {
  const [textToSpeak, setTextToSpeak] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('anthony');
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (event) => {
    setTextToSpeak(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handlePlay = async () => {
    setIsLoading(true);
    setError(null);
    if (!textToSpeak) {
      setError('Please enter text to speak.');
      setIsLoading(false);
      return;
    }
    try {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'audio/mpeg',
          Authorization: `Bearer ${SPEECHIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: textToSpeak, voice_id: selectedVoice }),
      };

      const response = await fetch(SPEECHIFY_API_URL, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Speechify API error: ${response.status} - ${errorData.message}`);
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      newAudio.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch((err) => {
        setError("Error playing audio.");
        console.error("Error playing audio:", err);
        setIsLoading(false);
      });
    } catch (err) {
      setError(`Error loading audio: ${err.message}`);
      console.error('Error loading audio:', err);
      setIsLoading(false);
    }
  };

  const handlePause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Speechify Audio Player
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Enter Text to Speak"
        multiline
        rows={4}
        fullWidth
        value={textToSpeak}
        onChange={handleTextChange}
      />

      <FormControl fullWidth>
        <InputLabel id="voice-select-label">Voice</InputLabel>
        <Select
          labelId="voice-select-label"
          id="voice-select"
          value={selectedVoice}
          label="Voice"
          onChange={handleVoiceChange}
        >
          <MenuItem value="anthony">Anthony</MenuItem>
          <MenuItem value="stacy">Stacy</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="contained" onClick={handlePlay} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Play"}
        </Button>
        <Button variant="contained" onClick={handlePause} disabled={!isPlaying}>
          Pause
        </Button>
        <Button variant="contained" onClick={handleStop} disabled={!isPlaying}>
          Stop
        </Button>
      </Box>
    </Box>
  );
};

export default AudioBible;
