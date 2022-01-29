const express = require('express');
const fs = require('fs');
const ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const { stdout } = require('process');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/download', (req, res) => {
    videoURL = req.query.videoURL;
    videoTitle = req.query.videoTitle;

    // Create WriteableStream
    // const writeableStream = fs.createWriteStream(`${videoTitle}.mp3`);

    // Listening for the 'finish' event
    // writeableStream.on('finish', () => {
    //     console.log(`${videoTitle} downloaded successfully`);
    //     // res.send(`${videoTitle} downloaded successfully`);
    //     res.download(`${videoTitle}.mp3`);

    // });

    // Plug it into the ReadableStream
    // ytdl(videoURL, {
    //     format: "mp3",
    // }).pipe(writeableStream);

    var stream = ytdl(videoURL, {
      quality: "highestaudio",
      filter: "audioonly",
    })
      .on("progress", (chunkSize, downloadedChunk, totalChunk) => {
        // console.log(downloadedChunk);
        clientGlob.emit("progressEventSocket", [
          (downloadedChunk * 100) / totalChunk,
        ]);
        clientGlob.emit("downloadCompletedServer", [downloadedChunk]);
        if (downloadedChunk == totalChunk) {
          console.log("Downloaded");
        }
      })
      .pipe(res);

});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});