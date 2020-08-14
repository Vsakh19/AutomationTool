let data;
const chooseAllButton = document.querySelector('.chooseAllCheckers');
const mailButton = document.querySelector('.mailingButton');
const mailField = document.querySelector('.mailingText');


chooseAllButton.addEventListener('click', ()=>{
    if (chooseAllButton.classList.contains('set')){
        document.querySelectorAll('.userData__checkbox').forEach(elem=>{
            if (elem.checked){
                elem.click();
            }
        })
    }
    else {
        document.querySelectorAll('.userData__checkbox').forEach(elem=>{
            if (!elem.checked){
                elem.click();
            }
        })
    }
    chooseAllButton.classList.toggle('set');
});

mailButton.addEventListener('click', ()=>{
    const usersArray = Array.from(document.querySelectorAll('.userData')).filter(elem=>{
        return elem.querySelector('.userData__checkbox').checked
    })
    const usersIdArray = [];
    usersArray.forEach(elem=>{
        usersIdArray.push(elem.querySelectorAll('td')[1].innerText)
    })
    chrome.runtime.sendMessage({'startMailing': true, 'text': mailField.value, 'users': usersIdArray});
});

function launch(){
    data.forEach(elem=>{
        insertRow(buildPost(elem));
    })
}

function buildPost(data) {
    const insertTr = `<tr class="userData">
                    <td><input class="userData__checkbox" type="checkbox"></td>
                    <td>${data.Username}</td>
                    <td><a href=${'https://openland.com/' + data.Username}>${'https://openland.com/' + data.Username}</a></td>
                    <td>${data['First name']}</td>
                    <td>${data['Last name']}</td>
                    <td>${data.About}</td>
                    <td><a href=${data.Email}>${data.Email}</a></td>
                    <td>${data['Primary organisation']}</td>
                    <td><a href=${data.Website}>${data.Website}</a></td>
                    <td><a href=${data.Twitter}>${data.Twitter}</a></td>
                    <td>${data.Location}</td>
                    <td><a href=${data.LinkedIn}>${data.LinkedIn}</a></td>
                    <td><a href=${data['Photo link']}>${data['Photo link']}</a></td>
                </tr>`;
    return insertTr;
}

function insertRow(row){
    const table = document.querySelector('.usersTable');
    table.innerHTML += row;
}

chrome.runtime.sendMessage({'getData': true, 'dataStore': 'Openland Users', 'key': 'Username'});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if (request.data){
        if (request.data !== 'Error'){
            data = request.data;
            launch()
        }
        else {
            alert('Database error')
        }
    }
});