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
    <ark-card class="${tag}__content" title="LEAD">
      <ark-input listen on-alter="{{ state.proposal }}"
        placeholder="Proposal"></ark-input>
      <p class=${tag}_address>${this.state.address}</p>
      <ark-button data-generate background="primary" color="secondary"
        listen on-click="onGenerate">GENERATE</ark-button>
      <p data-code 
        class="${tag}_code" 
         >
        LEADER-CODE
      </p>
    </ark-card>
    `
    return super.render()
  }

  async load () {
    this.state.address = (await this.networkInformer.getAddress({})).data
    this.render()
  }

  onGenerate (event) {
    event.stopPropagation()
    const code = btoa(JSON.stringify({
      address: this.state.address,
      proposal: this.state.proposal
    }))
    this.select('[data-code]').textContent = code
  }
}

const styles = `
.${tag}__content {
  display: grid;
  justify-items: center;
}
.${tag} .ark-card__body {
  display: grid;
  gap: 1.5rem;
  justify-items: center;
}
.${tag}_code {
  user-select: text;
  word-break: break-all;
  text-align: justify;
  text-align-last: center;
  border: 1px dotted;
  padding: 1rem;
}
`
Component.define(tag, LeadComponent, styles)
