import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@aspen-elements/aspen-list-icons';
import '@firefly-elements/polymerfire/firebase-query';
import '@firefly-elements/firefly-list-mixin';
import '@fluidnext-polymer/paper-autocomplete';

/**
 * `firefly-autocomplete` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class AspFireAutocomplete extends AspFireListMixin(PolymerElement) {
  static get template() {
    return html`
        <style>
            :host {
                display: block
            }
            #container{
                @apply --layout-horizontal;
            }
            aspen-button{
                margin-top: 25px;
            }
        </style>

    <firebase-query app-name="[[appName]]" path="[[path]]" data="{{model}}" start-at="[[searchTerm]]" order-by-child="[[orderByChild]]" equal-to="[[equalTo]]" on-data-changed="__updateValueMap"></firebase-query>

    <div id="container">
        <paper-autocomplete label="[[label]]" always-float-label="" value="{{selectedId}}" source="[[model]]" text-property="name" text="{{searchTerm}}" value-property="\$key" on-autocomplete-selected="__valueSelected"></paper-autocomplete>

        <template is="dom-if" if="{{editable}}">
            <aspen-button icon="list:add-circle" on-tap="_openAddDialog"></aspen-button>
        </template>
    </div>

    <slot select=".detail-dialog"></slot>
`;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
      return 'firefly-autocomplete';
  }

  static get properties(){
      return {

          searchTerm:{
              type: String,
              value: ''
          }
      }
  }


  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
      super();
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized. 
   */
  ready() {
      super.ready();

      afterNextRender(this, function() {
          
      });
  }

  __valueSelected(e){
      let selected = e.detail.option;
      let selectedObj = this.valueMap.get(selected.$key);
      console.log(selectedObj);
      this.set('selectedItem', selectedObj);
      this.set('selected', selectedObj.$key);
  }

  /**
   * This method is responsible for updating a map of the investors each time the 
   * new data is returned from the investorQuery.
   * @param {Event} e the event object.
   */
  __updateValueMap(e){
     let values = e.detail.value;
     if(values && values.length > 0){
         let valueMap = new Map();
         for(let value of values){
             valueMap.set(value.$key, value);
         }
         this.set('valueMap', valueMap);
     }
     

 }
}

window.customElements.define(AspFireAutocomplete.is, AspFireAutocomplete);
