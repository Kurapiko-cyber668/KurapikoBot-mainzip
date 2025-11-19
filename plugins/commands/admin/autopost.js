const config = {
    name: "post",
    description: "Auto post to Facebook (Admin only)",
    usage: "[content] or [image URL] [content]",
    cooldown: 10,
    permissions: [1, 2],
    credits: "Crisjhon",
};

const langData = {
    en_US: {
        noPermission: "❌ Only group admins can use this command!",
        noContent: "❌ Please provide content to post\nUsage: !autopost [content] or !autopost [image URL] [content]",
        posting: "📝 Posting to Facebook...",
        success: "✅ Successfully posted to Facebook!",
        error: "❌ Failed to post to Facebook. Please try again.",
        invalidImage: "❌ Invalid image URL provided"
    }
};

// Store admin IDs (you can add more admin IDs here)
const adminIDs = [
    "61578037937262", // Replace with your Facebook ID
    "61578037937262"  // Add more admin IDs as needed
];

function isAdmin(userID) {
    return adminIDs.includes(userID);
}

async function uploadImage(imageUrl) {
    try {
        // Download image from URL
        const response = await global.utils.getStreamFromURL(imageUrl);
        return response;
    } catch (error) {
        throw new Error('Failed to download image');
    }
}

async function onCall({ message, args, getLang }) {
    const { senderID, threadID, reply } = message;

    // Check if user is admin
    if (!isAdmin(senderID)) {
        return reply(getLang("noPermission"));
    }

    // Check if there's content to post
    if (args.length === 0) {
        return reply(getLang("noContent"));
    }

    try {
        await reply(getLang("posting"));

        let content = args.join(" ");
        let imageAttachment = null;

        // Check if first argument is an image URL
        const possibleImageUrl = args[0];
        if (possibleImageUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
            try {
                imageAttachment = await uploadImage(possibleImageUrl);
                // Remove image URL from content
                content = args.slice(1).join(" ");
            } catch (error) {
                return reply(getLang("invalidImage"));
            }
        }

        // Prepare the post data
        const postData = {
            message: content
        };

        // If there's an image, attach it
        if (imageAttachment) {
            postData.attachment = imageAttachment;
        }

        // Post to Facebook
        // Note: This uses the bot's Facebook account to post
        await global.api.sendMessage(postData, threadID);

        // Alternative method using Facebook Graph API (if available)
        // await postToFacebookTimeline(content, imageAttachment);

        return reply(getLang("success"));

    } catch (error) {
        console.error("Auto-post error:", error);
        return reply(getLang("error"));
    }
}

// Alternative function using Facebook Graph API (if you have app credentials)
async function postToFacebookTimeline(message, imageStream = null) {
    // You'll need to set up Facebook Graph API credentials
    const accessToken = process.env.FB_ACCESS_TOKEN; // Set this in your environment
    const pageId = process.env.FB_PAGE_ID; // Set this in your environment

    if (!accessToken || !pageId) {
        throw new Error('Facebook API credentials not configured');
    }

    let postData = {
        message: message,
        access_token: accessToken
    };

    // If there's an image, upload it first
    if (imageStream) {
        const formData = new FormData();
        formData.append('source', imageStream);
        formData.append('access_token', accessToken);
        
        const photoResponse = await global.utils.request({
            url: `https://graph.facebook.com/${pageId}/photos`,
            method: 'POST',
            formData: formData
        });
        
        const photoData = JSON.parse(photoResponse);
        postData.object_attachment = photoData.id;
    } else {
        // Post without image
        await global.utils.request({
            url: `https://graph.facebook.com/${pageId}/feed`,
            method: 'POST',
            formData: postData
        });
    }
}

export default {
    config,
    langData,
    onCall,
};