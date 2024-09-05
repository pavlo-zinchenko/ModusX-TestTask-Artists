const ArtistService = require('../services/ArtistService');

class ArtistController {
    async getArtists(req, res, next) {
        try {
            const artists = await ArtistService.getArtists();
            res.json(artists);
        } catch (error) {
            next(error);
        }
    }

    async getArtist(req, res, next) {
        try {
            const artist = await ArtistService.getArtist(req.params.id);
            res.json(artist);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ArtistController();
