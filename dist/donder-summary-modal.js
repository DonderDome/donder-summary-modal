/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new Map;class o{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=s.get(this.cssText);return e&&void 0===t&&(s.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a,l;const d={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},c=(t,e)=>e!==t&&(e==e||t==t),h={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:c};class u extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=h){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||h}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=h){var s,o;const n=this.constructor._$Eh(t,i);if(void 0!==n&&!0===i.reflect){const r=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:d.toAttribute)(e,i.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,e){var i,s,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),a=t.converter,l=null!==(o=null!==(s=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof a?a:null)&&void 0!==o?o:d.fromAttribute;this._$Ei=r,this[r]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||c)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var p,m;u.finalized=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null===(a=globalThis.reactiveElementPolyfillSupport)||void 0===a||a.call(globalThis,{ReactiveElement:u}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.0.0");const v=globalThis.trustedTypes,g=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,_="?"+f,y=`<${_}>`,$=document,b=(t="")=>$.createComment(t),w=t=>null===t||"object"!=typeof t&&"function"!=typeof t,x=Array.isArray,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,E=/>/g,C=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,T=/'/g,k=/"/g,M=/^(?:script|style|textarea)$/i,P=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),U=new WeakMap,N=$.createTreeWalker($,129,null,!1),R=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=A;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===A?"!--"===l[1]?r=S:void 0!==l[1]?r=E:void 0!==l[2]?(M.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=C):void 0!==l[3]&&(r=C):r===C?">"===l[0]?(r=null!=o?o:A,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?C:'"'===l[3]?k:T):r===k||r===T?r=C:r===S||r===E?r=A:(r=C,o=void 0);const h=r===C&&t[e+1].startsWith("/>")?" ":"";n+=r===A?i+y:d>=0?(s.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+f+h):i+f+(-2===d?(s.push(void 0),e):h)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==g?g.createHTML(a):a,s]};class z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,d]=R(t,e);if(this.el=z.createElement(l,i),N.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=N.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const i=d[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?I:"?"===e[1]?B:"@"===e[1]?V:q})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(M.test(s.tagName)){const t=s.textContent.split(f),e=t.length-1;if(e>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],b()),N.nextNode(),a.push({type:2,index:++o});s.append(t[e],b())}}}else if(8===s.nodeType)if(s.data===_)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(f,t+1));)a.push({type:7,index:o}),t+=f.length-1}o++}}static createElement(t,e){const i=$.createElement("template");return i.innerHTML=t,i}}function L(t,e,i=t,s){var o,n,r,a;if(e===H)return e;let l=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const d=w(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Cl)&&void 0!==r?r:a._$Cl=[])[s]=l:i._$Cu=l),void 0!==l&&(e=L(t,l._$AS(t,e.values),l,s)),e}class j{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:$).importNode(i,!0);N.currentNode=o;let n=N.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new D(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new W(n,this,t)),this.v.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=N.nextNode(),r++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class D{constructor(t,e,i,s){var o;this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),w(t)?t===O||null==t||""===t?(this._$AH!==O&&this._$AR(),this._$AH=O):t!==this._$AH&&t!==H&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return x(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==O&&w(this._$AH)?this._$AA.nextSibling.data=t:this.S($.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=z.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new j(o,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new z(t)),e}M(t){x(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new D(this.A(b()),this.A(b()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,i,s,o){this.type=1,this._$AH=O,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=O}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=L(this,t,e,0),n=!w(t)||t!==this._$AH&&t!==H,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=L(this,s[i+r],e,r),a===H&&(a=this._$AH[r]),n||(n=!w(a)||a!==this._$AH[r]),a===O?t=O:t!==O&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.k(t)}k(t){t===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class I extends q{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===O?void 0:t}}class B extends q{constructor(){super(...arguments),this.type=4}k(t){t&&t!==O?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class V extends q{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=L(this,t,e,0))&&void 0!==i?i:O)===H)return;const s=this._$AH,o=t===O&&s!==O||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==O&&(s===O||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class W{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var J,F,K;null===(p=globalThis.litHtmlPolyfillSupport)||void 0===p||p.call(globalThis,z,D),(null!==(m=globalThis.litHtmlVersions)&&void 0!==m?m:globalThis.litHtmlVersions=[]).push("2.0.0");class Z extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new D(e.insertBefore(b(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return H}}Z.finalized=!0,Z._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:Z}),null===(F=globalThis.litElementPolyfillSupport)||void 0===F||F.call(globalThis,{LitElement:Z}),(null!==(K=globalThis.litElementVersions)&&void 0!==K?K:globalThis.litElementVersions=[]).push("3.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function X(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):G(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function Y(t){return X({...t,state:!0})}var Q="[^\\s]+";function tt(t,e){for(var i=[],s=0,o=t.length;s<o;s++)i.push(t[s].substr(0,e));return i}var et=function(t){return function(e,i){var s=i[t].map((function(t){return t.toLowerCase()})),o=s.indexOf(e.toLowerCase());return o>-1?o:null}};function it(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var s=0,o=e;s<o.length;s++){var n=o[s];for(var r in n)t[r]=n[r]}return t}var st=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ot=["January","February","March","April","May","June","July","August","September","October","November","December"],nt=tt(ot,3),rt={dayNamesShort:tt(st,3),dayNames:st,monthNamesShort:nt,monthNames:ot,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},at=(it({},rt),function(t){return+t-1}),lt=[null,"[1-9]\\d?"],dt=[null,Q],ct=["isPm",Q,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],ht=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];et("monthNamesShort"),et("monthNames");var ut,pt;!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ut||(ut={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(pt||(pt={}));var mt=["closed","locked","off"],vt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o},gt=function(t){vt(window,"haptic",t)},ft=function(t,e,i,s){if(s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(gt("warning"),confirm(s.confirmation.text||"Are you sure you want to "+s.action+"?")))switch(s.action){case"more-info":(i.entity||i.camera_image)&&vt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":s.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),vt(window,"location-changed",{replace:i})}(0,s.navigation_path);break;case"url":s.url_path&&window.open(s.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var s,o=function(t){return t.substr(0,t.indexOf("."))}(e),n="group"===o?"homeassistant":o;switch(o){case"lock":s=i?"unlock":"lock";break;case"cover":s=i?"open_cover":"close_cover";break;default:s=i?"turn_on":"turn_off"}t.callService(n,s,{entity_id:e})})(t,e,mt.includes(t.states[e].state))}(e,i.entity),gt("success"));break;case"call-service":if(!s.service)return void gt("failure");var o=s.service.split(".",2);e.callService(o[0],o[1],s.service_data),gt("success");break;case"fire-dom-event":vt(t,"ll-custom",s)}};function _t(t){return void 0!==t&&"none"!==t.action}const yt={required:{icon:"tune",name:"Required",secondary:"Required options for this card to function",show:!0},actions:{icon:"gesture-tap-hold",name:"Actions",secondary:"Perform actions based on tapping/clicking",show:!1,options:{tap:{icon:"gesture-tap",name:"Tap",secondary:"Set the action to perform on tap",show:!1},hold:{icon:"gesture-tap-hold",name:"Hold",secondary:"Set the action to perform on hold",show:!1},double_tap:{icon:"gesture-double-tap",name:"Double Tap",secondary:"Set the action to perform on double tap",show:!1}}},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the name, icon, etc",show:!1}};let $t=class extends Z{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||""}get _entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.entity)||""}get _show_warning(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_warning)||!1}get _show_error(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_error)||!1}get _tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.tap_action)||{action:"more-info"}}get _hold_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.hold_action)||{action:"none"}}get _double_tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.double_tap_action)||{action:"none"}}render(){if(!this.hass||!this._helpers)return P``;this._helpers.importMoreInfoControl("climate");const t=Object.keys(this.hass.states).filter((t=>"sun"===t.substr(0,t.indexOf("."))));return P`
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${"required"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${yt.required.icon}`}></ha-icon>
            <div class="title">${yt.required.name}</div>
          </div>
          <div class="secondary">${yt.required.secondary}</div>
        </div>
        ${yt.required.show?P`
              <div class="values">
                <paper-dropdown-menu
                  label="Entity (Required)"
                  @value-changed=${this._valueChanged}
                  .configValue=${"entity"}
                >
                  <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
                    ${t.map((t=>P`
                        <paper-item>${t}</paper-item>
                      `))}
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"actions"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${yt.actions.icon}`}></ha-icon>
            <div class="title">${yt.actions.name}</div>
          </div>
          <div class="secondary">${yt.actions.secondary}</div>
        </div>
        ${yt.actions.show?P`
              <div class="values">
                <div class="option" @click=${this._toggleAction} .option=${"tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${yt.actions.options.tap.icon}`}></ha-icon>
                    <div class="title">${yt.actions.options.tap.name}</div>
                  </div>
                  <div class="secondary">${yt.actions.options.tap.secondary}</div>
                </div>
                ${yt.actions.options.tap.show?P`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"hold"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${yt.actions.options.hold.icon}`}></ha-icon>
                    <div class="title">${yt.actions.options.hold.name}</div>
                  </div>
                  <div class="secondary">${yt.actions.options.hold.secondary}</div>
                </div>
                ${yt.actions.options.hold.show?P`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"double_tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${yt.actions.options.double_tap.icon}`}></ha-icon>
                    <div class="title">${yt.actions.options.double_tap.name}</div>
                  </div>
                  <div class="secondary">${yt.actions.options.double_tap.secondary}</div>
                </div>
                ${yt.actions.options.double_tap.show?P`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"appearance"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${yt.appearance.icon}`}></ha-icon>
            <div class="title">${yt.appearance.name}</div>
          </div>
          <div class="secondary">${yt.appearance.secondary}</div>
        </div>
        ${yt.appearance.show?P`
              <div class="values">
                <paper-input
                  label="Name (Optional)"
                  .value=${this._name}
                  .configValue=${"name"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <br />
                <ha-formfield .label=${"Toggle warning "+(this._show_warning?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_warning}
                    .configValue=${"show_warning"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${"Toggle error "+(this._show_error?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_error}
                    .configValue=${"show_error"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            `:""}
      </div>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleAction(t){this._toggleThing(t,yt.actions.options)}_toggleOption(t){this._toggleThing(t,yt)}_toggleThing(t,e){const i=!e[t.target.option].show;for(const[t]of Object.entries(e))e[t].show=!1;e[t.target.option].show=i,this._toggle=!this._toggle}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(this[`_${e.configValue}`]!==e.value){if(e.configValue)if(""===e.value){const t=Object.assign({},this._config);delete t[e.configValue],this._config=t}else this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value});vt(this,"config-changed",{config:this._config})}}static get styles(){return n`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `}};t([X({attribute:!1})],$t.prototype,"hass",void 0),t([Y()],$t.prototype,"_config",void 0),t([Y()],$t.prototype,"_toggle",void 0),t([Y()],$t.prototype,"_helpers",void 0),$t=t([(t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e))("donder-summary-modal-editor")],$t),
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");class bt extends Z{static get properties(){return{disabled:{reflect:!0,type:Boolean},min:{type:Number},max:{type:Number},step:{type:Number},value:{type:Number}}}constructor(){super(),this.disabled=!1,this.min=0,this.max=100,this.value=0,this._actualMin=this.min,this._actualMax=this.max,this._input={},this._slider={},this._thumb={}}async firstUpdated(){if(this._input=this.shadowRoot.querySelector("input"),this._slider=this.shadowRoot.querySelector(".range-slider"),this._thumb=this.shadowRoot.querySelector(".range-thumb"),this._actualMin=this.min,this._actualMax=this.max,this.step){const t=this.min%this.step,e=this.max%this.step;0!==t&&(this.min=this.min-t),0!==e&&(this.max=this.max+this.step-e)}}updated(t){t.has("value")&&this._updateSlider()}static styles=n`
    :host {
      --slider-background: #767676;
      --slider-height: 3px;
      --slider-radius: var(--slider-height);
      --slider-value-color: rgb(73, 170, 227);
      --slider-value-width: 0;
      --thumb-color: #fff;
      --thumb-diameter: 15px;
      --thumb-offset: 0;
      --slider-outline: rgba(255, 255, 255, 0.8);
      display: inline-block;
    }

    .range-container {
      position: relative;
      width: 100%;
    }

    .range-slider,
    .range-slider-value {
      border-radius: var(--slider-radius);
      height: var(--slider-height);
      max-height: var(--thumb-diameter);
      position: absolute;
      top: calc((var(--thumb-diameter) - min(var(--slider-height), var(--thumb-diameter))) / 2);
    }

    .range-slider {
      background: var(--primary-background-color);
      width: 100%;
    }

    .range-slider-value {
      background: var(--primary-color);
      width: var(--slider-value-width);
    }

    .range-thumb {
      background: var(--thumb-color);
      border-radius: 50%;
      height: var(--thumb-diameter);
      position: absolute;
      left: calc(var(--slider-value-width) - (var(--thumb-diameter))/2);
      width: var(--thumb-diameter);
    }

    input {
      display: inline-block;
      height: var(--thumb-diameter);
      margin: 0;
      opacity: 0;
      position: relative;
      width: 100%;
    }

    :host([disabled]) {
      --slider-background: rgb(74, 74, 74);
      --slider-value-color: rgb(74, 74, 74);
      --thumb-color: #fff;
    }
  `;render(){return P`
      <div class="range-container">
        <div class="range-slider"></div>
        <div class="range-slider-value"></div>
        <div class="range-thumb"></div>
        <input
          max=${this.max}
          min=${this.min}
          step=${this.step}
          type="range"
          value=${this.value}
          ?disabled=${this.disabled}
          @input=${this._changeHandler}
        />
      </div>
    `}_changeHandler(){const{value:t}=this._input;this.value=t>this._actualMax?this._actualMax:t<this._actualMin?this._actualMin:t}_updateSlider(){const t=this.min<this._actualMin?this._actualMin:this.min,e=this.max>this._actualMax?this._actualMax:this.max,i=(this.value-t)/(e-t);this._thumb.offsetWidth,this._slider.offsetWidth;const s=100*i+"%",o=`${i}%`;this.style.setProperty("--slider-value-width",s),this.style.setProperty("--thumb-offset",o),this.dispatchEvent(new Event("change"))}}customElements.define("range-slider",bt);const wt="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.maxTouchPoints>0;class xt extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:wt?"100px":"50px",height:wt?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach((t=>{document.addEventListener(t,(()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0}),{passive:!0})}))}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",(t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1}));const i=t=>{let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout((()=>{this.startAnimation(e,i),this.held=!0}),this.holdTime)},s=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?vt(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout((()=>{this.dblClickTimeout=void 0,vt(t,"action",{action:"tap"})}),250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,vt(t,"action",{action:"double_tap"})):vt(t,"action",{action:"tap"}))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",s),t.addEventListener("touchcancel",s),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",s),t.addEventListener("keyup",(t=>{13===t.keyCode&&s(t)}))}startAnimation(t,e){Object.assign(this.style,{left:`${t}px`,top:`${e}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-jarvis-widget-template",xt);const At=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-jarvis-widget-template"))return t.querySelector("action-handler-jarvis-widget-template");const e=document.createElement("action-handler-jarvis-widget-template");return t.appendChild(e),e})();i&&i.bind(t,e)},St=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{update(t,[e]){return At(t.element,e),H}render(t){}});console.info("%c  donder-summary-modal \n%c  version: 1.7.1  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"donder-summary-modal",name:"Donder Summary Modal",description:"A template custom card for you to create something awesome"});class Et extends Z{constructor(){super(...arguments),this._expanded=!1,this._scene_mode=!1,this._current_scene=null,this._throttle={},this._initiated={}}static async getConfigElement(){return document.createElement("donder-summary-modal-editor")}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error("Invalid configuration");t.test_gui&&function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null}().setEditMode(!0),this.config=Object.assign({name:"Boilerplate"},t)}shouldUpdate(t){return!!this.config&&this.hasConfigOrEntityChanged(this,t,!1)}hasConfigOrEntityChanged(t,e,i){if(e.has("config")||i)return!0;if(t.config.entities){const i=e.get("hass");if(i){let e=!1;for(let s=0;s<=t.config.entities.length-1;s++){const{entity:o}=t.config.entities[s];if(o&&i.states[o]!==t.hass.states[o]){e=!0;break}}return e}return!0}return!1}_handleAction(t){console.log("handleAction",t.detail.action),this.hass&&this.config&&t.detail.action&&function(t,e,i,s){var o;"double_tap"===s&&i.double_tap_action?o=i.double_tap_action:"hold"===s&&i.hold_action?o=i.hold_action:"tap"===s&&i.tap_action&&(o=i.tap_action),ft(t,e,i,o)}(this,this.hass,this.config,t.detail.action)}_showWarning(t){return P`
      <hui-warning>${t}</hui-warning>
    `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),P`
      ${e}
    `}activateTrigger(t){const{type:e,entity:i,entity_data:s}=t;switch(e){case"boolean":this.hass.callService("input_boolean","toggle",{entity_id:i});break;case"lights":this.hass.callService("light","toggle",Object.assign({entity_id:i},s));break;case"switch":this.hass.callService("switch","toggle",{entity_id:i})}}static get styles(){return n`
      .hold-div {
        width: 200px;
        height: 100px;
        background-color: lightblue;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none; /* Prevents text selection while holding */
        touch-action: none; /* Prevents default touch actions like scrolling */
        -webkit-user-select: none; /* Prevent text selection on mobile (Safari/Chrome) */
        padding: 20px;
      }
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
        padding: 10px 0px 1px;
        /* font-size: 1.2rem; */
      }
      .summary-shutter-wrapper ha-control-slider {
        --control-slider-background: #fff;
      }
      .summary-switch-name {
        padding-right: 30px;
        padding-top: 5px;
        opacity: 0.8;
        flex: 3 1 0%;
      }
      .summary-switches {
        display: flex;
        flex-direction: row;
        flex: 3 1 0%;
        justify-content: center;
        align-items: center;
      }
      /* .summary-switches shutter-slider {
        flex: 1;
      } */
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
      .summary-shutter-name {
        padding-right: 30px;
        /* opacity: .8; */
        position: absolute;
        top: 10px;
        left: 10px;
        color: white;
        z-index: 10;
        /* text-shadow: 1px 1px 0px rgba(0,0,0,0.3); */
        pointer-events: none;
      }
      .summary-shutter-wrapper {
        width: 100%;
        position: relative;
        margin-top: 20px;
      }
      .summary-group-wrapper {
        box-sizing: border-box;
        margin-bottom: 20px;
        flex: 1 0 50%;
        max-width: 50%;
      }
      .summary-group-wrapper .summary-group-name {
        opacity: .6;
        /* margin-bottom: 10px; */
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
        margin-top: 5px;
        position: relative;
      }
      .scene::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
      }
      .scene.schedule::after {
        content: " ";
        position: absolute;
        top: 5px;
        left: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--primary-color);
      }
      .add-scene-icon {
        width: 40px;
      }
      .summary-group-scenes {
        display: flex;
        flex-wrap: wrap;
      }
      @media (max-width: 600px) {
        .donder-widget {
          padding: 0px 0px 0px 10px;
        }
        .summary-switch-name {
          font-size: .9rem;
        }
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
    `}throttleUpdate(t,e){const i=t.target;i&&(clearTimeout(this._throttle[e.entity]),this._throttle[e.entity]=setTimeout((()=>{var t;const s=i.value,o=null===(t=this.hass.states[e.entity||""].attributes)||void 0===t?void 0:t.current_position;null!=s&&s!==o&&this.hass.callService("cover","set_cover_position",{entity_id:e.entity,position:s})}),2e3))}renderShutters(t){var e;const i=null===(e=this.hass.states[t.entity||""].attributes)||void 0===e?void 0:e.current_position;return P`
      <div class='summary-shutter-wrapper'>
        <div class='summary-shutter-name'>${t.name}</div>
        <div class='summary-shutter'>
          <ha-control-slider
          .value=${i}
          min="0"
          max="100"
          mode="start"
          step="5"
          @value-changed=${e=>this.throttleUpdate(e,t)}
        ></ha-control-slider>   
        </div>
      </div>
      
    `}renderToggle(t){const e="on"===this.hass.states[t.entity||""].state;return P`
      <div class='summary-switch-wrapper'>
        <div class='summary-switch-name'>${t.name}</div>
        <div class='summary-switches'>
          <ha-switch .checked=${e} @action=${()=>this.activateTrigger(t)} .actionHandler=${St({hasHold:_t(this.config.hold_action)})}></ha-switch>      
        </div>
      </div>
    `}renderSwitch(t){return P`
      ${"shutters"===t.type?this.renderShutters(t):this.renderToggle(t)}
    `}_handleSceneAction(t,e){const{action:i}=null==t?void 0:t.detail;"hold"===i&&this._toggleEditScene(e),"tap"===i&&this.hass.callService("donder_scenes","trigger",{scene:e})}_toggleEditScene(t){const e=this.hass.states["donder_env.global"].attributes;this.hass.callService("browser_mod","popup",{content:{type:"custom:donder-scene-modal",isNested:!1,isNew:!t,sensors:e.sensors,devices:[...e.shutters||[],...e.switches||[]],locked:!1,sceneName:this.config.scene,scene:t?this.hass.states["donder_scenes.global"].attributes[t]:null,closeModal:!0},size:"wide",browser_id:localStorage.getItem("browser_mod-browser-id")})}renderSwitchGroup(t){var e;const i=Object.keys(t),s=null===(e=this.hass.states["donder_scenes.global"])||void 0===e?void 0:e.attributes,o=Object.keys(s),n=["awake","sleep"],r=o.filter((t=>!n.includes(t)&&!s[t].group));return P`
      ${i.map((e=>P`<div class='summary-group-wrapper'>
          <div class='summary-group-name'>${e}</div>
          <div class='summary-group-switches'>
            ${t[e].map((t=>this.renderSwitch(t)))}
          </div>
        </div>`))}
      
      ${this.config.showScenes?P`
          <div class='summary-group-wrapper'>
            <div class='summary-group-name'>Scenes</div>
            <div class='summary-group-scenes'>
              ${r.map((t=>P`
                  <div
                    @mousedown=${()=>this.handleMouseDown(t)}
                    @mouseup=${this.handleMouseUp}
                    @mouseleave=${this.handleMouseLeave}
                    @touchstart=${()=>this.handleTouchStart(t)}
                    @touchend=${this.handleTouchEnd}
                    @touchcancel=${this.handleTouchCancel}
                    @click=${()=>this.hass.callService("donder_scenes","trigger",{scene:t})}
                    class=${"scene "+(s[t].schedule?"schedule":"")}
                  >${s[t].name}</div>
                `))}
              <div class="scene" @click=${()=>this._toggleEditScene()}>
                <div class="add-scene-icon">
                  <ha-icon icon='mdi:plus'></ha-icon>
                </div>
              </div>
            </div>
          </div>`:null}
    `}handleMouseDown(t){this.startHoldTimer(t)}handleMouseUp(){this.clearHoldTimer()}handleMouseLeave(){this.clearHoldTimer()}handleTouchStart(t){this.startHoldTimer(t)}handleTouchEnd(){this.clearHoldTimer()}handleTouchCancel(){this.clearHoldTimer()}startHoldTimer(t){this.holdTimeout=setTimeout((()=>{this._toggleEditScene(t)}),1e3)}clearHoldTimer(){clearTimeout(this.holdTimeout)}render(){if(this.config.show_warning)return this._showWarning("warning message");if(this.config.show_error)return this._showError("error message");let t=null;return t=this.config.entities.reduce(((t,e)=>{var i;const{group:s}=e;return t[s]=null!==(i=t[s])&&void 0!==i?i:[],t[s].push(e),t}),{}),P`
      <ha-card>
        <div class='donder-widget'>
        ${t?this.renderSwitchGroup(t):this.config.entities.map((t=>this.renderSwitch(t)))}
      </div>
      <!-- <div
        class="hold-div"
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseLeave}
        @touchstart=${this.handleTouchStart}
        @touchend=${this.handleTouchEnd}
        @touchcancel=${this.handleTouchCancel}
      >
        Hold me for 2 seconds
      </div> -->
      </ha-card>
    `}}t([X()],Et.prototype,"state",void 0),t([X()],Et.prototype,"hass",void 0),t([X()],Et.prototype,"config",void 0),t([X()],Et.prototype,"event",void 0),t([X()],Et.prototype,"callback",void 0),t([X()],Et.prototype,"serviceCall",void 0),t([Y()],Et.prototype,"_active",void 0),t([Y()],Et.prototype,"_expanded",void 0),t([Y()],Et.prototype,"_scene_mode",void 0),t([Y()],Et.prototype,"_current_scene",void 0),t([Y()],Et.prototype,"_throttle",void 0),t([Y()],Et.prototype,"_initiated",void 0),t([Y()],Et.prototype,"holdTimeout",void 0),customElements.define("donder-summary-modal",Et);export{Et as BoilerplateCard};
