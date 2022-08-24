-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2022 at 05:22 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `profile`
--

-- --------------------------------------------------------

--
-- Table structure for table `agama`
--

CREATE TABLE `agama` (
  `id_agama` int(10) UNSIGNED DEFAULT NULL,
  `agama` varchar(50) NOT NULL,
  `laki_laki` int(11) NOT NULL,
  `perempuan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bataswilayah`
--

CREATE TABLE `bataswilayah` (
  `id_bts` int(5) NOT NULL,
  `Batas` varchar(50) NOT NULL,
  `Desa / Kelurahan` text NOT NULL,
  `Kecamatan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bentangan_wilayah`
--

CREATE TABLE `bentangan_wilayah` (
  `id_bentangan` int(11) NOT NULL,
  `Wilayah` varchar(50) NOT NULL,
  `Keterangan` varchar(50) NOT NULL,
  `Luas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bentangan_wilayah`
--

INSERT INTO `bentangan_wilayah` (`id_bentangan`, `Wilayah`, `Keterangan`, `Luas`) VALUES
(1, 'Desa / Kelurahan Aliran Sungai', '', ''),
(2, 'Desa / Kelurahan Bentaran Sungai', '', ''),
(3, 'Desa / Kelurahan Berbukit-Bukit', '', ''),
(4, 'Desa / Kelurahan Dataran Rendah', '', ''),
(5, 'Desa / Kelurahan Dataran Tinggi / Pegunungan', '', ''),
(6, 'Desa / Kelurahan Kawasan Gambut', '', ''),
(7, 'Desa / Kelurahan Kawasan Rawa', '', ''),
(8, 'Desa / Kelurahan Lereng Gunung', '', ''),
(9, 'Desa / Kelurahan Tepi Pantai / Pesisir', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `id` int(11) NOT NULL,
  `judul` varchar(50) NOT NULL,
  `tgl_update` date NOT NULL,
  `gambar` varchar(50) NOT NULL,
  `isi` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `etnis`
--

CREATE TABLE `etnis` (
  `id_etnis` int(10) UNSIGNED NOT NULL,
  `etnis` int(11) NOT NULL,
  `laki_laki` int(11) NOT NULL,
  `perempuan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jumlah_sdm`
--

CREATE TABLE `jumlah_sdm` (
  `id_sdm` int(11) NOT NULL,
  `sdm` varchar(250) NOT NULL,
  `jumlah_sdm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jumlah_sdm`
--

INSERT INTO `jumlah_sdm` (`id_sdm`, `sdm`, `jumlah_sdm`) VALUES
(1, 'Jumlah laki-laki', 1150),
(2, 'Jumlah perempuan', 1007),
(5, 'Jumlah total', 2),
(6, 'Jumlah kepala keluarga', 507),
(7, 'Kepadatan penduduk', 0);

-- --------------------------------------------------------

--
-- Table structure for table `kewarganegaraan`
--

CREATE TABLE `kewarganegaraan` (
  `id_kewarganegaraan` int(10) UNSIGNED NOT NULL,
  `kewarganegaraan` varchar(250) NOT NULL,
  `laki_laki` int(11) NOT NULL,
  `perempuan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lahan_pertanian`
--

CREATE TABLE `lahan_pertanian` (
  `id_lahan_pertanian` int(10) UNSIGNED NOT NULL,
  `pemilikan_lahan` varchar(250) NOT NULL,
  `jumlah_keluarga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lahan_pertanian`
--

INSERT INTO `lahan_pertanian` (`id_lahan_pertanian`, `pemilikan_lahan`, `jumlah_keluarga`) VALUES
(1, 'Jumlah keluarga yang memilikitanah pertanian', 178),
(2, 'Tidak memiliki ', 57),
(3, 'Memiliki kurang 1 ha', 105),
(4, 'Memiliki 1.0 - 5.0 ha', 16),
(5, 'Memiliki 5.0 - 10 ha', 0),
(6, 'Memiliki lebih dari 10 ha', 0),
(7, 'Jumlah total keluarga petani', 178);

-- --------------------------------------------------------

--
-- Table structure for table `letak_tbl`
--

CREATE TABLE `letak_tbl` (
  `id_ltktopo` int(11) NOT NULL,
  `Wilayah` varchar(50) NOT NULL,
  `Keterangan` varchar(50) NOT NULL,
  `Luas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `letak_tbl`
--

INSERT INTO `letak_tbl` (`id_ltktopo`, `Wilayah`, `Keterangan`, `Luas`) VALUES
(1, 'Desa / Kelurahan  Kawasan Pertokoan / Bisnis', '', ''),
(2, 'Desa / Kelurahan Bebas Banjir', '', ''),
(3, 'Desa / Kelurahan DAS / Bantaran Sungai', '', ''),
(4, 'Desa / Kelurahan Kawasan Campuran ', '', ''),
(5, 'Desa / Kelurahan Kawasan Hutan', '', ''),
(6, 'Desa / Kelurahan Kawasan Industri', '', ''),
(7, 'Desa / Kelurahan Kawasan Perkantoran', '', ''),
(8, 'Desa / Kelurahan Kawasan Wisata', '', ''),
(9, 'Desa / Kelurahan Kepulauan', '', ''),
(10, 'Desa / Kelurahan Pantai / Pesisir', '', ''),
(11, 'Desa / Kelurahan Perbatasan Antar Kecamatan Lain', '', ''),
(12, 'Desa / Kelurahan Perbatasan Dengan Kabupaten Lain', '', ''),
(13, 'Desa / Kelurahan Perbatasan Dengan Negara Lain', '', ''),
(14, 'Desa / Kelurahan Perbatasan Dengan Provinsi Lain', '', ''),
(15, 'Desa / Kelurahan Potensial Tsunami', '', ''),
(16, 'Desa / Kelurahan Rawan Banjir', '', ''),
(17, 'Desa / Kelurahan Rawan Jalur Gempa Bumi', '', ''),
(18, 'Desa / Kelurahan Taman Suaka', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `luaswilayah`
--

CREATE TABLE `luaswilayah` (
  `id_wilayah` int(5) NOT NULL,
  `Wilayah` varchar(50) NOT NULL,
  `Luas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luaswilayah`
--

INSERT INTO `luaswilayah` (`id_wilayah`, `Wilayah`, `Luas`) VALUES
(1, 'Kuburan', ''),
(2, 'Pekarangan', ''),
(3, 'Pemukiman', ''),
(4, 'Perkantoran', ''),
(5, 'Perkebunan', ''),
(6, 'Persawahan', ''),
(7, 'Prasarana Umum Lainnya', ''),
(8, 'Taman', ''),
(9, 'Total', '');

-- --------------------------------------------------------

--
-- Table structure for table `luas_erositanah`
--

CREATE TABLE `luas_erositanah` (
  `id_erosi` int(5) NOT NULL,
  `Tingkat` varchar(50) NOT NULL,
  `Luas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luas_erositanah`
--

INSERT INTO `luas_erositanah` (`id_erosi`, `Tingkat`, `Luas`) VALUES
(1, 'Luas Tanah Erosi Berat', ''),
(2, 'Luas Tanah Erosi RIngan', ''),
(3, 'Luas Tanah Erosi Sedang', ''),
(4, 'Luas Tanah Yang Tidak Ada Erosi ', '');

-- --------------------------------------------------------

--
-- Table structure for table `luas_fasilitasumum`
--

CREATE TABLE `luas_fasilitasumum` (
  `id_fasilitas` int(11) NOT NULL,
  `Tanah` varchar(50) NOT NULL,
  `Luas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luas_fasilitasumum`
--

INSERT INTO `luas_fasilitasumum` (`id_fasilitas`, `Tanah`, `Luas`) VALUES
(1, 'Bangunan Sekolah / Perguruan Tinggi', ''),
(2, 'Daerah Tangkapan Air', ''),
(3, 'Fasilitas Pasar', ''),
(4, 'Jalan', ''),
(5, 'Kebun Desa', ''),
(6, 'Lapangan Olahraga', ''),
(7, 'Perkantoran Pemerintah', ''),
(8, 'Pertokoan', ''),
(9, 'Ruang Publik / Taman Kota', ''),
(10, 'Sawah Desa', ''),
(11, 'Sutet / Aliran Listrik Tegangan Tinggi', ''),
(12, 'Tanah Bengkok', ''),
(13, 'Tanah Titi Sara', ''),
(14, 'Tempat Pemakaman Desa / Umum', ''),
(15, 'Tempat Pembuangan Sampah', ''),
(16, 'Terminal ', ''),
(17, 'Total', ''),
(18, 'Usaha Perikanan', '');

-- --------------------------------------------------------

--
-- Table structure for table `luas_hutan`
--

CREATE TABLE `luas_hutan` (
  `id_hutan` int(11) NOT NULL,
  `Tanah` varchar(30) NOT NULL,
  `Luas` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luas_hutan`
--

INSERT INTO `luas_hutan` (`id_hutan`, `Tanah`, `Luas`) VALUES
(1, 'Hutan Adat', ''),
(2, 'Hutan Asli', ''),
(3, 'Hutan Buatan', ''),
(4, 'Hutan Konservasi', ''),
(5, 'Hutan Lindung', ''),
(6, 'Hutan Mangrove', ''),
(7, 'Hutan Produksi Tetap', ''),
(8, 'Hutan Rakyat', ''),
(9, 'Hutan Sekunder', ''),
(10, 'Hutan Suaka Alam', ''),
(11, 'Hutan Suaka Margasatwa', ''),
(12, 'Hutan Terbatas', ''),
(13, 'Total', '');

-- --------------------------------------------------------

--
-- Table structure for table `luas_jeniskesuburan_tanah`
--

CREATE TABLE `luas_jeniskesuburan_tanah` (
  `id_kesuburan` int(11) NOT NULL,
  `Jenis` varchar(50) NOT NULL,
  `Keterangan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luas_jeniskesuburan_tanah`
--

INSERT INTO `luas_jeniskesuburan_tanah` (`id_kesuburan`, `Jenis`, `Keterangan`) VALUES
(1, 'Lahan Kritis', ''),
(2, 'Lahan Terlantar', ''),
(3, 'Tekstur Tanah', ''),
(4, 'Tingkat Kemiringan Tanah', ''),
(5, 'Warnah Tanah ( sebagian besar )', '');

-- --------------------------------------------------------

--
-- Table structure for table `luas_tanahbasah`
--

CREATE TABLE `luas_tanahbasah` (
  `id_tanahbasah` int(11) NOT NULL,
  `Tanah` varchar(50) NOT NULL,
  `Luas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luas_tanahbasah`
--

INSERT INTO `luas_tanahbasah` (`id_tanahbasah`, `Tanah`, `Luas`) VALUES
(1, 'Lahan Gambut', ''),
(2, 'Pasang / Surut', ''),
(3, 'Situ / Waduk / Danau', ''),
(4, 'Tanah Rawa', ''),
(5, 'Total', '');

-- --------------------------------------------------------

--
-- Table structure for table `luas_tanahkebun`
--

CREATE TABLE `luas_tanahkebun` (
  `id_tnhkebun` int(11) NOT NULL,
  `Tanah` varchar(50) NOT NULL,
  `Luas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luas_tanahkebun`
--

INSERT INTO `luas_tanahkebun` (`id_tnhkebun`, `Tanah`, `Luas`) VALUES
(1, 'Perkebunan Negara', ''),
(2, 'Perkebunan Perorangan', ''),
(3, 'Perkebunan Rakyat', ''),
(4, 'Perkebunan Swasta', ''),
(5, 'Total', '');

-- --------------------------------------------------------

--
-- Table structure for table `luas_tanahkering`
--

CREATE TABLE `luas_tanahkering` (
  `id_tanahkering` int(11) NOT NULL,
  `Tanah` varchar(50) NOT NULL,
  `Luas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luas_tanahkering`
--

INSERT INTO `luas_tanahkering` (`id_tanahkering`, `Tanah`, `Luas`) VALUES
(1, 'Pekarangan', ''),
(2, 'Pemukiman', ''),
(3, 'Tegal / Ladang', ''),
(4, 'Total', '');

-- --------------------------------------------------------

--
-- Table structure for table `luas_tanahsawah`
--

CREATE TABLE `luas_tanahsawah` (
  `id_tanahsawah` int(11) NOT NULL,
  `Tanah` varchar(50) NOT NULL,
  `Luas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luas_tanahsawah`
--

INSERT INTO `luas_tanahsawah` (`id_tanahsawah`, `Tanah`, `Luas`) VALUES
(1, 'Sawah Irigasi 1/2 Teknis', ''),
(2, 'Sawah Irigasi Teknis', ''),
(3, 'Sawah Pasang Surut', ''),
(4, 'Sawah Tadah Hujan', ''),
(5, 'Total', '');

-- --------------------------------------------------------

--
-- Table structure for table `luas_tanaman_pangan`
--

CREATE TABLE `luas_tanaman_pangan` (
  `id_luas_pangan` int(11) UNSIGNED NOT NULL,
  `jenis_tanaman` text NOT NULL,
  `luas_tanah` int(11) NOT NULL,
  `hasil_panen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luas_tanaman_pangan`
--

INSERT INTO `luas_tanaman_pangan` (`id_luas_pangan`, `jenis_tanaman`, `luas_tanah`, `hasil_panen`) VALUES
(1, 'Jagung', 0, 0),
(2, 'Kacang kedelai', 0, 0),
(5, 'Kacang Panjang', 0, 0),
(6, 'Kacang panjang', 0, 0),
(7, 'Kacang mede', 0, 0),
(8, 'Kacang merah', 0, 0),
(9, 'Padi sawah', 0, 0),
(10, 'Padi ladang', 0, 0),
(11, 'Ubi kayu', 0, 0),
(12, 'Ubi jalar', 0, 0),
(13, 'Cabe', 0, 0),
(14, 'Bawang merah', 0, 0),
(15, 'Bawang putih', 0, 0),
(16, 'Tomat', 0, 0),
(17, 'Sawi', 0, 0),
(18, 'Kentang', 0, 0),
(19, 'Kubis', 0, 0),
(20, 'Mentimun', 0, 0),
(21, 'Buncis', 0, 0),
(22, 'Brocoli', 0, 0),
(23, 'Terong', 0, 0),
(24, 'Bayam', 0, 0),
(25, 'Kangkung', 0, 0),
(26, 'Kacang luris', 0, 0),
(27, 'Umbi-umbian lain', 0, 0),
(28, 'Selada', 0, 0),
(29, 'Talas', 0, 0),
(30, 'Wortel', 0, 0),
(31, 'Tumpang sari', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `mata_pencaharian_pokok`
--

CREATE TABLE `mata_pencaharian_pokok` (
  `id_pencaharian` int(11) UNSIGNED NOT NULL,
  `jenis_pekerjaan` varchar(250) NOT NULL,
  `laki_laki` int(11) NOT NULL,
  `perempuan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orbitasi_tbl`
--

CREATE TABLE `orbitasi_tbl` (
  `id_orbitasi` int(11) NOT NULL,
  `Orbitasi` varchar(70) NOT NULL,
  `Keterangan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orbitasi_tbl`
--

INSERT INTO `orbitasi_tbl` (`id_orbitasi`, `Orbitasi`, `Keterangan`) VALUES
(1, 'Jarak Ke Ibu Kota Kabupaten / Kota', ''),
(2, 'Jarak Ke Ibu Kota Kecamatan', ''),
(3, 'Jarak Ke Ibu Kota Provinsi', ''),
(4, 'Kendaraan Umum Ke Ibu Kota Kabupaten / Kota', ''),
(5, 'Kendaraan Umum Ke Ibu Kota Kecamatan', ''),
(6, 'Kendaraan Umum Ke Ibu Kota Provinsi', ''),
(7, 'Lama Jarak Tempuh Ke Ibu Kota Kabupaten Dengan Berjalan Kaki atau Kend', ''),
(8, 'Lama Jarak Tempuh Ke Ibu Kota Kabupaten Dengan Kendaraan Bermotor', ''),
(9, 'Lama Jarak Tempuh Ke Ibu Kota Kecamatan Dengan Berjalan Kaki atau Kend', ''),
(10, 'Lama Jarak Tempuh Ke Ibu Kota Kecamatan Dengan Kendaraan Bermotor', ''),
(11, 'Lama Jarak Tempuh Ke Ibu Kota Provinsi Dengan Berjalan Kaki atau Kenda', ''),
(12, 'Lama Jarak Tempuh Ke Ibu Kota Provinsi Dengan Kendaraan Bermotor', '');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `id` int(11) NOT NULL,
  `nip` varchar(25) NOT NULL,
  `jabatan` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pendidikan`
--

CREATE TABLE `pendidikan` (
  `id_pendidikan` int(10) UNSIGNED NOT NULL,
  `tingkat_pendidikan` varchar(250) NOT NULL,
  `laki_laki` int(11) NOT NULL,
  `perempuan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `penetapan_btspeta_wilayah`
--

CREATE TABLE `penetapan_btspeta_wilayah` (
  `id_btspeta` int(11) NOT NULL,
  `Penetapan Batas` varchar(50) NOT NULL,
  `Dasar Hukum` text NOT NULL,
  `Peta Wilayah` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lklim`
--

CREATE TABLE `tbl_lklim` (
  `id_iklim` int(11) NOT NULL,
  `Iklim` varchar(50) NOT NULL,
  `Ukuran` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_lklim`
--

INSERT INTO `tbl_lklim` (`id_iklim`, `Iklim`, `Ukuran`) VALUES
(1, 'Curah Hujan', ''),
(2, 'Jumlah Bulan Hujan', ''),
(3, 'Kelembapan', ''),
(4, 'Suhu Rata-Rata Harian', ''),
(5, 'Tinggi Tempat Dari Permukaan Laut', '');

-- --------------------------------------------------------

--
-- Table structure for table `usia_sdm`
--

CREATE TABLE `usia_sdm` (
  `id_usia` int(10) UNSIGNED NOT NULL,
  `usia` varchar(250) NOT NULL,
  `laki_laki` int(11) NOT NULL,
  `perempuan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bataswilayah`
--
ALTER TABLE `bataswilayah`
  ADD PRIMARY KEY (`id_bts`);

--
-- Indexes for table `bentangan_wilayah`
--
ALTER TABLE `bentangan_wilayah`
  ADD PRIMARY KEY (`id_bentangan`);

--
-- Indexes for table `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `etnis`
--
ALTER TABLE `etnis`
  ADD PRIMARY KEY (`id_etnis`);

--
-- Indexes for table `jumlah_sdm`
--
ALTER TABLE `jumlah_sdm`
  ADD PRIMARY KEY (`id_sdm`);

--
-- Indexes for table `kewarganegaraan`
--
ALTER TABLE `kewarganegaraan`
  ADD PRIMARY KEY (`id_kewarganegaraan`);

--
-- Indexes for table `lahan_pertanian`
--
ALTER TABLE `lahan_pertanian`
  ADD PRIMARY KEY (`id_lahan_pertanian`);

--
-- Indexes for table `letak_tbl`
--
ALTER TABLE `letak_tbl`
  ADD PRIMARY KEY (`id_ltktopo`);

--
-- Indexes for table `luaswilayah`
--
ALTER TABLE `luaswilayah`
  ADD PRIMARY KEY (`id_wilayah`);

--
-- Indexes for table `luas_erositanah`
--
ALTER TABLE `luas_erositanah`
  ADD PRIMARY KEY (`id_erosi`);

--
-- Indexes for table `luas_fasilitasumum`
--
ALTER TABLE `luas_fasilitasumum`
  ADD PRIMARY KEY (`id_fasilitas`);

--
-- Indexes for table `luas_hutan`
--
ALTER TABLE `luas_hutan`
  ADD PRIMARY KEY (`id_hutan`);

--
-- Indexes for table `luas_jeniskesuburan_tanah`
--
ALTER TABLE `luas_jeniskesuburan_tanah`
  ADD PRIMARY KEY (`id_kesuburan`);

--
-- Indexes for table `luas_tanahbasah`
--
ALTER TABLE `luas_tanahbasah`
  ADD PRIMARY KEY (`id_tanahbasah`);

--
-- Indexes for table `luas_tanahkebun`
--
ALTER TABLE `luas_tanahkebun`
  ADD PRIMARY KEY (`id_tnhkebun`);

--
-- Indexes for table `luas_tanahkering`
--
ALTER TABLE `luas_tanahkering`
  ADD PRIMARY KEY (`id_tanahkering`);

--
-- Indexes for table `luas_tanahsawah`
--
ALTER TABLE `luas_tanahsawah`
  ADD PRIMARY KEY (`id_tanahsawah`);

--
-- Indexes for table `luas_tanaman_pangan`
--
ALTER TABLE `luas_tanaman_pangan`
  ADD PRIMARY KEY (`id_luas_pangan`);

--
-- Indexes for table `mata_pencaharian_pokok`
--
ALTER TABLE `mata_pencaharian_pokok`
  ADD PRIMARY KEY (`id_pencaharian`);

--
-- Indexes for table `orbitasi_tbl`
--
ALTER TABLE `orbitasi_tbl`
  ADD PRIMARY KEY (`id_orbitasi`);

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pendidikan`
--
ALTER TABLE `pendidikan`
  ADD PRIMARY KEY (`id_pendidikan`);

--
-- Indexes for table `penetapan_btspeta_wilayah`
--
ALTER TABLE `penetapan_btspeta_wilayah`
  ADD PRIMARY KEY (`id_btspeta`);

--
-- Indexes for table `tbl_lklim`
--
ALTER TABLE `tbl_lklim`
  ADD PRIMARY KEY (`id_iklim`);

--
-- Indexes for table `usia_sdm`
--
ALTER TABLE `usia_sdm`
  ADD PRIMARY KEY (`id_usia`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bataswilayah`
--
ALTER TABLE `bataswilayah`
  MODIFY `id_bts` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bentangan_wilayah`
--
ALTER TABLE `bentangan_wilayah`
  MODIFY `id_bentangan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `berita`
--
ALTER TABLE `berita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `etnis`
--
ALTER TABLE `etnis`
  MODIFY `id_etnis` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jumlah_sdm`
--
ALTER TABLE `jumlah_sdm`
  MODIFY `id_sdm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kewarganegaraan`
--
ALTER TABLE `kewarganegaraan`
  MODIFY `id_kewarganegaraan` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lahan_pertanian`
--
ALTER TABLE `lahan_pertanian`
  MODIFY `id_lahan_pertanian` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `letak_tbl`
--
ALTER TABLE `letak_tbl`
  MODIFY `id_ltktopo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `luaswilayah`
--
ALTER TABLE `luaswilayah`
  MODIFY `id_wilayah` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `luas_erositanah`
--
ALTER TABLE `luas_erositanah`
  MODIFY `id_erosi` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `luas_fasilitasumum`
--
ALTER TABLE `luas_fasilitasumum`
  MODIFY `id_fasilitas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `luas_hutan`
--
ALTER TABLE `luas_hutan`
  MODIFY `id_hutan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `luas_jeniskesuburan_tanah`
--
ALTER TABLE `luas_jeniskesuburan_tanah`
  MODIFY `id_kesuburan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `luas_tanahbasah`
--
ALTER TABLE `luas_tanahbasah`
  MODIFY `id_tanahbasah` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `luas_tanahkebun`
--
ALTER TABLE `luas_tanahkebun`
  MODIFY `id_tnhkebun` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `luas_tanahkering`
--
ALTER TABLE `luas_tanahkering`
  MODIFY `id_tanahkering` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `luas_tanahsawah`
--
ALTER TABLE `luas_tanahsawah`
  MODIFY `id_tanahsawah` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `luas_tanaman_pangan`
--
ALTER TABLE `luas_tanaman_pangan`
  MODIFY `id_luas_pangan` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `mata_pencaharian_pokok`
--
ALTER TABLE `mata_pencaharian_pokok`
  MODIFY `id_pencaharian` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orbitasi_tbl`
--
ALTER TABLE `orbitasi_tbl`
  MODIFY `id_orbitasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `pegawai`
--
ALTER TABLE `pegawai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pendidikan`
--
ALTER TABLE `pendidikan`
  MODIFY `id_pendidikan` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `penetapan_btspeta_wilayah`
--
ALTER TABLE `penetapan_btspeta_wilayah`
  MODIFY `id_btspeta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_lklim`
--
ALTER TABLE `tbl_lklim`
  MODIFY `id_iklim` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usia_sdm`
--
ALTER TABLE `usia_sdm`
  MODIFY `id_usia` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
