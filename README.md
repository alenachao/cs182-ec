# Special Participation D: Red Team
### Student Extensions and Improvements to CS182 Homework Assignments

This repository contains tools to scrape and visualize "Special Participation D" posts from Ed, showcasing student extensions to CS182 homework assignments (e.g., Lion optimizer, Muon, various model experiments).

## Repository Structure

- **`data/`**: Python scripts for scraping Ed.
- **`web/`**: A React + Vite web application to visualize the scraped interactions.
- **`edapi_interactions.json`**: The dataset of scraped interactions.

## 🚀 Getting Started

### 1. Data Scraper
To scrape the latest data from Ed, you need an Ed API token.

1.  Create a `.env` file in the root directory (confidential):
    ```bash
    ED_API_TOKEN=your_token_here
    ```
2.  Run the scraper:
    ```bash
    python3 data/scraper.py
    ```
    This will generate/update `edapi_interactions.json`.

### 2. Web Gallery
The web gallery is a modern React application used to browse the interactions.

1.  Navigate to the web directory:
    ```bash
    cd web
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note**: If you scrape new data, make sure to copy the updated `edapi_interactions.json` to `web/public/data.json` so the web app sees it.
