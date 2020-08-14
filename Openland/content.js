async function launch(){
    await asyncIntervalChatLoaded(500);
    document.querySelector('.x.css-hjo28z').click();
    await asyncIntervalListLoaded(500);
    await getUsers();
}

async function getUsers(startFrom = 0){
    const goNext = await scrollDown(startFrom);
    console.log(goNext);
    for(const elem of goNext[0]){
        await getProfileData(elem);
    }
    if (goNext[1]){
        await getUsers(goNext[2]);
    }
    else {
        chrome.runtime.sendMessage({'openLocal': true, 'url': "./Openland/users.html"});
    }
}

async function getProfileData(profileBlock){
    const userName = profileBlock.querySelector('.e1cabo3').innerText;
    console.log('open');
    profileBlock.querySelector('.css-14hassd.x.css-1u00xby.css-nil.css-1bra98r' +
        '.css-1jw2j5g.css-fxshz5.css-15vwvgz').click();
    await asyncIntervalProfileLoaded(userName, 500);
    console.log('get');
    getData();
    console.log('close');
    document.querySelectorAll('[style="--ripple-size:40px; --icon-size:24px;' +
        ' --ripple-color:var(--backgroundTertiaryTrans); --hover-ripple-color:var(--backgroundTertiaryTrans);' +
        ' --default-ripple-color:none;"]')[2].click();
    await asyncIntervalProfileUnloaded(userName, 300)
}

function getData(){
    const template = {
        'First name': '',
        'Last name': '',
        'Primary organisation': '',
        'About': '',
        'Username': '',
        'Website': '',
        'Email': '',
        'Location': '',
        'Twitter': '',
        'LinkedIn': '',
        'Photo link': '',
    };
    const infoBlock = document.querySelectorAll('.css-13wl1jm.x.css-17yp9z5')[1];
    if (infoBlock.querySelector('.taam79d').innerText.split(' ')[0]){
        template['First name'] = infoBlock.querySelector('.taam79d').innerText.split(' ')[0];
    }
    if (infoBlock.querySelector('.taam79d').innerText.split(' ')[1]){
        template['Last name'] = infoBlock.querySelector('.taam79d').innerText.split(' ')[1];
    }
    try{
        template['Primary organisation'] = infoBlock.querySelector('.e1cabo3').innerText;
    }
    catch (e) {}
    try {
        template['About'] = infoBlock.querySelector('.css-1a9xfbz.x.css-c1fjig.css-heqg99.css-drasxj.css-au5gqo').innerText
    }
    catch (e) {}
    infoBlock.querySelectorAll('.css-axzm53.x').forEach(elem=>{
        if (elem.querySelectorAll('div')[0].innerText in template){
            template[elem.querySelectorAll('div')[0].innerText] = elem.querySelectorAll('div')[1].innerText
        }
    })
    template['Username'] = window.location.href.split('https://openland.com/')[1];
    try {
        template['Photo link'] = infoBlock.querySelector('img').src;
    }
    catch (e) {}
    console.log(template);
    sendMsg(template);
}

async function scrollDown(startFrom){
    const usersAmount = parseInt(document.querySelectorAll('.taam79d')[1].innerText.split(' ')[0]);
    console.log(usersAmount);
    let users;
    const currentCounter = Array.from(document.querySelectorAll('.x')).filter(elem=>{
        return (elem.classList.value === 'x' && elem.querySelector('.css-14hassd.x.css-1u00xby.css-nil.css-1bra98r.css-1jw2j5g.css-fxshz5.css-15vwvgz')
            && elem.querySelector('.x.css-1xjs42k'))
    }).length/2;
    document.querySelectorAll('.njzcfg.ncgntdh')[3].scrollTo(0, document.querySelectorAll('.njzcfg.ncgntdh')[3].scrollHeight);
    await asyncIntervalScroll(500, currentCounter, usersAmount);
    users = [];
    let counter = 0;
    document.querySelectorAll('.x').forEach(elem=>{
    if(elem.classList.value === 'x' && elem.querySelector('.css-14hassd.x.css-1u00xby.css-nil.css-1bra98r.css-1jw2j5g.css-fxshz5.css-15vwvgz')
        && elem.querySelector('.x.css-1xjs42k')){
        if (counter === 1){
            users.push(elem);
            counter = 0;
        }
        else {
            counter = 1;
        }
    }
    })
    const len = users.length;
    users.splice(0, startFrom);
    if (Array.from(document.querySelectorAll('.x')).filter(elem=>{
        return (elem.classList.value === 'x' && elem.querySelector('.css-14hassd.x.css-1u00xby.css-nil.css-1bra98r.css-1jw2j5g.css-fxshz5.css-15vwvgz')
            && elem.querySelector('.x.css-1xjs42k'))
    }).length/2 < usersAmount){
        return [users, true, len]
    }
    else {
        return [users, false, len]
    }
}

function sendMsg(obj) {
    chrome.runtime.sendMessage({'resultJSON': JSON.stringify(obj), 'dataStore': 'Openland Users', 'key': 'Username'});
}

async function sendMail(text){
    await asyncIntervalProfileToMailLoaded(500);
    document.querySelector('.x.css-129mtf1').querySelector('.x.css-flegcu').querySelector('.x').click();
    await asyncIntervalDMLoaded(500);
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(text)
                .then(() => {
                    document.execCommand('paste');
                    asyncTimeout(2000)
                        .then(()=>{
                            document.querySelectorAll('.css-dw3c54.x.css-6jccmd.css-184se4u')[3].click();
                            asyncTimeout(1000)
                                .then(()=>{
                                    chrome.runtime.sendMessage({'goNext': true});
                                })
                        })
                })
        }
    })
}

function asyncIntervalDMLoaded(ms) {
    return new Promise(resolve => {
        const timer = setInterval(()=>{
            console.log('not loaded');
            if (document.querySelector('.qg1zlr3.scroll-container.h1ql3quy.qig57ga')){
                console.log('loaded');
                clearInterval(timer);
                resolve();
            }
        }, ms)
    })
}

function asyncIntervalScroll(ms, currentCounter, usersAmount){
    return new Promise(resolve => {
        const timer = setInterval(()=>{
            console.log('not now');
            if (Array.from(document.querySelectorAll('.x')).filter(elem=>{
                return (elem.classList.value === 'x' && elem.querySelector('.css-14hassd.x.css-1u00xby.css-nil.css-1bra98r.css-1jw2j5g.css-fxshz5.css-15vwvgz')
                    && elem.querySelector('.x.css-1xjs42k'))
            }).length/2 > currentCounter || currentCounter === usersAmount){
                console.log('now');
                clearInterval(timer);
                resolve();
            }
        }, ms)
    })
}

function asyncIntervalProfileToMailLoaded(ms) {
    return new Promise(resolve => {
        const timer = setInterval(()=>{
            console.log('not loaded');
            if (document.querySelector('.theoppr')){
                console.log('loaded');
                clearInterval(timer);
                resolve();
            }
        }, ms)
    })
}

function asyncIntervalProfileLoaded(checkName, ms) {
    return new Promise(resolve => {
        const timer = setInterval(()=>{
            console.log('not loaded');
            if (document.querySelectorAll('.css-13wl1jm.x.css-17yp9z5')[1].querySelector('.taam79d').innerText === checkName){
                console.log('loaded');
                clearInterval(timer);
                resolve();
            }
        }, ms)
    })
}

function asyncIntervalListLoaded(ms) {
    return new Promise(resolve => {
        const timer = setInterval(()=>{
            console.log('List not loaded');
            if (document.querySelectorAll('.theoppr')[2]){
                console.log('List loaded');
                clearInterval(timer);
                resolve();
            }
        }, ms)
    })
}

function asyncIntervalProfileUnloaded(checkName, ms) {
    return new Promise(resolve => {
        const timer = setInterval(()=>{
            console.log('loaded');
            if (document.querySelectorAll('.css-13wl1jm.x.css-17yp9z5')[1].querySelector('.taam79d').innerText !== checkName || !document.querySelectorAll('.theoppr')[3]){
                console.log('unloaded');
                clearInterval(timer);
                resolve();
            }
        }, ms)
    })
}

function asyncIntervalChatLoaded(ms){
    return new Promise(resolve => {
        const timer = setInterval(()=>{
            console.log('chat not loaded');
            if (document.querySelector('.tt9fa6c')){
                console.log('chat loaded');
                clearInterval(timer);
                resolve();
            }
        }, ms)
    })
}

function asyncTimeout(ms){
    return new Promise(resolve => {setTimeout(resolve, ms)})
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if (request.launch){
        launch();
    }
    if (request.text){
        sendMail(request.text);
    }
});