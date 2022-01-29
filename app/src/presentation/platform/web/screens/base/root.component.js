import 'components/button'
import 'components/card'
import 'components/icon'
import 'components/tabs'
import { Alert } from 'components/alert'
import { Component } from 'base/component'
import logo from 'theme/assets/logo.svg'
import './analyze/index.js'
import './lead/index.js'
import './support/index.js'

const tag = 'app-root'
export class RootComponent extends Component {
  init (context = {}) {
    this.global = context.global || window
    this.router = this.resolve('Router')
    this.addEventListener('error', this.onError.bind(this))
    this.networkManager = this.resolve('NetworkManager')

    return super.init()
  }

  reflectedProperties () {
    return ['prefix']
  }

  render () {
    this.content = /* html */ `
    <header class="${tag}__nav">
      <nav class="${tag}__navbar" background='primary'>
        <div class="${tag}__navbar_brand">
          <img class="${tag}__navbar_logo" src="${logo}" alt="Pentakrat">
          <span>PENTAKRAT</span>
        </div>
        <div class="${tag}__navbar_connect">
          <ark-button class="${tag}__navbar_connect-button"
            background="secondary" color="primary" data-connect
            listen on-click="onConnect">connect</ark-button>
        </div>
      </nav>
    </header>

    <article class="${tag}__content" data-content>
      <analyze-main></analyze-main>
    </article>

    <footer>
      <ark-tabs background="light" listen on-tabs:selected="onTab">
        <ark-tabs-item title="ANALYZE" tab="analyze">
        </ark-tabs-item>
        <ark-tabs-item title="SUPPORT" tab="support">
        </ark-tabs-item>
        <ark-tabs-item title="LEAD" tab="lead">
        </ark-tabs-item>
      </ark-tabs>
    </footer>
    `

    return super.render()
  }

  /** @param {CustomEvent} event */
  async onConnect (event) {
    event.stopPropagation()
    await this.networkManager.connect({})
    Alert.launch({
      title: 'Success',
      text: 'You are now connected to the network',
      showConfirmButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonBackground: 'success',
      showCancelButton: false
    }, this)
    this.render()
  }

  /** @param {CustomEvent} event */
  onTab (event) {
    event.stopPropagation()
    event.detail.called = true
    const tab = event.detail.data.tab
    this._setContentComponent(`${tab}-main`)
  }

  /** @param {CustomEvent} event */
  onError (event) {
    event.stopPropagation()
    Alert.launch({
      title: 'Error',
      text: event.detail.message,
      confirmButtonBackground: 'danger',
      showCancelButton: false
    }, this)
  }

  /** @param {string} tag */
  _setContentComponent (tag) {
    const component = document.createElement(tag)
    const contentElement = super.select('[data-content]')

    while (contentElement.firstChild) contentElement.firstChild.remove()
    contentElement.appendChild(component)
  }
}

const styles = /* css */ `
  .${tag} {
    display: grid;
    grid-template-rows: auto 4fr auto;
    height: 100%;
    width: 100%;
  }
  .${tag}__navbar {
    display: grid;
    place-items: center;
    justify-content: space-between;
    grid-auto-flow: column;
    background-color: var(--primary);
    color: white;
    padding:0.5rem 0.2rem;
  }
  .${tag}__navbar_brand {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    color: var(--secondary);
    display: inherit;
    grid-auto-flow: column;
    place-items: center;
    gap: 0.5rem;
  }
  .${tag}__navbar_logo {
    width: 3rem;
  }
  .${tag}__navbar_connect {
    padding: 0.5rem;
  }
  .${tag}__content {
    display:grid;
    place-items: center;
  }
  .${tag} footer {
    padding: 1rem;
  }
  .${tag}__navbar_connect-button{
    font-size: 1.2rem;
    font-weight: 600;
  }
  .ark-tabs-item {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    border: 1px solid var(--primary);
    color: var(--primary);
  }
  .ark-tabs-item[active] {
    background: var(--primary);
    color: var(--secondary);
    border: 1px solid var(--primary);
  }
  .ark-card__title {
    font-size: 1.4rem;
    letter-spacing: 0.2rem;
    color: var(--primary)
  }
  .analyze-main,
  .lead-main,
  .support-main {
    width: 70%;
  }
  
`
Component.define(tag, RootComponent, styles)
