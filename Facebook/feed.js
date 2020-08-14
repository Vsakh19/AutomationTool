let data;

function launch(){
    const usersArray = buildArray();
    insertUsers(usersArray);
}

function buildArray(){
    const resultArray = [];
    data.forEach(elem=>{
        resultArray.push(buildPost(elem));
    });
    return resultArray;
}

function buildPost(data) {
    const post = document.createElement('div');
    const headerBlock = document.createElement('div');
    const headerData = document.createElement('div');
    const headerPicture = document.createElement('img');
    const headerInfo = document.createElement('div');
    const author = document.createElement('a');
    const date = document.createElement('p');
    const mainBlock = document.createElement('div');
    const mainText = document.createElement('p');
    const imageBlock = document.createElement('div');
    const footer = document.createElement('div');
    const footerContent = document.createElement('div');
    const reactions = document.createElement('a');
    const reactionsImg = document.createElement('img');
    const reactionsCount = document.createElement('p');
    const comments = document.createElement('a');
    const commentsImg = document.createElement('img');
    const commentsCount = document.createElement('p');
    data.images.forEach(elem=>{
        const image = document.createElement('img');
        image.setAttribute('src', elem);
        image.classList.add('post__mainImage');
        imageBlock.appendChild(image);
    });

    post.classList.add('post');
    headerBlock.classList.add('post__header');
    headerData.classList.add('post__headerData');
    headerPicture.classList.add('post__headerPicture');
    headerInfo.classList.add('post__headerInfo');
    author.classList.add('post__headerAuthor');
    date.classList.add('post__headerDate');
    mainBlock.classList.add('post__main');
    mainText.classList.add('post__mainText');
    imageBlock.classList.add('post__mainImageBlock');
    footer.classList.add('post__footer');
    footerContent.classList.add('post__footerContent');
    reactions.classList.add('post__footerReactions');
    reactionsImg.classList.add('post__footerReactionsImage');
    reactionsCount.classList.add('post__footerReactionsCount');
    comments.classList.add('post__footerComments');
    commentsImg.classList.add('post__footerCommentsImage');
    commentsCount.classList.add('post__footerCommentsCount');

    reactionsImg.setAttribute('src', './images/facebook-icon-like.png');
    commentsImg.setAttribute('src', './images/facebook-icon-comment.png');


    post.appendChild(headerBlock);
    headerBlock.appendChild(headerData);
    headerData.appendChild(headerPicture);
    headerData.appendChild(headerInfo);
    headerInfo.appendChild(author);
    headerInfo.appendChild(date);
    post.appendChild(mainBlock);
    mainBlock.appendChild(mainText);
    mainBlock.appendChild(imageBlock);
    post.appendChild(footer);
    footer.appendChild(footerContent);
    footerContent.appendChild(reactions);
    reactions.appendChild(reactionsImg);
    reactions.appendChild(reactionsCount);
    footerContent.appendChild(comments);
    comments.appendChild(commentsImg);
    comments.appendChild(commentsCount);

    headerPicture.setAttribute('src', data.authorPic);
    comments.setAttribute('href', data.link);
    reactions.setAttribute('href', 'https://m.facebook.com/ufi/reaction/profile/browser/?ft_ent_identifier=' + data.id);
    headerPicture.classList.add('authorPic');
    author.innerText = data.author;
    author.setAttribute('href', data.authorLink);
    date.innerText = (new Date(data.date * 1000).toDateString()).toString();
    if (Object.keys(data.reactions).length !== 0){
        reactionsCount.innerText = Object.keys(data.reactions).length.toString();
    }
    else {
        reactionsCount.innerText = '0';
    }
    commentsCount.innerText = data.comments;
    if (data.text){
        mainText.innerText = data.text;
    }


    return post;
}

function insertUsers(arr){
    const feed = document.querySelector('.feed');
    arr.forEach(elem=>{
        feed.appendChild(elem);
    })
}

chrome.runtime.sendMessage({'getData': true, 'dataStore': 'Facebook Posts', 'key': 'id'});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if (request.data){
        if (data !== 'Error'){
            data = request.data;
            data.sort((a, b)=>{
                if (a.date < b.date)
                    return -1
                else if (a.date > b.date){
                    return 1
                }
                else return 0
            });
            launch()
        }
        else {
            alert('Database error')
        }
    }
});