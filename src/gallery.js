const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const ul = document.querySelector(".js-gallery");
const imageRef = document.createElement("img");
const lightboxDiv = document.querySelector(".js-lightbox");
const lightboxDivClose = document.querySelector(".lightbox__overlay");
const lightboxDivContent = document.querySelector(".lightbox__content");
const lightboxImage = document.querySelector(".lightbox__image");
const buttonClose = document.querySelector(
  'button[data-action="close-lightbox"]'
);

const arr = [];

const listCreatR = (images) =>
  images.forEach((image, i) => {
    const listing = document.createElement("li");
    const linkRef = document.createElement("a");
    const imageRef = document.createElement("img");

    arr.push(image.original);

    listing.classList.add("gallery__item");
    linkRef.classList.add("gallery__link");
    linkRef.setAttribute("href", image.original);
    imageRef.classList.add("gallery__image");
    imageRef.setAttribute("src", image.preview);
    imageRef.setAttribute("data-source", image.original);
    imageRef.setAttribute("alt", image.description);
    imageRef.setAttribute("data-index", i++);

    linkRef.append(imageRef);
    listing.append(linkRef);
    ul.append(listing);
  });

listCreatR(images);

console.log(arr);

function OnTagsClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  lightboxDiv.classList.add("is-open");
  const target = event.target.dataset.source;
  lightboxImage.setAttribute("src", target);

  let indexSet = event.target.dataset.index;
  lightboxImage.setAttribute("data-index", indexSet);

  window.addEventListener("keydown", onEscapePress);
  ul.addEventListener("keydown", pagingImage);
}

function pagingImage(e) {
  let finishSet = Number(lightboxImage.getAttribute("data-index"));

  if (e.code === "ArrowRight") {
    if (finishSet >= 8) {
      lightboxImage.setAttribute("src", arr[8]);
    } else {
      lightboxImage.setAttribute("src", arr[finishSet + 1]);
      lightboxImage.setAttribute("data-index", finishSet + 1);
    }
  } else if (e.code === "ArrowLeft") {
    if (finishSet <= 0) {
      lightboxImage.setAttribute("src", arr[0]);
    } else {
      lightboxImage.setAttribute("src", arr[finishSet - 1]);
      lightboxImage.setAttribute("data-index", finishSet - 1);
    }
  }
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscapePress);
  lightboxDiv.classList.remove("is-open");
  lightboxImage.setAttribute("src", "");
  lightboxImage.setAttribute("data-index", "");
  ul.removeEventListener("keydown", pagingImage);
}

ul.addEventListener("click", OnTagsClick);
buttonClose.addEventListener("click", onCloseModal);

lightboxDivClose.addEventListener("click", (events) => {
  if (events.target === events.currentTarget) {
    onCloseModal();
  }
});

function onEscapePress(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}
