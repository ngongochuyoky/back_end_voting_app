class SiteController {
    home(req, res) {
        const pathPublic = 'http://localhost:3001/';
        const message = {
            name: 'hello world',
            images: `${pathPublic}images/anh1.jpg`,
        };

        res.json(message);
    }
}

module.exports = new SiteController();
