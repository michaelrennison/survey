-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2020 at 03:30 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `survey`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `value` float(4,2) NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `title`, `value`, `question_id`) VALUES
(1, 'Daily', 1.00, 1),
(2, '1 or 2 times', 2.00, 1),
(3, '3+ times per week', 3.00, 1),
(4, 'not at all', 4.00, 1),
(5, 'Smaller than average', 1.00, 2),
(6, 'Average', 2.00, 2),
(7, 'Larger than average', 3.00, 2),
(8, 'I\'m not sure', 4.00, 2),
(9, '1-5 plates per week', 1.00, 3),
(10, '6-10 plates per week', 2.00, 3),
(11, 'More than 10 plates per week', 3.00, 3),
(12, 'None', 4.00, 3),
(13, 'Daily', 1.00, 4),
(14, '3+ times per week', 3.00, 4),
(15, '1 or 2 times', 2.00, 4),
(16, 'Not at all', 4.00, 4),
(17, 'Answer 1', 1.00, 5),
(18, 'Answer 2', 2.00, 5),
(19, 'Answer 1', 1.00, 6),
(20, 'Answer 2', 2.00, 6),
(21, 'Answer 1', 1.00, 7),
(22, 'Answer 2', 2.00, 7),
(23, 'Answer 1', 1.00, 8),
(24, 'Answer 2', 2.00, 8),
(25, 'Answer 1', 1.00, 9),
(26, 'Answer 2', 2.00, 9);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `theme_colour` varchar(255) NOT NULL,
  `average` float(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `theme_colour`, `average`) VALUES
(1, 'Diet', '#ec5569', 2.23),
(2, 'Home', '#7FDBFF', 3.92),
(3, 'Travel', '#3D9970', 7.64),
(4, 'Other', '#85144b', 8.22);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `title`, `category_id`) VALUES
(1, 'How often do you eat meat and dairy?', 1),
(2, 'How big are your portions sizes?', 1),
(3, 'How much food ends up wasted in your household?', 1),
(4, 'How often do you eat avocados, asparagus, kiwi fruit or pineapples?', 1),
(5, 'Question 1', 2),
(6, 'Question 2', 2),
(7, 'Question 1', 3),
(8, 'Question 1', 4),
(9, 'Question 2', 4);

-- --------------------------------------------------------

--
-- Table structure for table `site_options`
--

CREATE TABLE `site_options` (
  `id` int(11) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `site_options`
--

INSERT INTO `site_options` (`id`, `key`, `value`) VALUES
(1, 'home_title', 'Calculate your personal score'),
(2, 'home_description', 'Next we have a short 2-3 minute survey covering Diet, Home, Travel and Other that will let us calculate your personal carbon footprint'),
(3, 'home_button_text', 'Take the survey'),
(4, 'thanks_title', 'All done!'),
(5, 'thanks_description', 'Thank you for completing the survey');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `site_options`
--
ALTER TABLE `site_options`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `site_options`
--
ALTER TABLE `site_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
