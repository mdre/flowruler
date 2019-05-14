package com.awesomecontrols.ruler;

import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;

@Tag("flow-ruler")
@HtmlImport("bower_components/ruler/flow-ruler.html")
public class Ruler extends Component {

    int fontHeight;
    int fontWidth;
    
    int viewportHeight;
    int viewportWidth;
    
    int viewportMetricsHeight;
    int viewportMetricsWidth;
    
    IOnMeasureResume fontResume;
    IOnMeasureResume viewportResume;
    IOnMeasureResume viewportResumeMetrics;
    
    public Ruler() {
        
    }
    
    /**
     * Get the display DPI
     * @param resume 
     */
    public void measureFontMetrics(IOnMeasureResume resume) {
        this.fontResume = resume;
        getElement().callFunction("getFontMetrics");
    }
    
    @ClientCallable
    private void updateFontMetrics(int width, int height) {
        this.fontHeight = height;
        this.fontWidth = width;
        fontResume.resume(width, height);
    }
    
    /**
     * Get the viewport size in pixels
     * @param resume 
     */
    public void measureViewport(IOnMeasureResume resume) {
        this.viewportResume = resume;
        getElement().callFunction("getViewportSize");
    }
    
    @ClientCallable
    private void updateViewport(int width, int height) {
        this.viewportHeight = height;
        this.viewportWidth = width;
        viewportResume.resume(width, height);
    }
    
    /**
     * Get the viewport size in inches
     * @param resume 
     */
    public void measureViewportMetrics(IOnMeasureResume resume) {
        this.viewportResumeMetrics = resume;
        getElement().callFunction("getViewportMetrics");
    }
    
    @ClientCallable
    private void updateViewportMetrics(int width, int height) {
        this.viewportMetricsHeight = height;
        this.viewportMetricsWidth = width;
        viewportResumeMetrics.resume(width, height);
    }
    
    
    
    public interface IOnMeasureResume {
        /**
         * get the size in pixels
         * @param width in pixels
         * @param height in pixels
         */
        public void resume(int width, int height); 
    }
    
    
}

