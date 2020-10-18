ACCESS_KEY = "u-frOFerrhEwathJlrignRyp9zSzXHIGJnD_U0rJ1tk";
UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&query=landscape&orientation=landscape`;
AURL = "https://source.unsplash.com/random/?landscape"

const body = document.querySelector("body");

BG = "bg"



function saveBackGround(fullUrl, city, country, name){
    const savedImage = localStorage.getItem(BG);
    if(savedImage !== null){
        localStorage.removeItem(BG);
    } 
    const date = new Date();
    const backGround = {
        fullUrl: fullUrl,
        city: city,
        country: country,
        name: name,
        savedDate: date
    };
    localStorage.setItem(BG, JSON.stringify(backGround));
    setBackGround();
}

function getBackGround(){
    fetch(AURL)
        .then(response => response.json())
        .then(json => {
            const image = json;
            if(image.urls && image.urls.full && image.location){
                const fullUrl = image.urls.full;
                const location = image.location;
                const city = location.city;
                const country = location.country;
                const name = location.name;
                saveBackGround(fullUrl, city, country, name);
            } else{
                getBackGround();
            }
        })
}

function init(){
    getBackGround();
}

init();