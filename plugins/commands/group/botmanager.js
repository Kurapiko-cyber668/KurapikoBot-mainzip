const config = {
    name: "botmanager",
    description: "Bot introduction when joining groups",
    usage: "",
    cooldown: 5,
    permissions: [0],
    credits: "CrisJhon",
};

const langData = {
    en_US: {
        introduction: `🤖 Hello @everyone! I'm your friendly bot!

👨‍💻 Developer: Cris Jhon Deguiñon
🎯 Purpose: To help manage and entertain this group
📞 Contact: For more info or anything you need, contact: https://www.facebook.com/crisjhon.dev/

Feel free to use me and have fun!`,

        welcomeMessage: `🎉 Welcome to the group! I'm here to help and entertain you all!`,

        status: `🤖 **Bot Status**

👋 Introduction: Auto on join
🎯 Ready to serve!`
    }
};

const introducedGroups = new Set();

function handleBotJoin(threadID) {
    if (introducedGroups.has(threadID)) return;

    setTimeout(() => {
        const introduction = langData.en_US.introduction;

        global.api.sendMessage(introduction, threadID, (err) => {
            if (err) {
                console.error('Introduction error:', err);
            } else {
                console.log(`Bot introduced itself in group ${threadID}`);
                introducedGroups.add(threadID);
            }
        });
    }, 3000);
}

function handleParticipantChange(event) {
    if (event.type === 'event' && event.logMessageType === 'log:subscribe') {
        const threadID = event.threadID;
        const addedParticipants = event.logMessageData.addedParticipants;

        if (!addedParticipants || !Array.isArray(addedParticipants)) return;

        const botWasAdded = addedParticipants.some(participant => 
            participant.userFbId === global.botID
        );

        if (botWasAdded) {
            handleBotJoin(threadID);
            return; // Skip welcome message for other users when bot is added
        }

        const humanParticipants = addedParticipants.filter(participant => 
            participant.userFbId !== global.botID
        );

        if (humanParticipants.length > 0) {
            setTimeout(() => {
                const welcomeMsg = langData.en_US.welcomeMessage;

                const mentions = humanParticipants.map(participant => ({
                    tag: `@${participant.fullName}`,
                    id: participant.userFbId
                }));

                const welcomeText = `${mentions.map(m => m.tag).join(', ')}\n\n${welcomeMsg}`;

                global.api.sendMessage({
                    body: welcomeText,
                    mentions: mentions
                }, threadID, (err) => {
                    if (err) console.error('Welcome message error:', err);
                });
            }, 2000);
        }
    }
}

function initializeIntroduction() {
    if (!global.api || !global.api.listenMqtt) {
        console.error('API not available for bot introduction system');
        return;
    }

    global.api.listenMqtt((err, event) => {
        if (err) return;
        handleParticipantChange(event);
    });

    console.log('🤖 Bot introduction system activated');
}

// Initialize only if running as main module
if (typeof module !== 'undefined' && require.main === module) {
    initializeIntroduction();
}

async function onCall({ message, getLang }) {
    const { threadID, isGroup } = message;

    if (isGroup) {
        return message.reply(langData.en_US.introduction);
    } else {
        return message.reply(langData.en_US.introduction);
    }
}

export default {
    config,
    langData,
    onCall,
    initializeIntroduction // Export so it can be called externally
};