const Sentiment = require("sentiment");
const s = new Sentiment();

function detect(text){
    const result = s.analyze(text);

    if(result.score > 0) return "positive";
    if(result.score < 0) return "negative";
    return "neutral";
}

module.exports = { detect };