const submit = document.querySelector('.mainForm__submit');
const links = document.querySelector('.mainForm__links');
const date = document.querySelector('.mainForm__date');
const local = document.querySelector('.mainForm__localPage');

local.addEventListener('click', ()=>{
    chrome.runtime.sendMessage({'openLocal': true});
});

submit.addEventListener('click', ()=>{
    chrome.runtime.sendMessage({'launch': true, "links": links.value.split('\n'), "date": (new Date(date.value).getTime() / 1000).toFixed(0)});
});

links.addEventListener('input', ()=>{
    chrome.runtime.sendMessage({'newInput': links.value});
});

chrome.runtime.sendMessage({'getInput': 'Tell me'}, function (response) {
    links.value = response.currentInput;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if (request.launch){
        launch();
    }
});