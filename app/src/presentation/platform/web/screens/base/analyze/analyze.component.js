import 'components/button'
import 'components/card'
import { Component } from 'base/component'

const tag = 'analyze-main'
export class AnalyzeComponent extends Component {
  init (context = {}) {
    this.supportLevel = context.supportLevel || 0
    this.juras = context.juras || 0
    return super.init()
  }

  render () {
    if (!this.supportLevel) {
      this.content = /* html */ `
      <ark-card class="${tag}__content" title="Analyze">
        <h1>No trust bonds have been established yet.</h1>
      </ark-card>
      `
    } else {
      this.content = /* html */ `
      <ark-card class="${tag}__content" title="Analyze">
        <div class=${tag}__stat>
          <h2>Support Level</h2>
          <h3>${this.supportLevel}</h3>
        </div>
        <div class=${tag}__stat>
          <h2>Juras</h2>
          <h3>${this.juras}</h3>
        </div>
      </ark-card>
      `
    }
    return super.render()
  }

  async load () {
    const informer = this.resolve('NetworkInformer')
    this.supportLevel = (await informer.getSupportLevel({})).data
    this.juras = (await informer.getJuras({})).data
    this.render()
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
  align-items: center;
  width: 100%;
}
.${tag}__stat {
  background: gray;
  border-radius: 5px;
  width: 50%;
}
.${tag}__stat h2 {
  background: #004d25;
  color: white;
}
`
Component.define(tag, AnalyzeComponent, styles)
