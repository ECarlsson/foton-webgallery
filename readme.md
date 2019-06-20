## Installing & running dev environment
```bash
$> git clone https://github.com/ECarlsson/foton
$> cd foton
$> npm install
$> npm run dev
```

Gallery visable att localhost:3000/gallery

## API
A list of all albums and album details can be fetched as JSON via the API. The available parameters are:

 | GET | /albums/ | Lists all albums and meta data for each album |
 | GET | /albums/:album | Lists all images of an album |