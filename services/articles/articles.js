const randomArticleUrl = 'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exsentences=1&inprop=url&format=json';

function getRandomArticle() {
  return fetch(randomArticleUrl)
  .then((response) => response.json())
  .then((data) => data.query.pages[Object.keys(data.query.pages)[0]])
  .then((article) => getUrl(article));
}

function getUrlById(id) {
  return `https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${id}&inprop=url&format=json`;
}

function formatExtract(extract) {
  return extract.replace(/<(?:.|\n)*?>/gm, '');
}

function getUrl(article) {
  return fetch(getUrlById(article.pageid))
    .then((response) => response.json())
    .then((data) => {
      return {
        url: data.query.pages[Object.keys(data.query.pages)[0]].fullurl,
        title: article.title,
        extract: formatExtract(article.extract),
      };
    });
}

export const Articles = {
  findOne: () => getRandomArticle(),
};
