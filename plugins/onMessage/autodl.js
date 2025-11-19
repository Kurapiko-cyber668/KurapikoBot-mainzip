const langData = {
    "en_US": {
        "download.tiktok.success": "{title}\n\n\n @{author}",
        "download.tiktok.error": "Failed to download TikTok video",
        "download.facebook.success": "{title}",
        "download.facebook.error": "Failed to download Facebook video"
    },
    "vi_VN": {
        "download.tiktok.success": "Tải TikTok thành công\nTiêu đề: {title}\nTác giả: {author}",
        "download.tiktok.error": "Không thể tải video TikTok",
        "download.facebook.success": "Tải Facebook thành công\nTiêu đề: {title}",
        "download.facebook.error": "Không thể tải video Facebook"
    }
};

import axios from 'axios';

async function downloadTikTok(url) {
    try {
        const response = await axios.get('https://tikwm.com/api/', {
            params: { url }
        });
        
        if (response.data.code !== 0) {
            throw new Error();
        }
        
        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        return {
            success: false
        };
    }
}

async function downloadFacebook(url) {
    try {
        const encodedUrl = encodeURIComponent(url);
        const response = await axios.get(`https://rapido.zetsu.xyz/api/fbdl?url=${encodedUrl}`);
        
        if (!response.data || !response.data.url) {
            throw new Error();
        }
        
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false
        };
    }
}

function isTikTokUrl(url) {
    const tiktokRegex = /^(https?:\/\/)?(www|vm|vt\.)?(tiktok\.com)\/[^\s]+$/;
    return tiktokRegex.test(url);
}

function isFacebookUrl(url) {
    const facebookRegex = /^(https?:\/\/)?(m|mtouch|www\.)?(facebook\.com|fb\.watch|fb\.com)\/[^\s]+$/;
    return facebookRegex.test(url);
}

async function onCall({ message, getLang, data }) {
    const inputText = message.body;
    
    if (message.senderID === global.botID) {
        return;
    }
    
    let url = null;
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = inputText.match(urlRegex);
    
    if (matches && matches.length > 0) {
        url = matches[0];
    }
    
    if (!url) {
        return;
    }
    
    if (isTikTokUrl(url)) {
        message.react("⏳");
        const result = await downloadTikTok(url);
        
        if (result.success) {
            const videoData = result.data;
            
            try {
                const stream = await axios({
                    method: 'get',
                    url: videoData.play,
                    responseType: 'stream'
                });
                
                await message.reply({
                    body: getLang("download.tiktok.success", {
                        title: videoData.title,
                        author: videoData.author.nickname
                    }),
                    attachment: stream.data
                });
                message.react("✅");
            } catch (error) {
                message.react("❌");
                return;
            }
        } else {
            message.react("❌");
            return;
        }
    } else if (isFacebookUrl(url)) {
        message.react("⏳");
        const result = await downloadFacebook(url);
        
        if (result.success) {
            const videoData = result.data;
            
            try {
                const stream = await axios({
                    method: 'get',
                    url: videoData.url,
                    responseType: 'stream'
                });
                
                await message.reply({
                    body: getLang("download.facebook.success", {
                        title: videoData.title || "Facebook Video"
                    }),
                    attachment: stream.data
                });
                message.react("✅");
            } catch (error) {
                message.react("❌");
                return;
            }
        } else {
            message.react("❌");
            return;
        }
    }
    
    return;
}

export default {
    langData,
    onCall
};
