//@flow
const Article = require("../models/Article");

type ArticleType = {
  title?: string,
  slug?: string,
  author?: number,
  data?: Array<mixed>
};

exports.get = function(): Promise<any> {
  return new Promise((resolve, reject) => {
    Article.find()
      .populate("author", "_id username name avatar")
      .exec((err, articles) => {
        if (err) reject(err);

        resolve(articles);
      });
  });
};

exports.find = function(obj: ArticleType): Promise<any> {
  return new Promise((resolve, reject) => {
    Article.findOne(obj)
      .populate("author", "-password")
      .exec((err, article) => {
        if (err) reject(err);

        resolve(article);
      });
  });
};

exports.create = function(payload: {
  title: string,
  author: number,
  slug: string,
  data: Array<mixed>
}): Promise<any> {
  return new Promise((resolve, reject) => {
    const article = new Article();

    article.title = payload.title;
    article.author = payload.author;
    article.slug = payload.slug;
    article.data = payload.data;

    article.save(err => (err ? reject(err) : resolve(article)));
  });
};

exports.destroy = function(obj: { _id?: string, slug?: string }): Promise<any> {
  return new Promise((resolve, reject) => {
    Article.remove(obj, (err, article) => {
      if (err) reject(err);

      resolve(article);
    });
  });
};

exports.update = function(
  obj: ArticleType,
  objToChange: ArticleType
): Promise<any> {
  return new Promise((resolve, reject) => {
    Article.findOne(obj, (err, article) => {
      if (err) reject(err);

      const updatedArticle = Object.assign(article, objToChange);
      updatedArticle.save(err => (err ? reject(err) : resolve(updatedArticle)));
    });
  });
};
