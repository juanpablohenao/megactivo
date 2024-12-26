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
          <button @click=${this._onClickGeminiChat} part="button">
            gemini chat
          </button>
          <button @click=${this._onClickGemini} part="button">
            gemini
          </button>
          <button @click=${this._onClickGeminiJSON} part="button">
            gemini json
          </button>
          <button @click=${this._onClickOpenai} part="button">
            openai
          </button>
        </div>
        <div>
          <label for="systemInstruction">system instruction:</label> <input id="systemInstruction" aria-label="temperature" value="You are a super kind assistant.">
        </div>
        <div>
          <label for="prompt">prompt:</label> <input id="prompt" aria-label="prompt" value="Hola">
        </div>
        <div>
          <label for="tempe">temperature:</label> <input id="tempe" aria-label="temperature" value="0.3">
        </div>
        <div>
          <p>system instruction aplica para los botones "gemini" y "gemini json" porque ahi reinicio el modelo cada vez, en cambio para "gemini chat" solo inicio el modelo al primcipio entonces queda con el systemInstruction inicial "you are a super kind assistant"</p>
          <p>temperature aplica solo para los botones "gemini" y "gemini json" porque solo ahi estoy reasignando la configuracion.</p>
        </div>
        <div>
          ${this.respuesta.map((item) => html`<p>${item}</p>`)}
        </div>
      </main>
    `;
  }

  async _onClickOpenai() {
    let myanswer = await this.procesarAI(1);
  }

  async _onClickGemini() {
    let myanswer = await this.procesarAI(2);
  }

  async _onClickGeminiJSON() {
    let myanswer = await this.procesarAI(3);
  }

  async _onClickGeminiChat() {
    let myanswer = await this.procesarAI(4);
  }

  async procesarAI(agente){
    // agente 2 es gemini 3 es gemini JSON y 1 es openai
    /*const mylyrics=['I will survive', 'I was in the circus', 'Mary danced well'];
    const myprompt = `
      I will provide you with an array of sentences or epressions in English.
      Please return an equivalent array but keep only the elements that are in future tense.
      ${JSON.stringify(mylyrics)}
    `;*/
    const myprompt = `
      ${this.inputPrompt.value}
    `;
    const mytempe = 
      this.inputTempe.value
    ;
    const mySystemInstruction = 
      this.inputSystemInstruction.value
    ;

    let response;
    //http://localhost:5000
    response = await fetch("https://megactivo-96wg.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: agente,
          tempe: mytempe,
          systemInstruction: mySystemInstruction, 
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

  get inputPrompt() {
    return this.renderRoot?.querySelector('#prompt') ?? null;
  }

  get inputTempe() {
    return this.renderRoot?.querySelector('#tempe') ?? null;
  }

  get inputSystemInstruction() {
    return this.renderRoot?.querySelector('#systemInstruction') ?? null;
  }

}



customElements.define('megacti-bot', MegactiBot);