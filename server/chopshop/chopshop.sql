  
-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2018 at 11:29 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `osrp_chopshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `veh_chopshop`
--

CREATE TABLE `veh_chopshop` 
(
    `id` int(11) NOT NULL,
    `posX` float NOT NULL DEFAULT '0',
    `posY` float NOT NULL DEFAULT '0',
    `posZ` float NOT NULL DEFAULT '0',
    `shutdown` int(11) NOT NULL DEFAULT '0',
    `totalcars` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `veh_chopshop`
--
ALTER TABLE `veh_chopshop`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `veh_chopshop`
--
ALTER TABLE `veh_chopshop`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;