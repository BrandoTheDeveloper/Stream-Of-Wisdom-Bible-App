import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import { format } from 'date-fns';
import VideoModal from './VideoModal';

const API_KEY = 'AIzaSyC4TOJToJYxcHRn0rKnPR4xdwQnQ15aSGo'; // Add your YouTube Data API key here

const channels = [
  { id: 'UCb8xqeuK7weIaZTHVsDHAVg', name: 'S.O.W. Houston, TX' },
  { id: 'UCE4D_I9nfThVMtJ5CP-06Rg', name: 'S.O.W. Norfolk, VA' },
  { id: 'UCNGXgQOfrVZEsfFQaVEZLDw', name: 'S.O.W. Rochester, NY' },
  { id: 'UCkegdDCWsb94a7xfnzPfl8w', name: 'Sword of Truth San Antonio' },
  // Add more channels as needed
];

const VideosView = () => {
  const [selectedChannel, setSelectedChannel] = useState('UCb8xqeuK7weIaZTHVsDHAVg'); // Default to Houston channel
  const [selectedVideoType, setSelectedVideoType] = useState('uploads');
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch videos when selectedChannel or selectedVideoType changes
  useEffect(() => {
    if (selectedChannel) {
      fetchVideos(selectedChannel, selectedVideoType);
    }
  }, [selectedChannel, selectedVideoType]);

  // Fetch videos from YouTube API
  const fetchVideos = async (channelId, videoType) => {
    const maxResults = 50;
    let url = '';
    if (videoType === 'live') {
      url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&eventType=completed&type=video&order=date&maxResults=${maxResults}`;
    } else {
      url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&type=video&order=date&maxResults=${maxResults}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Fetch video details for each video to get the duration
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails`;
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      // Merge video details with the original data
      const videosWithDetails = data.items.map(item => {
        const details = detailsData.items.find(detail => detail.id === item.id.videoId);
        return { ...item, contentDetails: details ? details.contentDetails : null };
      });

      setVideos(videosWithDetails);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // Handle channel change
  const handleChannelChange = (event) => {
    setSelectedChannel(event.target.value);
    setPage(1); // Reset to first page when channel changes
  };

  // Handle video type change
  const handleVideoTypeChange = (event) => {
    setSelectedVideoType(event.target.value);
    setPage(1); // Reset to first page when video type changes
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Format video duration
  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || '0H').slice(0, -1);
    const minutes = (match[2] || '0M').slice(0, -1);
    const seconds = (match[3] || '0S').slice(0, -1);
    return `${hours}:${minutes}:${seconds}`;
  };

  // Truncate video title
  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...';
    }
    return title;
  };

  // Handle watch button click
  const handleWatchClick = (videoId) => {
    setSelectedVideoId(videoId);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideoId(null);
  };

  // Calculate the videos to display based on the current page
  const videosToDisplay = videos.slice((page - 1) * 12, page * 12);

  return (
    <Container maxWidth="md">
      <Box mb={2}>
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="channel-select-label">Select Channel</InputLabel>
          <Select
            labelId="channel-select-label"
            value={selectedChannel}
            onChange={handleChannelChange}
            label="Select Channel"
          >
            {channels.map((channel) => (
              <MenuItem key={channel.id} value={channel.id}>
                {channel.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="video-type-select-label">Select Video Type</InputLabel>
          <Select
            labelId="video-type-select-label"
            value={selectedVideoType}
            onChange={handleVideoTypeChange}
            label="Select Video Type"
          >
            <MenuItem value="uploads">Uploaded Videos</MenuItem>
            <MenuItem value="live">Completed Live Streams</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 2,
        }}
      >
        {videosToDisplay.map((video) => (
          <Card key={video.id.videoId} sx={{ width: '100%', height: 400 }}>
            <CardMedia
              component="img"
              alt={video.snippet.title}
              image={video.snippet.thumbnails.high.url}
              title={video.snippet.title}
              sx={{ width: '100%', height: '50%', objectFit: 'cover' }}
            />
            <CardContent>
              <Typography gutterBottom variant="subtitle1" component="div" fontWeight="bold">
                {truncateTitle(video.snippet.title, 60)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Published on: {format(new Date(video.snippet.publishedAt), 'MMMM dd, yyyy')}
              </Typography>
              {video.contentDetails && (
                <Typography variant="body2" color="textSecondary" component="p">
                  Duration: {formatDuration(video.contentDetails.duration)}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => handleWatchClick(video.id.videoId)}
              >
                Watch
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <VideoModal videoId={selectedVideoId} open={isModalOpen} onClose={handleCloseModal} />
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(videos.length / 12)} // Adjust the pagination count
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default VideosView;