-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2021 a las 06:04:44
-- Versión del servidor: 10.6.0-MariaDB
-- Versión de PHP: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `username`, `full_name`, `email`, `phone_number`, `address`, `password`, `is_admin`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'System admin', 'admin@email.com', '+5491198765432', 'Los Patos 2556, CABA', 'Password1', 1, '2021-05-30 16:18:11', '2021-05-30 16:18:11'),
(2, 'billyjoel', 'Billy Joel', 'ididntstartthefire@email.com', '+5491198765435', 'Ohm 2225, CABA', 'Password2', 0, '2021-05-30 16:29:56', '2021-05-30 16:29:56'),
(3, 'bdylan', 'Bob Dylan', 'thebobdylan@email.com', '+5491198765434', 'Cachi 725, CABA', 'Password3', 0, '2021-05-30 16:26:09', '2021-05-30 16:26:09'),
(4, 'queen_freddie', 'Freddie Mercury', 'freddielovescats@email.com', '+5491198765433', 'Saraza 620, CABA', 'Password4', 0, '2021-05-30 16:23:46', '2021-05-30 16:23:46'),
(5, 'jonimit', 'Joni Mitchell', 'acaseofyou@email.com', '+5491198765436', 'Lavadero 250, CABA', 'Password5', 0, '2021-05-30 16:38:09', '2021-05-30 16:38:09'),
(6, 'doloreso', 'Dolores ORiordan', 'letitlinger@email.com', '+5491198765437', 'Muñecas 1212, CABA', 'Password6', 0, '2021-05-30 16:44:28', '2021-05-30 16:44:28'),
(7, 'typicaltina', 'Tyna Turner', 'simplythebesttina@email.com', '+5491198765437', 'Dragones 1895, CABA', 'Password7', 0, '2021-05-30 16:49:17', '2021-05-30 16:49:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `ingredients` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `is_disabled` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `image`, `ingredients`, `price`, `is_disabled`, `created_at`, `updated_at`) VALUES
(1, 'Tacos al pastor', 'Delicioso taco de carne de cerdo y ternera marinada, vegetales y condimentos, acompañado de una deliciosa salsa picante', 'http://food.com/tacos.jpg', 'carne de cerdo y ternera, chile picante, ajo, cebolla, cilantro, sal, piña, tortilla de maíz', '350', 0, '2021-05-30 16:56:19', '2021-05-30 16:56:19'),
(2, 'Arepa reina Pepiada', 'Deliciosa arepa al estilo venezolano, con relleno a base de pollo y palta', 'http://food.com/arepa.jpg', 'harina de maíz blanco, carne de pollo, palta, ajo, cebolla, jugo de limón, sal, pimienta, aceite de oliva', '319', 0, '2021-05-30 17:01:51', '2021-05-30 17:01:51'),
(3, 'Tamal', 'Tradicional tamal de harina de maíz relleno con carne adobada, vegetales y salsa, envuelto en chalas de maíz', 'http://food.com/tamal.jpg', 'harina de maíz, carne de ternera, ajo, cebolla, zanahorias, caldo de verduras, sal, pimienta, pimentón, aceite de maíz', '299', 0, '2021-05-30 17:06:16', '2021-05-30 17:06:16'),
(4, 'Volcán de chocolate', 'Decadente volcán de chocolate con centro de chocolate derretido', 'http://food.com/imagendevolcandechocolate.jpg', 'chocolate amargo, cacao amargo en polvo, manteca, azúcar, huevos, harina', '249', 0, '2021-05-30 17:09:48', '2021-05-30 17:09:48'),
(5, 'Panqueque de banana con dulce de leche', 'Tibio panqueque de banana bañado en dulce de leche', 'http://food.com/panqueque.jpg', 'harina de trigo, leche, huevos, manteca, azúcar, banana, dulce de leche', '249', 0, '2021-05-30 17:13:06', '2021-05-30 17:13:06'),
(6, 'Flan con dulce de leche', 'Tradicional flan casero acompañado con dulce de leche', 'http://food.com/flan.jpg', 'huevos, leche, azúcar, esencia de vainilla, dulce de leche', '229', 1, '2021-05-30 17:14:46', '2021-05-30 17:14:46'),
(7, 'Locro', 'Tradicional guiso a base de maíz blanco, vegetales, carne de ternera y de cerdo, garbanzos y porotos blancos. Acompañado con salsa ahumada picante', 'http://food.com/locro.jpg', 'maíz blanco, carne de ternera y de cerdo, zapallo, cebolla de verdeo, garbanzos, porotos blancos, ají molido, pimentón, sal', '349', 0, '2021-06-02 20:25:45', '2021-06-02 20:25:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_users`
--

CREATE TABLE IF NOT EXISTS `products_users` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `products_users`
--

INSERT INTO `products_users` (`id`, `created_at`, `updated_at`, `user_id`, `product_id`) VALUES
(1, '2021-06-04 04:52:07', '2021-06-04 04:52:07', 2, 5),
(2, '2021-06-04 04:52:36', '2021-06-04 04:52:36', 2, 7),
(3, '2021-06-04 04:53:09', '2021-06-04 04:53:09', 6, 1),
(4, '2021-06-04 04:53:16', '2021-06-04 04:53:16', 6, 3),
(5, '2021-06-04 04:53:22', '2021-06-04 04:53:22', 3, 2),
(6, '2021-06-04 04:53:29', '2021-06-04 04:53:29', 5, 4),
(7, '2021-06-04 04:55:54', '2021-06-04 04:55:54', 7, 1),
(8, '2021-06-04 04:56:03', '2021-06-04 04:56:03', 7, 7),
(9, '2021-06-04 04:56:10', '2021-06-04 04:56:10', 7, 2),
(10, '2021-06-04 04:58:15', '2021-06-04 04:58:15', 5, 6),
(11, '2021-06-04 04:58:37', '2021-06-04 04:58:37', 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL,
  `status` enum('new','confirmed','preparing','on its way','cancelled','delivered') NOT NULL DEFAULT 'new',
  `payment_method` enum('cash','card') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`order_id`, `status`, `payment_method`, `created_at`, `updated_at`, `user_id`) VALUES
(1, 'new', 'card', '2021-06-04 03:02:54', '2021-06-04 03:02:54', 3),
(2, 'new', 'cash', '2021-06-04 03:03:38', '2021-06-04 03:03:38', 5),
(3, 'new', 'card', '2021-06-04 03:04:37', '2021-06-04 03:04:37', 7),
(4, 'new', 'cash', '2021-06-04 03:04:47', '2021-06-04 03:04:47', 7),
(5, 'new', 'cash', '2021-06-04 03:11:47', '2021-06-04 03:11:47', 7),
(6, 'new', 'card', '2021-06-05 03:58:14', '2021-06-05 03:58:14', 6),
(7, 'new', 'cash', '2021-06-05 04:00:09', '2021-06-05 04:00:09', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_products`
--

CREATE TABLE IF NOT EXISTS `orders_products` (
  `id` int(11) NOT NULL,
  `product_qty` int(11) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `orders_products`
--

INSERT INTO `orders_products` (`id`, `product_qty`, `created_at`, `updated_at`, `product_id`, `order_id`) VALUES
(1, 2, '2021-06-04 03:02:54', '2021-06-04 03:02:54', 5, 1),
(2, 1, '2021-06-04 03:02:54', '2021-06-04 03:02:54', 3, 1),
(3, 2, '2021-06-04 03:02:54', '2021-06-04 03:02:54', 2, 1),
(4, 1, '2021-06-04 03:02:54', '2021-06-04 03:02:54', 1, 1),
(5, 2, '2021-06-04 03:03:38', '2021-06-04 03:03:38', 5, 2),
(6, 1, '2021-06-04 03:03:38', '2021-06-04 03:03:38', 3, 2),
(7, 1, '2021-06-04 03:03:38', '2021-06-04 03:03:38', 1, 2),
(8, 2, '2021-06-04 03:03:38', '2021-06-04 03:03:38', 2, 2),
(9, 4, '2021-06-04 03:04:37', '2021-06-04 03:04:37', 2, 3),
(10, 5, '2021-06-04 03:04:37', '2021-06-04 03:04:37', 3, 3),
(12, 4, '2021-06-04 03:04:47', '2021-06-04 03:04:47', 2, 4),
(13, 5, '2021-06-04 03:04:47', '2021-06-04 03:04:47', 3, 4),
(14, 1, '2021-06-04 03:04:47', '2021-06-04 03:04:47', 5, 4),
(15, 1, '2021-06-04 03:11:47', '2021-06-04 03:11:47', 5, 5),
(16, 1, '2021-06-04 03:11:47', '2021-06-04 03:11:47', 7, 5),
(17, 3, '2021-06-05 03:58:15', '2021-06-05 03:58:15', 3, 6),
(18, 6, '2021-06-05 03:58:15', '2021-06-05 03:58:15', 2, 6),
(19, 1, '2021-06-05 03:58:15', '2021-06-05 03:58:15', 4, 6),
(20, 4, '2021-06-05 04:00:09', '2021-06-05 04:00:09', 1, 7);

-- --------------------------------------------------------