const open = require('open-pip');
const request = require('request');
const cheerio = require('cheerio');
const dt = new Date( 'December 25, 1995 23:15:00' );

let className = 'videoembed';

function playVideo(link) {
  open(link)
    .then(() => console.log('Worked 🎉'))
    .catch(error => console.log('Something went wrong 💀', error))
}

module.exports = function scraping(dateRaw, title, episode) {
  let date = dt.getMonth() - 1;

  if (dateRaw !== null){
    date = dateRaw;
  }

  request(`https://animeindo.video/2019/${date}/${title}-${episode}-subtitle-indonesia/?source=videoweed`, (error, response, body) => {
    if (!error) {
      try {
        const $ = cheerio.load(body);
        let a = $(`div.${className}`).find("script");
        let raw = a[0].children[0].data;
        let raw1 = raw.replace(/\s/g, '');
        let raw2 = raw1.replace("document.write(", '');
        let raw3 = raw2.replace(");//-->", '');
        let raw4 = raw3.replace("unescape('", '');
        let raw5 = raw4.replace(")'", '');
        let result = unescape(raw5);
        let elemets = cheerio(result)
        let link = elemets[0].attribs.src

        playVideo(link);
      } catch {
        console.log(`https://animeindo.video/2019/${date}/${title}-${episode}-subtitle-indonesia/?source=videoweed`);
        request(`https://animeindo.video/2019/${date}/${title}-${episode}-subtitle-indonesia/?source=videoweed`, (error, response, body) => {
          if (!error) {
            try {
              const $ = cheerio.load(body);
              let a = $("div.videoembedactiveembed").find("script");
              let raw = a[0].children[0].data;
              let raw1 = raw.replace(/\s/g, '');
              let raw2 = raw1.replace("document.write(", '');
              let raw3 = raw2.replace(");//-->", '');
              let raw4 = raw3.replace("unescape('", '');
              let raw5 = raw4.replace(")'", '');
              let result = unescape(raw5);
              let elemets = cheerio(result)
              let link = elemets[0].attribs.src

              playVideo(link);
            } catch {
              console.log('Something Wrong');
            }
          }
        });

      }


      }
  });
}
