class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector(".input").value;
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .form {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }
          .input {
            font-size: 1.5rem;
            padding: 1rem 1.4rem;
            border: none;
          }
          .input::placeholder {
            color: var(--black-col);
          }
          .submit {
            border: none;
            outline: none;
            background-color: var(--yellow-col);
            padding: 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
          }
          .submit:active {
            background-color: var(--yellow-hov-col);
          }
          .submit span:nth-child(2) {
            display: none;
          }
          @media(max-width: 600px){
            .form {
                flex-direction: column;
              }
              .submit {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
              }
              .submit > span:last-child {
                font-size: 1.5rem;
              }
              .submit span:nth-child(2) {
                display: block;
              }
          }
        </style>

        <form class="form">
          <input
            type="text"
            class="input"
            required
            placeholder="Search Movies"
          />
          <button type="submit" class="submit">
            <span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.3333 26.3334L20.352 20.3414M23.6667 12.3334C23.6667 15.3392 22.4726 18.2219 20.3472 20.3473C18.2218 22.4727 15.3391 23.6667 12.3333 23.6667C9.32755 23.6667 6.44487 22.4727 4.31946 20.3473C2.19404 18.2219 1 15.3392 1 12.3334C1 9.32761 2.19404 6.44493 4.31946 4.31952C6.44487 2.19411 9.32755 1.00006 12.3333 1.00006C15.3391 1.00006 18.2218 2.19411 20.3472 4.31952C22.4726 6.44493 23.6667 9.32761 23.6667 12.3334V12.3334Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <span>Search</span>
          </button>
        </form>
        `;
    this.shadowDOM.querySelector(".form").addEventListener("submit", (e) => {
      e.preventDefault();
      this._clickEvent();
    });
  }
}
customElements.define("search-bar", SearchBar);
