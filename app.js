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

  let url = 'https://streamlabs.com/polly/speak?voice=' + voice + '&text=' + text;

  request.post(
    { url: url },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: response.body });
      }
      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));