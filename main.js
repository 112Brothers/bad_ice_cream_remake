var fc = 0;
var score = 0;
var gi =0;

var sw=14,sh=14;
var sx=0,sy=0;
var stackImg=[];
var fr=0;
var next=0;
//var;
var anim_ice = false;
var ice_rotate;
var iceD;
var i_ice = {'x':px,'y':py};
var canv = document.getElementById("c");
var ctx = canv.getContext("2d");
var sq=50;
var rotate = 1;
var green = [{'x':5,'y':5,'go':0,'r':1},{'x':6,'y':6,'go':0,'r':1}];
var cow = [{'x':3,'y':1,'go':0,'r':1}];
var zc = [{'x':1,'y':1,'go':0,'r':1}];
var rt = {2:'front',1:'back',3:'left',4:'right'};

/*
     1
    3@4
     2
*/
var fruit_c= ['bananas.png','vineg.png'];
var friut_num=0;
var fruits =[ [{'f':true,'x':3,'y':2},{'f':true,'x':4,'y':2},{'f':true,'x':3,'y':3},
{'f':true,'x':12,'y':2},{'f':true,'x':11,'y':2},{'f':true,'x':12,'y':3},
{'f':true,'x':12,'y':10},{'f':true,'x':11,'y':11},{'f':true,'x':12,'y':11},
{'f':true,'x':3,'y':10},{'f':true,'x':4,'y':11},{'f':true,'x':3,'y':11}
],

[{'f':true,'x':6,'y':14},{'f':true,'x':2,'y':14},{'f':true,'x':3,'y':14},{'f':true,'x':4,'y':14},{'f':true,'x':5,'y':14},{'f':true,'x':8,'y':14},
{'f':true,'x':9,'y':14},{'f':true,'x':10,'y':14},{'f':true,'x':11,'y':14},{'f':true,'x':7,'y':14},{'f':true,'x':12,'y':14},{'f':true,'x':13,'y':14}
]
];

var px=2,py=12;
var level = [
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,-1],
[-1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,-1],
[-1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,-1],
[-1,0,0,0,1,0,0,-1,-1,0,0,1,0,0,0,-1],
[-1,0,0,0,1,0,0,-1,-1,0,0,1,0,0,0,-1],
[-1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,-1],
[-1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,-1],
[-1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];
 function checkAllLoad()
{
for(var i=0;i<stackImg.length;i++)
	if (!stackImg[i].finish) return false;
return true;
}


function needLoadImg(s)
{

for(var i=0;i<stackImg.length;i++)
	if (stackImg[i].name==s) break;
var i = {};
i.name = s;
i.img = new Image();
i.img.onload = function() {i.finish=true;/*console.log('img '+s+' load!');*/all_load=checkAllLoad();};


i.img.src = 'img/'+s;
stackImg.push(i);
all_load=checkAllLoad();
}


function getImage(s)
{
for(var i=0;i<stackImg.length;i++)
	if (stackImg[i].name==s) return stackImg[i].img;
return undefined;
}



function start_load()
{
needLoadImg("icecream_back.png");
needLoadImg("icecream_front.png");
needLoadImg("icecream_left.png");
needLoadImg("icecream_right.png");
needLoadImg("green_back.png");
needLoadImg("green_front.png");
needLoadImg("green_left.png");
needLoadImg("green_right.png");

needLoadImg("vineg.png");
needLoadImg("icec.png");
needLoadImg("bananas.png");
}
start_load();

function free_(x,y)
{
//if (level[y][x]!=0) return false;
for (var i=0;i<green.length;i++) if (green[i]['x']==x&&green[i]['y']==y) return false;
for (var i=0;i<cow.length;i++) if (cow[i]['x']==x&&cow[i]['y']==y) return false;
return true;
}


function ice_()
{
var yy=i_ice['y'];
var xx=i_ice['x'];
if (ice_rotate==1) {if (level[yy][xx]!=iceD*-1+1||!free_(xx,yy)) {anim_ice=false; return; } level[yy][xx]=iceD; i_ice['y']--;}
if (ice_rotate==2) {if (level[yy][xx]!=iceD*-1+1||!free_(xx,yy)) {anim_ice=false; return; } level[yy][xx]=iceD; i_ice['y']++;  }
if (ice_rotate==3) {if (level[yy][xx]!=iceD*-1+1||!free_(xx,yy)) {anim_ice=false; return; } level[yy][xx]=iceD; i_ice['x']--; }
if (ice_rotate==4) {if (level[yy][xx]!=iceD*-1+1||!free_(xx,yy)) {anim_ice=false; return; } level[yy][xx]=iceD; i_ice['x']++;}
setTimeout(ice_,100);

}
function clever(zz)
{
for (var i=0;i<zz.length;i++) {
  var g = zz[i];
  var go = g['go'];
  var r = g['r'],ox =g['x'],oy = g['y'];
  var newR=false;
  if (go==0) {
//	console.log("sx="+g['x']+",sy="+g['y']);

//	console.log(r+"=r,nx="+g['x']+",ny="+g['y']);
	r=find(level,ox,oy,px,py);
	zz[i]['r']=r;
	zz[i]['go']=3;
	if (r==1) zz[i]['y']--; else if(r==2) zz[i]['y']++; else if (r==3) zz[i]['x']--;else if (r==4) zz[i]['x']++;
	}  else zz[i]['go']--;
 if (ox==px&&oy==py) {document.location.reload();}// PLAYER ZDOH (game over)  
  var ppx=0,ppy=0;var step=2;
  if (go!=0)
  {
   if (r==1) ppy=go/step;
   if (r==2) ppy=-go/step;
   if (r==3) ppx=go/step;
   if (r==4) ppx=-go/step;}
  ctx.fillStyle='sky';ctx.fillRect((ppx+ox-sx)*sq+0.1*sq, (ppy+oy-sy)*sq+0.1*sq, sq-0.1*sq, sq-0.1*sq);
  }


}

function stupid(green,step,color)
{
for (var i=0;i<green.length;i++) {
  var g = green[i];
  var go = g['go'];
  var r = g['r'],ox =g['x'],oy = g['y'];
  var newR=false;
  if (go==0) {
     if (r==1) if(level[oy-1][ox]==0&&free_(ox,oy-1))  g['y']-=1; else newR=true;
     if (r==2) if(level[oy+1][ox]==0&&free_(ox,oy+1))  g['y']+=1; else newR=true;
     if (r==3) if(level[oy][ox-1]==0&&free_(ox-1,oy))  g['x']-=1; else newR=true;
     if (r==4) if(level[oy][ox+1]==0&&free_(ox+1,oy))  g['x']+=1; else newR=true;
     if (newR) g['r']=Math.floor(4*Math.random())+1;
      else  g['go']=step;
	}  else green[i]['go']--;
 if (ox==px&&oy==py) {document.location.reload();}// PLAYER ZDOH (game over)  
  var dx=0,dy=0;

  var ppx=0,ppy=0;
  var dd = getImage(color+"_"+rt[r]+".png");
 

  if (go!=0)
  {
   if (r==1) ppy=go/step;
   if (r==2) ppy=-go/step;
   if (r==3) ppx=go/step;
   if (r==4) ppx=-go/step;
  }
  ctx.drawImage(dd,(ppx+ox-sx)*sq+0.1*sq, (ppy+oy-sy)*sq+0.1*sq, sq-0.1*sq, sq-0.1*sq);
  }

}


function draw()
{
sx=(px-sw/2);
sy=(py-sh/2);
ctx.fillStyle='#eeefef';
ctx.fillRect(0,0,1000,1000);
if (!checkAllLoad()) return setTimeout(draw,200);

var icec;
var rtps = rt[rotate];
var ppx=0,ppy=0;
var now = performance.now();

if ((next-now)>0)
{
if (rotate==1) ppy=(next-now)/200;
if (rotate==2) ppy=-(next-now)/200;
if (rotate==3) ppx=(next-now)/200;
if (rotate==4) ppx=-(next-now)/200;
}

icec = getImage("icecream_"+rtps+".png");
ctx.drawImage(icec,(px-sx+ppx)*sq-sq*0.1, (py-sy+ppy)*sq-sq*0.1, sq+sq/2, sq+sq/2);


var fruit_=getImage(fruit_c[friut_num]);

ctx.fillStyle="pink";
for (var i=0;i<fruits[friut_num].length;i++)
 if (fruits[friut_num][i]['f']) 
  {
   var fx=fruits[friut_num][i]['x']-sx;
   var fy=fruits[friut_num][i]['y']-sy;
   if (fc==0) ctx.drawImage(fruit_,fx*sq,sq*fy,sq,sq);
	else if (fc==1){ctx.fillRect(fx*sq+sq*0.2,sq*fy+sq*0.2,sq*0.8,sq*0.8);}
	else if (fc==2){ctx.fillRect(fx*sq+sq*0.3,sq*fy+sq*0.3,sq*0.7,sq*0.7);}
  }
   if (fc) fc--;
var ice = getImage("icec.png");
for (var i=0;i<level.length;i++)
 for (var j=0;j<level[i].length;j++)
    {
     var d=level[i][j];
     if (d==-1) ctx.fillStyle='blue';
   if (d==1){ctx.globalAlpha = 0.5; ctx.drawImage(ice,(j-sx)*sq,(i-sy)*sq-sq*0.2,sq,sq+sq*0.2);ctx.globalAlpha = 1;}
     else if (d==-1) ctx.fillRect((j-sx)*sq,(i-sy)*sq,sq,sq); 

    }

stupid(green,8,'green');
clever(zc);
//stupid(cow,10,'black');
// ctx.fillRect(px*sq+0.1*sq, py*sq+0.1*sq, sq-0.2*sq, sq-0.2*sq);
ctx.font=sq/2+'px Arial';    
ctx.strokeStyle="black";
ctx.strokeText(score,700,sq);
      //if (rotate==1) ctx.fillRect(px*sq+0.1*sq, py*sq+0.1*sq, sq-0.1*sq, sq-0.1*sq);
 setTimeout(draw,100);
}
draw();

function press(e) {

 var now = performance.now();
 if (now<next) return;
 if (anim_ice) return;
 var key = e.keyCode;

 if (key==37) {rotate=3; if (level[py][px-1]==0) px--; else return; next=now+200;}
 if (key==38) {rotate=1; if (level[py-1][px]==0) py--; else return; next=now+200;}
 if (key==39) {rotate=4; if (level[py][px+1]==0) px++; else return; next=now+200; }
 if (key==40) {rotate=2; if (level[py+1][px]==0) py++; else return; next=now+200; }
 for(var i=0;i<fruits[friut_num].length;i++)
 if (fruits[friut_num][i]['x']==px&&fruits[friut_num][i]['y']==py&&fruits[friut_num][i]['f']) {score++;fruits[friut_num][i]['f']=false;break;}
 var ggg=true;
 for (var i=0;i<fruits[friut_num].length;i++)
 if (fruits[friut_num][i]['f']==true) ggg=false;
 if (ggg) {if(friut_num==fruits.length-1) document.location.reload(); else {friut_num++;fc=2;}}
 if (key==32) 
 {                                                                 var nd;
  if (rotate==1){ice_rotate=rotate;var d=level[py-1][px]; if (d==-1) return; iceD=d*-1+1;anim_ice=true;i_ice={'x':px,'y':py-1};  ice_();}
  if (rotate==2){ice_rotate=rotate;var d=level[py+1][px]; if (d==-1) return; iceD=d*-1+1;anim_ice=true;i_ice={'x':px,'y':py+1}; ice_(); }
  if (rotate==3){ice_rotate=rotate;var d=level[py][px-1]; if (d==-1) return; iceD=d*-1+1;anim_ice=true;i_ice={'x':px-1,'y':py}; ice_();}
  if (rotate==4){ice_rotate=rotate;var d=level[py][px+1]; if (d==-1) return; iceD=d*-1+1;anim_ice=true;i_ice={'x':px+1,'y':py}; ice_();}
 }
}


