import 'components/button'
import 'components/card'
import 'components/input'
import 'components/modal'
import 'components/camera'
import { Component } from 'base/component'

const tag = 'support-main'
export class SupportComponent extends Component {
  init (_) {
    this.state = {}
    this.networkManager = this.resolve('NetworkManager')
    return super.init()
  }

  render () {
    this.content = /* html */ `
    <ark-card title="Pentakrat" subtitle="The fifth power">
      <h1>SUPPORT</h1>
      <ark-input listen on-alter="{{ state.code }}"></ark-input>
      <ark-button data-trust background="primary" color="secondary"
        listen on-click="onTrust">Trust</ark-button>
    </ark-card>

    <ark-modal title="Trust Leader" background="success" 
      horizontal="center" vertical="center" width="80vw" height="70vh">
      <ark-button slot="action" data-accept listen on-click="onAccept">
        Aceptar
      </ark-button>
    </ark-modal>
    `
    return super.render()
  }

  onTrust(event) {
    event.stopPropagation()
    this.select('ark-modal').open()
  }

  async onAccept(event) {
    event.stopPropagation()
    const data = JSON.parse(atob(this.state.code))
    await this.networkManager.trust({ data })
  }
}

const styles = `
.${tag} .ark-modal {
}
`
Component.define(tag, SupportComponent, styles)
