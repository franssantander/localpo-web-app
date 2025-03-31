-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2025 at 12:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `localpo`
--

-- --------------------------------------------------------

--
-- Table structure for table `applied_jobs`
--

CREATE TABLE `applied_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `posted_job_id` bigint(20) UNSIGNED NOT NULL,
  `company_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `cover_letter` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `availability_time_1` varchar(255) DEFAULT NULL,
  `availability_time_2` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Under Review',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applied_jobs`
--

INSERT INTO `applied_jobs` (`id`, `posted_job_id`, `company_id`, `user_id`, `resume`, `cover_letter`, `contact_number`, `availability_time_1`, `availability_time_2`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(2, 2, 1, 11, 'resumes/1741092686_Testresume.docx', 'cover_letters/1741092686_test cover letter.docx', '9354345654', '1:00 - 2:00 PM', '8:00 - 9:00 AM', 'Under Review', NULL, '2025-03-05 04:51:26', '2025-03-04 04:51:26'),
(4, 1, 1, 21, 'resumes/1742820510_Francis Beam Santander - Resume view.pdf', NULL, NULL, '11:00 AM - 12:00 PM', '11:00 AM - 12:00 PM', 'Under Review', '2025-03-24 05:11:07', '2025-03-24 04:48:30', '2025-03-24 05:11:07'),
(5, 1, 1, 21, 'resumes/1742821898_Francis Beam Santander - Resume view.pdf', NULL, NULL, '11:00 AM - 12:00 PM', '1:00 PM - 2:00 PM', 'Under Review', NULL, '2025-03-24 05:11:38', '2025-03-24 05:11:38');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_profile` varchar(255) DEFAULT NULL,
  `industry_type` varchar(255) NOT NULL,
  `company_description` text DEFAULT NULL,
  `company_address` varchar(255) NOT NULL,
  `company_phone` varchar(255) NOT NULL,
  `company_email` varchar(255) NOT NULL,
  `company_website` varchar(255) DEFAULT NULL,
  `year_establish` year(4) DEFAULT NULL,
  `company_socialmed` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`company_socialmed`)),
  `registration_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `company_name`, `company_profile`, `industry_type`, `company_description`, `company_address`, `company_phone`, `company_email`, `company_website`, `year_establish`, `company_socialmed`, `registration_number`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ABC Tech', 'company_profiles/i3V6nqpQJqki0OtTWB1uXIOwnFuIGjSLe35C21yK.jpg', 'Information Technology', 'ABC Corp is a global leader in software solutions focusing on AI-driven innovation.', '123 Tech Avenue, Makati, Metro Manila', '9354817636', 'contact@abcd.com', 'https://www.abc.com', '2024', '[]', 'PH-2025-434351', '2025-01-31 03:50:33', '2025-01-31 03:50:33', NULL),
(3, 'DEFD Tech', 'company_profiles/i3V6nqpQJqki0OtTWB1uXIOwnFuIGjSLe35C21yK.jpg', 'Information Technology', 'ABC Corp is a global leader in software solutions focusing on AI-driven innovation.', '123 Tech Avenue, Makati, Metro Manila', '9354817123', 'contact@egfh.com', 'https://www.abc.com', '2024', '[]', 'PH-2025-434351', '2025-01-31 03:50:33', '2025-01-31 03:50:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_resets_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2025_01_01_000000_create_roles_table', 1),
(5, '2025_01_01_000001_create_companies_table', 1),
(6, '2025_01_01_000002_create_permission_per_role_table', 1),
(7, '2025_01_01_000002_create_users_table', 1),
(8, '2025_01_18_000003_create_posted_jobs_table', 1),
(10, '2025_02_15_031217_create_saved_jobs_table', 2),
(16, '2025_02_24_231629_create_applied_jobs_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_per_role`
--

CREATE TABLE `permission_per_role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `path` varchar(255) NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `component` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `table` longtext DEFAULT NULL,
  `create` tinyint(1) NOT NULL,
  `retrieve` tinyint(1) NOT NULL,
  `update` tinyint(1) NOT NULL,
  `delete` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_per_role`
--

INSERT INTO `permission_per_role` (`id`, `role_id`, `title`, `path`, `key`, `component`, `icon`, `table`, `create`, `retrieve`, `update`, `delete`, `created_at`, `updated_at`) VALUES
(1, 1, 'Dashboard', 'dashboard', '/app-dashboard/get-all-postedjob', 'Dashboard', 'mdi:view-grid-plus-outline', NULL, 0, 1, 0, 0, NULL, NULL),
(2, 1, 'Jobs Management', 'jobs-management', '/app-jobsmanagement/get-all-jobsmanagement', 'JobsManagement', 'mdi:briefcase-outline', '[\n    {\n        \"job_title\": \"Job Title\",\n        \"applications\": \"Applications\",\n        \"status\": \"Status\",\n        \"date_posted\": \"Date Posted\",\n        \"last_updated\": \"Last Updated\",\n        \"actions\": \"\"\n    }\n]', 1, 1, 1, 1, NULL, NULL),
(3, 1, 'Applications', 'applications', '/app-applicationsmanagement/get-all-applications', 'Applications', 'mdi:clipboard-text-multiple-outline', '[\n  {\n    \"applicant_name\": \"Applicant Name\",\n    \"job_applied\": \"Job Applied\",\n    \"status\": \"Status\",\n    \"date_applied\": \"Date Applied\",\n    \"actions\": \"\"\n  }\n]', 1, 1, 1, 1, NULL, NULL),
(4, 1, 'Analytics and Reports', 'analytics-reports', NULL, 'AnalyticsReports', 'mdi:chart-box-outline', NULL, 0, 1, 0, 0, NULL, NULL),
(5, 1, 'Users Management', 'users-management', '/app-usersmanagement/get-all-users', 'UsersManagement', 'mdi:shield-user-outline', '[{\n    \"employment_id\": \"Employment ID\", \n    \"profile_picture\": \"\",\n    \"name\": \"Full Name\", \n    \"department\": \"Department\", \n    \"role\": \"Role\", \n    \"status\": \"Status\", \n    \"created_at\": \"Date Registered\", \n    \"actions\": \"\"\n    }]', 1, 1, 1, 1, NULL, NULL),
(6, 1, 'Schedule Interview', 'schedule-interview', NULL, 'ScheduleInterview', 'mdi:calendar-account-outline', NULL, 0, 1, 1, 0, NULL, NULL),
(7, 1, NULL, 'post-job', NULL, 'PostJob', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(8, 1, NULL, 'dashboard/:id', NULL, 'PostedJob', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(9, 1, NULL, 'dashboard/:id/edit-job', NULL, 'PostJob', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(10, 1, NULL, 'jobs-management/:job_title/:id/view-job', NULL, 'JobsManagementView', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(11, 1, NULL, 'jobs-management/:job_title/:id/view-job/edit-job', NULL, 'PostJob', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(12, 1, NULL, 'jobs-management/:job_title/:id/edit-job', NULL, 'PostJob', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(13, 1, NULL, 'users-management/:employment_id/view', NULL, 'UsersManagementView', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(14, 1, NULL, 'users-management/:employment_id/edit', NULL, 'UsersManagementEdit', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(15, 2, 'Find Jobs', 'find-jobs', NULL, 'MainFindJobs', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(16, 2, 'Saved Jobs', 'saved-jobs', NULL, 'SavedJobs', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(17, 2, 'Job Applications', 'job-applications', NULL, 'JobApplications', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(18, 2, NULL, 'apply-job/:id', NULL, 'ApplyForm', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(19, 2, NULL, 'view-application/:id', NULL, 'ApplicationDetails', NULL, NULL, 0, 1, 1, 0, NULL, NULL),
(20, 1, NULL, 'applications/:id', NULL, 'ApplicationView', NULL, NULL, 0, 1, 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posted_jobs`
--

CREATE TABLE `posted_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `background_img` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) NOT NULL,
  `job_description` longtext NOT NULL,
  `type` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`type`)),
  `location` varchar(255) NOT NULL,
  `salary_range` varchar(255) DEFAULT NULL,
  `experience_level` varchar(255) DEFAULT NULL,
  `job_function` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`job_function`)),
  `industry` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`industry`)),
  `job_expiry` date DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posted_jobs`
--

INSERT INTO `posted_jobs` (`id`, `company_id`, `user_id`, `background_img`, `job_title`, `job_description`, `type`, `location`, `salary_range`, `experience_level`, `job_function`, `industry`, `job_expiry`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 'background_images/wTRvncco4RZIktMTmKOspGaX1YFSa1OMhNhMY37d.jpg', 'Software Engineer', '<h1><strong>Job Description 1</strong></h1><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.\"<br> <br><strong>Job Description 2</strong></p><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.\"</p>', '[\"Full-time\", \"On-site\"]', 'BGC, Manila', '10000-20000', '3-5 Years experience', '[\"IT\"]', '[\"Technology\"]', '2025-02-24', 'Active', '2025-02-01 05:09:31', '2025-03-25 05:36:31', NULL),
(2, 1, 1, 'background_images/DYAp30iZpn3loAEoHvGHt87MWi7N72uTeflY9Pu2.jpg', 'UIUX Designer', '<h1><strong>Job Description</strong></h1><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.</p><p></p>', '[\"Full-time\", \"On-site\"]', 'Pasig City - Manila', '10000-20000', '1-3 Years experience', '[\"IT\"]', '[\"Technology\"]', '2025-02-24', 'Active', '2025-02-02 01:10:56', '2025-02-02 01:10:56', NULL),
(3, 1, 1, 'background_images/IGtQsaYK2cTscxo4QD7Z9A8zVN3BmCAznaryPNkF.jpg', 'Call Center', '<h1><strong>Job Description</strong></h1><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.<br><br><strong>Job Description</strong></p><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.</p>', '[\"Hybrid\", \"Agency\"]', 'BGC - Manila', '10000-20000', '3-5 Years experience', '[\"Customer Service\"]', '[\"Call Center\"]', '2025-02-24', 'Active', '2025-02-02 01:18:01', '2025-02-02 01:18:01', NULL),
(4, 1, 1, 'background_images/vwavGzGQDwyu1MH58D1NpOIwYSV8cSu11zGzHACY.jpg', 'Java Developer', '<h1><strong>Job Description</strong></h1><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position</p>', '[\"Full-time\"]', 'Manila', '999999-91111', '3-5 Years experience', '[\"IT\"]', '[\"Technology\"]', '2025-02-25', 'Active', '2025-02-02 01:19:59', '2025-02-02 01:19:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_type`, `created_at`, `updated_at`) VALUES
(1, 'HR Manager', NULL, NULL),
(2, 'Job Seeker', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `saved_jobs`
--

CREATE TABLE `saved_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `posted_job_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `saved_jobs`
--

INSERT INTO `saved_jobs` (`id`, `posted_job_id`, `user_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
(8, 2, 11, '2025-02-17 04:55:25', '2025-02-15 17:37:13', '2025-02-17 04:55:25'),
(10, 1, 11, '2025-02-17 03:50:28', '2025-02-15 18:24:51', '2025-02-17 03:50:28'),
(11, 1, 11, '2025-02-17 04:51:26', '2025-02-17 03:52:27', '2025-02-17 04:51:26'),
(12, 1, 11, '2025-02-17 04:52:17', '2025-02-17 04:51:37', '2025-02-17 04:52:17'),
(13, 1, 11, '2025-02-17 04:53:35', '2025-02-17 04:52:35', '2025-02-17 04:53:35'),
(14, 1, 11, '2025-02-17 04:54:49', '2025-02-17 04:54:35', '2025-02-17 04:54:49'),
(15, 1, 11, '2025-02-17 04:55:40', '2025-02-17 04:54:54', '2025-02-17 04:55:40'),
(16, 2, 11, '2025-02-17 04:56:55', '2025-02-17 04:55:45', '2025-02-17 04:56:55'),
(17, 1, 11, '2025-02-17 05:00:53', '2025-02-17 04:56:51', '2025-02-17 05:00:53'),
(18, 2, 11, '2025-02-18 03:07:27', '2025-02-17 05:01:04', '2025-02-18 03:07:27'),
(19, 1, 11, '2025-02-18 03:06:34', '2025-02-18 03:04:23', '2025-02-18 03:06:34'),
(20, 1, 11, '2025-02-18 03:08:09', '2025-02-18 03:07:41', '2025-02-18 03:08:09'),
(21, 1, 11, '2025-02-18 03:09:14', '2025-02-18 03:09:06', '2025-02-18 03:09:14'),
(22, 1, 11, '2025-02-18 03:29:45', '2025-02-18 03:26:03', '2025-02-18 03:29:45'),
(23, 2, 11, '2025-02-18 03:30:57', '2025-02-18 03:26:18', '2025-02-18 03:30:57'),
(24, 1, 11, '2025-02-18 03:31:31', '2025-02-18 03:30:48', '2025-02-18 03:31:31'),
(25, 1, 11, '2025-02-18 03:35:33', '2025-02-18 03:31:37', '2025-02-18 03:35:33'),
(26, 1, 11, '2025-02-18 03:36:56', '2025-02-18 03:35:58', '2025-02-18 03:36:56'),
(27, 1, 11, '2025-02-18 03:37:32', '2025-02-18 03:37:03', '2025-02-18 03:37:32'),
(28, 1, 11, '2025-02-18 03:37:43', '2025-02-18 03:37:37', '2025-02-18 03:37:43'),
(29, 2, 11, '2025-02-18 03:37:55', '2025-02-18 03:37:48', '2025-02-18 03:37:55'),
(30, 1, 11, '2025-02-18 03:47:57', '2025-02-18 03:37:51', '2025-02-18 03:47:57'),
(31, 1, 11, '2025-02-18 03:48:12', '2025-02-18 03:48:06', '2025-02-18 03:48:12'),
(32, 1, 11, '2025-02-18 03:48:35', '2025-02-18 03:48:16', '2025-02-18 03:48:35'),
(33, 1, 11, '2025-02-18 03:53:07', '2025-02-18 03:52:50', '2025-02-18 03:53:07'),
(34, 1, 11, '2025-02-18 03:53:40', '2025-02-18 03:53:29', '2025-02-18 03:53:40'),
(35, 1, 11, '2025-02-18 03:55:06', '2025-02-18 03:54:43', '2025-02-18 03:55:06'),
(36, 1, 11, '2025-02-18 03:58:13', '2025-02-18 03:58:08', '2025-02-18 03:58:13'),
(37, 2, 11, '2025-02-18 04:03:17', '2025-02-18 03:58:27', '2025-02-18 04:03:17'),
(38, 1, 11, '2025-02-18 04:06:35', '2025-02-18 04:06:27', '2025-02-18 04:06:35'),
(39, 1, 11, '2025-02-18 04:07:28', '2025-02-18 04:07:21', '2025-02-18 04:07:28'),
(40, 1, 11, '2025-02-18 04:08:18', '2025-02-18 04:08:09', '2025-02-18 04:08:18'),
(41, 1, 11, '2025-02-18 04:45:10', '2025-02-18 04:37:03', '2025-02-18 04:45:10'),
(42, 1, 11, '2025-02-18 04:47:08', '2025-02-18 04:47:02', '2025-02-18 04:47:08'),
(43, 1, 11, '2025-02-18 04:53:28', '2025-02-18 04:53:12', '2025-02-18 04:53:28'),
(44, 1, 11, '2025-02-18 04:54:04', '2025-02-18 04:53:59', '2025-02-18 04:54:04'),
(45, 1, 11, '2025-02-18 04:56:09', '2025-02-18 04:54:32', '2025-02-18 04:56:09'),
(46, 1, 11, '2025-02-18 04:58:23', '2025-02-18 04:58:18', '2025-02-18 04:58:23'),
(47, 1, 11, '2025-02-18 05:01:36', '2025-02-18 05:01:31', '2025-02-18 05:01:36'),
(48, 1, 11, '2025-02-18 05:01:52', '2025-02-18 05:01:44', '2025-02-18 05:01:52'),
(49, 1, 11, '2025-02-18 05:03:21', '2025-02-18 05:03:16', '2025-02-18 05:03:21'),
(50, 1, 11, '2025-02-18 05:03:31', '2025-02-18 05:03:26', '2025-02-18 05:03:31'),
(51, 1, 11, '2025-02-19 03:19:57', '2025-02-18 05:03:38', '2025-02-19 03:19:57'),
(52, 1, 11, '2025-02-19 03:20:12', '2025-02-19 03:20:02', '2025-02-19 03:20:12'),
(53, 1, 11, '2025-02-19 03:21:02', '2025-02-19 03:20:17', '2025-02-19 03:21:02'),
(54, 2, 11, '2025-02-19 03:54:52', '2025-02-19 03:54:05', '2025-02-19 03:54:52'),
(55, 2, 11, '2025-02-19 03:55:50', '2025-02-19 03:54:59', '2025-02-19 03:55:50'),
(56, 2, 11, '2025-02-19 04:44:36', '2025-02-19 03:55:55', '2025-02-19 04:44:36'),
(57, 1, 11, '2025-02-19 03:59:41', '2025-02-19 03:59:24', '2025-02-19 03:59:41'),
(58, 1, 11, '2025-02-19 04:00:09', '2025-02-19 03:59:45', '2025-02-19 04:00:09'),
(59, 1, 11, '2025-02-19 04:00:18', '2025-02-19 04:00:14', '2025-02-19 04:00:18'),
(60, 1, 11, '2025-02-19 04:01:35', '2025-02-19 04:01:30', '2025-02-19 04:01:35'),
(61, 1, 11, '2025-02-19 04:03:00', '2025-02-19 04:01:48', '2025-02-19 04:03:00'),
(62, 1, 11, '2025-02-19 04:04:01', '2025-02-19 04:03:21', '2025-02-19 04:04:01'),
(63, 1, 11, '2025-02-19 04:06:06', '2025-02-19 04:05:49', '2025-02-19 04:06:06'),
(64, 1, 11, '2025-02-19 04:07:25', '2025-02-19 04:06:46', '2025-02-19 04:07:25'),
(65, 1, 11, '2025-02-19 04:08:27', '2025-02-19 04:07:37', '2025-02-19 04:08:27'),
(66, 1, 11, '2025-02-19 04:09:43', '2025-02-19 04:08:41', '2025-02-19 04:09:43'),
(67, 1, 11, '2025-02-19 04:24:58', '2025-02-19 04:09:52', '2025-02-19 04:24:58'),
(68, 1, 11, '2025-02-19 04:28:25', '2025-02-19 04:25:20', '2025-02-19 04:28:25'),
(69, 1, 11, '2025-02-19 04:29:57', '2025-02-19 04:28:37', '2025-02-19 04:29:57'),
(70, 4, 11, '2025-03-03 04:20:59', '2025-02-19 04:29:25', '2025-03-03 04:20:59'),
(71, 1, 11, '2025-02-19 04:33:29', '2025-02-19 04:30:25', '2025-02-19 04:33:29'),
(72, 1, 11, '2025-02-19 04:34:02', '2025-02-19 04:33:45', '2025-02-19 04:34:02'),
(73, 1, 11, '2025-02-19 04:41:57', '2025-02-19 04:39:39', '2025-02-19 04:41:57'),
(74, 1, 11, '2025-02-19 04:54:02', '2025-02-19 04:42:27', '2025-02-19 04:54:02'),
(75, 1, 11, '2025-02-19 05:00:27', '2025-02-19 04:54:11', '2025-02-19 05:00:27'),
(76, 1, 11, '2025-03-01 17:37:27', '2025-03-01 17:37:22', '2025-03-01 17:37:27'),
(77, 2, 11, '2025-03-03 04:20:48', '2025-03-03 04:16:39', '2025-03-03 04:20:48'),
(78, 4, 11, '2025-03-03 04:21:10', '2025-03-03 04:21:02', '2025-03-03 04:21:10'),
(79, 1, 11, NULL, '2025-03-04 04:50:43', '2025-03-04 04:50:43'),
(80, 4, 21, NULL, '2025-03-24 04:46:39', '2025-03-24 04:46:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employment_id` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_id` bigint(20) UNSIGNED DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `skills` longtext DEFAULT NULL,
  `experience` longtext DEFAULT NULL,
  `address_1` varchar(255) DEFAULT NULL,
  `address_2` varchar(255) DEFAULT NULL,
  `barangay` varchar(255) DEFAULT NULL,
  `barangay_code` varchar(255) DEFAULT NULL,
  `municipalities` varchar(255) DEFAULT NULL,
  `municipalities_code` varchar(255) DEFAULT NULL,
  `date_birth` date DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `province_code` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `region_code` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `reports_to` varchar(255) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `employment_id`, `company_name`, `company_id`, `profile_picture`, `name`, `description`, `skills`, `experience`, `address_1`, `address_2`, `barangay`, `barangay_code`, `municipalities`, `municipalities_code`, `date_birth`, `province`, `province_code`, `region`, `region_code`, `email`, `role`, `status`, `verification_code`, `is_verified`, `password`, `department`, `phone_number`, `reports_to`, `token`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'AT-159643', 'ABC Tech', 1, NULL, 'Joe Sassy', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a@a.com', 'HR Manager', 'Active', NULL, 1, '$2y$10$2LKlH0z8m73gDCu86YAuUubRKeBMsljppverWCHAdGhGsM33nLmW2', 'Human Resources', '9123456784', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgtdXNlci9sb2dpbiIsImlhdCI6MTc0MzQxNzI4NywiZXhwIjoxNzQzNDIwODg3LCJuYmYiOjE3NDM0MTcyODcsImp0aSI6IlU5M0JKaGZsTk9kMnZGODciLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInJvbGUiOiJIUiBNYW5hZ2VyIn0.y1Qz6de2TvBnsLtKHFVIGdtZlLE0iDa1AKjRNVt2-ws', '2025-01-31 03:50:22', NULL, '2025-01-31 03:49:46', '2025-03-31 02:34:47', NULL),
(4, 'AT-159123', 'ABC Tech', 1, NULL, 'John Doe', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a123@a.com', 'HR Manager', 'Active', NULL, 1, '$2y$10$2LKlH0z8m73gDCu86YAuUubRKeBMsljppverWCHAdGhGsM33nLmW2', 'Human Resources', '9123456123', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgtdXNlci9sb2dpbiIsImlhdCI6MTczODMyNDMzNCwiZXhwIjoxNzM4MzI3OTM0LCJuYmYiOjE3MzgzMjQzMzQsImp0aSI6IlhFdkt3MjZBdzBjTm1UbmgiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.g7qDiTclzC0STPHItga8PiATv4KBGYc1298jn35xq_c', '2025-01-31 03:50:22', NULL, '2025-01-31 03:49:46', '2025-02-01 06:02:53', NULL),
(11, NULL, NULL, NULL, 'user_profiles/MgU1KJLYqvOJ1fgRhcomk2ZgGav6CVAUBU1dWyeG.jpg', 'test', '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores rerum maiores dignissimos veritatis, esse quam cumque placeat quos distinctio excepturi libero voluptates harum. Molestiae sunt totam et aliquid quas, quasi facilis mollitia deleniti atque at debitis amet, odit officiis expedita consectetur tempora iure repellat? Veniam maiores nisi optio consequuntur error ducimus non. Iusto reiciendis, quas aut esse natus laboriosam quos nesciunt totam nisi blanditiis omnis, similique, nostrum minima magnam! Sit quia illum consequatur sunt voluptates quidem repudiandae id adipisci, accusamus similique eaque itaque, deleniti ipsa repellendus magni fugit dolor incidunt nisi mollitia a. Eveniet hic id praesentium dolorum, nam tempora enim reiciendis maxime officiis ab ea dolorem vero ad accusamus quam sapiente pariatur, perspiciatis quidem labore. Velit repellendus ullam necessitatibus ab hic veritatis dolorum totam, eius magnam doloremque voluptas quam perspiciatis neque assumenda possimus officia, consectetur officiis accusamus quasi! Ducimus unde quas, sed eos error libero, voluptates voluptatem nobis repellat dicta quasi repellendus! Veniam error, alias impedit!</p>', '[ \"React\", \"TypeScript\",  \"Tailwind CSS\", \"Redux\", \"Jest\", \"Cypress\", \"Docker\", \"Kubernetes\"]', '[{\"position\":\"pos\",\"company\":\"com\",\"location\":\"loc\",\"start_date\":\"Mar 2025\",\"end_date\":\"Present\"}]', 'address 1', 'address 2', 'Matungao', '031405004', 'Norzagaray', '031405000', '2025-02-03', 'Bulacan', '031400000', 'Region III', '030000000', 'a1@a.com', 'Job Seeker', 'Active', NULL, 1, '$2y$10$F.UzEx9uHkppc4ljc16vaeO3Bj.CB4aZsHyOf1PFmurA4gRagT6/m', NULL, '9123454321', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgtdXNlci9sb2dpbiIsImlhdCI6MTc0MjgyMDI4MywiZXhwIjoxNzQyODIzODgzLCJuYmYiOjE3NDI4MjAyODMsImp0aSI6ImllaGIxZXZQNERUV2sxM3QiLCJzdWIiOiIxMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJyb2xlIjoiSm9iIFNlZWtlciJ9.N8Zgo8frSvdZyqea43hytcvCjLJ0Mb303xfEcy55Rvk', '2025-02-08 21:09:55', NULL, '2025-02-08 21:07:51', '2025-03-24 04:44:43', NULL),
(21, NULL, NULL, NULL, 'user_profiles/WCuY4TvWRQaFGicarSsWgD5FGxEWezA5I1gdmRfO.jpg', 'Juan Delacruz', '<p>test lorem dolor</p>', '[\"Programmer\",\"Sales\",\"Marketing\",\"Voice over\"]', NULL, 'add1', 'add2', 'Bagong Sikat', '034904002', 'Cabiao', '034904000', '2025-03-03', 'Nueva Ecija', '034900000', 'Region III', '030000000', 'aa1@a.com', 'Job Seeker', 'Active', NULL, 1, '$2y$10$UWYWALqiNBG4ixHxMxUiIeE5g5bLeQGiOx/L/6gqyfDAUhevPOQI.', NULL, '9123212321', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgtdXNlci9sb2dpbiIsImlhdCI6MTc0MjgyMTA4MSwiZXhwIjoxNzQyODI0NjgxLCJuYmYiOjE3NDI4MjEwODEsImp0aSI6ImF4OElZV0dEbEJNdDhrU1YiLCJzdWIiOiIyMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJyb2xlIjoiSm9iIFNlZWtlciJ9.9ypayo9CH_i_4M0_dtAJU0DJ-9G3wLp7dM2PJ7nc1uE', '2025-03-24 04:21:21', NULL, '2025-03-24 04:20:56', '2025-03-24 04:58:01', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applied_jobs`
--
ALTER TABLE `applied_jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applied_jobs_posted_job_id_foreign` (`posted_job_id`),
  ADD KEY `applied_jobs_company_id_foreign` (`company_id`),
  ADD KEY `applied_jobs_user_id_foreign` (`user_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `companies_company_phone_unique` (`company_phone`),
  ADD UNIQUE KEY `companies_company_email_unique` (`company_email`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permission_per_role`
--
ALTER TABLE `permission_per_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_per_role_role_id_foreign` (`role_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posted_jobs`
--
ALTER TABLE `posted_jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posted_jobs_company_id_foreign` (`company_id`),
  ADD KEY `posted_jobs_user_id_foreign` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saved_jobs_posted_job_id_foreign` (`posted_job_id`),
  ADD KEY `saved_jobs_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_employment_id_unique` (`employment_id`),
  ADD KEY `users_company_id_foreign` (`company_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applied_jobs`
--
ALTER TABLE `applied_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `permission_per_role`
--
ALTER TABLE `permission_per_role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posted_jobs`
--
ALTER TABLE `posted_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applied_jobs`
--
ALTER TABLE `applied_jobs`
  ADD CONSTRAINT `applied_jobs_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `applied_jobs_posted_job_id_foreign` FOREIGN KEY (`posted_job_id`) REFERENCES `posted_jobs` (`id`),
  ADD CONSTRAINT `applied_jobs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `permission_per_role`
--
ALTER TABLE `permission_per_role`
  ADD CONSTRAINT `permission_per_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `posted_jobs`
--
ALTER TABLE `posted_jobs`
  ADD CONSTRAINT `posted_jobs_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `posted_jobs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  ADD CONSTRAINT `saved_jobs_posted_job_id_foreign` FOREIGN KEY (`posted_job_id`) REFERENCES `posted_jobs` (`id`),
  ADD CONSTRAINT `saved_jobs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
