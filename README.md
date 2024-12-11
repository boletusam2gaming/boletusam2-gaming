# Boletusam2 Gaming

Welcome to the Boletusam2 Gaming site! This project is dedicated to providing an engaging and interactive gaming experience.

## Table of Contents

- [Features](#features)
- [About](#about)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Azure Build Status
[![Build status](https://dev.azure.com/boletusam2gamingllc/Boletusam2_Gaming_Website/_apis/build/status/Boletusam2_Gaming_Website-CI)](https://dev.azure.com/boletusam2gamingllc/Boletusam2_Gaming_Website/_build/latest?definitionId=20)

## Features

- **User Profiles**: Create and manage your website profile.
- **Live Streaming**: Watch and stream live gameplay.
- **Game Library**: Access a wide variety of games.
- **Community**: Connect with other gamers through forums and chat.
- **Blog**: Read and write gaming articles.
- **Store**: Browse and purchase gaming products.
- **Admin Features**: Admins can manage posts, comments, and products.

## About

This project is built with ReactJS to provide a better user interface. ReactJs can be used to create front-end sites efficiently without using the complex version of html. It can also used to create various types of applications to website in matter of time. I have used ReactJS to create my website since im futurer proofing this when I restart my gamiing live stream. If the viewers dont have suffiecnt time to view from the twitch.tv platform they can also view it from the website where the livestream player is embedded in the page livestream

## Usage

### Running the Application

To run the application locally, use the following command:

```sh
npm start
``` 
The application will be available at http://localhost:3000.

### Deployment

The project is set up to deploy to GitHub Pages. To deploy the application, use the following command:
```sh
npm run deploy
```

## Project Structure
- src/components: Contains the React components for the application.
- src/pages: Contains the page components for different routes.
- src/hooks: Contains custom hooks for the application.
- src/firebase.js: Firebase configuration and initialization.
- public: Contains the public assets and the index.html file.
- .github/workflows: Contains GitHub Actions workflows for CI/CD.(this will be coming in future)

## Environment Variabls
Create a .env file in the root directory of the project and add the following environment variables:

```
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
REACT_APP_FORTHWALL_STOREFRONT_API_KEY=your-forthwall-api-key
```

## Contributing
We welcome contributions to the Boletusam2 Gaming project! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a clear message.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact 
If you have any questions or need further assistance, please feel free to contact us at boletusam18@gmail.com .