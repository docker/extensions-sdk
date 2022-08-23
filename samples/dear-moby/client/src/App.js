import {
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { useState, useEffect } from 'react';

export function App() {
  const ddClient = createDockerDesktopClient();
  let [dearMobyPlaylist, setdearMobyPlaylist] = useState(null);
  const playlistURL =
    'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLkA60AVN3hh_aBXzjqu13dupUV1JdFnjI&key=AIzaSyBK8xyTKDz15LVAaQujikrcMTmrk8mX_Ho';

  useEffect(() => {
    fetch(playlistURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setdearMobyPlaylist(data.items);
      });
  }, []);

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h3" gutterBottom>
          Dear Moby
        </Typography>
        <Typography variant="body1" gutterBottom>
          Born in 2013 and beloved ocean wide, Moby Dock is known for helping
          simplify app development through normalizing and spreading the word
          about the power of software containerization with the help of his
          community of friends (read: the Mobyverse). Moby has accrued a
          “whaleth” of knowledge over the years, and as it turns out, can’t wait
          to share his advice and best practices with you — the Docker
          community.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Which is where you come in…Introducing our new developer advice
          column, Dear Moby, the advice column made exclusively for developers.
        </Typography>
        <Typography variant="body1" gutterBottom>
          So, how does it work?
        </Typography>
        <Typography variant="body1" gutterBottom>
          All you have to do is submit your most pressing technical questions
          and queries, gather a swarm (or school) of your friends (over krill
          perhaps?), and tune in for some truly nautically-inspired advice.
          Examples queries include: questions related to Docker, app
          development, containerization, engineering, and the like.
        </Typography>
        <Typography variant="body1" gutterBottom>
          You’re “whalecome” to include softer clam shell questions in your
          submission, but Moby may or may not answer because first and foremost,
          he wants to help developers achieve their goals.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Chosen submissions will be featured in each installment of the column
          (and will receive some Moby-approved gear). Check out our past
          episodes below!
        </Typography>
      </Box>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {dearMobyPlaylist &&
          dearMobyPlaylist.reverse().map((item) => (
            <Grid item>
              <Card sx={{ maxWidth: item.snippet.thumbnails.maxres.width / 3 }}>
                <CardMedia
                  component="iframe"
                  height={item.snippet.thumbnails.maxres.height / 3}
                  image={
                    'https://www.youtube.com/embed/' +
                    item.contentDetails.videoId
                  }
                  alt={'Video titled: ' + item.snippet.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.snippet.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.snippet.description.substring(0, 199)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Box>
        <Button
          variant="contained"
          href="https://www.docker.com/dear-moby/submissions/"
        >
          Submit your questions here!{' '}
        </Button>
      </Box>
    </div>
  );
}
