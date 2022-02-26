// Our Twitter library
const Twit = require("twit");

// We need to include our configuration file...
const twit = new Twit(require("./config.js"));

// This is the URL of a search for the latest tweets on the 'developer' hashtag...
const mediaArtsSearch = { q: "#developer", count: 100, result_type: "recent" };

const retweetLatest = () => {
  twit.get("search/tweets", mediaArtsSearch, (error, data) => {
    if (error) {
      console.log(error.message);
    } else {
      // Grab the ID of the tweet we want to retweetwit...
      const retweetId = data.statuses[0].id_str;
      twit.post("statuses/retweet/" + retweetId, {}, (error, response) => {
        if (response) {
          console.log("Success! Your bot has retweeted something.");
        }
        if (error) {
          console.log(error.message);
        }
      });
    }
  }); 
};




// Try to retweet something as soon as we run the program...
retweetLatest();
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 60);
