import 'components/button'
import 'components/input'
import 'components/card'
import { Component } from 'base/component'

const tag = 'lead-main'
export class LeadComponent extends Component {
  init (context) {
    this.state = {
      address: 'NOT CONNECTED',
      proposal: ''
    }
    this.networkInformer = this.resolve('NetworkInformer')
    return super.init(context)
  }

  render () {
    this.content = /* html */ `
    <ark-card class="${tag}_content" title="Lead">
      <ark-input listen on-alter="{{ state.proposal }}"></ark-input>
      <p class=${tag}_address>${this.state.address}</p>
      <ark-button data-generate background="success"
        listen on-click="onGenerate">
        GENERATE
      </ark-button>
      <textarea data-code class="${tag}_code" readonly rows="7" cols="40">
        LEADER-CODE
      </textarea>
    </ark-card>
    `
    return super.render()
  }

  async load () {
    this.state.address = (await this.networkInformer.getAddress({})).data
    this.render()
  }

  onGenerate(event) {
    event.stopPropagation()
    const code = btoa(JSON.stringify({
      address: this.state.address,
      proposal: this.state.proposal
    }))
    this.select('[data-code]').value = code
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
