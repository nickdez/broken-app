const express = require('express');
const axios = require('axios');
const app = express();

app.get('/:username', async function (req, res, next) {
  try {
    const username = req.params.username;
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const userData = response.data;
    const user = { name: userData.name, bio: userData.bio };

    return res.send(JSON.stringify(user));
  } catch (error) {
    next(error);
  }
});

app.post('/', async function (req, res, next) {
  try {
    let results = await Promise.all(req.body.developers.map(async d => {
      try {
        return await axios.get(`https://api.github.com/users/${d}`);
      } catch (error) {
        return { data: { name: null, bio: null } };
      }
    }));
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch (error) {
    next(error);
  }
});


app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});

