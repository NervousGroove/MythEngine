function display_image(src, width, height, alt) {
    var a = document.createElement("img");
    a.src = src;
    a.width = width;
    a.height = height;
    a.alt = alt;
    document.body.appendChild(a);
}
display_image('https://opengameart.org/sites/default/files/survivor-idle_shotgun_0.png',
    276,
    110,
    'JavaScriptImage')
