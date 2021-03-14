let imgList = [];

export default imgList = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector("ul.gallery.js-gallery");
const modal = document.querySelector("div.lightbox.js-lightbox");
const modalImg = document.querySelector("img.lightbox__image");
let activeImg;
let activeListItem;

let stringHTML = "";
imgList.forEach(e => {
  return stringHTML += `<li class="gallery__item"><a class="gallery__link" href="${e.original}"><img class="gallery__image" src="${e.preview}" data-source="${e.original}" alt="${e.description}"/></a></li>`  
});

document.querySelector(".gallery.js-gallery").innerHTML = stringHTML;

gallery.addEventListener("click", clickOnGalleryEl)

modal.addEventListener("click", closeModalClick);

window.addEventListener ("keydown", closeModalEsc)

window.addEventListener("keydown", changeModalImageWithArrowBtns)

function clickOnGalleryEl(event) {
  event.preventDefault()
  if (event.target.classList.contains("gallery__image")) {
    activeImg = event.target;
    activeListItem = activeImg.closest(".gallery__item");

    openModal()
  }
}

function closeModalClick(event) {
  let target = event.target;
  let targetClassList = target.classList;

  if (targetClassList.contains("lightbox__overlay") || targetClassList.contains("lightbox__button")){
    closeModal()
  };
}

function closeModalEsc(event) {
  let keyPressed = event.code;
  
  if (keyPressed === "Escape" && modal.classList.contains("is-open")) {
    closeModal()
  };
}

function changeModalImageWithArrowBtns(event) {
  let keyPressed = event.code;
  
  if (modal.classList.contains("is-open") && keyPressed === "ArrowLeft") {
    setPrevImgActive();
  } else if (modal.classList.contains("is-open") && keyPressed === "ArrowRight") {
    setNextImgActive();
  }
}

function closeModal() {
  modal.classList.remove("is-open");
  remoreModalImg();
}

function openModal() {
  modal.classList.add("is-open");
  setModalImg();
}

function setModalImg() {
  modalImg.src = activeImg.dataset.source;
  modalImg.alt = activeImg.alt; 
}

function remoreModalImg() {
  modalImg.src = "";
  modalImg.alt = "";
  activeImg = "";
}

function setPrevImgActive() {
  if (activeListItem.previousSibling) {
    activeListItem = activeListItem.previousSibling;
    activeImg = activeListItem.querySelector(".gallery__image");
    setModalImg();
  } else {
    activeListItem = gallery.lastChild;
    activeImg = activeListItem.querySelector(".gallery__image");
    setModalImg();
  }
}

function setNextImgActive() {
  if (activeListItem.nextSibling) {
    activeListItem = activeListItem.nextSibling;
    activeImg = activeListItem.querySelector(".gallery__image");
    setModalImg();
  } else {
    activeListItem = gallery.firstChild;
    activeImg = activeListItem.querySelector(".gallery__image");
    setModalImg();
  }
}