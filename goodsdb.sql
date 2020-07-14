-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июл 14 2020 г., 21:19
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `goodsdb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `goods`
--

CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `goods`
--

INSERT INTO `goods` (`id`, `category`, `name`, `description`, `price`) VALUES
(1, 'Материалы', 'Доски', 'Дубовые доски очень хороши', 12),
(2, 'Двери', 'Дубовые двери', 'Отличного качества дубовые двери никого не оставят равнодушным', 8),
(5, 'Двери', 'Железная Дверь', 'Железная дверь прочнее деревянной.', 39),
(6, 'Материалы', 'Кирпичи', 'Обычный кирпич', 3),
(10, 'Материалы', 'Сайдинг', 'Хороший пластиковый сайдинг', 2),
(11, 'Материал', 'Цемент', 'Хороший цемент', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `goods_orders`
--

CREATE TABLE `goods_orders` (
  `id` int(11) NOT NULL,
  `mail` text NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `register_date` date NOT NULL,
  `approved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `goods_orders`
--

INSERT INTO `goods_orders` (`id`, `mail`, `data`, `register_date`, `approved`) VALUES
(188903381, 'van000200136@gmail.com', '[{\"id\":\"1\",\"count\":26},{\"id\":\"2\",\"count\":\"6\"}]', '2020-04-15', 1),
(268658932, 'van000200136@gmail.com', '[{\"id\":\"5\",\"count\":\"3\"},{\"id\":\"1\",\"count\":\"7\"},{\"id\":\"4\",\"count\":\"60\"}]', '2020-04-16', 0),
(274125356, 'van000200136@gmail.com', '[{\"id\":\"1\",\"count\":10},{\"id\":\"2\",\"count\":1}]', '2020-04-17', 1),
(294913838, '', '[{\"id\":\"2\",\"count\":\"1\"},{\"id\":\"5\",\"count\":\"1\"}]', '2020-04-14', 1),
(400166325, '', '[{\"id\":\"4\",\"count\":\"5\"},{\"id\":\"6\",\"count\":\"5\"}]', '2020-04-14', 1),
(481959311, '', '[{\"id\":\"1\",\"count\":\"5\"}]', '2020-04-14', 1),
(511832540, 'van000200136@gmail.com', '[{\"id\":\"2\",\"count\":9}]', '2020-04-17', 1),
(577023215, 'van000200136@gmail.com', '[{\"id\":\"2\",\"count\":\"1\"}]', '2020-04-16', 1),
(983701329, 'van000200136@gmail.com', '[{\"id\":\"1\",\"count\":\"7\"},{\"id\":\"4\",\"count\":67},{\"id\":\"5\",\"count\":\"3\"}]', '2020-04-16', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `goods_orders`
--
ALTER TABLE `goods_orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
