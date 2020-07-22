const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/my-proxy', (req, res) => {
  const voice = req.param('voice');
  const text = req.param('text');

  const url = 'https://streamlabs.com/polly/speak?voice=' + voice + '&text=' + text;
  const encodedURL = encodeURI(url);

  request.post(
    { url: encodedURL },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        const customError = error || response.body;
        return res.status(500).json({ type: 'error', message: customError });
      }
      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));