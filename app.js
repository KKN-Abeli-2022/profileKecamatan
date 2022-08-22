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
const methodOverride = require('method-override');
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
app.use(methodOverride('_method'));

// setting up multer
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
      console.log(rows);
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

<<<<<<< HEAD
app.get('/layanan', (req, res) => {
  res.render('layanan', {
    title: 'Layanan',
    layout: 'layouts/main',
  });
});

=======
>>>>>>> 00fa849a1a9e568ccb543e1bb027673e1b0dd1f0
app.get('/informasi', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM berita ORDER BY tgl_update DESC', (err, rows) => {
      if (err) throw err;
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

app.get("/layanan",(req,res) => {
  res.render("layanan",{
    title : "layanan",
    layout : "layouts/main"
  })
})

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    layout: 'layouts/login-signup',
    err: req.flash('error'),
    msg: req.flash('msg'),
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
        msg: req.flash('msg'),
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

<<<<<<< HEAD
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
=======
app.get("/dashboard/informasi",isAuth,(req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM pegawai", (err, result) => {
            if (err) throw err;
            // console.log(result);
            res.render("uploadBerita",{
                title: "Informasi",
                layout: "layouts/dashboard-layout",
                username: req.session.user.username,
                msg: req.flash("msg")
            })
            connection.release();
        }
        )
>>>>>>> 00fa849a1a9e568ccb543e1bb027673e1b0dd1f0
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
      res.redirect('/dashboard/informasi');
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
          req.flash('msg', 'Berhasil menambahkan informasi');
          res.redirect('/dashboard/informasi');
        }
      );
    }
  });
});

// verification email
app.get('/dashboard/verify-email', isAuth, async (req, res) => {
  // generate token
  const token = crypto.randomBytes(20).toString('hex');
  // set token to database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`INSERT INTO token SET ?`, {
      token,
      email: req.session.user.email,
      date: new Date(),
    });
    connection.release();
  });
  const mailOptions = {
    from: process.env.email,
    to: req.session.user.email,
    subject: 'Verify Email',
    html: `
        <h1Verify Your Email</h1>
        <p>Click this link to verify your email</p>
        <a href="http://localhost:3000/verify-email/${token}">Verify Email</a>
        `,
  };
  await transporter.sendMail(mailOptions);
  req.flash('msg', "verified email has been sent to your email don't forget to check your spam folder");
  res.redirect('/dashboard');
});

app.get('/verify-email/:token', async (req, res) => {
  const token = req.params.token;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM token WHERE token = '${token}'`, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const email = result[0].email;
        connection.query(`UPDATE pegawai SET verifiedEmail = 1 WHERE email = '${email}'`, (err, result) => {
          if (err) throw err;
          connection.query(`DELETE FROM token WHERE email = '${email}'`, (err, result) => {
            if (err) throw err;
            res.redirect('/dashboard');
          });
        });
      } else {
        res.redirect('/dashboard');
      }
    });
  });
});

// forgot-password
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  // generate token
  const token = crypto.randomBytes(20).toString('hex');
  // set token database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM pegawai WHERE email = "${email}"`, (err, result) => {
      if (err) throw err;
      else if (result.length > 0) {
        connection.query(`INSERT INTO token SET ?`, {
          token,
          email,
          date: new Date(),
        });
        connection.release();
        const mailOptions = {
          from: process.env.email,
          to: email,
          subject: 'Reset Password',
          html: `
            <h1> Reset Password </h1>
            <p> Reset your password by clicking this link <a href="http://localhost:3000/forgot-password/${token}">Reset Password</a></p>
          `,
        };
        transporter.sendMail(mailOptions);
        req.flash('msg', 'reset password link has been sent to your email');
        res.redirect('/login');
      } else {
        req.flash('error', 'email not found');
        res.redirect('/login');
      }
    });
  });
});

app.get('/forgot-password/:token', async (req, res) => {
  const token = req.params.token;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM token WHERE token = '${token}'`, (err, result) => {
      if (err) throw err;
      console.log(result[0].email);
      if (result.length > 0) {
        const email = result[0].email;
        connection.query(`SELECT * FROM pegawai WHERE email = '${email}'`, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            res.render('forgot-password', {
              title: 'Reset Password',
              layout: 'layouts/login-signup',
              username: result[0].username,
              email: result[0].email,
              id: result[0].id,
              err: req.flash('err'),
            });
          }
        });
      } else {
        res.redirect('/login');
      }
    });
  });
});

app.put('/reset-password', (req, res) => {
  const { id, email, password, username, confirmPassword } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  pool.getConnection((err, connection) => {
    if (err) throw err;
    if (password !== confirmPassword) {
      req.flash('err', "Password and Password Confirmation didn't match");
      connection.query(`SELECT token FROM token WHERE email = "${email}"`, (err, result) => {
        res.redirect(`/forgot-password/${result[0].token}`);
      });
    } else {
      connection.query(`DELETE FROM token WHERE email = '${email}'`, (err, result) => {
        connection.query(`UPDATE pegawai SET ? WHERE id = '${id}'`, {
          password: hash,
        });
        req.flash('msg', 'your password has been updated');
        res.redirect('/login');
      });
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
        // console.log(bcrypt.compareSync(password, result[0].password));
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
