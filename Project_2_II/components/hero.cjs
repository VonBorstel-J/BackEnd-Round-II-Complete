import "vegas/dist/vegas.min.css";
import "vegas/dist/vegas.min.js";
const $ = require('jquery');
$(function () {
  $("#hero").vegas({
    slides: [
      { src: "./images/domino-164_6wVEHfI-unsplash.jpg" },
      { src: "./images/ivan-kazlouskij--YPtL-U6_MA-unsplash.jpg" },
      { src: "./images/keagan-henman-ZqXXVeRCyZ0-unsplash.jpg" },
      { src: "./images/tamanna-rumee-lpGm415q9JA-unsplash.jpg" },
    ],
    delay: 5000,
    timer: false,
    transition: "kenburns",
  });
});
