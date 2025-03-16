-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2025 at 03:13 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

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
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint UNSIGNED NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_profile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `industry_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_description` text COLLATE utf8mb4_unicode_ci,
  `company_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year_establish` year DEFAULT NULL,
  `company_socialmed` json DEFAULT NULL,
  `registration_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
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
(8, '2025_01_18_000003_create_posted_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_per_role`
--

CREATE TABLE `permission_per_role` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `component` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `table` longtext COLLATE utf8mb4_unicode_ci,
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
(3, 1, 'Applications', 'applications', NULL, 'Applications', 'mdi:clipboard-text-multiple-outline', NULL, 1, 1, 1, 1, NULL, NULL),
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
(19, 2, NULL, 'view-application/:id', NULL, 'ApplicationDetails', NULL, NULL, 0, 1, 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posted_jobs`
--

CREATE TABLE `posted_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `background_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` json NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary_range` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experience_level` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_function` json NOT NULL,
  `industry` json NOT NULL,
  `job_expiry` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posted_jobs`
--

INSERT INTO `posted_jobs` (`id`, `company_id`, `user_id`, `background_img`, `job_title`, `job_description`, `type`, `location`, `salary_range`, `experience_level`, `job_function`, `industry`, `job_expiry`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 'background_images/wTRvncco4RZIktMTmKOspGaX1YFSa1OMhNhMY37d.jpg', 'Software Engineer', '<h1><strong>Job Description 1</strong></h1><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.\"<br> <br><strong>Job Description 2</strong></p><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.\"</p>', '[\"Full-time\", \"On-site\"]', 'BGC, Manila', '10000-20000', '3-5 Years experience', '[\"IT\"]', '[\"Technology\"]', '2025-02-24', 'Active', '2025-02-01 05:09:31', '2025-02-01 05:09:31', NULL),
(2, 1, 1, 'background_images/DYAp30iZpn3loAEoHvGHt87MWi7N72uTeflY9Pu2.jpg', 'UIUX Designer', '<h1><strong>Job Description</strong></h1><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.</p><p></p>', '[\"Full-time\", \"On-site\"]', 'Pasig City - Manila', '10000-20000', '1-3 Years experience', '[\"IT\"]', '[\"Technology\"]', '2025-02-24', 'Active', '2025-02-02 01:10:56', '2025-02-02 01:10:56', NULL),
(3, 1, 1, 'background_images/IGtQsaYK2cTscxo4QD7Z9A8zVN3BmCAznaryPNkF.jpg', 'Call Center', '<h1><strong>Job Description</strong></h1><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.<br><br><strong>Job Description</strong></p><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position.</p>', '[\"Hybrid\", \"Agency\"]', 'BGC - Manila', '10000-20000', '3-5 Years experience', '[\"Customer Service\"]', '[\"Call Center\"]', '2025-02-24', 'Active', '2025-02-02 01:18:01', '2025-02-02 01:18:01', NULL),
(4, 1, 1, 'background_images/vwavGzGQDwyu1MH58D1NpOIwYSV8cSu11zGzHACY.jpg', 'Java Developer', '<h1><strong>Job Description</strong></h1><p>Provides a detailed overview of the position, outlining the key responsibilities, day-to-day duties, and expectations for the role. It should include the qualifications, skills, and experience required for the job, as well as any additional details that help candidates understand the nature of the role. A well-written job description attracts the right candidates and helps them assess if they are a good fit for the position</p>', '[\"Full-time\"]', 'Manila', '999999-91111', '3-5 Years experience', '[\"IT\"]', '[\"Technology\"]', '2025-02-25', 'Active', '2025-02-02 01:19:59', '2025-02-02 01:19:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `role_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `employment_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `profile_picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barangay` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barangay_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_municipalities` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `municipalities_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_birth` date DEFAULT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verification_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reports_to` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` text COLLATE utf8mb4_unicode_ci,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `employment_id`, `company_name`, `company_id`, `profile_picture`, `name`, `address_1`, `address_2`, `barangay`, `barangay_code`, `city_municipalities`, `municipalities_code`, `date_birth`, `province`, `province_code`, `region`, `region_code`, `email`, `role`, `status`, `verification_code`, `is_verified`, `password`, `department`, `phone_number`, `reports_to`, `token`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'AT-159643', 'ABC Tech', 1, NULL, 'Joe Sassy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a@a.com', 'HR Manager', 'Active', NULL, 1, '$2y$10$2LKlH0z8m73gDCu86YAuUubRKeBMsljppverWCHAdGhGsM33nLmW2', 'Human Resources', '9123456784', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgtdXNlci9sb2dpbiIsImlhdCI6MTczOTM2MzU1MywiZXhwIjoxNzM5MzY3MTUzLCJuYmYiOjE3MzkzNjM1NTMsImp0aSI6IjRnU1RLQWhWY1F2cnNkSUMiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInJvbGUiOiJIUiBNYW5hZ2VyIn0.9n84bV3cguQD_UGFwiMhdw2BNSvaZ_56ZuAsL7-suhk', '2025-01-31 03:50:22', NULL, '2025-01-31 03:49:46', '2025-02-12 04:32:33', NULL),
(4, 'AT-159123', 'ABC Tech', 1, NULL, 'John Doe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a123@a.com', 'HR Manager', 'Active', NULL, 1, '$2y$10$2LKlH0z8m73gDCu86YAuUubRKeBMsljppverWCHAdGhGsM33nLmW2', 'Human Resources', '9123456123', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgtdXNlci9sb2dpbiIsImlhdCI6MTczODMyNDMzNCwiZXhwIjoxNzM4MzI3OTM0LCJuYmYiOjE3MzgzMjQzMzQsImp0aSI6IlhFdkt3MjZBdzBjTm1UbmgiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.g7qDiTclzC0STPHItga8PiATv4KBGYc1298jn35xq_c', '2025-01-31 03:50:22', NULL, '2025-01-31 03:49:46', '2025-02-01 06:02:53', NULL),
(11, NULL, NULL, NULL, 'user_profiles/MgU1KJLYqvOJ1fgRhcomk2ZgGav6CVAUBU1dWyeG.jpg', 'test', 'address 1', 'address 2', 'Matungao', '031405004', NULL, '031405000', '2025-02-03', 'Bulacan', '031400000', 'Region III', '030000000', 'abc12@a.com', 'Job Seeker', 'Active', NULL, 1, '$2y$10$F.UzEx9uHkppc4ljc16vaeO3Bj.CB4aZsHyOf1PFmurA4gRagT6/m', NULL, '9123454321', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgtdXNlci9sb2dpbiIsImlhdCI6MTczOTU4NzUzOCwiZXhwIjoxNzM5NTkxMTM4LCJuYmYiOjE3Mzk1ODc1MzgsImp0aSI6InB3OGVXVGRHYlA5U004TkgiLCJzdWIiOiIxMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJyb2xlIjoiSm9iIFNlZWtlciJ9.48xdXT0WkiHbSr7dt1A33gpA27W-Bv3t6wOMwj_BAqs', '2025-02-08 21:09:55', NULL, '2025-02-08 21:07:51', '2025-02-14 18:45:38', NULL);

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `permission_per_role`
--
ALTER TABLE `permission_per_role`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posted_jobs`
--
ALTER TABLE `posted_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
