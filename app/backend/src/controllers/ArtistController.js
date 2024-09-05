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
            const artistId = req.params.artistId;
            const artist = await ArtistService.getArtist(artistId);
            res.json(artist);
        } catch (error) {
            next(error);
        }
    }

    async getSongsByArtist(req, res, next) {
        try {
            const { page, limit } = req.query;
            const artistId = req.params.id;
            const songsData = await ArtistService.getSongsByArtist(artistId, page, limit);
            console.log('songsData:', songsData);
            res.json(songsData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ArtistController();
