const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    
    const techsArray = parseStringAsArray(techs);

    const maxDistance = 10 * 1000; // distance in kilometers

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDistance,
        },
      },
    });

    return response.json({ devs });
  }
}