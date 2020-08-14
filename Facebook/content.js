let maxTimestamp;

function launch() {
    checkVersion()
        .then(data=>{
            data.forEach(elem=>{
                const dataJSON = buildJSON(elem);
                sendMsg(dataJSON, elem[0]);
            })
            chrome.runtime.sendMessage({'getReactions': true});
        })
}

async function checkVersion() {
    if(document.querySelector('.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.oo9gr5id.gpro0wi8.lrazzd5p')){
        return await getData()

    }
    else {
        return await getDataOld()
    }
}

/*function getData(){
    const author = document.querySelector('.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.oo9gr5id.gpro0wi8.lrazzd5p');
    const authorName = document.querySelector('.oi732d6d.ik7dh3pa.d2edcug0.qv66sw1b.c1et5uql.a8c37x1j.muag1w35.enqfppq2.jq4qci2q.a3bd9o3v.knj5qynh.m9osqain.hzawbc8m').innerText;
    const authorLink = author.getAttribute('href');
    const link = window.location.href;
    const id = link.split('/')[link.split('/').length-1];
    const authorPic = document.querySelector('.oajrlxb2.gs1a9yip.g5ia77u1.mtkw9kbi.tlpljxtp.qensuy8j.ppp5ayq2.goun2846.ccm00jje.s44p3ltw.mk2mc5f4.rt8b4zig.n8ej3o3l.agehan2d.sk4xxmp2.rq0escxv.nhd2j8a9.q9uorilb.mg4g778l.btwxx1t3.pfnyh3mw.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.tgvbjcpo.hpfvmrgz.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.l9j0dhe7.i1ao9s8h.esuyzwwr.f1sip0of.du4w35lb.lzcic4wl.abiwlrkh.p8dawk7l.oo9gr5id')
        .querySelector("image").getAttribute('xlink:href');
    const date = getDate();
    let text;
    try {
        text = document.querySelector(".oi732d6d.ik7dh3pa.d2edcug0.qv66sw1b.c1et5uql.a8c37x1j.muag1w35.enqfppq2.jq4qci2q.a3bd9o3v.knj5qynh.oo9gr5id.hzawbc8m").innerText;
    }
    catch (e) {
        text = null;
    }
    let comments;
    try {
        comments = document.querySelectorAll(".oi732d6d.ik7dh3pa.d2edcug0.qv66sw1b.c1et5uql.a8c37x1j.muag1w35.enqfppq2.jq4qci2q.a3bd9o3v.knj5qynh.m9osqain")[1].innerText.split(' ')[1];
    }
    catch (e) {
        comments = 0;
    }
    let images = [];
    try {
        if (document.querySelector('.ni8dbmo4.stjgntxs.pmk7jnqg')){
            document.querySelectorAll('.ni8dbmo4.stjgntxs.pmk7jnqg').forEach(elem=>{
                images.push(elem.querySelector('img').getAttribute('src'))
            })
        }
        else {
            images.push(document.querySelector('.i09qtzwb.n7fi1qx3.datstx6m.pmk7jnqg.j9ispegn.kr520xx4.k4urcfbm.bixrwtb6').getAttribute('src'))
        }
    }
    catch (e) {
        images = [];
    }
    return [id, link, authorName, authorPic, authorLink, date, text, comments, images]
}*/

/*function getDataOld(){
    const author = document.querySelector('._5pb8.y_aaxplnl37._8o._8s.lfloat._ohe');
    const authorName = document.querySelector('.clearfix._42ef').querySelectorAll('a')[0].innerText;
    const authorLink = author.getAttribute('href');
    const link = window.location.href;
    const id = link.split('/')[link.split('/').length-1];
    const authorPic = document.querySelector('._s0._4ooo._5xib._5sq7._44ma._rw.img').getAttribute('src');
    const date = document.querySelector('._5ptz').getAttribute('data-utime');
    let text;
    try {
        text = document.querySelector('._5pbx.userContent._3ds9._3576').innerText;
    }
    catch (e) {
        text = null;
    }
    let comments;
    try {
        comments = document.querySelector("._3hg-._42ft").innerText.split(' ')[1];
    }
    catch (e) {
        comments = 0;
    }
    let images = [];
    try {
        if (document.querySelector('._5dec._xcx')) {
            document.querySelectorAll('._5dec._xcx').forEach(elem => {
                images.push(elem.getAttribute('data-ploi'))
            })
        } else {
            images.push(document.querySelector('._4-eo._2t9n').getAttribute('data-ploi'))
        }
    }
    catch (e) {
        images = [];
    }
    return [id, link, authorName, authorPic, authorLink, date, text, comments, images]
}*/


async function getData(){
    document.querySelectorAll('.hu5pjgll.lzf7d6o1')[1].click();
    await setTimeout(()=>{
        chrome.runtime.sendMessage({'relaunch': true});
        document.querySelectorAll('.oajrlxb2.gs1a9yip.g5ia77u1.mtkw9kbi.tlpljxtp' +
        '.qensuy8j.ppp5ayq2.goun2846.ccm00jje.s44p3ltw.mk2mc5f4.rt8b4zig.n8ej3o3l.agehan2d.sk4xxmp2.rq0escxv.nhd2j8a9' +
        '.a8c37x1j.mg4g778l.btwxx1t3.pfnyh3mw.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.tgvbjcpo.hpfvmrgz.jb3vyjys' +
        '.rz4wbd8a.qt6c0cv9.a8nywdso.l9j0dhe7.i1ao9s8h.esuyzwwr.f1sip0of.du4w35lb.lzcic4wl.abiwlrkh.p8dawk7l.ue3kfks5' +
        '.pw54ja7n.uo3d90p7.l82x9zwi')[5].click()
    }, 1000);
}

async function getDataOld(){
    const posts = await scrollDown();
    const dataArray = [];
    console.log(posts);
    posts.forEach(elem=>{
        dataArray.push(extractData(elem))
    })
    return dataArray;
}

function extractData(domElem){
    const author = domElem.querySelector('.fwn.fcg');
    const authorName = author.innerText;
    const authorLink = window.location.href;
    let link = 'https://www.facebook.com' + domElem.querySelector('._5pcq').getAttribute('href');
    let id = domElem.querySelector('[name=ft_ent_identifier]').getAttribute('value');
    if (id.includes('photo')){
        id = id.split('fbid=')[1].split('&')[0];
        link = authorLink + '/posts/' + id;
    }
    const authorPic = domElem.querySelector('._4-u2.mbm._4mrt._5jmm._5pat._5v3q._7cqq._4-u8').querySelector('._s0._4ooo._5xib._5sq7._44ma._rw.img').src;
    const date = JSON.parse(domElem.getAttribute('data-store')).timestamp;
    let text;
    try {
        if (!domElem.querySelector('.text_exposed_root')){
            text = domElem.querySelector('._4-u2.mbm._4mrt._5jmm._5pat._5v3q._7cqq._4-u8').querySelector('[data-testid="post_message"]').innerText;
        }
        else {
            domElem.querySelector('.text_exposed_root').classList.add('text_exposed');
            text = domElem.querySelector('._4-u2.mbm._4mrt._5jmm._5pat._5v3q._7cqq._4-u8').querySelector('[data-testid="post_message"]').innerText;
        }
    }
    catch (e) {
        text = null;
    }
    let comments;
    try {
        comments = domElem.querySelector("._3hg-._42ft").innerText.split(' ')[1];
    }
    catch (e) {
        comments = 0;
    }
    let images = [];
    try {
        if (domElem.querySelector('._2a2q._65sr')) {
            domElem.querySelector('._2a2q._65sr').querySelectorAll('a').forEach(elem => {
                images.push(elem.getAttribute('data-ploi'))
            })
        }
        else if(domElem.querySelector('._s0._4ooo._1x2_._1ve7._4nos._8znt.img')){
            images.push(domElem.querySelector('._s0._4ooo._1x2_._1ve7._4nos._8znt.img').getAttribute('src'))
        }
        else {
            images.push(domElem.querySelector('._4-eo._2t9n').getAttribute('data-ploi'))
        }
    }
    catch (e) {
        images = [];
    }
    return [id, link, authorName, authorPic, authorLink, date, text, comments, images]
}

async function scrollDown() {
    return new Promise((resolve) => {
        let positionY = window.pageYOffset;
        window.scrollTo(0,document.body.scrollHeight);
        setTimeout(()=>{
            console.log(positionY !== window.pageYOffset && JSON.parse(document.querySelectorAll('._5pcb._4b0l._2q8l')[document.querySelectorAll('._5pcb._4b0l._2q8l').length-1].getAttribute('data-store')).timestamp > maxTimestamp);
            if (positionY !== window.pageYOffset && JSON.parse(document.querySelectorAll('._5pcb._4b0l._2q8l')[document.querySelectorAll('._5pcb._4b0l._2q8l').length-1].getAttribute('data-store')).timestamp > maxTimestamp){
                resolve(scrollDown())
            }
            else {

                const posts = Array.from(document.querySelectorAll('._5pcb._4b0l._2q8l')).filter(elem=>{
                    return JSON.parse((elem.getAttribute('data-store'))).timestamp > maxTimestamp
                });
                resolve(posts)
            }
        }, 650);
    })
}

function buildJSON(elems) {
    const template = {
        "origin": "https://www.facebook.com",
        "id": null,
        "link": null,
        "author": null,
        "authorPic": null,
        "authorLink": null,
        "date": null,
        "text": null,
        "images": [],
        "comments": null,
        "reactions": {}
    };
    template.id = elems[0];
    template.link = elems[1];
    template.author = elems[2];
    template.authorPic = elems[3];
    template.authorLink = elems[4];
    template.date = elems[5];
    template.text = elems[6];
    template.comments = elems[7];
    template.images = elems[8];
    return template;
}

function sendMsg(obj, id) {
    chrome.runtime.sendMessage({'dataJSON': obj, "reactionsLink": `https://mbasic.facebook.com/ufi/reaction/profile/browser/fetch/?limit=1000000000&total_count=0&ft_ent_identifier=${id}`});
}

/*function getDate(){
    const script = Array.from(document.querySelectorAll('script')).find(elem=>{
        return elem.innerText.includes('creation_time')
    }).innerText;
    return script.slice(script.indexOf('creation_time') + 15, script.indexOf(',', script.indexOf('creation_time') + 14))
}*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if (request.launch){
        maxTimestamp = request.date;
        launch();
    }
});