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
        </div>
        <span>Pentakrat</span>
        <div class="${tag}__navbar_connect">
          <ark-button background="success" data-connect
            listen on-click="onConnect">Connect</ark-button>
        </div>
      </nav>
    </header>

    <article class="${tag}__content" data-content>
    </article>

    <footer>
      <ark-tabs background="success" listen on-tabs:selected="onTab">
        <ark-tabs-item title="Support" tab="support">
        </ark-tabs-item>
        <ark-tabs-item title="Lead" tab="lead">
        </ark-tabs-item>
        <ark-tabs-item title="Analyze" tab="analyze">
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
      text: event.detail.message
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
    background-color: dimgray;
    grid-template-rows: auto 4fr auto;
    height: 100%;
    width: 100%;
  }
  .${tag}__navbar {
    display: grid;
    color: white;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto auto;
    background-color: var(--primary);
  }
  .${tag}__navbar_logo {
    width: 50px;
    padding: 0.5rem;
  }
  .${tag}__navbar_connect {
    padding: 0.5rem;
  }
  .${tag}__content {
    padding: 5vh calc(25vw - 3rem);
  }
  .${tag} footer {
    padding: 1rem;
  }
`
Component.define(tag, RootComponent, styles)
