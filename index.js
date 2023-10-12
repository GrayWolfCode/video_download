const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;
app.get('/download', async (req, res) => {
    try {
        const videoURL = "https://storage.googleapis.com/storyboard-739ee.appspot.com/output_video.mp4";
        const response = await axios({
            method: 'GET',
            url: videoURL,
            responseType: 'stream'
        });
        console.log(response);
        // Ensure headers are set for a download and match the response headers from the video source
        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Length', response.headers['content-length']);
        res.setHeader('Content-Disposition', 'attachment; filename=output_video.mp4');
        // Pipe the stream directly to the response
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).send('Failed to download video');
    }
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});