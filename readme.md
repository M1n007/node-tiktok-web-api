
### A Tiktok Private Web API client 📷🔥 ❤️

Simple, easy implementation of the Tiktok private web API.

## Install

```bash
npm install node-tiktok-web-api
```

## Usage

```
const Tiktok = require('node-tiktok-web-api');
const TiktokClient = new Tiktok();
const fs = require('fs');


(async() => {

    //get video cover image
    const data = await TiktokClient.getVideoCoverImageByUrl('https://www.tiktok.com/@jiangyou511/video/6855575034182798598');
    console.log(data)

    //downloading video
    const data = await TiktokClient.getVideoBase64AndBufferByUrl('https://www.tiktok.com/@jiangyou511/video/6855575034182798598');
    fs.writeFileSync('./test.mp4', data.base64, 'base64')
    console.log(data)
})();
```

## API Reference

* [Tiktok](#tiktokwebapi)
  * [.getVideoCoverImageByUrl(url)](#getVideoCoverImageByUrl)
  * [.getVideoBase64AndBufferByUrl(url)](#getVideoBase64AndBufferByUrl)

### getVideoCoverImageByUrl(url)
  ```js
    const data = await TiktokClient.getVideoCoverImageByUrl('https://www.tiktok.com/@xxxxx/video/xxxxxx');
    console.log(data)
  ```
  > get url video image cover
  - `url`: A `String`

### getVideoBase64AndBufferByUrl(url)
  ```js
    const data = await TiktokClient.getVideoBase64AndBufferByUrl('https://www.tiktok.com/@xxxxx/video/xxxxxx');
    fs.writeFileSync('./test.mp4', data.base64, 'base64')
    console.log(data)
  ```
  > getting video base64 and buffer from url
  - `url`: A `String`

## License

MIT © [Archv Id](https://archv.id/)