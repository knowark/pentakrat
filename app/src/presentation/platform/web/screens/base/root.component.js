import 'components/button'
import 'components/icon'
import 'components/navbar'
import 'components/input'
import 'components/modal'
import 'components/list'
import { Component } from 'base/component'
import { setRoutes } from './root.routes'
import dashLogo from 'theme/assets/dashtempos-logo.svg'
// @ts-ignore
// eslint-disable-next-line no-undef
export const version = process.env.VERSION

const tag = 'app-root'
export class RootComponent extends Component {
  init (context = {}) {
    this.global = context.global || window
    this.router = this.resolve('Router')
    this.sessionManager = this.resolve('SessionManager')
    this.dataUser = this.global.localStorage.getItem('user') || ''
    if (this.dataUser) { this.dataUser = JSON.parse(this.dataUser) }
    setRoutes(this, this.router, this.prefix)
    this.addEventListener('error', this.onError.bind(this))

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
    
    <div class="${tag}__content">
        <ark-navbar justify='between' background='primary'>
          <ark-nav brand>
            <ark-button navbar-button listen on-click='onOpenSidebar'>
              <ark-icon style="font-size: 1.2rem; display: grid;"
                type="mat" name="dehaze"></ark-icon>
            </ark-button>
            <div data-page-name class="page-name">
              <img class="navbar__logo" src="${dashLogo}" alt="DashTempos">
            </div>
          </ark-nav>
        </ark-navbar>
        <div data-root></div>
      </div>

      <ark-sidebar width="compact" data-sidebar>
        <div class="sidebar__header" slot="header">
          <div class="${tag}__profile">
            <span data-initial class="${tag}__avatar">
              ${this.user.name.toUpperCase()[0] || 'E'}
            </span>
            <h3 data-user>${this.user.name || 'Example'}</h3>
            <ark-button listen on-click="profileModal" data-profile-button
                  color="primary">
                  <ark-icon slot="icon" action-icon name="fas fa-user-edit">
              </ark-icon>Profile Settings
            </ark-button>
          </div>
          <div class="${tag}__logo">
            <img class="${tag}__image" src="${dashLogo}" alt="dashLogo">
            <span class="${tag}__version">v ${version}</span>
          </div> 
        </div>
        <ark-list data-sidebar-list action default
          listen on-list:selected="onListItemSelected">
        </ark-list>
        <div slot="footer">
          <ark-button background="light" color="dark" listen on-click='onLogOut'
            style="width: 100%;">
            Log out
          </ark-button>
        </div>
      </ark-sidebar>

      <div class="alert" id='data-alert' hidden>
        <span class="close-btn"
          onclick="this.parentElement.style,display='none';">&times;
        </span>
        <strong id='data-alert-title'>¡title!</strong>
        <span id='data-alert-text'>text...</span>
      </div>

      <ark-modal  background= "light" title="Profile Settings" 
      width="280px" data-profile-modal>
        <h1 class="textH1">PROFILE SETTINGS</h1>
        <div>
          <ark-input data-organization type="text" disabled 
          label="Organization" value="${this.dataUser.tenant}"></ark-input>
          <ark-input data-email type="text" disabled label="Email"  
          value="${this.dataUser.email}"
          ></ark-input>
          <ark-input data-password type="password"
          label="Change Password" required></ark-input>
        </div>
        <div class="upload-actions">
          <ark-button background="info" listen on-click="updateUser"
            >Save</ark-button>
          <ark-button close>Cancel</ark-button>
        </div>
      </ark-modal>
    `

    this._renderMenuList()

    return super.render()
  }

  get _locations () {
    return [
    ]
  }
}

const styles = /* css */ `
  .${tag} {
    display: block;
    height: 100%;
  }
  .root-content {
    height: calc(100vh - 64px);
    overflow: auto;
  }
  .root-content > * {
    display: block;
    padding: 0;
    margin: 0;
  }
  .margin {
    margin: 0;
  }
  .template-locations {
    padding-left: 15px;
  }
  .${tag} .icon {
    min-width: 25px;
    display: inline-block;
    text-align: center;
  }
  .root {
    height: calc(100vh - 64px);
    overflow: auto;
  }
  .${tag} .head:hover {
    background-color: #f2f2f2;
    cursor: pointer !important;
  }
  .${tag}__profile {
    display: grid;
    position: relative;
    bottom: 10px;
    right: 9px;
    column-gap: 1rem;
    place-items: center;
  }
  .${tag}__avatar {
    display: grid;
    align-items: center;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.5rem;
    text-align: center;
    background: var(--light);
    color: var(--primary);
  }
  .${tag}__logo {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem; 
    color: white;
  }
  .${tag}__version {
    font-weight: 300;
    font-size: 0.8rem;
  }
  .${tag}__image {
    width: 5rem;
  }
  .${tag} [data-sidebar-list] .ark-list-item:hover {
    background: #edeeef;
  }
  .${tag} [navbar-button] {
    height: 100%;
  }
  .${tag} .ark-nav[brand]{
    justify-content: start;
  }
  .${tag} .sidebar__header {
    padding: 0.5rem;
  }
  .${tag} .page-name{
    display: grid;
  }
  .${tag} .navbar__logo{
    width: 100px;
    padding: 0.5rem;
  }
  .${tag} .alert {
    z-index: 10000;
    background-color: #f44336;
    color: white;
    padding: 15px;
    border: 1px solid #eed3d7;
    border-radius: 4px;
    position: absolute;
    top: 64px;
    width: -webkit-fill-available;
  }
  .${tag} .close-btn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }
  .${tag} .close-btn:hover {
    color: black;
  }
  .${tag} .upload-actions {
    margin: 0 auto;
    display: grid;
    grid-auto-flow: column;
    place-items: center;
  }
  .textH1 {
    font-size: 1.2rem;    
    text-align: center;
  }
  [data-profile-modal] .ark-modal__body {
    padding: 1rem;
  }
  [data-profile-modal] .ark-modal__header {
    display: none;
  }
  [data-profile-button] {
    color: aqua;
    font-size: 0.9rem;
    font-weight: 300;
  }
`
Component.define(tag, RootComponent, styles)

