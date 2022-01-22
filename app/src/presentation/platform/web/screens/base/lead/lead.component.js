import 'components/button'
import 'components/input'
import 'components/card'
import { Component } from 'base/component'

const tag = 'lead-main'
export class LeadComponent extends Component {
  init (context) {
    this.address = 'NOT CONNECTED'
    this.networkInformer = this.resolve('NetworkInformer')
    return super.init(context)
  }

  render () {
    this.content = /* html */ `
    <ark-card class="${tag}_content" title="Lead">
      <ark-input></ark-input>
      <p class=${tag}_address>${this.address}</p>
      <ark-button background="success">GENERATE</ark-button>
      <p class="${tag}_code">CODE</p>
    </ark-card>
    `
    return super.render()
  }

  async load () {
    this.address = (await this.networkInformer.getAddress({})).data
    this.render()
  }
}

const styles = `
.${tag} .ark-card {
  display: grid;
  justify-items: center;
}
.${tag} .ark-card__body {
  display: grid;
  justify-items: center;
}
.${tag}_qrcode {
  width: min(50vh, 10rem);
}

`
Component.define(tag, LeadComponent, styles)
