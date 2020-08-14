/*Facebook*/
let maxDate;
let links;
let nextLink = 0;
let currentLink = 0;
let pagePosts = [[], 0];

/*Openland*/
let userList;
let text;
let nextUser;

function addToDB(data, datastore, key) {
    let openRequest = indexedDB.open("SNStore", 1);

    openRequest.onupgradeneeded = function () {
        let db = openRequest.result;
        db.createObjectStore('Facebook Posts', {keyPath: 'id', autoIncrement: true});
        db.createObjectStore('Openland Users', {keyPath: 'Username', autoIncrement: true});
    };

    openRequest.onerror = function () {
        console.error("Error", openRequest.error);
    };

    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let newTransaction = db.transaction([datastore], 'readwrite');
        let postsStore = newTransaction.objectStore(datastore);
        let request = postsStore.put(JSON.parse(data), data[key]);
        request.onsuccess = function (event) {
            console.log("Value added!");
        };
        newTransaction.oncomplete = function (event) {
            console.log("All done!");
        };

        newTransaction.onerror = function (event) {
            console.log("Error!");
        };
    };
}

async function getPosts(datastore, key){
    let openRequest = indexedDB.open("SNStore", 1);
    openRequest.onupgradeneeded = function () {
        let db = openRequest.result;
        db.createObjectStore('Facebook Posts', {keyPath: 'id', autoIncrement: true});
        db.createObjectStore('Openland Users', {keyPath: 'Username', autoIncrement: true});
    };

    openRequest.onerror = function () {
        console.error("Error", openRequest.error);
        return 'Error'
    };

    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let newTransaction = db.transaction([datastore], 'readwrite');
        let postsStore = newTransaction.objectStore(datastore);
        const allPosts = postsStore.getAll();
        allPosts.onsuccess = function () {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {"data": allPosts.result});
            });
        }
    };
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    /*Facebook*/
    if (request.dataJSON){
        console.log(request);
        pagePosts[0].push([request.dataJSON, request.reactionsLink]);
        addToDB(JSON.stringify(request.dataJSON), 'Facebook Posts', 'id');
        /*chrome.tabs.update({url: request.reactionsLink}, ()=>{});
        setTimeout(()=>{
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {"launch": true, "dataJSON": request.dataJSON});
            });
        }, 3000)*/
    }
    if (request.getReactions){
        console.log(pagePosts[0], pagePosts[1])
        if (pagePosts[0].length !== pagePosts[1]){
            chrome.tabs.update({url: pagePosts[0][pagePosts[1]][1]}, ()=>{});
            pagePosts[1] += 1;
            setTimeout(()=>{
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {"launch": true, "dataJSON": pagePosts[0][pagePosts[1]-1][0]});
                });
            }, 6000)
        }
        else {
            console.log(currentLink, nextLink)
            if (currentLink !== nextLink){
                pagePosts = [[], 0];
                chrome.tabs.update({url: links[nextLink]}, ()=>{});
                setTimeout(()=>{
                    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {"launch": true, "date": maxDate});
                    });
                }, 6000);
                currentLink += 1;
                if (nextLink < links.length-1) {
                    nextLink += 1;
                }
            }
            else {
                chrome.tabs.create({ url: chrome.runtime.getURL("./Facebook/feed.html") });
            }
        }
    }
    if (request.relaunch){
        setTimeout(()=>{
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {"launch": true});
            });
        }, 7000)
    }

    /*Openland*/

    if (request.startMailing){
        userList = request.users;
        text = request.text;
        chrome.tabs.create({ url: `https://openland.com/${userList[0]}` });
        nextUser = 1;
        setTimeout(()=>{
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {"text": text});
            });
        }, 3000)
    }
    if (request.goNext){
        if (userList.length > nextUser){
            chrome.tabs.update({ url: `https://openland.com/${userList[nextUser]}` });
            nextUser += 1;
            setTimeout(()=>{
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {"text": text});
                });
            }, 3000)
        }
    }


    /*Common*/
    if (request.launch){
        maxDate = request.date;
        links = request.links;
        nextLink = 0;
        currentLink = 0;
        chrome.tabs.update({url: links[nextLink]}, ()=>{});
        setTimeout(()=>{
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {"launch": true, "date": maxDate});
            });
        }, 7000);
        if (nextLink < links.length-1) {
            nextLink += 1;
        }
    }
    if(request.resultJSON){
        console.log(request);
        if(!request.noContent) {
            addToDB(request.resultJSON, request.dataStore, request.key);
        }
    }
    if (request.getData){
        getPosts(request.dataStore, request.key);
    }
    if (request.openLocal){
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            if (tabs[0].url.includes('facebook')){
                chrome.tabs.create({ url: chrome.runtime.getURL('./Facebook/feed.html') });
            }
            else if (tabs[0].url.includes('openland')){
                chrome.tabs.create({ url: chrome.runtime.getURL('./Openland/users.html') });
            }
        });
    }
    if (request.newInput){
        links = request.newInput.split('\n');
        console.log(links);
        nextLink = 0;
        currentLink = 0;
    }
    if (request.getInput){
        if (links){
            sendResponse({'currentInput': links.join('\n')})
        }
        else {
            sendResponse({'currentInput': ''})
        }
    }

    return true
});


chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {hostEquals: 'www.facebook.com', schemes: ['https'] },
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {hostEquals: 'openland.com', schemes: ['https'] },
                    }),
                ],
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});