var start=new Date().getTime();

function randomcolor(){
    var letters= '0123456789ABCDEF';
    var color= '#';
    for(var i=0;i<6;i++){
        color+= letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function move(){
    var leftmargin,topmargin,area;
    leftmargin = Math.random()*300;
    topmargin = Math.random()*300;
    area=((Math.random()*300) + 100);
    console.log(topmargin);
    console.log(area);
    document.getElementById("shape").style.left = leftmargin + "px";
    document.getElementById("shape").style.top = topmargin + "px";
    document.getElementById("shape").style.height = area + "px";
    document.getElementById("shape").style.width= area + "px";
    document.getElementById("shape").style.display ="block";
    document.getElementById("shape").style.backgroundColor= randomcolor();
    start=new Date().getTime();
}
document.getElementById("shape").onclick=function(){

    document.getElementById("shape").style.display ="none";
    var end=new Date().getTime();
    var time_taken =(end-start)/1000;
    alert("Time Taken: "+ time_taken+"sec");
    move();
}