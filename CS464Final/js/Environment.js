function updateSkyColor()
{
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    h = (h-1)%24;
    if(!highSpeedCheck())
    {
        h = h.map(0,24,0,360);
        h += (m/60 * 30);
        h += (s/3600);
        lastts = h;
    }
    else{}
    if (lastts > 180)
    {
        lastts = 360 - lastts;
    }
    
    var r = .025;
    // var r = lastts.map(90,100,.025,.1);
    var g = lastts.map(0,180,.025,.1);
    var b = lastts.map(0,180,.075,.3);
    var a = lastts.map(0,180,1.0,.15);
    current = [r,g,b,a];
}

function updateAmbientColor()
{
    var temp = 180 - lastts;
    var r = .5;
    // var g = temp.map(0,180,.025,.1);
    var g = .5;

    var b = temp.map(0,180,.475,.55);
    // var a = temp.map(0,180,1.0,.15);
    ambientColor = [r,g,b];
    DirectionalColor = [r+.2,g+.2,b+.2];
}

function updateLightDirection()
{
    var temp = lastts;
    if(temp > 90)
    {
        temp = 90 - temp
    }
    var x = -.5;
    // var x = lastts.map(0,90,-.5,.5);
    var y = lastts.map(0,90,0,-.5);
    // var y = -.5;
    var z = lastts.map(0,90,0,.5);

    lightingDirection = [
        x, y, z
    ];
}