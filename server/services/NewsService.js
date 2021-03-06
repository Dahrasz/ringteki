class NewsService {
    constructor(db) {
        this.news = db.get('news');
    }

    getRecentNewsItems(options) {
        var params = {};

        params.sort = { datePublished: -1 };
        if(options.limit) {
            params.limit = parseInt(options.limit);
        }

        return this.news.find({}, params);
    }

    addNews(news) {
        return this.news.insert(news);
    }
}

module.exports = NewsService;
