# Jamming Spotify Playlist Creator

 Jamming Spotify Playlist Creator is a React-based web application that allows users to search for songs, albums, or artists on Spotify and create custom playlists. Users can export these playlists to their Spotify account or manage them within the app.

## Features

- **Search Music**: Search for tracks by track name, album, or artist (search results are limited to 20 items per query).
- **Create Playlists**: Add tracks to a playlist, save it, and either export it to your Spotify account or delete it.
- **Spotify Integration**: Log in with your Spotify account to use the app. Authentication is handled through Spotify’s OAuth process, and the token remains valid for 1 hour. After the token expires, the user must log out and log in again to refresh it.


## How to Use

1. **Login with Spotify**: The app requires you to have a Spotify account and for you to be registered with the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/). You'll need to create an application to obtain your Client ID and Client Secret.
2. **Search for Tracks**: You can search by track name, album, or artist. The app fetches data using Spotify’s API.
3. **Create and Manage Playlists**:
    - Add tracks to your playlist.
    - Save and manage your playlists from the playlists section.
    - Export playlists to your Spotify account or delete them from the app.
4. **Token Expiration**: Your session lasts 1 hour. Afterward, log out and log back in to continue using the app.

## Installation

1. Clone the repository:
   
   `git clone https://github.com/asavickij/jamming.git`


2. Install dependencies:

   `npm install`

3. Set up your Spotify Developer Account:

    - Visit the Spotify Developer Dashboard and create an app.
    - Use the app’s Client ID in your app for authentication.
    - Make sure the redirect URI matches the one you set up in your Spotify Developer app.

4. Run the development server:

   `npm start`

5. Your app will be running at http://localhost:3000.

## Dependencies

- React
- Spotify Web API

## Authentication

 The user authentication logic is located in the Login.js component.
  
## Contributing
    
 Feel free to fork this repository and submit pull requests. Issues and feedback are welcome.

