import 'components/button'
import 'components/card'
import { Component } from 'base/component'

const tag = 'analyze-main'
export class AnalyzeComponent extends Component {
  render () {
    this.content = /* html */ `
    <ark-card title="Pentakrat" subtitle="The fifth power">
      <h1>ANALYZE</h1>
      <ark-button background="primary"
        color="secondary" slot="actions">Trust</ark-button>
      <ark-button background="success" slot="actions">Reward</ark-button>
    </ark-card>
  `
  }
}

const styles = ``
Component.define(tag, AnalyzeComponent, styles)
