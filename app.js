const express = require("express");
const path = require("path");
const oracledb = require("oracledb");
const bodyParser = require("body-parser");
const { stringify } = require("querystring");
oracledb.autoCommit = true;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("pages/index");
});

app.listen(3000, function (err) {
  if (!err) console.log("Started on localhost.");
  else console.log(err);
});

let connection1;
let conn;
async function fun() {
  connection1 = await oracledb.getConnection(
    { user: "system", password: "3196", servicename: "XE" },
    async function (err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }

      // connection.execute(
      //   "create table employee(Username varchar(10) primary key ,pass varchar (10) , pass1 varchar(10) , loc char(10), phno number(10))"
      // );

      console.log("connected successfully");
      conn = connection;
      //adding_entries();
      //drop_tables();
    }
  );
}

fun();

async function drop_tables() {
  conn.execute("drop table temperature");
  conn.execute("drop table locagro");
  conn.execute("drop table seasondes");
  conn.execute("drop table phosphorus");
  conn.execute("drop table potassium");
  conn.execute("drop table nitrogen");
  conn.execute("drop table picloc");
  conn.execute("drop table location");
  conn.execute("drop table avail");
  conn.execute("drop table crop");
}

async function adding_entries() {
  conn.execute(
    "create table employee(Username varchar(10) primary key ,pass varchar (10) , pass1 varchar(10) , loc char(10), phno number(10))"
  );

  //creating table//
  conn.execute(
    "create table crop (cname varchar(20) primary key,type varchar(20),season varchar(20),speriod number(3),fperiod number(3),swater number(3),fwater number(3))"
  );

  conn.execute(
    "create table avail (name varchar(20),alluvial varchar(20),black varchar(20),red varchar(20))"
  );

  conn.execute(
    "create table location (region varchar(20),soil varchar(20),nratio number(1),pratio number(1),kratio number(1))"
  );

  conn.execute("create table picloc (name varchar(20),location varchar(40))");

  conn.execute(
    "create table nitrogen (cname varchar(20),low number(3),medium number(3),high number(3),foreign key(cname) references crop(cname))"
  );

  conn.execute(
    "create table phosphorus (cname varchar(20),low number(3),medium number(3),high number(3),foreign key(cname) references crop(cname))"
  );

  conn.execute(
    "create table potassium ( cname varchar(20),low number(3),medium number(3),high number(3),foreign key(cname) references crop(cname))"
  );

  conn.execute(
    "create table seasondes(season varchar(20) primary key,description varchar(500))"
  );

  conn.execute(
    "create table temperature (cname varchar(20),stemp number(3),ftemp number(3))"
  );

  conn.execute(
    "create table locagro (region varchar(50) primary key,agroclimatic varchar(100))"
  );

  //crop table//

  conn.execute(
    `insert into crop values ('BAJRA','Grain','Kharif',105,140,500,700)`
  );
  conn.execute(
    `insert into crop values ('BROCCOLI','Vegetable','Rabi',50,60,350,500)`
  );
  conn.execute(
    `insert into crop values ('CABBAGE','Vegetable','Rabi',120,140,350,500)`
  );
  conn.execute(
    `insert into crop values ('CARROT','Vegetable','Rabi',100,150,350,700)`
  );
  conn.execute(
    `insert into crop values ('CAULIFLOWER','Vegetable','Rabi',120,140,350,500)`
  );
  conn.execute(
    `insert into crop values ('CUCUMBER','Vegetable','Zaid',105,130,350,700)`
  );
  conn.execute(
    `insert into crop values ('EGGPLANT','Vegetable','Zaid',130,140,350,500)`
  );
  conn.execute(
    `insert into crop values ('GARLIC','Vegetable','Rabi',130,140,350,500)`
  );
  conn.execute(
    `insert into crop values ('LETTUCE','Vegetable','Rabi',80,140,400,500)`
  );
  conn.execute(
    `insert into crop values ('MUSKMELON','Fruit','Zaid',120,160,400,600)`
  );

  conn.execute(
    `insert into crop values ('ONION','Vegetable','Rabi',150,210,350,550)`
  );
  conn.execute(
    `insert into crop values ('PEPPERS','Pepper','Rabi',120,210,600,900)`
  );
  conn.execute(
    `insert into crop values ('PUMPKIN','Vegetable','Zaid',70,100,500,700)`
  );
  conn.execute(
    `insert into crop values ('RADISH','Vegetable','Rabi',35,45,400,500)`
  );
  conn.execute(
    `insert into crop values ('SPINACH','Vegetable','Kharif',60,100,400,600)`
  );
  conn.execute(
    `insert into crop values ('TOMATO','Vegetable','Kharif',135,180,400,800)`
  );
  conn.execute(
    `insert into crop values ('TURNIPS','Vegetable','Rabi',135,180,350,600)`
  );
  conn.execute(
    `insert into crop values ('WATERMELON','Fruit','Zaid',90,110,400,600)`
  );
  conn.execute(
    `insert into crop values ('PEAS','Vegetable','Rabi',100,150,350,450)`
  );
  conn.execute(
    `insert into crop values ('SOYBEANS','Vegetable','Kharif',135,150,300,450)`
  );
  conn.execute(
    `insert into crop values ('APPLE','Fruit','Rabi',200,220,300,450)`
  );
  conn.execute(
    `insert into crop values ('BLUEBERRY','Fruit','Zaid',150,170,400,600)`
  );
  conn.execute(
    `insert into crop values ('GRAPES','Fruit','Rabi',120,150,400,700)`
  );
  conn.execute(
    `insert into crop values ('STRAWBERRY','Fruit','Zaid',170,200,400,600)`
  );
  conn.execute(
    `insert into crop values ('BARLEY','Grain','Rabi',120,140,450,650)`
  );
  conn.execute(
    `insert into crop values ('MAIZE','Grain','Kharif',125,180,500,800)`
  );
  conn.execute(
    `insert into crop values ('JOWAR','Grain','Kharif',105,140,500,700)`
  );
  conn.execute(
    `insert into crop values ('POTATO','Vegetable','Zaid',105,145,450,650)`
  );
  conn.execute(
    `insert into crop values ('WHEAT','Grain','Rabi',120,150,450,650)`
  );
  conn.execute(
    `insert into crop values ('RICE','Grain','Kharif',90,150,500,800)`
  );

  //avail table//
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('BAJRA','0','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('BROCCOLI','1','0','0')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('CABBAGE','1','0','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('CARROT','1','0','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('CAULIFLOWER','1','0','0')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('CUCUMBER','1','1','0')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('EGGPLANT','1','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('GARLIC','0','1','0')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('LETTUCE','1','1','0')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('MUSKMELON','1','0','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('ONION','0','0','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('PEPPERS','1','1','0')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('PUMPKIN','1','0','0')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('RADISH','1','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('SPINACH','1','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('TOMATO','0','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('TURNIPS','1','0','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('WATERMELON','0','0','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('PEAS','1','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('SOYBEANS','1','0','0')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('APPLE','1','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('BLUEBERRY','0','0','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('GRAPES','1','0','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('STRAWBERRY','0','0','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('BARLEY','1','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('MAIZE','1','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('JOWAR','1','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('POTATO','0','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('WHEAT','1','1','1')`
  );
  conn.execute(
    `INSERT INTO avail (name,alluvial,red,black) VALUES ('RICE','1','1','1')`
  );
  //location//

  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Andhra Pradesh','Red',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Andhra Pradesh','Alluvial',4,3,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Andhra Pradesh','Black',5,2,5)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Assam','Alluvial ',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Assam','Red',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Bihar','Alluvial',6,2,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Bihar','Red',6,3,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Bihar','Black',5,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Chhatisgarh','Red',4,2,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Chhatisgarh','Black',1,3,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Gujarat','Red',1,4,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Gujarat','Black',4,2,0)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Haryana','Alluvial',5,3,0)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Himachal Pradesh','Alluvial',6,2,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Jammu & Kashmir','Alluvial',5,2,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Jharkhand','Red',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Jharkhand','Black',5,2,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Karnataka','Red',3,5,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Karnataka','Black',1,4,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Karnataka','Alluvial',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Kerala','Red',4,1,3)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Maharashtra','Red',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Maharashtra','Black',4,1,3)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Maharashtra','Alluvial',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Madhya Pradesh','Alluvial',1,3,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Madhya Pradesh','Black',4,2,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Madhya Pradesh','Red',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('North East','Alluvial ',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('North East','Red',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Odisha','Red',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Odisha','Black',3,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Punjab','Alluvial',5,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Rajasthan','Red',3,2,0)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Tamil Nadu','Red',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Tamil Nadu','Black',5,6,4)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Tamil Nadu','Alluvial',4,2,3)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Uttrakhand','Alluvial',5,2,0)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Uttar Pradesh','Alluvial',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Uttar Pradesh','Red',4,2,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('Uttar Pradesh','Black',4,1,1)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('West Bengal','Alluvial',4,2,2)`
  );
  conn.execute(
    `INSERT INTO location (region,soil,nratio,pratio,kratio) VALUES ('West Bengal','Red',4,2,2)`
  );

  //pic location //

  conn.execute(
    `insert into picloc values ('BAJRA','/assets/croppic/bajra.jpg')`
  );
  conn.execute(
    `insert into picloc values ('BROCCOLI','/assets/croppic/broccoli.jpg')`
  );
  conn.execute(
    `insert into picloc values ('CABBAGE','/assets/croppic/cabbage.jpeg')`
  );
  conn.execute(
    `insert into picloc values ('CARROT','/assets/croppic/carrot.jpg')`
  );
  conn.execute(
    `insert into picloc values ('CAULIFLOWER','/assets/croppic/cauliflower.jpeg')`
  );
  conn.execute(
    `insert into picloc values ('CUCUMBER','/assets/croppic/cucumber.jpg')`
  );
  conn.execute(
    `insert into picloc values ('EGGPLANT','/assets/croppic/eggplant.jpg')`
  );
  conn.execute(
    `insert into picloc values ('GARLIC','/assets/croppic/garlic.jpg')`
  );
  conn.execute(
    `insert into picloc values ('LETTUCE','/assets/croppic/lettuce.jpg')`
  );
  conn.execute(
    `insert into picloc values ('MUSKMELON','/assets/croppic/muskmelon.jpg')`
  );
  conn.execute(
    `insert into picloc values ('ONION','/assets/croppic/onion.jpg')`
  );
  conn.execute(
    `insert into picloc values ('PEPPERS','/assets/croppic/pepper.jpg')`
  );
  conn.execute(
    `insert into picloc values ('PUMPKIN','/assets/croppic/pumpkin.jpg')`
  );
  conn.execute(
    `insert into picloc values ('RADISH','/assets/croppic/radish.jpg')`
  );
  conn.execute(
    `insert into picloc values ('SPINACH','/assets/croppic/spinach.jpg')`
  );
  conn.execute(
    `insert into picloc values ('TOMATO','/assets/croppic/tomato.jpg')`
  );
  conn.execute(
    `insert into picloc values ('TURNIPS','/assets/croppic/turnip.jpg')`
  );
  conn.execute(
    `insert into picloc values ('WATERMELON','/assets/croppic/watermelon.jpg')`
  );
  conn.execute(`insert into picloc values ('PEAS','/assets/croppic/peas.jpg')`);
  conn.execute(
    `insert into picloc values ('APPLE','/assets/croppic/apple.jpg')`
  );
  conn.execute(
    `insert into picloc values ('BLUEBERRY','/assets/croppic/blueberry.jpeg')`
  );
  conn.execute(
    `insert into picloc values ('GRAPES','/assets/croppic/grapes.jpg')`
  );
  conn.execute(
    `insert into picloc values ('STRAWBERRY','/assets/croppic/strawb.jpg')`
  );
  conn.execute(
    `insert into picloc values ('BARLEY','/assets/croppic/barley.jpg')`
  );
  conn.execute(
    `insert into picloc values ('MAIZE','/assets/croppic/maize.jpg')`
  );
  conn.execute(
    `insert into picloc values ('JOWAR','/assets/croppic/jowar.jpg')`
  );
  conn.execute(
    `insert into picloc values ('POTATO','/assets/croppic/potato.jpg')`
  );
  conn.execute(
    `insert into picloc values ('WHEAT','/assets/croppic/wheat.jpg')`
  );
  conn.execute(`insert into picloc values ('RICE','/assets/croppic/rice.jpg')`);

  //nitrogen//

  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('BAJRA',60,40,20)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('BROCCOLI',180,160,140)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('CABBAGE',180,160,140)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('CARROT',120,100,80)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('CAULIFLOWER',180,160,140)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('CUCUMBER',100,80,60)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('EGGPLANT',120,100,80)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('GARLIC',120,100,80)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('LETTUCE',120,100,80)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('MUSKMELON',100,80,60)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('ONION',130,110,90)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('PEPPERS',140,120,100)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('PUMPKIN',70,50,30)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('RADISH',50,40,30)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('SPINACH',100,80,60)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('TOMATO',130,110,90)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('TURNIPS',60,50,40)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('WATERMELON',100,80,60)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('PEAS',50,40,30)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('SOYBEANS',40,30,20)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('APPLE',150,100,50)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('BLUEBERRY',75,50,0)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('GRAPES',125,100,50)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('STRAWBERRY',150,50,0)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('BARLEY',60,50,40)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('MAIZE',150,50,25)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('JOWAR',150,50,0)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('POTATO',60,50,40)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('WHEAT',180,160,140)`
  );
  conn.execute(
    `INSERT INTO nitrogen (cname,low,medium,high) VALUES ('RICE',180,160,140)`
  );

  //Phosphorous//

  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('BAJRA',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('BROCCOLI',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('CABBAGE',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('CARROT',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('CAULIFLOWER',150,100,50)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('CUCUMBER',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('EGGPLANT',150,100,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('GARLIC',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('LETTUCE',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('MUSKMELON',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('ONION',200,100,50)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('PEPPERS',150,75,50)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('PUMPKIN',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('RADISH',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('SPINACH',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('TOMATO',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('TURNIPS',100,50,0)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('WATERMELON',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('PEAS',75,25,0)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('SOYBEANS',150,75,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('APPLE',100,50,0)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('BLUEBERRY',75,25,0)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('GRAPES',100,50,0)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('STRAWBERRY',100,50,0)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('BARLEY',150,50,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('MAIZE',150,50,25)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('JOWAR',150,50,0)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('POTATO',75,50,0)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('WHEAT',180,50,0)`
  );
  conn.execute(
    `INSERT INTO phosphorus (cname,low,medium,high) VALUES ('RICE',180,75,50)`
  );

  //Potssium//

  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('BAJRA',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('BROCCOLI',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('CABBAGE',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('CARROT',200,100,50)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('CAULIFLOWER',200,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('CUCUMBER',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('EGGPLANT',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('GARLIC',150,75,25)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('LETTUCE',200,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('MUSKMELON',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('ONION',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('PEPPERS',200,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('PUMPKIN',150,75,25)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('RADISH',200,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('SPINACH',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('TOMATO',250,150,0)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('TURNIPS',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('WATERMELON',150,75,25)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('PEAS',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('SOYBEANS',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('APPLE',200,100,50)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('BLUEBERRY',150,75,50)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('GRAPES',200,100,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('STRAWBERRY',200,100,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('BARLEY',250,100,50)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('MAIZE',150,50,25)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('JOWAR',150,100,50)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('POTATO',250,150,75)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('WHEAT',200,100,50)`
  );
  conn.execute(
    `INSERT INTO potassium (cname,low,medium,high) VALUES ('RICE',200,100,50)`
  );

  //seasondes//

  conn.execute(
    `INSERT INTO seasondes (season,description) VALUES ('Kharif',' Kharif season is the monsoon season in India, which typically runs from June to September. Kharif crops refer to crops that are sown in the rainy season and harvested in the autumn. These crops are typically water-intensive crops that require a lot of rainfall and are suited for the tropical climate of India.')`
  );
  conn.execute(
    `INSERT INTO seasondes (season,description) VALUES ('Rabi','Rabi season crops refer to crops that are sown in the winter season and harvested in the spring. The Rabi season in India typically runs from October to March. These crops are generally less dependent on rainfall and require irrigation.')`
  );
  conn.execute(
    `INSERT INTO seasondes (season,description) VALUES ('Zaid','Zaid season crops refer to crops that are grown in between the Kharif and Rabi seasons. The Zaid season in India typically runs from March to June. These crops are usually grown in regions where there is sufficient irrigation and the weather is suitable for their growth.')`
  );

  //temperature//

  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('BAJRA',25,30)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('BROCCOLI',18,22)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('CABBAGE',15,25)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('CARROT',15,20)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('CAULIFLOWER',19,23)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('CUCUMBER',18,25)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('EGGPLANT',20,30)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('GARLIC',1,10)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('LETTUCE',13,18)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('MUSKMELON',27,30)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('ONION',13,24)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('PEPPERS',20,28)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('PUMPKIN',25,28)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('RADISH',10,18)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('SPINACH',10,22)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('TOMATO',21,24)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('TURNIPS',10,16)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('WATERMELON',21,29)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('PEAS',10,18)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('SOYBEANS',16,28)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('APPLE',21,24)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('BLUEBERRY',26,33)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('GRAPES',15,35)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('STRAWBERRY',13,22)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('BARLEY',12,16)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('MAIZE',18,24)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('JOWAR',25,32)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('POTATO',16,21)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('WHEAT',20,25)`
  );
  conn.execute(
    `INSERT INTO temperature (cname,stemp,ftemp) VALUES ('RICE',21,37)`
  );

  //locagro//

  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Andhra Pradesh','East Coast Plains and Hills Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Assam','Eastern Himalayan Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Bihar','Middle Gangetic Plains Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Chhatisgarh','Sub-Plateau Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Gujarat','Gujarat Plains and Hills Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Haryana','Plains Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Himachal Pradesh','Himalayan Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Jammu & Kashmir','Western Himalayan Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Jharkhand','Middle Gangetic Plains Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Karnataka','Western Plateau and Hills Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Kerala','West Coast Plains and Ghat Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Maharashtra','Eastern Plateau and Hills Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Madhya Pradesh','Central Plateau and Hills Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('North East','East Himalayan Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Odisha','Mid Central Land Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Punjab','Trans-Gangetic Plains Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Rajasthan','Western Dry Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Tamil Nadu','Southern Plateau and Hills Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Uttrakhand','Trans-Himalayan Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('Uttar Pradesh','Upper Gangetic Plains Region')`
  );
  conn.execute(
    `INSERT INTO locagro (region,agroclimatic) VALUES ('West Bengal','Lower Gangetic Plains Region')`
  );
}

//Signup Info//

let userinp;
let userpas;
let userloc;
let userr;
let rows_got;
let rows_send;
let season_got;
let season_send;
let no_of_crops;
let recieved;
let recieved1;
let crop_searched;
let state;
let state_soil;
let got_loc;
let sel;
let sel_inp;
let sel_inp2;

app.post("/sign", function (req, res) {
  signup_info(
    req.body.username,
    req.body.pwd,
    req.body.pwd11,
    req.body.location,
    req.body.number
  );
});

async function signup_info(usernm, passs, passs1, lok, pno) {
  conn.execute(
    "insert into employee(Username,pass,pass1,loc,phno) values (:1,:2,:3,:4,:5)",
    [usernm, passs, passs1, lok, pno]
  );
  const result = await conn.execute(`select * from employee`);
  console.log(result.rows);
}

//Login//
app.post("/log", function (req, res) {
  const un1 = req.body.username;

  const p1 = req.body.pwd;
  logi(un1, p1, res);
});
async function logi(un1, p1, res) {
  const result = await conn.execute(
    `select * from employee where username = :1`,
    [un1]
  );
  if (result.rows[0] == undefined) {
    console.log("Username does not exists");
    res.render("pages/index");
  } else {
    userinp = result.rows[0][0];
    userpas = result.rows[0][1];
    if (userpas == p1) {
      userloc = result.rows[0][3];
      userr = { usname: userinp.toUpperCase(), locat: userloc.toUpperCase() };
      console.log("Login Successful");
      setTimeout(function () {
        res.render("pages/home", { userr });
      }, 2000);
    } else {
      console.log("incorrect password");
      res.render("pages/index");
    }
  }
}

//home crops about contact //

//home click//
app.post("/hom", function (req, res) {
  console.log("cliked home");

  userr = {
    usname: userinp.toUpperCase(),
    locat: userpas.toUpperCase(),
  };
  setTimeout(function () {
    res.render("pages/home", { userr });
  }, 500);
});

//crop click//

app.post("/crp", function (req, res) {
  console.log("cliked crop");

  userr = {
    usname: userinp.toUpperCase(),
  };
  setTimeout(function () {
    res.render("pages/crops", { userr });
  }, 500);
});

//about clicked//

app.post("/abt", function (req, res) {
  console.log("cliked about");

  userr = {
    usname: userinp.toUpperCase(),
  };
  setTimeout(function () {
    res.render("pages/about", { userr });
  }, 500);
});

//contact clicked//

app.post("/contact", function (req, res) {
  console.log("cliked contact");

  userr = {
    usname: userinp.toUpperCase(),
  };
  setTimeout(function () {
    res.render("pages/contact", { userr });
  }, 500);
});

//search//

app.post("/searchname", function (req, res) {
  recieved = req.body.searchnm.toUpperCase();
  console.log(recieved);
  search_by_name(recieved, req, res);
});

async function search_by_name(crop_searched, req, res) {
  rows_got = await conn.execute(
    `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where crop.cname = :1)`,
    [crop_searched]
  );

  let temp = await conn.execute(
    `select temp.stemp,temp.ftemp from temperature temp JOIN crop on crop.cname = temp.cname where crop.cname = :1`,
    [crop_searched]
  );
  let temp_rows = temp.rows;

  let sdesc = await conn.execute(
    `select des.description from seasondes des JOIN crop on crop.season = des.season where crop.cname = :1`,
    [crop_searched]
  );
  let sdesc_rows = sdesc.rows;

  let nitroo = await conn.execute(`select * from nitrogen where cname = :1`, [
    crop_searched,
  ]);
  let nitro_rows = nitroo.rows;

  let phosp = await conn.execute(`select * from phosphorus where cname = :1`, [
    crop_searched,
  ]);
  let phosp_rows = phosp.rows;

  let potassi = await conn.execute(`select * from potassium where cname = :1`, [
    crop_searched,
  ]);
  let potassium_rows = potassi.rows;

  rows_send = rows_got.rows;
  sel = 4;
  sel_inp = [crop_searched];
  no_of_crops = rows_send.length;
  console.log(nitro_rows);
  setTimeout(function () {
    res.render("pages/bysearch", {
      rows_send,
      no_of_crops,
      sel,
      sel_inp,
      userr,
      nitro_rows,
      phosp_rows,
      potassium_rows,
      sdesc_rows,
      temp_rows,
    });
  }, 500);
}

app.post("/ssoil", function (req, res) {
  recieved = req.body.item;
  console.log(recieved);
  soil(recieved, req, res);
});

async function soil(soil_selected, req, res) {
  if (soil_selected == "alluvial") {
    rows_got = await conn.execute(
      `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where avail.alluvial = 1 )`
    );
  } else if (soil_selected == "red") {
    rows_got = await conn.execute(
      `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where avail.red = 1 )`
    );
  } else if (soil_selected == "black") {
    rows_got = await conn.execute(
      `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where avail.black = 1 )`
    );
  }
  rows_send = rows_got.rows;
  sel = 1;
  sel_inp = [soil_selected.toUpperCase()];
  no_of_crops = rows_send.length;
  setTimeout(function () {
    res.render("pages/searchopt", {
      rows_send,
      no_of_crops,
      sel,
      sel_inp,
      userr,
    });
  }, 500);
}

app.post("/sseason", function (req, res) {
  recieved = req.body.item;
  console.log(recieved);
  season(recieved, req, res);
});

async function season(season_selected, req, res) {
  if (season_selected == "kharif") {
    rows_got = await conn.execute(
      `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where crop.season = 'Kharif')`
    );
  } else if (season_selected == "zaid") {
    rows_got = await conn.execute(
      `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where crop.season = 'Zaid')`
    );
  } else if (season_selected == "rabi") {
    rows_got = await conn.execute(
      `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where crop.season = 'Rabi')`
    );
  }
  rows_send = rows_got.rows;
  sel = 2;
  sel_inp = [season_selected.toUpperCase()];
  no_of_crops = rows_send.length;
  setTimeout(function () {
    res.render("pages/searchopt", {
      rows_send,
      no_of_crops,
      sel,
      sel_inp,
      userr,
    });
  }, 500);
}

//bylocation//
app.post("/slocation", function (req, res) {
  recieved = req.body.item;
  recieved1 = req.body.item1;
  console.log(recieved);
  console.log(recieved1);
  console.log("**");
  bylocation(recieved, recieved1, req, res);
});

async function bylocation(state, state_soil, req, res) {
  got_loc = await conn.execute(
    `select * from location where region = :1 and soil = :2`,
    [state, state_soil]
  );
  if (got_loc.rows.length == 0) {
    no_of_crops = 0;
    rows_send = [];
    setTimeout(function () {
      res.render("pages/searchopt", { rows_send, no_of_crops, userr });
    }, 500);
  } else {
    let agroclimatic = await conn.execute(
      `select * from locagro where region = :1`,
      [state]
    );

    let agroclimate_rows = agroclimatic.rows;
    console.log(agroclimate_rows);

    if (state_soil == "Alluvial") {
      rows_got = await conn.execute(
        `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where avail.alluvial = 1 )`
      );
    } else if (state_soil == "Red") {
      rows_got = await conn.execute(
        `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where avail.red = 1 )`
      );
    } else if (state_soil == "Black") {
      rows_got = await conn.execute(
        `select * from picloc NATURAL JOIN (select * from avail JOIN crop on avail.name = crop.cname where avail.black = 1 )`
      );
    }
    rows_send = rows_got.rows;
    sel = 3;
    sel_inp = [state, state_soil];
    no_of_crops = rows_send.length;
    setTimeout(function () {
      res.render("pages/searchopt", {
        rows_send,
        no_of_crops,
        sel,
        sel_inp,
        userr,
        agroclimate_rows,
      });
    }, 500);
  }
}
