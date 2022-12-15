var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

let product= [{
  name:"tshirt",
  category:"Men",
  description:"cotton",
  image:"https://m.media-amazon.com/images/I/61yIYs9q3aL._AC_SX679_.jpg"
  
},
{
  name:"trowser",
  category:"Men",
  description:"3/4",
  image:"https://img.ltwebstatic.com/images3_pi/2022/03/15/1647309503108552851bf38450b64a8cc301e7e974_thumbnail_600x.webp"
},{
  name:"jacket",
  category:"Men",
  description:"pullover",
  image:"https://m.media-amazon.com/images/I/91nG7tYFJ4L._AC_UL1500_.jpg"
},{
  name:"shirt",
  category:"Men",
  description:"fullslive",
  image:"https://m.media-amazon.com/images/I/81tnYC7mVyL._AC_UL1500_.jpg"
},]

  res.render('index', { product });
});

module.exports = router;
