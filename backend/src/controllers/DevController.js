const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio } = apiResponse.data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })

      // Filtrar as conexões que estão há no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
  
    return response.json(dev);
  },

  async update(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) return response.status(404).end();

    const techsArray = parseStringAsArray(techs);
    
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    await Dev.updateOne({ github_username }, {
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    });

    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      techsArray,
    )

    sendMessage(sendSocketMessageTo, 'upd-dev', dev);

    return response.json(dev);
  },

  async destroy(request, response) {
    const { github_username } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) return response.status(404).end();

    await Dev.deleteOne({ github_username })

    sendMessage(sendSocketMessageTo, 'del-dev', dev);

    return response.status(204);
  }
};