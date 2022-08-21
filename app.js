const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const multer = require('multer');
const mailer = require('nodemailer');
const crypto = require('crypto');
const app = express();
const dotenv = require('dotenv');

// set environment
dotenv.config({ path: './.env' });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static(path.join(__dirname, 'public')));

// add middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const dateOnly = (date) => {
  return moment(date).format('DD MMMM YYYY');
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single('imageBerita')
);

app.use('/images', express.static(path.join(__dirname, 'images')));
// parse html

// setting up session
app.use(
  session({
    secret: process.env.cookieParserSecret,
    resave: true,
    saveUninitialized: false,
  })
);

// add flash
app.use(cookieParser(process.env.cookieParserSecret));
app.use(flash());

// database connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'profile',
});

// authentication
const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    req.flash('error', 'Please login first');
    res.redirect('/login');
  }
};

// setting up mailer
const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

// send verify email
const sendVerifyEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: 'Verify your email',
    html: `
            <h1>Verify your email</h1>
            <p>Click this link to verify your email</p>
            <a href="http://localhost:3000/verify/${token}">Verify</a>
        `,
  };
  await transporter.sendMail(mailOptions);
};

// send reset password email
const sendResetPasswordEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: 'Reset your password',
    html: `
            <h1>Reset your password</h1>
            <p>Click this link to reset your password</p>
            <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>
        `,
  };
  await transporter.sendMail(mailOptions);
};

// generate token
const generateToken = async () => {
  const token = crypto.randomBytes(32).toString('hex');
  return await token;
};

const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(5, num) + '...';
  } else {
    return str;
  }
};
// routes
app.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err);
    }
    connection.query('SELECT berita.id,berita.judul,berita.isi,berita.gambar,tbl_penduduk.laki_laki,tbl_penduduk.perempuan FROM berita,tbl_penduduk ORDER BY berita.tgl_update DESC LIMIT 6', (err, rows) => {
      if (err) {
        res.send(err);
      }
      const isi = rows.map((row) => {
        return {
          isi: row.isi,
        };
      });
      // console.log(isi[0]);
      res.render('index', {
        title: 'Home',
        layout: 'layouts/main',
        data: rows,
        convert: truncateString,
        date: dateOnly,
      });
    });
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {
    title: 'Profile',
    layout: 'layouts/main',
  });
});

app.get('/layanan', (req, res) => {
  res.render('layanan', {
    title: 'Layanan',
    layout: 'layouts/main',
  });
});

app.get('/informasi', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM berita', (err, rows) => {
      res.render('informasi', {
        title: 'Informasi',
        layout: 'layouts/main',
        data: rows,
        date: dateOnly,
        convert: truncateString,
      });
    });
  });
});

app.get('/informasi/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM berita WHERE id = ${req.params.id}`, (err, rows) => {
      const judul = rows.map((row) => {
        return {
          konten: row.judul,
        };
      });
      console.log(judul[0].konten);
      res.render('detail', {
        title: judul[0].konten,
        layout: 'layouts/main',
        data: rows,
      });
    });
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    layout: 'layouts/login-signup',
    err: req.flash('error'),
  });
});

app.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Signup',
    layout: 'layouts/login-signup',
    err: req.flash('error'),
  });
});

app.get('/dashboard', isAuth, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM pegawai WHERE username = '${req.session.user.username}'`, (err, result) => {
      console.log(req.session.user.username);
      if (err) throw err;
      res.render('dashboard', {
        title: 'Dashboard',
        layout: 'layouts/dashboard-layout',
        username: req.session.user.username,
        data: result,
        generateToken,
      });
      connection.release();
    });
  });
});

app.get('/dashboard/dataUser', isAuth, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM pegawai', (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.render('data-user', {
        title: 'Data User',
        layout: 'layouts/dashboard-layout',
        username: req.session.user.username,
        data: result,
      });
      connection.release();
    });
  });
});

app.get('/dashboard/dataProfile', isAuth, (req, res) => {
  res.render('data-profile', {
    title: 'Data Profile',
    layout: 'layouts/dashboard-layout',
    username: req.session.user.username,
  });
});

app.get('/dashboard/dataProfile', isAuth, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM tbl_penduduk,agama,etnis`, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.render('data-profile', {
        title: 'Data Profile',
        layout: 'layouts/dashboard-layout',
        username: req.session.user.username,
        data: result,
      });
    });
  });
});
app.get('/dashboard/berita', isAuth, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM pegawai', (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.render('uploadBerita', {
        title: 'Berita',
        layout: 'layouts/dashboard-layout',
        username: req.session.user.username,
        msg: req.flash('msg'),
      });
      connection.release();
    });
  });
});

app.post('/dashboard/berita', (req, res, next) => {
  const { judul, isi } = req.body;
  const tgl_update = moment().format('YYYY-MM-DD');
  pool.getConnection((err, connection) => {
    if (err) throw err;
    if (!req.file) {
      req.flash('msg', 'Please upload an image');
      res.redirect('/dashboard/berita');
    } else {
      const image = req.file.path;
      console.log(image);
      connection.query(
        'INSERT INTO berita SET ?',
        {
          judul: judul,
          isi: isi,
          gambar: image,
          tgl_update,
          author: req.session.user.username,
        },
        (err, result) => {
          if (err) throw err;
          req.flash('msg', 'Berhasil menambahkan berita');
          res.redirect('/dashboard/berita');
        }
      );
    }
  });
});

app.post('/signup', (req, res) => {
  const { username, password, nama, nip, position, email, confirmPassword } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  pool.getConnection((err, connection) => {
    if (err) throw err;
    if (password !== confirmPassword) {
      req.flash('error', "Password doesn't match");
      res.redirect('/signup');
    } else {
      connection.query(`INSERT INTO pegawai (username, password, nama, nip, jabatan, email) VALUES ('${username}', '${hash}', '${nama}', '${nip}', '${position}', '${email}')`, (err, result) => {
        if (err) throw err;
        connection.release();
        res.redirect('/login');
      });
    }
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM pegawai WHERE username = '${username}'`, async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        console.log(bcrypt.compareSync(password, result[0].password));
        if (await bcrypt.compare(password, result[0].password)) {
          req.session.isAuth = true;
          req.session.user = result[0];
          res.redirect('/dashboard');
        } else {
          req.flash('error', "Username and Password doesn't match");
          res.redirect('/login');
        }
      } else {
        req.flash('error', "Username doesn't exist");
        res.redirect('/login');
      }
      connection.release();
    });
  });
});

// logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}! access with http://localhost:${port}`));
