// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "{"noiseKey":{"private":{"type":"Buffer","data":"eOl6e2BxqZj7DL+hgaoYbqMbmfCvvULb0x7I4J5Sh3w="},"public":{"type":"Buffer","data":"VmnVn6HqmkxozXTwVFgVkbmyec+P5yG6Kwh5WiXEVyg="}},"pairingEphemeralKeyPair":{"private":{"type":"Buffer","data":"KIKjByJFlInNztxVsjCwP9Lj93KnkbxSXbmRsk5OoHk="},"public":{"type":"Buffer","data":"JZjJnua86LrAqd81mdfOGlP2iXAIOCHZQpNmhMmJHxg="}},"signedIdentityKey":{"private":{"type":"Buffer","data":"uKi6w4iA+yGnO+Pv1Yi/gTF7D9Uurb6ltpvBl+08Mk4="},"public":{"type":"Buffer","data":"K724LcAfuv2MpO+rpnSHEu/3AUVCbt4Mbpz3OApVHko="}},"signedPreKey":{"keyPair":{"private":{"type":"Buffer","data":"iD3xAnCo94wDzzjPwUfIqTidZ4kUnTvEV8fllANBpHI="},"public":{"type":"Buffer","data":"kcb2S0FnMGxFI9oAgESh/RuqcIkRkLrAEfJ4ynw35AE="}},"signature":{"type":"Buffer","data":"mnACHV3a5modln+VTc5oFYARHPGeg+Ld3jgkkMl8Iv8UNhh1kW1o45NBAu18mE27kToeJGPjBZ6o7wpHQi+vgQ=="},"keyId":1},"registrationId":94,"advSecretKey":"lxp4y13zCyz/l1QScbifKfq3n/BCLR3ynGRLlYDxqHI=","processedHistoryMessages":[{"key":{"remoteJid":"22550010488@s.whatsapp.net","fromMe":true,"id":"ACB52388E3810B9A32A81983A615F453"},"messageTimestamp":1742447672},{"key":{"remoteJid":"22550010488@s.whatsapp.net","fromMe":true,"id":"C3D9E8B1904DD03BD1A32738CC0E8F06"},"messageTimestamp":1742447673}],"nextPreKeyId":31,"firstUnuploadedPreKeyId":31,"accountSyncCounter":1,"accountSettings":{"unarchiveChats":false},"deviceId":"9Akd7xSNTcOGcwBjUHFzDw","phoneId":"3f435ad0-0c99-4500-8ab1-e25655225f0f","identityId":{"type":"Buffer","data":"va52ShrHIYYn4XZCSfvGA4naflU="},"registered":true,"backupToken":{"type":"Buffer","data":"pPi2b6PBBuyYTXCxMlPpPU6FQPo="},"registration":{},"pairingCode":"CDWSXW79","me":{"id":"22550010488:5@s.whatsapp.net","name":"饾悎饾悊饾悜饾悎饾悞 饾悊饾悜饾悎饾悓饾悓","lid":"105381888012306:5@lid"},"account":{"details":"CNeEsMQEEK3I7r4GGAUgACgA","accountSignatureKey":"3WZGkOGdxvowGExWZeYmO67JpQozI1oyPykz7AiEnjA=","accountSignature":"A8Zt4H58hB5CJmgnH9aTaAxBqt64i5IamFbAZmrE54rSXsp+xjzL+Kc7t+1U544j2SbB2n5oABYJM9cVviRuAg==","deviceSignature":"507K1t/ncvbNc1qAg3cjYzl5+0QDgdl3hbi3yGOYR0GET44W3yu77jkMtvBMrdmMGIbS9acb8xXIZZwtKNV+gg=="},"signalIdentities":[{"identifier":{"name":"22550010488:5@s.whatsapp.net","deviceId":0},"identifierKey":{"type":"Buffer","data":"Bd1mRpDhncb6MBhMVmXmJjuuyaUKMyNaMj8pM+wIhJ4w"}}],"platform":"smba","lastAccountSyncTimestamp":1742447665,"myAppStateKeyId":"AAAAALLi"}",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : true,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : true,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "private",
  OWNER_NAME: process.env.OWNER_NAME || " 𝙎-𝙏𝞢𝞜",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "2250150010488",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
  YTDL_NO_UPDATE: process.env.YTDL_NO_UPDATE !== undefined ? process.env.YTDL_NO_UPDATE === 'true' : true,
};


module.exports = config;
