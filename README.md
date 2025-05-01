## About News App

News app is an application for writing news, the application is made with the PHP programming language using the Laravel framework.

## Installation

Here are the steps to install a Laravel application from GitHub:

1. Clone the Repository: Use the command `git clone <repository-URL>` to download the source code from GitHub.
2. Navigate to the Project Directory: Enter the project folder using `cd <folder-name>`.
3. Install Dependencies: Run `composer install` to install all required dependencies.
4. Copy the `.env` File: Duplicate the `.env.example` file into `.env` using `cp .env.example .env`.
5. Configure the `.env` File: Update the database settings, including database name, username, and password.
6. Generate Application Key: Execute `php artisan key:generate` to create a unique application key.
7. Create a Database: Set up a new database matching the name specified in the `.env` file.
8. Run Database Migrations: Use `php artisan migrate` to create the necessary tables in the database.
9. Run the command php artisan db:seed for initial rule input
10. Start the Laravel Server: Launch the server with `php artisan serve` and access the application at `http://localhost:8000`.

11. Please login with the username and password in UserSeeder

## License

The news app is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
