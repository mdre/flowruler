import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { devicePixelRatio2, getPixelRatio } from '@vaadin/flow-frontend/ruler/ruler-stuffs.js';

/**
 * `Ruler`
 * A ruler element
 *
 * @customElement
 * @polymer
 */
class FlowRuler extends PolymerElement {

    static get is() {
        return 'flow-ruler';
    }

    static get template() {
        return html `
            <style>
                .defaultFont {
                    /*z-index: 10000;*/
                    position: absolute;
                    /*height: 1em;*/
                    /*width: 1em;*/
                    /*top: -100%;*/
                    /*left: -100%;*/
                    top: 50px;
                    left: 50px;
                }

                .viewport {
                    z-index: 1000000;
                    position: fixed;
                    /*
                      Despite of what the names say, <vaadin-overlay> is just a container
                      for position/sizing/alignment. The actual overlay is the overlay part.
                    */
                    /*
                      Default position constraints: the entire viewport. Note: themes can
                      override this to introduce gaps between the overlay and the viewport.
                    */
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
    /*                background-color: #666666;
                    opacity: 0.5;*/
                }
                .default {
                    position: absolute;
                    height: 0px;
                    width: 0px;
                }
            </style> 

            <div id="ruler" 
                 class="defaultFont"
                 >
                W
            </div>
            `;
    }


    getFontMetrics() {
        var rulerElement = this.shadowRoot.getElementById("ruler");
        rulerElement.className = 'defaultFont';
        var width = rulerElement.offsetWidth;
        var height = rulerElement.offsetHeight;
        console.log("defaultFont: ", height, width);

        this.$server.updateFontMetrics(width, height);
    }

    getViewportSize() {
        var rulerElement = this.shadowRoot.getElementById("ruler");
        rulerElement.className = 'viewport';
        var height = rulerElement.offsetHeight;
        var width = rulerElement.offsetWidth;
        console.log(height, width);


        console.log(devicePixelRatio2);
        var dpr = devicePixelRatio2();
        console.log(dpr);

        this.$server.updateViewport(width, height);
    }

    getViewportMetrics() {
        // get the DPI
        var rulerElement = this.shadowRoot.getElementById("ruler");
        console.log(rulerElement);

        rulerElement.className = 'defaultFont';
        var fontHeight = rulerElement.offsetHeight;
        var fontWidth = rulerElement.offsetWidth;

        // now get the viewport size in pixels
        rulerElement.className = 'viewport';
        var vpHeight = rulerElement.offsetHeight;
        var vpWidth = rulerElement.offsetWidth;

        var widthInInches = vpWidth / fontWidth;
        var heightInInches = vpHeight / fontHeight;
        console.log(widthInInches, heightInInches);

        rulerElement.className = 'defaultFont';
        this.$server.updateViewportMetrics(widthInInches, heightInInches);
    }
};

customElements.define(FlowRuler.is, FlowRuler);