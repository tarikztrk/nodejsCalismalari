var express = require("express")
var fs = require("fs")
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/yazlab",{ useNewUrlParser: true });
var app = express()
var url = "mongodb://localhost:27017/yazlab";
var bodyParser = require('body-parser');

var urlEncoder = bodyParser.urlencoded({ extended: true });

// var nameSchema = new mongoose.Schema({
//   haberBaslik: String,
//   haberIcerik: String,
//   haberKonu: String,
//   haberResim: String,
//   yayinlanmaTarihi:String,
//   begenmeSayisi: {type:Number ,default:0},
//   begenmemeSayisi: {type:Number ,default:0},
//   goruntulenmeSayisi: {type:Number ,default:0}
// });

// var haber = mongoose.model("haber", nameSchema);
app.get("/", function (request, response) {
  fs.createReadStream("./arayuz.html").pipe(response);
})
app.post("/yenidenGiris", function (request, response) {
  response.redirect("/");
  
})
app.get("/listele",function(req,res){
  fs.readFile("haber.json","utf8",function(err,data){
    res.end(data);
  });
});

app.post("/guncelle", urlEncoder, (req, res) => {

  // fs.readFile("haber.json",function(err,data){
  //   //reqData=JSON.parse(req.body);
  //   var a=""+req.body;
  //   data=JSON.parse(data);
  //   console.log(req.body);
  //  data.haber[req.body.sira].haberGoruntulenmeSayisi=req.body.haberGoruntulenmeSayisi;
  //  data.haber[req.body.sira].haberBegenmeSayisi=req.body.haberBegenmeSayisi;
  //  data.haber[req.body.sira].haberBegenmemeSayisi=req.body.haberBegenmemeSayisi;

  //     fs.writeFile("haber.json",JSON.stringify(data),function(err){
  //     console.log(err);
  //   });

  // });
  
  
  });

app.post("/giris", urlEncoder, (req, res) => {
  // var myData = new haber(req.body);
  var id=req.body.haberId;
  var yeniHaber ={
  
      "haberBaslik": req.body.haberBaslik,
      "haberIcerik": req.body.haberIcerik,
      "haberTuru": req.body.haberKonu,
      "haberResim": req.body.haberResim,
      "haberYayinlanmaTarihi": req.body.yayinlanmaTarihi,
      "haberBegenmeSayisi":"0",
      "haberGoruntulenmeSayisi":"0",
      "haberBegenmemeSayisi" :  "0"
    
  
  };
  fs.readFile("haber.json",function(err,data){
    
    data=JSON.parse(data);
    console.log(data.haber.length);
   // data=data+","+yeniHaber;
   data.haber[data.haber.length]=yeniHaber;

   //data.haber[(data.haber.length)-1].haberGoruntulenmeSayisi="32";
   
    // data.haber[id].haberBaslik=yeniHaber.haberBaslik;
    // data.haber[id].haberIcerik=yeniHaber.haberIcerik;
    // data.haber[id].haberTuru=yeniHaber.haberTuru;
    // data.haber[id].haberResim=yeniHaber.haberResim;
    // data.haber[id].haberYayinlanmaTarihi=yeniHaber.haberYayinlanmaTarihi;
   //res.end(JSON.stringify(data));
    fs.writeFile("haber.json",JSON.stringify(data),function(err){
      console.log(err);
    });

  });
  // myData.save()
  //   .then(item => {

  //   })
  //   .catch(err => {
  //     res.status(400).send("unable to save to database");
  //   });
    fs.createReadStream("./tekrarGirisArayuzu.html").pipe(res);
});


var server = app.listen(8080);
