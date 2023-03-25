import { createContext } from '@lit-labs/context';
import { LitElement } from 'lit';
export declare class ContextProvider<T> extends LitElement {
    constructor(context: ReturnType<typeof createContext<T>>);
    render(): import("lit-html").TemplateResult<1>;
}
