import {
  Fab,
  Grid,
  Typography,
  CardActionArea,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YoutubeIcon from '@mui/icons-material/YouTube';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { useState, useEffect } from 'react';
export function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = (videoID) => {
    setdialogVideo(videoID);
    setOpen(true);
  };
  const handleClose = () => {
    setdialogVideo([null, null]);
    setOpen(false);
  };
  const [dialogVideo, setdialogVideo] = useState([null, null]);
  const ddClient = createDockerDesktopClient();
  let [dearMobyPlaylist, setdearMobyPlaylist] = useState(null);
  const playlistURL =
    'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLkA60AVN3hh_aBXzjqu13dupUV1JdFnjI&key=' +
    process.env.REACT_APP_YOUTUBE_KEY;

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
      <main>
        <Box
          style={{
            width: '95%',
            maxWidth: 1080,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Dear Moby
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Born in 2013 and beloved ocean wide, Moby Dock is known for helping
            simplify app development through normalizing and spreading the word
            about the power of software containerization with the help of his
            community of friends (read: the Mobyverse). Moby has accrued a
            “whaleth” of knowledge over the years, and as it turns out, can’t
            wait to share his advice and best practices with you — the Docker
            community.
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            paddingBottom="1em"
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                href="#"
                onClick={() => {
                  ddClient.host.openExternal(
                    'https://www.docker.com/dear-moby/submissions/',
                  );
                }}
              >
                Submit a Question
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                href="#"
                onClick={() => {
                  ddClient.host.openExternal(
                    'https://www.docker.com/blog/category/dear-moby/',
                  );
                }}
              >
                Read Dear Moby on Docker's Blog
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{
            width: '95%',
            maxWidth: 1080,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {dearMobyPlaylist &&
            dearMobyPlaylist
              .slice(0)
              .reverse()
              .map((item, key) => (
                <Grid item key={key} sm={12} md={6} lg={6} xl={4}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardActionArea
                      onClick={() =>
                        handleOpen([
                          item.snippet.title,
                          item.contentDetails.videoId,
                        ])
                      }
                    >
                      <CardMedia
                        component="img"
                        src={item.snippet.thumbnails.maxres.url}
                        style={{}}
                        alt={'Video titled: ' + item.snippet.title}
                      />
                      <CardContent style={{ flexgrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.snippet.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.snippet.description.substring(0, 164)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{dialogVideo[0]}</DialogTitle>
          <DialogContent id="alert-dialog-description">
            <LiteYouTubeEmbed id={dialogVideo[1]} title={dialogVideo[0]} />
          </DialogContent>
        </Dialog>
      </main>
      <footer>
        <Typography variant="h6" align="center" gutterBottom paddingTop="1em">
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab
              size="small"
              color="primary"
              onClick={() => {
                ddClient.host.openExternal(
                  'https://www.facebook.com/docker.run',
                );
              }}
            >
              <FacebookIcon color="white" />
            </Fab>
            <Fab
              size="small"
              color="primary"
              onClick={() => {
                ddClient.host.openExternal('http://twitter.com/docker');
              }}
            >
              <TwitterIcon color="white" />
            </Fab>
            <Fab
              size="small"
              color="primary"
              onClick={() => {
                ddClient.host.openExternal(
                  'http://www.youtube.com/user/dockerrun',
                );
              }}
            >
              <YoutubeIcon color="white" />
            </Fab>
            <Fab
              size="small"
              color="primary"
              onClick={() => {
                ddClient.host.openExternal(
                  'https://www.linkedin.com/company/docker',
                );
              }}
            >
              <LinkedInIcon color="white" />
            </Fab>
            <Fab
              size="small"
              color="primary"
              onClick={() => {
                ddClient.host.openExternal('https://www.docker.com/blog/feed');
              }}
            >
              <RssFeedIcon color="white" />
            </Fab>
          </Box>
        </Typography>
      </footer>
    </div>
  );
}