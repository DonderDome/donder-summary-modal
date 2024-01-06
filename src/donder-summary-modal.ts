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
import './range-slider'

import type { BoilerplateCardConfig, Switch } from './types';
import { actionHandler } from './action-handler-directive';

/* eslint no-console: 0 */
console.info(
  `%c  donder-summary-modal \n%c  version: ${CARD_VERSION}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'donder-summary-modal',
  name: 'Donder Summary Modal',
  description: 'A template custom card for you to create something awesome',
});

export class BoilerplateCard extends LitElement {
  
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    // REPLACE "donder-summary-modal" with widget name, everywhere in the project
    // REPLACE the file name with the actual widget name
    return document.createElement('donder-summary-modal-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  @property() state!: string
  @property() hass!: any
  @property() config!: any
  @property() event!: any
  @property() callback!: any
  @property() serviceCall!: any
  @state() protected _active;
  @state() protected _expanded = false;
  @state() protected _scene_mode = false;
  @state() protected _current_scene = null;
  @state() protected _throttle;
  @state() protected _initiated = {};

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

    if (element.config!.entities) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (oldHass) {

        let hasChanged = false
        for (let i=0; i<=element.config.entities.length-1; i++) {
          const { entity } = element.config.entities[i]
          if (entity && oldHass.states[entity] !== element.hass!.states[entity]) {
            hasChanged = true
            break
          }
        }
        return hasChanged
      }
      return true;
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

  private activateTrigger(sw: any) {
    const { type, entity, entity_data } = sw

    switch(type) {
      case "boolean":
        this.hass.callService('input_boolean', 'toggle', {entity_id: entity})
        break
      case "lights":
        this.hass.callService('light', 'toggle', {entity_id: entity, ...entity_data})
        break
      case "switch":
        this.hass.callService('switch', 'toggle', {entity_id: entity})
        break
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      .type-custom-donder-summary-modal {
        background-color: transparent;
        background: transparent;
      }
      .donder-widget {
        height: 100%;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        background-color: transparent;
        color: var(--text-primary-color);
        border-radius: var(--ha-card-border-radius)
      }
      .summary-switch-wrapper {
        display: flex;
        padding: 10px 0 1px;
        font-size: 1.2rem;
      }
      .summary-switch-name {
        padding-right: 30px;
        padding-top: 5px;
        opacity: .8;
        flex: 1;
      }
      .summary-switches {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: flex-end;
        align-items: end;
      }
      .summary-switches shutter-slider {
        flex: 1;
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
      .summary-group-wrapper {
        box-sizing: border-box;
        margin-bottom: 40px;
        flex: 1 0 50%;
        max-width: 50%;
      }
      .summary-group-wrapper .summary-group-name {
        opacity: .6;
        margin-bottom: 10px;
        font-size: .8em;
      }
      .summary-group-wrapper:nth-child(even) {
        padding-left: 20px;
      }
      .summary-group-wrapper:nth-child(odd) {
        padding-right: 20px;
      }
      .add-automation-icon {
        width: 30px;
      }
      .scene {
        background-color: var(--ha-card-background);
        color: var(--text-primary-color);
        padding: 15px 22px;
        box-sizing: border-box;
        text-align: center;
        border-radius: var(--scene-border-radius);
        font-size: 10px;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
      }
      .add-scene-icon {
        width: 40px;
      }
      .summary-group-scenes {
        display: flex;
      }
      @media (max-width: 600px) {
        .summary-group-wrapper {
          flex: 1 0 100%;
          max-width: 100%;
        }
        .summary-group-wrapper:nth-child(even) {
          padding-left: 0px;
        }
        .summary-group-wrapper:nth-child(odd) {
          padding-right: 0px;
        }
      }
    `;
  }

  protected throttleUpdate(e: any, sw: any): any {
    const percentage = this.hass.states[sw.entity || ''].attributes?.current_position

    if (!this._initiated[sw.entity]) {
      this._initiated[sw.entity] = true;
      return;
    }

    const [element] = e.composedPath();
    const next = parseInt(element.value);


    if (percentage === next) {
      return;
    }
    
    clearTimeout(this._throttle);
    
    this._throttle = setTimeout(() => {
      this.hass.callService('cover', 'set_cover_position', {entity_id: sw.entity, position: next})
    }, 2000)
  }
    
  protected renderShutters(sw: any): any {
    const percentage = this.hass.states[sw.entity || ''].attributes?.current_position
    return html`
      <range-slider
        .min=${0}
        .max=${100}
        .step=${5}
        .value=${percentage}
        @change=${(e) => this.throttleUpdate(e, sw)}
      />
    `
  }

  protected renderToggle(sw: any): any {
    const isOn = this.hass.states[sw.entity || ''].state === 'on'

    return html `<ha-switch .checked=${isOn} @action=${() => this.activateTrigger(sw)} .actionHandler=${actionHandler({
      hasHold: hasAction(this.config.hold_action),
    })}></ha-switch>`
  }

  protected renderSwitch(sw: any): any {
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

  protected _handleSceneAction(ev: ActionHandlerEvent, scene): void {
    const { action } = ev?.detail

    if (action === 'hold') {
      this._toggleEditScene(scene)
    }

    if (action === 'tap') {
      this.hass.callService('donder_scenes', 'trigger', {scene: scene})
    }
  }

  protected _toggleEditScene(scene?: any) {
    const env = this.hass.states['donder_env.global'].attributes
    this.hass.callService('browser_mod', 'popup', {
      content: {
        type: 'custom:donder-scene-modal',
        isNested: false,
        isNew: !scene,
        sensors: env.sensors,
        devices: [
          ...env.shutters,
          ...env.switches
        ],
        locked: true,
        sceneName: this.config.scene,
        scene: scene ? this.hass.states['donder_scenes.global'].attributes[scene] : null,
        closeModal: true,
      },
      browser_id: localStorage.getItem('browser_mod-browser-id'),
    })
  }

  protected renderSwitchGroup(groups: any): any {
    const groupNames = Object.keys(groups)
    const scenes = this.hass.states['donder_scenes.global']?.attributes
    const sceneKeys = Object.keys(scenes)
    const scenesToRemove = ["awake", "sleep"];
    const filteredSceneKeys = sceneKeys.filter((item) => !scenesToRemove.includes(item));

    return html`
      ${groupNames.map(group => {
        return html`<div class='summary-group-wrapper'>
          <div class='summary-group-name'>${group}</div>
          <div class='summary-group-switches'>
            ${groups[group].map(e => {
              return this.renderSwitch(e)
            })}
          </div>
        </div>`
      })}
      
      ${this.config.showScenes
        ? html`
          <div class='summary-group-wrapper'>
            <div class='summary-group-name'>Scenes</div>
            <div class='summary-group-scenes'>
              ${filteredSceneKeys.map(scene => {
                return html`
                  <div
                    @action=${(e) => this._handleSceneAction(e, scene)}
                    class="scene"
                    .actionHandler=${actionHandler({
                      hasHold: hasAction(this.config.hold_action),
                    })}
                  >${scenes[scene].name}</div>
                `
              })}
              <div class="scene" @click=${() => this._toggleEditScene()}>
                <div class="add-scene-icon">
                  <ha-icon icon='mdi:plus'></ha-icon>
                </div>
              </div>
            </div>
          </div>`
        : null}
    `
  }

  protected render(): TemplateResult | void {
    if (this.config.show_warning) {
      return this._showWarning('warning message');
    }

    if (this.config.show_error) {
      return this._showError('error message');
    }

    let entityGroups = null;
    entityGroups = this.config.entities.reduce((g, e) => {
      const { group } = e;
      g[group] = g[group] ?? [];
      g[group].push(e);
      return g;
    }, {});

    return html`
      <ha-card
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
          hasHold: hasAction(this.config.hold_action),
          hasDoubleClick: hasAction(this.config.double_tap_action),
        })}
        tabindex="0"
        .label=${`Boilerplate: ${this.config || 'No Entity Defined'}`}
      >
        <div class='donder-widget'>
        ${entityGroups
          ? this.renderSwitchGroup(entityGroups)
          : this.config.entities.map(e => {
            return this.renderSwitch(e)
            })
        }
      </div>
      </ha-card>
    `;
  }
}

customElements.define("donder-summary-modal", BoilerplateCard);
