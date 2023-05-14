/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LitElement,
  html,
  TemplateResult,
  css,
  PropertyValues,
  CSSResultGroup,
} from 'lit';
import { property, state } from "lit/decorators";
import {
  HomeAssistant,
  hasAction,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers
import { CARD_VERSION } from './constants';
import './editor';
import './range-slider';

import type { BoilerplateCardConfig, Switch } from './types';
import { actionHandler } from './action-handler-directive';

/* eslint no-console: 0 */
console.info(
  `%c  jarvis-SUMMARY-MODAL \n%c  version: ${CARD_VERSION}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'jarvis-summary-modal',
  name: 'Boilerplate Card',
  description: 'A template custom card for you to create something awesome',
});

export class BoilerplateCard extends LitElement {
  
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    // REPLACE "jarvis-summary-modal" with widget name, everywhere in the project
    // REPLACE the file name with the actual widget name
    return document.createElement('jarvis-summary-modal-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: BoilerplateCardConfig;
  @state() protected _areOn = {};
  @state() protected _currentPercentages = {};
  @state() protected _runTimeouts = {};
  @state() protected _throttles = {};

  public setConfig(config: BoilerplateCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error('Invalid configuration');
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      name: 'Boilerplate',
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }
    return this.hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected hasConfigOrEntityChanged(element: any, changedProps: PropertyValues, forceUpdate: boolean): boolean {
    if (changedProps.has('config') || forceUpdate) {
      return true;
    }

    if (element.config!.switches) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (oldHass) {
        let hasChanged = false
        for (let i=0; i<=element.config.switches.length-1; i++) {
          const { entity_open, switch_name } = element.config.switches[i]
          const percentageEntity = `input_number.${switch_name}_percentage`

          if (entity_open && oldHass.states[percentageEntity] !== element.hass!.states[percentageEntity]) {
            hasChanged = true
            break
          }
        }
        return hasChanged
      }
      return false;
    } else {
      return false;
    }
  }

  private _handleAction(ev: ActionHandlerEvent): void {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action);
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html`
      <hui-warning>${warning}</hui-warning>
    `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html`
      ${errorCard}
    `;
  }

  private activateTrigger(sw: Switch, isOpen?: string) {
    const { type, entity, entity_close, entity_open, data } = sw
    switch(type) {
      case "boolean":
        this.hass.callService('input_boolean', 'toggle', {entity_id: entity})
        break
      case "lights":
        this.hass.callService('light', 'toggle', {entity_id: entity, ...data})
        break
      case "switch":
        this.hass.callService('switch', 'toggle', {entity_id: entity})
        break
      case "shutters":
        this.hass.callService('homeassistant', 'turn_off', {entity_id: isOpen === 'on' ? entity_open : entity_close})
        this.hass.callService('homeassistant', 'turn_on', {entity_id: isOpen === 'on' ? entity_close : entity_open})
        break
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      .type-custom-jarvis-summary-modal {
        height: 100%;
        width: 100%;
        font-family: "Rajdhani", sans-serif;
      }
      .jarvis-widget {
        height: 100%;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        color: #fff;
      }
      .summary-switch-wrapper {
        display: flex;
        padding: 10px 0;
        font-size: 1.2rem;
      }
      .summary-switch-name {
        padding-right: 30px;
        padding-top: 5px;
        opacity: .8;
      }
      .summary-switches {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: flex-end;
        align-items: end;
      }
      .summary-switch {
        width: 30px;
        color: #ccc;
      }
      .summary-switch.on {
        padding-left: 20px;
      }
      .summary-switch.off {
        transform: rotate(180deg);
        position: relative;
        top: -6px;
      }
    `;
  }

  protected updateShutter(next: any, sw: any): any {
    console.log("updateShutter")
    const status = this._areOn[sw.switch_name]
    const time = 26; // time of full cycle
    const current = this._currentPercentages[sw.switch_name]
    const delta = next - current
    const close = delta < 0

    if (delta === 0) {
      return;
    } else if (status){
      clearTimeout(this._runTimeouts[sw.switch_name]);
      this.hass.callService('homeassistant', 'turn_off', {entity_id: sw.entity_open})
      this.hass.callService('homeassistant', 'turn_off', {entity_id: sw.entity_close})
    }
    
    const runtime = (Math.abs(delta) * time * 10)
   
    this._areOn[sw.switch_name] = true

    // call shutter close/open
    this.hass.callService('homeassistant', 'turn_off', {entity_id: close ? sw.entity_open : sw.entity_close})
    this.hass.callService('homeassistant', 'turn_on', {entity_id: close ? sw.entity_close : sw.entity_open})

    this._runTimeouts[sw.switch_name] = setTimeout(() => {
      this._areOn[sw.switch_name] = false
      // this.hass.callService('input_number', 'set_value', {entity_id: `input_number.${inputName}_percentage`, value: next})
      this.hass.callService('homeassistant', 'turn_off', {entity_id: sw.entity_open})
      this.hass.callService('homeassistant', 'turn_off', {entity_id: sw.entity_close})
    }, runtime)
  }

  protected throttleUpdate(e: any, sw: any): any {
    const [element] = e.composedPath();
    const next = parseInt(element.value);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log("throttleUpdate", next, parseInt(this._currentPercentages[sw.switch_name]))

    clearTimeout(this._throttles[sw.switch_name]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this._currentPercentages[sw.switch_name] && next !== parseInt(this._currentPercentages[sw.switch_name])) {
      this._throttles[sw.switch_name] = setTimeout(() => {  
        this.updateShutter(next, sw)
      }, 2000)
    }
  }

  protected renderShutters(sw: any): any {
    const percentage = parseFloat(this.hass?.states[`input_number.${sw.switch_name}_percentage`].state)
  
    this._currentPercentages[sw.switch_name] = percentage

    return html`
      <range-slider
        id="slider-with-change-handler"
        data-prop="slider-with-change-handler"
        .min=${0}
        .max=${100}
        .step=${10}
        .value=${percentage}
        @change=${(e) => this.throttleUpdate(e, sw)}
      />`
  }

  protected renderToggle(sw: Switch): any {
    const isOn = this.hass.states[sw.entity || ''].state

    return isOn === 'on'
      ? html`
        <div class='summary-switch on' @click="${() => this.activateTrigger(sw, isOn)}">
          <svg-item state='toggle-on'></svg-item>
        </div>`
      : html`
        <div class='summary-switch off' @click="${() => this.activateTrigger(sw, isOn)}">
          <svg-item state='toggle-off'></svg-item>
        </div>`
  }

  protected renderSwitch(sw: Switch): any {
    return html`
      <div class='summary-switch-wrapper'>
        <div class='summary-switch-name'>${sw.name}</div>
        <div class='summary-switches'>
          ${sw.type === 'shutters'
            ? this.renderShutters(sw)
            : this.renderToggle(sw)
          }
        </div>
      </div>
    `
  }

  protected render(): TemplateResult | void {
    /*
      ## INTERFACE
      - this.hass: A lot of information about everything in HA, such as states, theme, etc. The source of the tree
        - states: States of each of the components available
      - this.config: Lovelace settings for this instance
      - this.hass.callService(domain, service, action.service_data): To call services, like an API

      Example: this.hass.states[this.config.entities[0]] shows the state of the first component
     */

    // const states = this.hass.states

    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this.config.show_warning) {
      return this._showWarning('warning message');
    }

    if (this.config.show_error) {
      return this._showError('error message');
    }

    return html`
      <ha-card
        @action=${this._handleAction}
        tabindex="0"
        .label=${`Boilerplate: ${this.config || 'No Entity Defined'}`}
      >
        <div class='jarvis-widget'>
          ${this.config.switches.map(e => {
            return this.renderSwitch(e)
          })}
        </div>
      </ha-card>
    `;
  }
}

customElements.define("jarvis-summary-modal", BoilerplateCard);
