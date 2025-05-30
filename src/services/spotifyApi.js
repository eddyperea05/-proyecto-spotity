// src/services/spotifyApi.js
import axios from 'axios';

const API_BASE = 'https://api.spotify.com/v1';

const getAuthHeader = () => {
  const tokenData = JSON.parse(localStorage.getItem('spotify_token_data'));
  return {
    headers: {
      'Authorization': `Bearer ${tokenData?.access_token}`
    }
  };
};

export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_BASE}/me`, getAuthHeader());
  return response.data;
};

export const fetchUserTopArtists = async () => {
  const response = await axios.get(`${API_BASE}/me/top/artists?limit=5`, getAuthHeader());
  return response.data.items;
};

export const fetchUserPlaylists = async () => {
  const response = await axios.get(`${API_BASE}/me/playlists?limit=50`, getAuthHeader());
  return response.data;
};

export const fetchRecentPlays = async () => {
  const response = await axios.get(`${API_BASE}/me/player/recently-played?limit=10`, getAuthHeader());
  return response.data.items;
};