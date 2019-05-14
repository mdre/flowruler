# flowruler
A VaadinFlow ruler component to get a proportional measure of the viewport in relation to a normal font.

It draw a 'W' font inside a DIV and get it size in pixels. After that, it get the viewport size in pixels and return the width an height proportion:

vpwidth / fwidth 
vpheight / fheight

Example:

```Java

Label fontMetrics = new Label("Font metrics: ");
Label vp = new Label("Viewport size: ");
Label vpMetrics = new Label("Font/Viewport relation: ");

add(fontMetrics);
add(vp);
add(vpMetrics);

Ruler ruler = new Ruler();
this.add(ruler);

Button button = new Button("Click me", event -> {
    hello.setText("Clicked!");
    hello.setClassName("clicked");
    ruler.measureFontMetrics((width, height) -> {
        fontMetrics.setText(fontMetrics.getText()+" width: "+width+"px; height: "+height+"px");
    });

    ruler.measureViewport((width, height) -> {
        vp.setText(vp.getText()+" width: "+width+"px; height: "+height+"px");
    });

    ruler.measureViewportMetrics((width, height) -> {
        vpMetrics.setText(vpMetrics.getText()+" width: "+width+"fw; height: "+height+"fh");
    });
});

```

And here some test: 
..* Monitor 17": @1920x1080 - Chrome browser: 
...Font metrics: width: 14px; height: 22px
...Viewport size: width: 1920px; height: 978px
...Font/Viewport relation: width: 137fw; height: 44fh

..* Monitor 17": @1920x1080 - Chrome browser with 125% zoom: 
...Font metrics: width: 14px; height: 22px
...Viewport size: width: 1536px; height: 782px
...Font/Viewport relation: width: 109fw; height: 35fh

..* Samsung Galaxy Note 4 5.7": Portrait @1440 x 2560 - Firefox browser:
...Font metrics: width: 14px; height: 22px
...Viewport size: width: 360px; height: 560px
...Font/Viewport relation: width: 25fw; height: 25fh

..* Samsung Galaxy J7 Prime 5.5": Portrait @1080 x 1920 - Chrome browser:
...Font metrics: width: 14px; height: 22px
...Viewport size: width: 360px; height: 560px
...Font/Viewport relation: width: 25fw; height: 25fh

..* LG K10 5.3": Portrait @720 x 1280 - Firefox browser:
...Font metrics: width: 14px; height: 22px
...Viewport size: width: 360px; height: 512px
...Font/Viewport relation: width: 25fw; height: 23fh

Since the ruler is affected for the zoom, you can use the proportion to fit or update your component acording to what you need.

