CREATE TABLE `criteria` (
	`id` int AUTO_INCREMENT NOT NULL,
	`kode` varchar(10) NOT NULL,
	`nama` varchar(100) NOT NULL,
	`bobot` decimal(5,2) NOT NULL,
	`normalisasi_bobot` decimal(5,4),
	`keterangan` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `criteria_id` PRIMARY KEY(`id`),
	CONSTRAINT `criteria_kode_unique` UNIQUE(`kode`)
);
--> statement-breakpoint
CREATE TABLE `employee_activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`tanggal` date NOT NULL,
	`jam_masuk` time,
	`jam_pulang` time,
	`keterangan` enum('hadir','izin','sakit','alpha','cuti') DEFAULT 'hadir',
	`target` enum('tercapai','tidak_tercapai') DEFAULT 'tercapai',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `employee_activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`kode_alternatif` varchar(10) NOT NULL,
	`nama_lengkap` varchar(100) NOT NULL,
	`nik` varchar(50) NOT NULL,
	`barcode` varchar(50),
	`jenis_kelamin` enum('L','P') NOT NULL,
	`departemen` varchar(100) NOT NULL,
	`jabatan` varchar(100),
	`tanggal_bergabung` date,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_kode_alternatif_unique` UNIQUE(`kode_alternatif`),
	CONSTRAINT `employees_nik_unique` UNIQUE(`nik`)
);
--> statement-breakpoint
CREATE TABLE `periods` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`bulan` int NOT NULL,
	`tahun` int NOT NULL,
	`status` enum('active','completed','draft') NOT NULL DEFAULT 'draft',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `periods_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`period_id` int NOT NULL,
	`k1_score` decimal(5,2),
	`k2_score` decimal(5,2),
	`k3_score` decimal(5,2),
	`k4_score` decimal(5,2),
	`k1_normalized` decimal(5,4),
	`k2_normalized` decimal(5,4),
	`k3_normalized` decimal(5,4),
	`k4_normalized` decimal(5,4),
	`total_score` decimal(5,4),
	`ranking` int,
	`grade` enum('sangat_baik','baik','kurang'),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `scores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(255) NOT NULL,
	`name` varchar(100) NOT NULL,
	`role` enum('admin','employee') NOT NULL DEFAULT 'employee',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `employee_activities` ADD CONSTRAINT `employee_activities_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `scores` ADD CONSTRAINT `scores_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `scores` ADD CONSTRAINT `scores_period_id_periods_id_fk` FOREIGN KEY (`period_id`) REFERENCES `periods`(`id`) ON DELETE cascade ON UPDATE no action;