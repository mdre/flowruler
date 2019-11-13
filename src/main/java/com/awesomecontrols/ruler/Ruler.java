package com.awesomecontrols.ruler;

import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import java.util.logging.Level;
import java.util.logging.Logger;

@Tag("flow-ruler")
@JsModule("./ruler/flow-ruler.js")
public class Ruler extends Component {
    private final static Logger LOGGER = Logger.getLogger(Ruler.class .getName());
    static {
        if (LOGGER.getLevel() == null) {
            LOGGER.setLevel(Level.FINER);
        }
    }
    
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
        LOGGER.log(Level.FINER, "Flow 14.+ Ruler!");
    }
    
    /**
     * Get the font metrics
     * @param resume is the callback function
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
     * Get the current viewport size in pixels
     * @param resume is the callback function
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
     * Get the viewport proportion factor
     * @param resume is the callback function
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

