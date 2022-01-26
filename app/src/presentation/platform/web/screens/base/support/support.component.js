import 'components/button'
import 'components/card'
import 'components/input'
import 'components/modal'
import 'components/camera'
import { Component } from 'base/component'

const tag = 'support-main'
export class SupportComponent extends Component {
  init (_) {
    this.state = {
      code: '',
      trust: {
        proposal: '',
        address: ''
      }
    }
    this.networkManager = this.resolve('NetworkManager')
    return super.init()
  }

  render () {
    this.content = /* html */ `
    <ark-card class="${tag}__content" title="Support">
      <ark-input listen on-alter="{{ state.code }}"></ark-input>
      <ark-button data-trust background="primary" color="secondary"
        listen on-click="onTrust">Trust</ark-button>
    </ark-card>

    <ark-modal title="Trust Leader" background="success" 
      horizontal="center" vertical="center" width="80vw" height="70vh">

      <dl>
        <dt>Proposal</dt>
        <dd data-proposal>${this.state.trust.proposal}</dd>

        <dt>Leader</dt>
        <dd data-address>${this.state.trust.address}</dd>
      </dl>

      <ark-button slot="action" data-accept listen on-click="onAccept">
        Aceptar
      </ark-button>
    </ark-modal>
    `
    return super.render()
  }

  onTrust (event) {
    event.stopPropagation()
    this.state.trust = JSON.parse(atob(this.state.code) || '{}')
    this.select('[data-proposal]').textContent = this.state.trust.proposal
    this.select('[data-address]').textContent = this.state.trust.address 
    this.select('ark-modal').open()
  }

  async onAccept (event) {
    event.stopPropagation()
    const data = this.state.trust
    await this.networkManager.trust({ data })
    this.select('ark-modal').close()
  }
}

const styles = `
.${tag}__content {
  display: grid;
  justify-items: center;
}
.${tag} .ark-card__body {
  display: grid;
  justify-items: center;
}
.${tag} dl {
  display: grid;
  height: 100%;
  gap: 1.5rem;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
}
.${tag} dt {
  font-weight: bold;
}
`
Component.define(tag, SupportComponent, styles)
