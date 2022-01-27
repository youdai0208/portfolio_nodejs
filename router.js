const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

router.use(express.static(path.join(__dirname, 'public')));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//外部URLルーター
router.get("/", (req, res) => {
    res.redirect("/about");
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname , "/public/pages/top_page/top_page.html"));
});

router.get("/about/:file_name", (req, res) => {
    console.log("send");
    res.sendFile(path.join(__dirname , `/public/pages/top_page/${req.params.file_name}`));
});

router.get("/all_product", (req, res) => {
    res.sendFile(path.join(__dirname , "/public/pages/all_products_page/all_products_page.html"));
});

router.get("/all_product/:file_name", (req, res) => {
    res.sendFile(path.join(__dirname , `/public/pages/all_products_page/${req.params.file_name}`));
});

router.get("/all_product/product_detalis/product/:name", (req, res) => {
    res.sendFile(path.join(__dirname , "/public/pages/product_detalis_page/product_detalis_page.html"));
});

router.get("/all_product/product_detalis/product/:name/:file_name", (req, res) => {
    res.sendFile(path.join(__dirname , `/public/pages/product_detalis_page/${req.params.file_name}`));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/contact_page/contact_page.html"));
});


//内部API
router.get("/api/all_product", (req, res) => {
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, '/public/assets/database.json'), 'utf8'));
    res.json(data);
});
  
router.get("/api/product/:product_name", (req, res) => {
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, '/public/assets/database.json'), 'utf8'));
    var select_name_data = data.product_list.filter(function(item, index){
      if (item.name_url == req.params.product_name) return true;
    });
    res.json(select_name_data);
});
  
router.post("/api/form_data", (req, res) => {
    var json = req.body;
    console.log(json);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SEND_MAIL_ADDRESS,
        pass: process.env.SEND_MAIL_PASS
      },
    });
  
    transporter.sendMail({
      from: process.env.SEND_MAIL_ADDRESS,
      to: process.env.RECEIVE_MAIL_ADDRESS,
      subject: "ポートフォリオ問い合わせ",
      text: `問い合わせがありました。\n\n名前: ${json.name}\n電話番号: ${json.tel}\nメールアドレス: ${json.email}\n問い合わせ内容: ${json.detalis}`,
    },function (error, info) {
      if (error) {
        console.error(error);
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(200).end();
      }
    });
});

module.exports = router;