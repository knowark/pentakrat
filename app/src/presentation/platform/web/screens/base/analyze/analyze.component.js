import 'components/button'
import 'components/card'
import { Component } from 'base/component'

const tag = 'analyze-main'
export class AnalyzeComponent extends Component {
  init (context = {}) {
    this.state = {
      level: 0,
      juras: 0
    }
    return super.init()
  }

  render () {
    if (!this.state.level) {
      this.content = /* html */ `
      <ark-card class="${tag}__content" title="ANALYZE">
        <h1 data-notrust>No trust bonds have been established yet.</h1>
      </ark-card>
      `
    } else {
      this.content = /* html */ `
      <ark-card class="${tag}__content" title="ANALYZE">
        <div class=${tag}__stat>
          <h2 class="${tag}__stat-title">SUPPORT LEVEL</h2>
          <h3 class="${tag}__stat-number" data-level>${this.state.level}</h3>
        </div>
        <div class=${tag}__stat>
          <h2 class="${tag}__stat-title">JURAS</h2>
          <h3 class="${tag}__stat-number" data-juras>${this.state.juras}</h3>
        </div>
      </ark-card>
      `
    }
    return super.render()
  }

  async load () {
    const informer = this.resolve('NetworkInformer')
    this.state.level = (await informer.getLevel({})).data
    this.state.juras = (await informer.getJuras({})).data
    this.render()
  }
}

const styles = /*css*/`
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
  border-radius: 5px;
  width: 80%;
}
.${tag}__stat-title {
  background: var(--primary);
  color: var(--secondary);
  border-radius: 5px 5px 0px 0px;
  font-size: 1.05rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  padding: 1rem;
}
.${tag}__stat-number {
  font-size: 1.8rem;
  border: 1px solid black;
  padding: 1.5rem;
}
`
Component.define(tag, AnalyzeComponent, styles)
