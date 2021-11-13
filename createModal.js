export default function createModal(){
    document.querySelector('body').insertAdjacentHTML('beforeend', `
    <div class="modal-container" aria-modal="true" role="dialog" hidden="true">
      <div class="modal">
        <div class="modal__overlay">
          <div class="modal__btn-container">
            <button class="modal__btn modal__arrow modal__arrow--left" id="left" aria-label="Previous image">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.25 6.75L4.75 12L10.25 17.25"></path>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 12H5"></path>
              </svg>
            </button>
            <button class="modal__btn modal__close" aria-label="Close gallery">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
              </svg>
            </button>
            <button class="modal__btn modal__arrow modal__arrow--right" id="right" aria-label="Next image">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.75 6.75L19.25 12L13.75 17.25"></path>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H4.75"></path>
              </svg>
            </button>
          </div>
          <div class="modal__indicator-container">
         
          </div>
        </div>
        
        <div class="modal__image-container">
        
        </div>
      </div>
    </div>
    <style>
      .modal-container {
        position: fixed;
        inset: 0;
        background-color: hsl(var(--dark) / .8);
        display: grid;
        place-items: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 250ms ease-in-out;
      }
      
      .modal-container.active {
        opacity: 1;
        pointer-events: all;
      }
      
      .modal {
        position: relative;
        margin: 2rem;
        max-width: 900px;
        width: 100%;
        display: grid;
        place-items: center;
        overflow: hidden;
        box-shadow: 0px 2px 40px hsl(var(--dark));
      }
      
      .modal__image-container {
        display: flex;
        max-height: 100vh;
      }
      
      .modal__image {
        width: 100%;
        height: 100%;
        aspect-ratio: 16/10;
        object-fit: cover;
      }
      
      .modal__overlay {
        position: absolute;
        z-index: 4;
        bottom: 1rem;
        display: grid;
        gap: 1rem;
      }
      
      .modal__btn-container {
        display: flex;
        gap: 1rem;
      }
        
      .modal__btn {
        display: grid;
        place-items: center;
        background-color: hsl(var(--bkg) / .5);
        color: hsl(var(--text));
        padding: .5rem;
        border: 4px solid transparent;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 250ms cubic-bezier(0.9, 0, 0, 0.96), border 250ms cubic-bezier(0.9, 0, 0, 0.96);
      }
      
      .modal__btn:is(:hover,:focus) {
        background-color: hsl(var(--bkg) / .7);
        border: 4px solid hsl(var(--bkg) / .8);
      }
     
      .modal__btn svg {
        pointer-events: none;
        width: 2rem;
        height: 2rem;
        transition: transform 250ms cubic-bezier(0.9, 0, 0, 0.96);
      }
      .modal__btn:is(:hover,:focus) svg {
        transform: scale(1.2);
      }
      
      .modal__indicator-container {
        order: -1;
        display: flex;
        justify-content: center;
        gap: 1rem;
      }
      
      .modal__indicator {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: hsl(var(--bkg) / .4);
        border: 3px solid hsl(var(--bkg) / .6);
        cursor: pointer;
        position: relative;
      }
      
      .modal__indicator:is(:hover, :focus) {
        background-color: hsl(var(--bkg) / .5);
        border: 3px solid hsl(var(--bkg) / .7);
      }
      
      .modal__indicator.active::before {
        content: '';
        position: absolute;
        inset: 2px;
        border-radius: 50%;
        background-color: hsl(var(--bkg) / .9);
      }
    </style>
    `)
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  