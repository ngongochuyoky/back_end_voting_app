const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const db = require('./config/database');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3001;


//Connect database
db.connect();

//HTTP logger
app.use(morgan('combined'));
//Kích hoạt CORS
app.use(cors());

//config static file
app.use(express.static(path.join(__dirname, 'public')));

//middleware cho method Post của form
app.use(
  express.urlencoded({
    extended: true,
  }),
);
//middleware cho các thư viện gửi dữ liệu json() như XMLHttpRequest, fetch, AJAX
app.use(express.json());

//Routes init
routes(app);

//Generate token secret - Chỉ cần khi cần mã bí mật tạo Token secret
// app.get('/generateTokenSecret', function(req, res) {
//   const TOKEN_SECRET =  require('crypto').randomBytes(64).toString('hex');
//   res.json({
//     TOKEN_SECRET 
//   })
// })

app.listen(port, () => {
  console.log(`App listening on port at http://localhost:${port}`);
});


