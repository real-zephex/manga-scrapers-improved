# Manga Scrapers Improved

This is the second version of the manga scrapers available on my site. However, this is currently in development and will probably take a long time to finish due to my college and exams.

## Overview

The Manga Scrapers Improved project is designed to scrape manga information from various sources. This project aims to provide a more efficient and robust solution for gathering manga data, including search results, detailed manga information, and chapter images.

## Features

- **Search Scraping**: Scrape search results based on manga titles.
- **Manga Information Scraping**: Retrieve detailed information about a specific manga, including title, description, authors, type, status, genres, and chapters.
- **Chapter Images Scraping**: Fetch images from specific manga chapters.

## Project Structure

- **`src/index.ts`**: Entry point of the application using the Hono framework.
- **`web-scraper/scrapers/baseScraper.ts`**: Base scraper class that handles HTTP requests and error handling.
- **`web-scraper/types`**: Type definitions for various data structures used in the project.
- **`web-scraper/utils/helpers.ts`**: Utility functions for formatting data, handling errors, and introducing delays.
- **`web-scraper/models/data.ts`**: Data model for representing and manipulating scraped data.

## Dependencies

- **axios**: For making HTTP requests.
- **cheerio**: For parsing and manipulating HTML.
- **dotenv**: For loading environment variables.
- **hono**: For building the web server.

## Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/manga-scrapers-improved.git
```

2. Navigate to the project directory:

```sh
cd manga-scrapers-improved
```

3. Install dependencies:

```sh
npm install
```

4. Create a `.env.local` file and add the necessary environment variables:

```sh
WEEBCENTRAL_BASE=https://weebcentral.com
```

## Usage

- **Development**: Start the development server:
  ```sh
  npm run dev
  ```
- **Deployment**: Deploy the application:
  ```sh
  npm run deploy
  ```

## Why It Will Take a Long Time to Finish

This project is currently in development and will take a long time to finish due to my college and exams. Balancing academic responsibilities with project development can be challenging, and progress may be slower than anticipated. However, I am committed to completing this project and providing a valuable tool for manga enthusiasts.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
