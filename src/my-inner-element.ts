import { consume } from '@lit-labs/context'
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { context, dispatchContextStateChange, MyContextualData } from './my-context-provider'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-inner-element')
export class MyInnerElement extends LitElement {

  @consume({ context: context, subscribe: true })
  @property({attribute: false})
  public myConsumedData?: MyContextualData;

  private handleClick() {
    console.log('myConsumedData:',this.myConsumedData);
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value)
    dispatchContextStateChange(this, {
      ...this.myConsumedData,
      name: target.value,
    })
  }

  render() {
    return html`
      <div class="wrap">
        <h3><slot></slot></h3>
        <p>Hello</p>
        <p>
          <button @click=${this.handleClick}>print consumed data</button>
        </p>
        <p>
          Consumed data:
        </p>
        <p>
          <input type="text" style="width: 90%" .value=${this.myConsumedData?.name ?? '(undefined)'} @input=${this.handleChange} />
        </p>
        <p>
        <code>${JSON.stringify(this.myConsumedData)}</code>
        </p>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
    }

    .wrap {
      border: 1px solid blue;
    }

    
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-inner-element': MyInnerElement
  }
}
