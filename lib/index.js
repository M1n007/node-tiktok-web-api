const fs = require('fs');

const request = require('./request');
const helpers = require('./helpers/helpers');
const useragentFromSeed = require('useragent-from-seed');

class Tiktok {
    constructor(username,password){
        this.credentials = {
            username,
            password
        }
        this.baseUrl = 'https://www.tiktok.com';

        this.headers = {
            'authority': 'www.tiktok.com',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': '1',
            'user-agent': useragentFromSeed(),
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
        }

        this.requestNodeFetch = request.nodeFetch;
    }

    async _getNextData(url) {
        try{
            const result = await this.requestNodeFetch.get(url, this.headers);
            const resultText = await result.text();
            const _nextData = helpers.getString('<script id="__NEXT_DATA__" type="application/json" crossorigin="anonymous">', '</script>', resultText);
            const resultJson = JSON.parse(_nextData[1]);
            return resultJson;
        }catch(e){
            throw new Error(e)
        }
    }

    async _getVideoDataByUrl(url) {
        try{
            const _nextDataResult = await this._getNextData(url);
            const resultData = _nextDataResult.props.pageProps.videoData
            return resultData;
        }catch(e){
            throw new Error(e)
        }
    }

    async getVideoCoverImageByUrl(url){
        try {
            const videoData = await this._getVideoDataByUrl(url);
            const coverImage = videoData.itemInfos.covers;
            return coverImage;
        }catch(e){
            throw new Error(e)
        }
    }

    async getVideoBase64AndBufferByUrl(url){
        try {
            const videoData = await this._getVideoDataByUrl(url);
            const getVideo = await this.requestNodeFetch.get(videoData.itemInfos.video.urls[0]);
            const videoBuffer = await getVideo.buffer();
            const buf = Buffer.from(videoBuffer);
            const base64Video = buf.toString('base64');
            const data = {
                base64: base64Video,
                buffer: videoBuffer
            }
            return data;
        }catch(e){
            throw new Error(e)
        }
    }

}

module.exports = Tiktok;