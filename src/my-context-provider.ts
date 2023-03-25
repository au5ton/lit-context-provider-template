import { provide, createContext } from '@lit-labs/context'
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Update these when reusing the file
 */
export const CONTEXT_PROVIDER_NAME = 'my-context-provider'
export type CONTEXT_DATA_TYPE = MyContextualData;
export const CONTEXT_DEFAULT_VALUE: CONTEXT_DATA_TYPE = { name: '' };

export interface MyContextualData {
  name: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-context-provider': ContextProvider
  }
}


/// 
/// 
/// 
/// BOILERPLATE CODE BELOW
/// BOILERPLATE CODE BELOW
/// BOILERPLATE CODE BELOW
/// 
/// 
/// 

// #region Generally, nothing here changes. To reuse this Typescript file, you just copy/paste and change the parts above.

export const context = createContext<CONTEXT_DATA_TYPE>(Symbol(CONTEXT_PROVIDER_NAME));

/**
 * Used to send updates from the child to the parent
 * @param self When called from inside a LitElement, `self` should be `this`
 * @param detail 
 */
export function dispatchContextStateChange(self: LitElement, detail: CONTEXT_DATA_TYPE) {
  const event = new CustomEvent(`${CONTEXT_PROVIDER_NAME}-state-change`, {
    bubbles: true,
    composed: true,
    detail,
  });

  self.dispatchEvent(event);
}

@customElement(CONTEXT_PROVIDER_NAME)
export class ContextProvider extends LitElement {  

  @provide({context: context })
  @property({attribute: false})
  providedData: CONTEXT_DATA_TYPE = CONTEXT_DEFAULT_VALUE;

  connectedCallback() {
    super.connectedCallback()
    this.shadowRoot?.addEventListener(`${CONTEXT_PROVIDER_NAME}-state-change`, ((event: CustomEvent<CONTEXT_DATA_TYPE>) => {
      this.providedData = {
        ...this.providedData,
        ...event.detail
      }
    }) as EventListener)
  }

  render() {
    return html`
      <slot></slot>
    `
  }

  static styles = css`
    :host {
      display: contents
    }
  `
}

// #endregion
