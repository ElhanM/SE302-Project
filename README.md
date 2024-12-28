# LambdaTest E-Commerce Platform Testing Project

## Overview
This repository contains automated tests for the [LambdaTest E-Commerce platform](https://ecommerce-playground.lambdatest.io/) implemented as part of the SE302 Software Testing and Maintenance course. The tests are written in TypeScript using Playwright.

## Prerequisites
- Node.js v20 installed on your machine
- npm v10 (Node Package Manager)

## Setup
1. Clone the repository to your local machine.
    ```bash
    git clone git@github.com:ElhanM/SE302-Project.git
    cd SE302-Project
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Install the required browsers for Playwright.
    ```bash
    npx playwright install
    ```

## Running Tests

- **Run All Tests in All Browsers**:  
  Use `npm run tests:all` to run all tests across all configured browsers.

- **Run a Specific Test**:  
  To run a specific test file, in one or multiple enviroments, refer to Playwright docs. Example:
  ```bash
  npx playwright test path/to/test.spec.ts --config=playwright.config.ts --project=chromium --project=firefox
  ```    

## Test Scenarios

<!-- TODO -->
### Smoke Tests

### Regression Tests

## Thank you

A heartfelt thank you to the teaching assistants who will be dedicating their time and expertise to evaluate this project. Your guidance and feedback are invaluable, and we appreciate the effort you put into helping us grow as students. 🙌

Thank you for your commitment to our learning journey!