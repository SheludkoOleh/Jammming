const clientID = "7ace23c1409a4792a9c3cefeac5fa7ba";
// const clientSecret = "a34d73d2456244f286d46747330ae602";
// const redirectURI = "http://localhost:3002/";
const redirectURI = 'https://my-jammming-app.netlify.app/'
// const API_BASE_URL = "https://api.spotify.com/v1";


let accessToken;

const Spotify = { 
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        { headers: {
            Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                imageUrl: track.album.images[2].url,
                previewUrl: track.preview_url,
                uri: track.uri
            }));
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            { 
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                })
            })
        })
    }
};
export default Spotify;


// const Spotify = {
//     accessToken: null,
  
//     async getAccessToken() {
//       if (this.accessToken) {
//         return this.accessToken;
//       }
  
//       const response = await fetch(`${API_BASE_URL}/accounts/token`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': `Basic ${(`${clientID}:${clientSecret}`)}`
//         },
//         body: 'grant_type=client_credentials'
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         this.accessToken = data.access_token;
//         const expiresIn = data.expires_in;
//         setTimeout(() => this.accessToken = null, expiresIn * 1000);
//         return this.accessToken;
//       } else {
//         throw new Error('Failed to fetch access token');
//       }
//     },

//     async search(term) {
//         const accessToken = this.getAccessToken();
//         try {
//           const response = await fetch(`${API_BASE_URL}/search?type=track&q=${term}`, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           });
//           const jsonResponse = await response.json();
//           if (!jsonResponse.tracks) {
//             return [];
//           }
//           return jsonResponse.tracks.items.map(track => ({
//             id: track.id,
//             name: track.name,
//             artist: track.artists[0].name,
//             album: track.album.name,
//             imageUrl: track.album.images[2].url,
//             previewUrl: track.preview_url,
//             uri: track.uri,
//           }));
//         } catch (error) {
//           console.error(error);
//           return [];
//         }
//       },
    
//       async savePlaylist(name, trackUris) {
//         if (!name || !trackUris.length) {
//           return;
//         }
    
//         const accessToken = this.getAccessToken();
//         const headers = { Authorization: `Bearer ${accessToken}` };
    
//         try {
//           const userResponse = await fetch(`${API_BASE_URL}/me`, { headers });
//           const userJson = await userResponse.json();
//           const userId = userJson.id;
    
//           const playlistResponse = await fetch(`${API_BASE_URL}/users/${userId}/playlists`, {
//             headers,
//             method: 'POST',
//             body: JSON.stringify({ name }),
//           });
//           const playlistJson = await playlistResponse.json();
//           const playlistId = playlistJson.id;
    
//           await fetch(`${API_BASE_URL}/users/${userId}/playlists/${playlistId}/tracks`, {
//             headers,
//             method: 'POST',
//             body: JSON.stringify({ uris: trackUris }),
//           });
//         } catch (error) {
//           console.error(error);
//         }
//       },

//       async getAuthorizationUrl() {
//         const clientIDEncoded = encodeURIComponent(clientID);
//         const redirectURIEncoded = encodeURIComponent(redirectURI);
//         const url = `https://accounts.spotify.com/authorize?client_id=${clientIDEncoded}&response_type=code&redirect_uri=${redirectURIEncoded}}`;
//         return url;
//       },
    
//     };
    
// export default Spotify;
