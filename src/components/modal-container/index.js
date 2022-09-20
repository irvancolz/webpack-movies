import '../modal'


class ModalContainer extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }


  connectedCallback() {
    this.render();
    // this.visibility = true;
  }


  // visibility handler
  get visibility() {
    return this.hasAttribute("visible");
  }


  set visibility(value) {
    if (value) {
      this.setAttribute("visible", "");
    } else {
      this.removeAttribute("visible");
    }
  }

  
  set movies(value){
    this._movies = value;
    this.render();
  }


  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "visible") {
      if (newValue === null) {
        this.shadowRoot.querySelector(".container").classList.remove("visible");
      } else {
        this.shadowRoot.querySelector(".container").classList.add("visible");
      }
    }
  }


  static get observedAttributes() {
    return ["visible", '_errorMessage'];
  }


  render() {
    const modalClass = this.visibility ? 'container visible' : 'container';
    this.shadowDOM.innerHTML = `
        <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .container{
            position: fixed;
            background-color: var(--gray-col);
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            display: grid;
            place-items: center;
            z-index: 10;
            opacity: 0;
            overflow-Y: auto;
            pointer-events: none;
        }
        .container.visible{
            opacity: 1;
            pointer-events: auto;
        }
        </style>
        <div class="${modalClass}"></div>
    `;

    if(this._movies){
        const modalEL = document.createElement('movie-modal');
        modalEL.movies = this._movies;

        this.shadowDOM.querySelector('.container').appendChild(modalEL);
    }

    this.shadowDOM
    .querySelector(".container")
    .addEventListener("click", (e) => {
      if (e.target.className.includes("container")) {
        this.visibility = false;
      }
    });

  }
}
customElements.define("modal-container", ModalContainer);
