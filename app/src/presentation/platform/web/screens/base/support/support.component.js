import 'components/button'
import 'components/card'
import 'components/modal'
import 'components/camera'
import { Component } from 'base/component'

const tag = 'support-main'
export class SupportComponent extends Component {
  render () {
    this.content = /* html */ `
    <ark-card title="Pentakrat" subtitle="The fifth power">
      <h1>SUPPORT</h1>
      <ark-button background="primary" color="secondary"
        listen on-click="onTrust">Trust</ark-button>
    </ark-card>

    <ark-modal title="Scan Leader" background="success" 
      horizontal="center" vertical="center" width="80vw" height="70vh">
      <ark-camera facing-mode="environment"></ark-camera>
      <ark-button slot="action">Aceptar</ark-button>
    </ark-modal>
    `
    return super.render()
  }

  onTrust(event) {
    event.stopPropagation()
    this.select('ark-modal').open()
    this.select('ark-camera').start()
  }
}

const styles = `
.${tag} .ark-modal {
}
`
Component.define(tag, SupportComponent, styles)
