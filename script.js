const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// API 
const count = 5;
const apiKey = 'PnrF6vKCUyLGEkZaEIPPOkvHDIZ_XY32CpVr7Z3ZACo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Helper func
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create elements for links & photos, add to the dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> with alt
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener, loader
        img.addEventListener('load', imageLoaded());


        //put <img> inside <a>, then both inside container elem
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}
//Get photos from unsplash api (fetch)
async function getPhotos() {
    try {
       const response = await fetch(apiUrl);
       photosArray = await response.json();
       displayPhotos();
    } catch (error) {
        
    }
}

// scrolling functionality
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready == true) {
        ready = false;
        getPhotos();
    }
})

//On load 
getPhotos();

