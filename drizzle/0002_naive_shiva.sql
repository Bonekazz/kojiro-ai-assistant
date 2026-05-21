CREATE TABLE `grocery_trips` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`market_name` text,
	`total_budget` real,
	`description` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
ALTER TABLE `transactions` ADD `grocery_trip_id` integer REFERENCES grocery_trips(id);