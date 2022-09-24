const router = require('express').Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const {isAuth,truncateString,dateOnly} = require("../controller/middleware/index")
const crypto = require("crypto");
const informasi = require('../models/informasi');
const data_penduduk = require('../models/penduduk');
const {connectDB} = require('../config/db')
const dotenv = require("dotenv")

dotenv.config({path:require('find-config')('.env')})


// database connection
connectDB(process.env.db_uri)


router.get('/', async (req, res) => {
    const dataInformasi = informasi.find();
    const dataPenduduk = await data_penduduk.find()
    const {laki_laki,perempuan} = dataPenduduk
    console.log(dataPenduduk)
    const data = await dataPenduduk.map(data => {
        return {
            laki_laki: data.laki_laki,
            perempuan: data.perempuan
        }
    })
    console.log(data)
    res.render("index",{
        title: "Home",
        layout: "layouts/main",
        convert : truncateString,
        date : dateOnly,
        laki_laki: data[0].laki_laki,
        perempuan: data[0].perempuan
        });
});

router.post('/add-penduduk',async (req,res) => {
    const {laki_laki,perempuan} = req.body;
    console.log(laki_laki,perempuan)
    const dataPenduduk = new data_penduduk({
        laki_laki,perempuan
    });
    dataPenduduk.save((err,msg)=> {
        if(!err)
            res.send({
                message: "The data has been added successfully"
            })
        else
            res.send({
                message: "The data has not been added" + err
            })
    })
})


router.get('/profile', (req, res) => {
  res.render('profile', {
    title: 'Profile',
    layout: 'layouts/main',
  });
});

router.get('/informasi', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM berita ORDER BY id DESC', (err, rows) => {
      if (err) throw err;
      res.render('informasi', {
        title: 'Informasi',
        layout: 'layouts/main',
        data: rows,
        date: dateOnly,
        convert: truncateString,
      });
    });
    connection.release()
  });
});

router.get('/informasi/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM berita WHERE id = ${req.params.id}`, (err, rows) => {
      const konten = rows.map((row) => {
        return {
          judul: row.judul,
          isi : row.isi,
          gambar : row.gambar,
          penulis : row.author,
          id : row.id,
        };
      });
      connection.query(`SELECT * FROM berita`,(err,rows) => {
        res.render('detail', {
          title: konten[0].judul,
          layout: 'layouts/main',
          judul : konten[0].judul,
          isi : konten[0].isi,
          gambar : konten[0].gambar,
          penulis : konten[0].penulis,
          id : konten[0].id,
          data : rows,
          date : dateOnly
        });
      })
    });
    connection.release()
  });
});

router.get("/layanan",(req,res) => {
  res.render("layanan",{
    title : "layanan",
    layout : "layouts/main"
  })
})

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    layout: 'layouts/login-signup',
    err: req.flash('error'),
    msg: req.flash("msg")
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Signup',
    layout: 'layouts/login-signup',
    err: req.flash('error'),
    msg: req.flash("msg")
  });
});

router.get("/dashboard", isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(`SELECT * FROM pegawai WHERE id = '${req.session.user.id}'`, (err, result) => {
            if (err) throw err;
            const data = result.map(row => {
              return {
                username : row.username,
                jabatan : row.jabatan
              }
            })
            connection.query(`SELECT * FROM pegawai`,(err,dataPegawai) => {
              const Pegawai = dataPegawai.length;
              connection.query(`SELECT * FROM tbl_penduduk`,(err,jumlahPenduduk) => {
                const Penduduk = jumlahPenduduk[0].laki_laki + jumlahPenduduk[0].perempuan;
                const laki = jumlahPenduduk[0].laki_laki;
                const perempuan = jumlahPenduduk[0].perempuan;
                connection.query(`SELECT * FROM berita`,(err,jumlahInformasi) => {
                  const Informasi = jumlahInformasi.length;
                  const isVerified = result[0].verifiedEmail;
                  res.render("dashboard",{
                      title: "Dashboard",
                      layout: "layouts/dashboard-layout",
                      data: result,
                      msg : req.flash("msg"),
                      username : data[0].username,
                      isVerified,
                      Pegawai,
                      Penduduk,
                      Informasi,
                      jabatan : data[0].jabatan,
                      err : req.flash("err"),
                      laki,
                      perempuan
                  });
                })
              })
            });
            connection.release();
        });
    })
  });

router.get('/dashboard/dataUser', isAuth, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM pegawai WHERE id = '${req.session.user.id}'`,(err,result) => {
      const isVerified = result[0].verifiedEmail;
      const username = result[0].username;
      const jabatan = result[0].jabatan;
      connection.query(`SELECT * FROM pegawai`, (err, result) => {
        if (err) throw err;
        res.render('data-user', {
          title: 'Data User',
          layout: 'layouts/dashboard-layout',
          username,
          data: result,
          msg: req.flash("msg"),
          isVerified,
          jabatan
        });
    })
      connection.release();
    });
  });
});

router.delete("/delete-user",(req,res) => {
  const {id} = req.body;
  pool.getConnection((err,connection) => {
    if (err) throw err;
    connection.query(`DELETE FROM pegawai WHERE id = '${id}'`,(err,result) => {
      if (err) throw err;
      req.flash("msg","Data telah berhasil dihapus");
      connection.release();
      res.redirect("/dashboard/dataUser")
    })
  })
})

router.get("/dashboard/dataProfile",isAuth,(req,res) => {
  pool.getConnection((err,connection) => {
    if(err) throw err;
    connection.query(`SELECT * FROM pegawai WHERE id = '${req.session.user.id}'`,(err,result) => {
      const username = result[0].username;
      const jabatan = result[0].jabatan;
      if(err) throw err;
      const isVerified = result[0].verifiedEmail;
      connection.query(`SELECT * FROM tbl_penduduk,agama,etnis`,(err,result) => {
        if(err) throw err;
        res.render("data-profile",{
            title: "Data Profile",
            layout: "layouts/dashboard-layout",
            username,
            data : result,
            isVerified,
            jabatan,
            msg : req.flash("msg")
        })
      })
      connection.release()
    })
  })
})
router.put("/update-penduduk",(req,res) => {
  const {laki_laki,Perempuan} = req.body;
  pool.getConnection((err,connection) => {
    connection.query(`UPDATE tbl_penduduk SET ? WHERE id = '1'`,{
      laki_laki,perempuan : Perempuan
    })
  })
  req.flash("msg","Data telah berhasil di update")
  res.redirect("/dashboard/dataProfile")
})

router.put("/update-agama",(req,res) => {
  const {islam,kristen,katolik,hindu,budha} = req.body;
  pool.getConnection((err,connection) => {
    connection.query(`UPDATE agama SET ? WHERE id = '1'`,{
      islam,kristen,katolik,hindu,budha
    })
  })
  req.flash("msg","Data telah berhasil di update")
  res.redirect("/dashboard/dataProfile")
})

router.put("/update-etnis",(req,res) => {
  const {sunda,jawa,bali,bugis,makasar,mandar,tolaki,buton,muna,bajo,mornene,toraja} = req.body;
  pool.getConnection((err,connection) => {
    connection.query(`UPDATE etnis SET ? WHERE id = '1'`,{
      sunda,jawa,bali,bugis,makasar,mandar,tolaki,buton,muna,bajo,mornene,toraja
    })
  })
  req.flash("msg","Data telah berhasil di update")
  res.redirect("/dashboard/dataProfile")
})

router.get("/dashboard/informasi",isAuth,(req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(`SELECT * FROM pegawai WHERE id = '${req.session.user.id}'`,(err,result) => {
          const isVerified = result[0].verifiedEmail;
          const username = result[0].username;
          const jabatan = result[0].jabatan;
          connection.query("SELECT * FROM pegawai", (err, result) => {
              if (err) throw err;
              res.render("uploadBerita",{
                  title: "Informasi",
                  layout: "layouts/dashboard-layout",
                  username,
                  msg: req.flash("msg"),
                  isVerified,
                  jabatan
              })
            }
            )
            connection.release();
        })
    });
  });

router.post('/dashboard/informasi', (req, res, next) => {
  const { judul, isi } = req.body;
  const tgl_update = moment().format('YYYY-MM-DD');
  pool.getConnection((err, connection) => {
    if (err) throw err;
    if (!req.file) {
      req.flash('msg', 'Harap masukkan gambar');
      res.redirect('/dashboard/informasi');
    } else {
      const image = req.file.path;
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

// edit profile
router.get("/dashboard/edit-profile",isAuth,(req,res) => {
  pool.getConnection((err,connection) => {
    connection.query(`SELECT * FROM pegawai WHERE id = '${req.session.user.id}'`,(err,rows) => {
      const data = rows.map(row => {
        return {
          id : row.id,
          nama : row.nama,
          jabatan : row.jabatan,
          nip : row.nip,
          email : row.email,
          username : row.username
        }
      })
      res.render("editProfile",{
        title : "Edit Profile",
        layout : "layouts/login-signup",
        id : data[0].id,
        nama : data[0].nama,
        jabatan : data[0].jabatan,
        nip : data[0].nip,
        email : data[0].email,
        username : data[0].username,
        msg : req.flash("msg"),
        err : req.flash("err")
    })
    })
  })
})

router.put("/dashboard/edit-profile",(req,res) => {
  const {id,nama,jabatan,nip,username,password,confirmPassword} = req.body;
  const hash = bcrypt.hashSync(password,10);
  pool.getConnection((err,connection) => {
    if(password === confirmPassword) {
      if(password === '') {
        connection.query(`UPDATE pegawai SET ? WHERE id = ${id}`,{
          nama,jabatan,nip,username
        })

      } else {
        connection.query(`UPDATE pegawai SET ? WHERE id = ${id}`,{
          nama,jabatan,nip,username,password : hash
        })
      }
      req.flash("msg","Your profile has been successfully updated")
      res.redirect("/dashboard")
    } else if (password !== confirmPassword) {
      req.flash("err","Password dan Konfirmasi Password tidak match")
      res.redirect("/dashboard/edit-profile")
    }
  })
})

// verification email
router.get("/dashboard/verify-email",isAuth, async (req,res) => {
    // generate token
    const token = crypto.randomBytes(20).toString('hex');
    // set token to database
    pool.getConnection((err,connection) => {
      if(err) throw err;
      connection.query(`INSERT INTO token SET ?`,{
        token,
        email : req.session.user.email,
        date: new Date()
      })
      connection.release();
    })
    const mailOptions = {
      from: process.env.email,
      to: req.session.user.email,
      subject: "Verify Email",
      html: `
        <h1Verify Your Email</h1>
        <p>Click this link to verify your email</p>
        <a href="https://kelurahan-abeli.com/verify-email/${token}">Verify Email</a>
        `
    }
    await transporter.sendMail(mailOptions);
    req.flash("msg","Link email verifikasi telah berhasil dikirim jika tidak ada di inbox harap cek folder spam");
    res.redirect("/dashboard")
})

router.get("/verify-email/:token", async (req,res) => {
  const token = req.params.token;
  pool.getConnection((err,connection) => {
    if(err) throw err;
    connection.query(`SELECT * FROM token WHERE token = '${token}'`,(err,result) => {
      if(err) throw err;
      if(result.length > 0){
        const email = result[0].email;
        connection.query(`UPDATE pegawai SET verifiedEmail = 1 WHERE email = '${email}'`,(err,result) => {
          if(err) throw err;
          connection.query(`DELETE FROM token WHERE email = '${email}'`,(err,result) => {
            if(err) throw err;
            connection.release()
            res.redirect("/dashboard");
          })
        })
      }else{
        connection.release()
        res.redirect("/dashboard");
      }
    })
  })
})

// forgot-password
router.post("/forgot-password",(req,res) => {
  const {email} = req.body;
  // generate token
  const token = crypto.randomBytes(20).toString("hex");
  // set token database
  pool.getConnection((err,connection) => {
    if(err) throw err;
    connection.query(`SELECT * FROM pegawai WHERE email = "${email}"`,(err,result) => {
      if(err) throw err;
      else if(result.length > 0){
        connection.query(`INSERT INTO token SET ?`,{
          token,
          email,
          date : new Date()
        })
        connection.release();
        const mailOptions = {
          from : process.env.email,
          to : email,
          subject : "Reset Password",
          html : `
            <h1> Reset Password </h1>
            <p> Reset your password by clicking this link <a href="http://kelurahan-abeli.com/forgot-password/${token}">Reset Password</a></p>
          `
        }
        transporter.sendMail(mailOptions)
        req.flash("msg","Link untuk reset password telah dikirim ke email jika tidak menerima pesan harap cek folder spam");
        res.redirect("/login")
      } else {
        req.flash("error","Email tidak terdaftar");
        res.redirect("/login")
      }
    })
  })
})

router.get("/forgot-password/:token", async (req,res) => {
const token = req.params.token;
  pool.getConnection((err,connection) => {
    if(err) throw err;
    connection.query(`SELECT * FROM token WHERE token = '${token}'`,(err,result) => {
      if(err) throw err;
      if(result.length > 0){
        const email = result[0].email;
        connection.query(`SELECT * FROM pegawai WHERE email = '${email}'`,(err,result) => {
          if(err) throw err;
          if(result.length > 0) {
            res.render("forgot-password",{
              title: "Reset Password",
              layout: 'layouts/login-signup',
              username: result[0].username,
              email : result[0].email,
              id : result[0].id,
              err : req.flash("err"),
              msg : req.flash("msg")
            })
          }
        })
      }else{
        res.redirect("/login");
      }
    })
  })
})

router.put("/reset-password",(req,res) => {
  const {id,email,password,username,confirmPassword} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  pool.getConnection((err,connection) => {
    if(err) throw err;
    if(password !== confirmPassword){
      req.flash("err","Password dan Konfirmasi Password tidak sesuai");
      connection.query(`SELECT token FROM token WHERE email = "${email}"`,(err,result) => {
        res.redirect(`/forgot-password/${result[0].token}`)
      })
    } else {
      connection.query(`DELETE FROM token WHERE email = '${email}'`,(err,result) => {
        connection.query(`UPDATE pegawai SET ? WHERE id = '${id}'`,{
          password : hash
        })
        req.flash("msg","Password telah berhasil di update")
        res.redirect("/login")
      })
    }
  })
})


router.post('/signup', (req, res) => {
  const { username, password, nama, nip, position, email, confirmPassword } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  pool.getConnection((err, connection) => {
    if (err) throw err;
    if (password !== confirmPassword) {
      req.flash('error', "Password dan Konfirmasi Password tidak sesuai");
      res.redirect('/signup');
    } else {
      connection.query(`INSERT INTO pegawai (username, password, nama, nip, jabatan, email) VALUES ('${username}', '${hash}', '${nama}', '${nip}', '${position}', '${email}')`, (err, result) => {
        if (err) throw err;
        connection.release();
        req.flash('msg', 'Akun telah berhasil dibuat');
        res.redirect('/login');
      });
    }
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM pegawai WHERE username = '${username}'`, async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        if (await bcrypt.compare(password, result[0].password)) {
          req.session.isAuth = true;
          req.session.user = result[0];
          res.redirect('/dashboard');
        } else {
          req.flash('error', "Username atau password yang anda masukkan salah");
          res.redirect('/login');
        }
      } else {
        req.flash('error', "Username tidak ditemukan");
        res.redirect('/login');
      }
      connection.release();
    });
  });
});

// logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});


module.exports = {router}