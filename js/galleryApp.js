import createModal from './createGallery.js'
createModal();

// Global QS
const modalableImages = document.querySelectorAll('[data-modal="true"]');


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

const modalContainer = document.querySelector('.modal-container');
const modal = new Modal(modalContainer);

// event listeners
function openImageGalleryEventListners(){
  modalableImages.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.openModal();
    })
  })
}
openImageGalleryEventListners()

window.addEventListener('keyup', (e) => {
  if(e.key === "Escape" && modalContainer.classList.contains('active')){
    modal.closeModal();
  }
})



















