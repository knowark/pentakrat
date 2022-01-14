//import 'components/button'
//import 'components/card'
//import 'components/icon'
//import 'components/navbar'
//import 'components/input'
//import 'components/modal'
//import 'components/list'
//import { Alert } from 'components/alert'
import { Component } from 'base/component'
// @ts-ignore
// eslint-disable-next-line no-undef
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
    
    <div class="${tag}__nav">
      <ark-navbar justify='between' background='primary'>
        <ark-nav brand>
          <div data-page-name class="page-name">
            <img class="${tag}__navbar_logo" src="${logo}" alt="Pentakrat">
          </div>
        </ark-nav>
      </ark-navbar>
      <div data-root></div>
    </div>
    <div class="${tag}__content">
      <ark-card title="Pentakrat" subtitle="The fifth power">
        <h1>A decentralized platform that materializes the links of
          trust established in representational systems.</h1>
        <ark-button background="primary" color="secondary" slot="actions">Trust</ark-button>
        <ark-button background="success" slot="actions">Reward</ark-button>
      </ark-card>
    </div>
    `

    return super.render()
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
    display: block;
    height: 100%;
  }
  .${tag}__navbar_logo {
    width: 50px;
    padding: 0.5rem;
  }
  .${tag}__content {
    padding: 3rem;
  }
`
Component.define(tag, RootComponent, styles)

