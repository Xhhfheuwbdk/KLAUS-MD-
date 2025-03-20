import dotenv from 'dotenv';
dotenv.config();

import {
    makeWASocket,
    Browsers,
    fetchLatestBaileysVersion,
    DisconnectReason,
    useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './src/event/index.js';
import express from 'express';
import pino from 'pino';
import fs from 'fs';
import NodeCache from 'node-cache';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment-timezone';
import axios from 'axios';
import config from './config.cjs';
import pkg from './lib/autoreact.cjs';
const { emojis, doReact } = pkg;

const sessionName = "session";
const app = express();
const orange = chalk.bold.hex("#FFA500");
const lime = chalk.bold.hex("#32CD32");
let useQR = false;
let initialConnection = true;
const PORT = process.env.PORT || 3000;

const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
}

async function downloadSessionData() {
    if (!config.SESSION_ID) {
        console.error('{'{"noiseKey":{"private":{"type":"Buffer","data":"eOl6e2BxqZj7DL+hgaoYbqMbmfCvvULb0x7I4J5Sh3w="},"public":{"type":"Buffer","data":"VmnVn6HqmkxozXTwVFgVkbmyec+P5yG6Kwh5WiXEVyg="}},"pairingEphemeralKeyPair":{"private":{"type":"Buffer","data":"KIKjByJFlInNztxVsjCwP9Lj93KnkbxSXbmRsk5OoHk="},"public":{"type":"Buffer","data":"JZjJnua86LrAqd81mdfOGlP2iXAIOCHZQpNmhMmJHxg="}},"signedIdentityKey":{"private":{"type":"Buffer","data":"uKi6w4iA+yGnO+Pv1Yi/gTF7D9Uurb6ltpvBl+08Mk4="},"public":{"type":"Buffer","data":"K724LcAfuv2MpO+rpnSHEu/3AUVCbt4Mbpz3OApVHko="}},"signedPreKey":{"keyPair":{"private":{"type":"Buffer","data":"iD3xAnCo94wDzzjPwUfIqTidZ4kUnTvEV8fllANBpHI="},"public":{"type":"Buffer","data":"kcb2S0FnMGxFI9oAgESh/RuqcIkRkLrAEfJ4ynw35AE="}},"signature":{"type":"Buffer","data":"mnACHV3a5modln+VTc5oFYARHPGeg+Ld3jgkkMl8Iv8UNhh1kW1o45NBAu18mE27kToeJGPjBZ6o7wpHQi+vgQ=="},"keyId":1},"registrationId":94,"advSecretKey":"lxp4y13zCyz/l1QScbifKfq3n/BCLR3ynGRLlYDxqHI=","processedHistoryMessages":[{"key":{"remoteJid":"22550010488@s.whatsapp.net","fromMe":true,"id":"ACB52388E3810B9A32A81983A615F453"},"messageTimestamp":1742447672},{"key":{"remoteJid":"22550010488@s.whatsapp.net","fromMe":true,"id":"C3D9E8B1904DD03BD1A32738CC0E8F06"},"messageTimestamp":1742447673}],"nextPreKeyId":31,"firstUnuploadedPreKeyId":31,"accountSyncCounter":1,"accountSettings":{"unarchiveChats":false},"deviceId":"9Akd7xSNTcOGcwBjUHFzDw","phoneId":"3f435ad0-0c99-4500-8ab1-e25655225f0f","identityId":{"type":"Buffer","data":"va52ShrHIYYn4XZCSfvGA4naflU="},"registered":true,"backupToken":{"type":"Buffer","data":"pPi2b6PBBuyYTXCxMlPpPU6FQPo="},"registration":{},"pairingCode":"CDWSXW79","me":{"id":"22550010488:5@s.whatsapp.net","name":"饾悎饾悊饾悜饾悎饾悞 饾悊饾悜饾悎饾悓饾悓","lid":"105381888012306:5@lid"},"account":{"details":"CNeEsMQEEK3I7r4GGAUgACgA","accountSignatureKey":"3WZGkOGdxvowGExWZeYmO67JpQozI1oyPykz7AiEnjA=","accountSignature":"A8Zt4H58hB5CJmgnH9aTaAxBqt64i5IamFbAZmrE54rSXsp+xjzL+Kc7t+1U544j2SbB2n5oABYJM9cVviRuAg==","deviceSignature":"507K1t/ncvbNc1qAg3cjYzl5+0QDgdl3hbi3yGOYR0GET44W3yu77jkMtvBMrdmMGIbS9acb8xXIZZwtKNV+gg=="},"signalIdentities":[{"identifier":{"name":"22550010488:5@s.whatsapp.net","deviceId":0},"identifierKey":{"type":"Buffer","data":"Bd1mRpDhncb6MBhMVmXmJjuuyaUKMyNaMj8pM+wIhJ4w"}}],"platform":"smba","lastAccountSyncTimestamp":1742447665,"myAppStateKeyId":"AAAAALLi"}');
        return false;
    }
    const sessdata = config.SESSION_ID.split("WJFQmThL#Jz-573-nkJRAFqyqsWVCnp9mc7Xpo-nr8wShzzs35d1Y#")[1];
    const url = `https://pastebin.com/raw/${sessdata}`;
    try {
        const response = await axios.get(url);
        const data = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        await fs.promises.writeFile(credsPath, data);
        console.log("🔒 Session Successfully Loaded !!");
        return true;
    } catch (error) {
       // console.error('Failed to download session data:', error);
        return false;
    }
}

async function start() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        console.log(`🤖 ❝𝐊𝐋𝐀𝐔𝐒-𝐌𝐃❞ using WA v${version.join('.')}, isLatest: ${isLatest}`);
        
        const Matrix = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: useQR,
            browser: ["KLAUS-MD", "safari", "3.3"],
            auth: state,
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id);
                    return msg.message || undefined;
                }
                return { conversation: "KLAUS-MD  whatsapp user bot" };
            }
        });

        Matrix.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                    start();
                }
            } else if (connection === 'open') {
                if (initialConnection) {
                    console.log(chalk.green("❝𝐊𝐋𝐀𝐔𝐒-𝐌𝐃❞ ᴄᴏɴɴᴇᴄᴛᴇᴅ"));
                    Matrix.sendMessage(Matrix.user.id, { text: `ʜɪ ᴛʜᴀɴᴋ ʏᴏᴜ ꜰᴏʀ ᴄʜᴏᴏꜱɪɴɢ ❝𝐊𝐋𝐀𝐔𝐒-𝐌𝐃❞ ᴀꜱ ʏᴏᴜʀ ʙᴏᴛ ɪ ᴡɪꜱʜ ʏᴏᴜ ᴛʜᴇ ʙᴇꜱᴛ.` });
                    initialConnection = false;
                } else {
                    console.log(chalk.blue("♻️ Connection reestablished after restart."));
                }
            }
        });

        Matrix.ev.on('creds.update', saveCreds);

        Matrix.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Matrix, logger));
        Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
        Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

        if (config.MODE === "public") {
            Matrix.public = true;
        } else if (config.MODE === "private") {
            Matrix.public = false;
        }

        Matrix.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                const mek = chatUpdate.messages[0];
                if (!mek.key.fromMe && config.AUTO_REACT) {
                    console.log(mek);
                    if (mek.message) {
                        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                        await doReact(randomEmoji, mek, Matrix);
                    }
                }
            } catch (err) {
                console.error('Error during auto reaction:', err);
            }
        });
    } catch (error) {
        console.error('Critical Error:', error);
        process.exit(1);
    }
}

async function init() {
    if (fs.existsSync(credsPath)) {
        console.log("🔒 Session file found, proceeding without QR code.");
        await start();
    } else {
        const sessionDownloaded = await downloadSessionData();
        if (sessionDownloaded) {
            console.log("🔒 Session downloaded, starting bot.");
            await start();
        } else {
            console.log("No session found or downloaded, QR code will be printed for authentication.");
            useQR = true;
            await start();
        }
    }
}

init();

app.get('/', (req, res) => {
    res.send('❝𝐊𝐋𝐀𝐔𝐒-𝐌𝐃❞ ONLINE ☑️');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
