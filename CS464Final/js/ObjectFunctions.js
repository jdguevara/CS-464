$(document).ready(function () {
    $('#Ground').on('click', function () {
        groundCheck();
    })
});

function rotate()
{
    // this.zRot+= 1;
    this.xRot+= 3;
    // console.log(this)
    // this.yRot += 1;
}
function rotateClock()
{
    // this.zRot+= 1;
    this.xRot-= 1;
    // console.log(this)
    // this.yRot += 1;
}

function minuteHand()
{
    // this.zRot+= 1;
    var d = new Date();
    var m = d.getMinutes();
    var s = d.getSeconds();
    if(!highSpeedCheck())
    {
    this.zRot = m.map(0,60,0,360);
    this.zRot += (s/180);
    }
    else{
        this.zRot+=24
    }
    // this.xRot-= 1;
    // console.log(this)
    // this.yRot += 1;
}

function hourHand()
{
    // this.zRot+= 1/12;
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    h = h%12;
    if(!highSpeedCheck())
    {
    this.zRot = h.map(0,12,0,360);
    this.zRot += (m/60 * 30);
    }
    else{
        this.zRot+=2
    }
}

function sun()
{
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    h = (h+11)%24;

    if(!highSpeedCheck())
    {
    this.zRot = h.map(0,24,0,360);
    this.zRot += (m/60 * 30);
    this.zRot += (s/180);
    }
    else{
        this.zRot+=1
    }
}

function moon()
{
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();


    h = (h+23)%24;
    if(!highSpeedCheck())
    {
        this.zRot = h.map(0,24,0,360);
        this.zRot += (m/60 * 30);
        this.zRot += (s/180);
    }
    else{
        this.zRot+=1
        lastts = (this.zRot%360);
    }
    
}

function snow()
{
    if(this.yoffset < -10)
    {
        this.xoffset = this.startingPoint[0];
        this.yoffset = this.startingPoint[1];
        this.zoffset = this.startingPoint[2];
    }
    if(this.movementLeft == 0)
    {
        this.movementLeft = Math.floor(Math.random() * 5)-2;  
    }
    if(this.movementLeft < 0)
    {
        this.movementLeft+= .25;
        this.xoffset += .25;
    }
    else if(this.movementLeft > 0)
    {
        this.movementLeft-= .25;
        this.xoffset -= .25;
    }
    this.yoffset -=.25;
}

function highSpeedCheck()
{
    var hspeed = document.getElementById("HighSpeed").checked;
    return hspeed;
}

function groundCheck() {
    var ground = !document.getElementById('Ground').checked;
    var groundObject = objects.find( ({desc}) => desc == 'ground');
    groundObject.zoffset = ground ? 1000 : 0;
}