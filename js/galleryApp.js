import createModal from './createModal.js'
createModal();

// Global QS
const modalableImages = document.querySelectorAll('[data-modal="true"]');
const modalContainer = document.querySelector('.modal-container');
const modalTrack = document.querySelector('.modal__image-container');
const indicatorContainer = document.querySelector('.modal__indicator-container');
// all galleries shared
let transitionSpeed;
let galleries;
// for each gallery
let modalImages;
let modalIndicators;
let currentIndex;
let lastIndex;
let isMoving = false;

class Modal {
  constructor(modal){
    this.modal = modal;
    this.attachEventListners();
  }
  
  openModal() {
    modalableImages.forEach((btn) => (btn.tabIndex = '-1'));
    this.modal.removeAttribute('hidden');
    this.modal.classList.add('active');
  }
  closeModal() {
    modalTrack.style.transition = 'none';
    isMoving = false;
    modalableImages.forEach((btn) => (btn.tabIndex = '0'));
    this.modal.setAttribute('hidden', 'true');
    this.modal.classList.remove('active');
  }
  
  attachEventListners(){
    this.modal.addEventListener('click', (e) => {
      e.target === e.currentTarget || e.target.classList.contains('modal__close') ? this.closeModal() : null;
    })
  }
}
const modal = new Modal(modalContainer);

function showActiveIndicator(){
  modalIndicators.forEach((i) => i.classList.remove('active'));
  switch(currentIndex){
    case 0:
      modalIndicators[modalIndicators.length - 1].classList.add('active');
      break;
    case lastIndex - 1:
      modalIndicators[0].classList.add('active');
      break;
    default:
      modalIndicators.find((i) => i.dataset.index == currentIndex - 1).classList.add('active');
      break;
  }
}

function moveGallery(){
  modalTrack.style.transform = `translateX(${currentIndex * -100}%)`;
  showActiveIndicator();
}

function addImagesAndIndicatorsToGallery(arrayOfImages){
  // add images to Gallery 
  modalTrack.innerHTML = [arrayOfImages[arrayOfImages.length -1],...arrayOfImages, arrayOfImages[0]]
  .map((img) => `<img class="modal__image" src="${img.src}" alt="${img.alt}">`).join('')
  // add indicators to Gallery
  indicatorContainer.innerHTML = arrayOfImages.map((i, index) => `<button class="modal__indicator" data-index="${index}"></button>`).join('');
  
  // return both for destructuring
  return [[...document.querySelectorAll('.modal__image')], [...document.querySelectorAll('.modal__indicator')]];
  
}

function updateGallery(galleryImages){
  [modalImages, modalIndicators] = addImagesAndIndicatorsToGallery(galleryImages);
  currentIndex = 1;
  lastIndex = modalImages.length;
  moveGallery();
}

// event listeners
function attachOpenGalleryEventListeners(){
  modalableImages.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      updateGallery(galleries.find((g) => g.name === btn.dataset.gallery).images)
    })
    btn.addEventListener('click', () => {
      updateGallery(galleries.find((g) => g.name === btn.dataset.gallery).images)
      modal.openModal();
    })
  })
}

function attachArrowEventListeners(){
  document.querySelectorAll('.modal__arrow').forEach((arrow) => arrow.addEventListener('click', (e) => {
    if(isMoving === true){return};
    isMoving = true;
    modalTrack.style.transition = `transform ${transitionSpeed}ms cubic-bezier(0.82, 0.02, 0.39, 1.01)`;
    e.target.id === 'right' ? currentIndex++ : currentIndex--;
    moveGallery();
  }))
}

function attachIndicatorEventListeners(){
  indicatorContainer.addEventListener('click', (e) => {
    if(e.currentTarget === e.target){return}
    if(isMoving === true){return};
    isMoving = true;
    modalTrack.style.transition = `transform ${transitionSpeed}ms cubic-bezier(0.82, 0.02, 0.39, 1.01)`;
    currentIndex = Number(e.target.dataset.index) + 1;
    moveGallery();
  })
}

function attachTransitionEndListener() {
  modalTrack.addEventListener('transitionend', () => {
    isMoving = false;
    console.log(currentIndex);
    if(currentIndex === 0){
      modalTrack.style.transition = 'none';
      currentIndex = lastIndex - 2;
      moveGallery();
    }
    if(currentIndex === lastIndex - 1){
      modalTrack.style.transition = 'none';
      currentIndex = 1;
      moveGallery();
    }
  })
}

window.addEventListener('keyup', (e) => {
  if(e.key === "Escape" && modalContainer.classList.contains('active')){
    modal.closeModal();
  }
})


export default async function initGallery(endpoint, options) {
    await fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      galleries = data;
      [modalImages, modalIndicators] = addImagesAndIndicatorsToGallery(
        data.map((gallery) => gallery.images[0]));
      transitionSpeed = options?.speed || 250;
      attachOpenGalleryEventListeners();
      attachArrowEventListeners();
      attachIndicatorEventListeners();
      attachTransitionEndListener();
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }



















