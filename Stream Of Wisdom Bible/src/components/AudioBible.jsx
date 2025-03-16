import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

const AudioBible = ({ bibleBooks }) => {
  const [currentBook, setCurrentBook] = useState('Genesis');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const handleBookChange = (event) => {
    setCurrentBook(event.target.value);
    setCurrentChapter(1);
  };

  const handleChapterChange = (event) => {
    setCurrentChapter(Number(event.target.value));
  };

  const handlePlay = async () => {
    const currentBookData = bibleBooks[currentBook];
    const currentChapterData = currentBookData.chapters.find((chapter) => chapter.chapter === currentChapter);
    const text = currentChapterData.verses.map((verse) => `Verse ${verse.verse}: ${verse.text}`).join(' ');

    try {
      const response = await axios.post(
        'https://api.elevenlabs.io/v1/text-to-speech',
        {
          text,
          voice: 'DADfd8MU5O5IXSrkHxkn', // Replace with your custom voice ID
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_ELEVENLABS_API_KEY}`,
          },
        }
      );

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      audioRef.current.play();
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" component="h3" gutterBottom>
        {currentBook} {currentChapter}
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="book-select-label">Book</InputLabel>
          <Select
            labelId="book-select-label"
            value={currentBook}
            onChange={handleBookChange}
            label="Book"
          >
            {Object.keys(bibleBooks).map((book) => (
              <MenuItem key={book} value={book}>{book}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box width={16} />
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="chapter-select-label">Chapter</InputLabel>
          <Select
            labelId="chapter-select-label"
            value={currentChapter}
            onChange={handleChapterChange}
            label="Chapter"
          >
            {bibleBooks[currentBook].chapters.map((chapter) => (
              <MenuItem key={chapter.chapter} value={chapter.chapter}>{chapter.chapter}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" color="primary" onClick={handlePlay} startIcon={<PlayArrowIcon />}>
          Play
        </Button>
        <Box width={16} />
        <Button variant="contained" color="primary" onClick={handlePause} startIcon={<PauseIcon />}>
          Pause
        </Button>
        <Box width={16} />
        <Button variant="contained" color="primary" onClick={handleStop} startIcon={<StopIcon />}>
          Stop
        </Button>
      </Box>

      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} controls style={{ display: 'none' }} />
      )}
    </Container>
  );
};

AudioBible.propTypes = {
  bibleBooks: PropTypes.object.isRequired,
};

export default AudioBible;