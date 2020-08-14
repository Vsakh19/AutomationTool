let dataJSON;

function launch() {
    try {
        const dataReactions = getReactions();
        insertReactions(dataReactions);
        sendResult();
    } catch (e) {
        chrome.runtime.sendMessage({'getReactions': true});
    }
}

function getReactions(){
    const reactions = {
        "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/dOJFaVZihS_.png" : "like",
        "https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/emi3_1IpGVz.png": "heart",
        "https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/qZOYbiV8BHS.png": "wow",
        "_59aq img sp__898HEjgyw5 sx_7423ee": "depressed",
        "https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/p_-PTXnrxIv.png": "holdingHeart",
        "_59aq img sp__898HEjgyw5 sx_16feb0": "sad",
        "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/yzxDz4ZUD49.png": "laugh",
    };
    let reactionsArray;
    if (document.querySelector('li.be')){
        reactionsArray = Array.from(document.querySelectorAll('li.be'));
    }
    else {
        reactionsArray = Array.from(document.querySelectorAll('li.bd'));
    }
    let result = {};
    reactionsArray.forEach((elem)=>{
        const profileLink = 'https://www.facebook.com' + elem.querySelector("a").getAttribute('href');
        if (!profileLink.includes('/ufi/reaction/')){
            result[profileLink] = reactions[elem.querySelectorAll('img')[1].getAttribute('src')];
        }
    });
    return result
}

function insertReactions(dataReactions){
    dataJSON.reactions = dataReactions;
}

function sendResult(){
    console.log(dataJSON);
    chrome.runtime.sendMessage({'resultJSON': JSON.stringify(dataJSON), 'getReactions': true, 'dataStore': 'Facebook Posts', 'key': 'id'});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if (request.launch){
        dataJSON = request.dataJSON;
        launch();
    }
});



/*async function launch() {
    try {
        await scrollDown()
            .then(() => {
                console.log("getReactions");
                return getReactions();
            })
            .then(dataReactions => {
                console.log("sendResult");
                insertReactions(dataReactions);
                sendResult();
            })
            .catch(err => console.log(err));
        console.log('dfdsfsd');
    } catch (e) {
        chrome.runtime.sendMessage({'resultJSON': 'None', 'noContent': true});
    }
}

async function scrollDown() {
    return new Promise((resolve) => {
        let positionY = window.pageYOffset;
        window.scrollTo(0,document.body.scrollHeight);
        setTimeout(()=>{
            console.log("scrollFinished");
            if (positionY !== window.pageYOffset){
                resolve(scrollDown())
            }
            else {
                const moreButton = document.querySelector('.touchable.primary');
                if (moreButton){
                    moreButton.click();
                    setTimeout(()=>{
                        resolve(scrollDown())
                    }, 1500)
                }
                else {
                    resolve(console.log('finish'))
                }
            }
        }, 650);
    })
}*/