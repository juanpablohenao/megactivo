import { LitElement, html, css } from 'lit';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABW-nnkZd9-m7SLDZkkRMoCout9cNwDN8",
  authDomain: "megactibot.firebaseapp.com",
  projectId: "megactibot",
  storageBucket: "megactibot.firebasestorage.app",
  messagingSenderId: "438310344182",
  appId: "1:438310344182:web:aba6cb0e9f69cf655823d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

class MegactiBot extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--megacti-bot-background-color);
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  static get properties() {
    return {
      respuesta: { type: Array },
    }
  }

  constructor() {
    super();
    this.respuesta = [];
  }

  render() {
    return html`
      <main>
        <div>
          <button @click=${this._onClickGemini} part="button">
            gemini
          </button>
          <button @click=${this._onClickOpenai} part="button">
            openai
          </button>
        </div>
        <div>
          <ul>
            ${this.respuesta.map((item) => html`<li>${item}</li>`)}
          </ul>
        </div>
      </main>
    `;
  }

  async _onClickOpenai() {
    let myanswer = this.procesarAI(1);
  }

  async _onClickGemini() {
    let myanswer = this.procesarAI(0);
  }

  async procesarAI(agente){
    // agente 0 es gemini y 1 es openai
    const mylyrics=['I will survive', 'I was in the circus', 'Mary danced well'];
    const myprompt = `
      I will provide you with an array of sentences or epressions in English.
      Please return an equivalent array but keep only the elements that are in future tense.
      ${JSON.stringify(mylyrics)}
    `;

    let response;
    response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: agente,
          prompt: myprompt
        }),
      });    
    if (response.ok) {
      const data = await response.json();
      console.log('correcto: ',data.bot);
      this.respuesta.push(myprompt);
      this.respuesta.push(data.bot);
      this.requestUpdate();
      const parsedData = data.bot.trim(); // trims any trailing spaces/'\n' 
      return parsedData;
    } else {
      const err = await response.text();
      //messageDiv.innerHTML = "Something went wrong"
      console.log('error something went wrong',err);
      //return err;
      return false;
    }
  }

}



customElements.define('megacti-bot', MegactiBot);