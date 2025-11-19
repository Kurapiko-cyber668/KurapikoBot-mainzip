const config = {
    name: "autogreet",
    description: "Auto greet people at different times of day",
    usage: "",
    cooldown: 5,
    permissions: [0],
    credits: "CrisJhon",
};

const langData = {
    en_US: {
        greetingMessages: {
            morning: [
                "Good morning everyone! 🌞 Have a wonderful day ahead!",
                "Rise and shine! ☀️ Hope you all have a productive morning!",
                "Morning everyone! 🌅 Let's make today amazing!",
                "Good morning! 🌞 Coffee time and great conversations!",
                "Hello everyone! A new beautiful morning has arrived! 🌄",
                "Wakey wakey! ⏰ Morning blessings to all!",
                "Sunshine and smiles! 😊 Good morning everyone!"
            ],
            afternoon: [
                "Good afternoon everyone! ☀️ Hope you're having a great day!",
                "Afternoon greetings! 🕑 How's everyone doing?",
                "Hello everyone! 🌞 Hope your afternoon is going well!",
                "Good afternoon! ☕ Time for a break maybe?",
                "Afternoon everyone! 🌇 Halfway through the day!",
                "Lunch break over? 🍽️ Good afternoon all!",
                "Afternoon vibes! 💫 Hope you're all doing great!"
            ],
            evening: [
                "Good evening everyone! 🌙 Hope you had a great day!",
                "Evening greetings! 🌆 Time to relax and unwind!",
                "Hello everyone! 🌃 How was your day?",
                "Good evening! 🌠 Hope you have a peaceful night!",
                "Evening everyone! 🌜 Great to see you all here!",
                "Day is done! 🌛 Good evening friends!",
                "Evening blessings! ✨ Hope you had a productive day!"
            ]
        }
    },
    vi_VN: {
        greetingMessages: {
            morning: [
                "Chào buổi sáng mọi người! 🌞 Chúc một ngày tuyệt vời!",
                "Thức dậy thôi! ☀️ Chúc mọi người có một buổi sáng hiệu quả!",
                "Buổi sáng tốt lành! 🌅 Hãy cùng làm hôm nay thật tuyệt vời!",
                "Chào buổi sáng! 🌞 Đến giờ cà phê và những cuộc trò chuyện thú vị!",
                "Xin chào mọi người! Một buổi sáng tươi đẹp mới đã bắt đầu! 🌄",
                "Dậy nào nào! ⏰ Chúc buổi sáng an lành!",
                "Nắng và nụ cười! 😊 Chào buổi sáng mọi người!"
            ],
            afternoon: [
                "Chào buổi chiều mọi người! ☀️ Hy vọng mọi người đang có một ngày tốt lành!",
                "Lời chào buổi chiều! 🕑 Mọi người thế nào rồi?",
                "Xin chào mọi người! 🌞 Hy vọng buổi chiều của mọi người đang diễn ra tốt đẹp!",
                "Chào buổi chiều! ☕ Có lẽ đến lúc nghỉ ngơi một chút?",
                "Buổi chiều tốt lành! 🌇 Đã qua nửa ngày rồi!",
                "Nghỉ trưa xong chưa? 🍽️ Chào buổi chiều!",
                "Năng lượng buổi chiều! 💫 Hy vọng mọi người đều ổn!"
            ],
            evening: [
                "Chào buổi tối mọi người! 🌙 Hy vọng mọi người đã có một ngày tuyệt vời!",
                "Lời chào buổi tối! 🌆 Đến lúc thư giãn và nghỉ ngơi!",
                "Xin chào mọi người! 🌃 Ngày hôm nay của mọi người thế nào?",
                "Chào buổi tối! 🌠 Chúc mọi người có một đêm bình yên!",
                "Buổi tối tốt lành! 🌜 Thật vui khi thấy mọi người ở đây!",
                "Ngày kết thúc! 🌛 Chào buổi tối các bạn!",
                "Chúc buổi tối an lành! ✨ Hy vọng bạn đã có một ngày làm việc hiệu quả!"
            ]
        }
    },
    ar_SY: {
        greetingMessages: {
            morning: [
                "صباح الخير جميعاً! 🌞 أتمنى لكم يوماً رائعاً!",
                "استيقظوا وانتبهوا! ☀️ أتمنى لكم صباحاً منتجاً!",
                "صباح الخير جميعاً! 🌅 لنجعل هذا اليوم مذهلاً!",
                "صباح الخير! 🌞 وقت القهوة والمحادثات الرائعة!",
                "مرحباً جميعاً! لقد وصل صباح جميل جديد! 🌄",
                "انهضوا! ⏰ صباح الخير للجميع!",
                "شمس وابتسامات! 😊 صباح الخير جميعاً!"
            ],
            afternoon: [
                "مساء الخير جميعاً! ☀️ أتمنى أنكم تقضون يوماً رائعاً!",
                "تحيات الظهر! 🕑 كيف حال الجميع؟",
                "مرحباً جميعاً! 🌞 أتمنى أن مساءكم يسير على ما يرام!",
                "مساء الخير! ☕ ربما حان وقت الاستراحة؟",
                "مساء الخير جميعاً! 🌇 لقد مضى نصف اليوم!",
                "انتهى استراحة الغداء؟ 🍽️ مساء الخير للجميع!",
                "طاقة الظهيرة! 💫 أتمنى أنكم جميعاً بخير!"
            ],
            evening: [
                "مساء الخير جميعاً! 🌙 أتمنى أنكم قضيتم يوماً رائعاً!",
                "تحيات المساء! 🌆 حان الوقت للاسترخاء والراحة!",
                "مرحباً جميعاً! 🌃 كيف كان يومكم؟",
                "مساء الخير! 🌠 أتمنى لكم ليلة هادئة!",
                "مساء الخير جميعاً! 🌜 يسعدني رؤيتكم جميعاً هنا!",
                "انتهى النهار! 🌛 مساء الخير أصدقائي!",
                "بركات المساء! ✨ أتمنى أنكم قضيتم يوماً منتجاً!"
            ]
        }
    }
};

const lastGreetingTime = new Map();

function getRandomGreeting(timeOfDay, language) {
    const greetings = langData[language]?.greetingMessages?.[timeOfDay] || 
                     langData.en_US.greetingMessages[timeOfDay];
    return greetings[Math.floor(Math.random() * greetings.length)];
}

function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'evening';
}

// Auto-greet scheduler
function startAutoGreetScheduler() {
    setInterval(() => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentDate = now.toDateString();
        
        // Greet at specific times: 8:00, 13:00, 19:00
        const greetTimes = [
            { hour: 7, minute: 0, period: 'morning' },
            { hour: 13, minute: 0, period: 'afternoon' },
            { hour: 21, minute: 0, period: 'evening' }
        ];

        for (const greetTime of greetTimes) {
            if (hour === greetTime.hour && minute === greetTime.minute) {
                const timeOfDay = greetTime.period;
                

                const activeThreads = global.data?.threads?.keys() || [];
                
                for (const threadID of activeThreads) {

                    const threadKey = `${threadID}_${timeOfDay}_${currentDate}`;
                    
                    if (!lastGreetingTime.has(threadKey)) {
                        const language = global.data?.threads?.get(threadID)?.info?.language || 'en_US';
                        const greeting = getRandomGreeting(timeOfDay, language);
                        
                        global.api.sendMessage(greeting, threadID, (err) => {
                            if (err) {
                                console.error('Auto-greet error in thread', threadID, err);
                            } else {
                                console.log(`Auto-greet sent to thread ${threadID} for ${timeOfDay}`);
                            }
                        });
                        

                        lastGreetingTime.set(threadKey, true);
                    }
                }
                
                for (const [key] of lastGreetingTime) {
                    if (!key.includes(currentDate)) {
                        lastGreetingTime.delete(key);
                    }
                }
                
                break;
            }
        }
    }, 60000);
}

startAutoGreetScheduler();

async function onCall({ message, getLang }) {
    const currentTime = getTimeOfDay();
    const greeting = getRandomGreeting(currentTime, getLang().en_US ? 'en_US' : 'vi_VN');
    
    return message.reply(`Current auto-greet status: Active\nNext greetings at:\n🌞 8:00 AM\n☀️ 1:00 PM\n🌙 7:00 PM\n\nCurrent ${currentTime} greeting:\n${greeting}`);
}

export default {
    config,
    langData,
    onCall,
};