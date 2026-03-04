let chats = [];

function save(user,msg,mood){
    chats.push({
        user,
        msg,
        mood,
        time:new Date()
    });
}

function history(user){
    return chats.filter(c => c.user === user);
}

module.exports = { save, history };