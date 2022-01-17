import 'components/button'
import 'components/card'
import { Component } from 'base/component'
import QRious from 'qrious/dist/qrious.js'

const tag = 'lead-main'
export class LeadComponent extends Component {
  render () {
    this.content = /* html */ `
    <ark-card class="${tag}_content" title="Lead">
      <canvas class="${tag}_qrcode" id="qrcode"></canvas>
    </ark-card>
    `
    new QRious({
      element: document.getElementById('qrcode'),
      value: JSON.stringify({mission: 'The best mission'}),
    })
  }
}

const styles = `
${tag} .ark-card {
  display: grid;
  justify-items: center;
}
${tag} .ark-card__body {
  display: grid;
  justify-items: center;
}
.${tag}_qrcode {
  width: min(50vh, 10rem);
}

`
Component.define(tag, LeadComponent, styles)
