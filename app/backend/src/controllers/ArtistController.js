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
            const artistId = req.params.id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;

            const offset = (page - 1) * limit;

            const songsData = await ArtistService.getSongsByArtist(artistId, limit, offset);
            const totalSongs = await ArtistService.getTotalSongCount(artistId);

            const totalPages = Math.ceil(totalSongs / limit);

            res.json({
                songs: songsData,
                totalPages: totalPages,
                currentPage: page,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ArtistController();
