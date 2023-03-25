import { LitElement } from 'lit';
import { MyContextualData } from './some-context';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class MyInnerElement extends LitElement {
    myConsumedData?: MyContextualData;
    private handleClick;
    private handleChange;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-inner-element': MyInnerElement;
    }
}
