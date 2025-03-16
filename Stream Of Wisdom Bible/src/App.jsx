// This is the main component of the application. It contains the NavBar component and the main content of the application.
import NavBar from './Components/NavBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function App() {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Stream Of Wisdom Bible
        </Typography>
      </Box>
      <Box mt={2}>
        <NavBar />
      </Box>
    </Container>
  );
}

export default App;
