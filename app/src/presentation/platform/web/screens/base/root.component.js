import 'components/button'
import 'components/card'
import 'components/icon'
import 'components/tabs'
import { Alert } from 'components/alert'
import { Component } from 'base/component'
import logo from 'theme/assets/logo.svg'
export const version = process.env.VERSION

const tag = 'app-root'
export class RootComponent extends Component {
  init (context = {}) {
    this.global = context.global || window
    this.router = this.resolve('Router')
    this.sessionManager = this.resolve('SessionManager')
    //this.addEventListener('error', this.onError.bind(this))

    return super.init()
  }

  reflectedProperties () {
    return ['prefix']
  }

  get user () {
    return this.sessionManager.getUser()
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
          <ark-button background="success">Connect</ark-button>
        </div>
      </nav>
    </header>

    <article class="${tag}__content">
      <ark-card title="Pentakrat" subtitle="The fifth power">
        <h1>A decentralized platform that materializes the links of
          trust established in representational systems.</h1>
        <ark-button background="primary" color="secondary" slot="actions">Trust</ark-button>
        <ark-button background="success" slot="actions">Reward</ark-button>
      </ark-card>
    </article>

    <footer>
      <ark-tabs background="info" listen on-tabs:selected="onTab">
        <ark-tabs-item title="Support" tab="example-1">
        </ark-tabs-item>
        <ark-tabs-item title="Lead" tab="example-2">
        </ark-tabs-item>
        <ark-tabs-item title="Audit" tab="example-3">
        </ark-tabs-item>
      </ark-tabs>
    </footer>
    `

    return super.render()
  }

  onTab(event) {
    event.stopPropagation()
    console.log('Tab!')
  }

  get _locations () {
    return [
    ]
  }

  /** @param {CustomEvent} event */
  onError (event) {
    event.stopPropagation()
    Alert.launch(
      {
        title: 'Error',
        text: event.detail.message
      },
      this
    )
  }

}

const styles = /* css */ `
  .${tag} {
    display: grid;
    background-image: radial-gradient(gray 10%, dimgray 20%);
    grid-template-rows: auto 4fr auto;
    height: 100vh;
    width: 100vw;
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
    padding: 3rem;
  }
  .${tag} footer {
    padding: 1rem;
  }
`
Component.define(tag, RootComponent, styles)
