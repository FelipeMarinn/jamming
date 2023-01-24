
const clientId = '59d3987fcc784ba490624091bd5d308a'
// const redirectUri = 'http://localhost:3000/'
const redirectUri = 'https://jamming-02m.netlify.app'
let accessToken

const Spotify = {

    getAccessToken() {

        if (accessToken) {
            localStorage.setItem('myToken', accessToken)
            return accessToken 
        } 

        // Check access token 
        const urlLocation = window.location.href
        const accessTokenMatch = urlLocation.match(/access_token=([^&]*)/)
        const expiresInMatch = urlLocation.match(/expires_in=([^&]*)/)
        
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            localStorage.setItem('myToken', accessToken)
            console.log('verificar match');
            
            // This clear the parameters, allowing us to grap a new access token when it expires
            window.setTimeout(() => {
                accessToken = ''
                localStorage.clear()  
            }, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            console.log('asignar url');
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl
        }
    },

    search(term) {

        const accessToken = localStorage.getItem('myToken') 
          ? localStorage.getItem('myToken')
          : Spotify.getAccessToken() 
        console.log(accessToken);
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then( response => response.json() ) 
        .then( data => {
            if ( !data.tracks ) {
                return []
            }
            return data.tracks.items.map( track => ({
                id: track.id,
                name: track.name,
                artists: track.artists[0],
                album: track.album.name,
                image: track.album.images,
                preview: track.preview_url,
                uri: track.uri
            }))
        }) 
        .catch(error => new Error(error))
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return
        }

        const accessToken = localStorage.getItem('myToken') 
          ? localStorage.getItem('myToken')
          : Spotify.getAccessToken() 
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        let userId

        return fetch('https://api.spotify.com/v1/me', {
            method: 'GET', 
            headers: headers
         })
        .then( response => response.json() )
        .then( data => {
            userId = data.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, { 
              method: 'POST',
              body: JSON.stringify({ name: name }),
              headers: headers
            })
            .then( response => response.json() )
            .then( data => { 
                const playlistId = data.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, { 
                  method: 'POST',
                  body: JSON.stringify({ uris: trackUris }),
                  headers: headers
                })
            })
            .catch(error => new Error(error))
        })
        .catch(error =>  new Error(error))
    }

}

export default Spotify