
function f2(f,x,y,fx,fy,d,v)
{
v++;
//if (v==100) return -1;
//if (d==2) {console.log(f[x][y]);console.log(d);}

if (d==1){console.log(x+"=x,y="+y+",d="+d);}

if(f[x][y]==0) f[x][y]=d;
if (d==1) console.log(f[y]);
if (x==fx&&y==fy) return 1;

for (var px=-1;px<2;px++)
 for (var py=-1;py<2;py++)
  if (px==py&&px!=0) continue;
   else if (f[py+y][px+x]==0) 
    {
    f[y+py][x+px]=d+1; 
    var g=f2(f,px+x,py+y,fx,fy,d+1,v); if (g==1) return 1;
    }

return 0;
}


function find(field,x,y,fx,fy)
{
var f = [];
for (var i=0;i<field.length;i++) {f[f.length]=[];
 for (var j=0;j<field[i].length;j++) f[i][j]=field[i][j];
}


for (var i=0;i<f.length;i++)
for (var j=0;j<f[i].length;j++)
if (f[i][j]!=0) f[i][j]=-1;

//console.log(f[y]);
var rm = f2(f,x,y,fx,fy,1,1);
var mx=fx,my=fy;

for(var i=0;i<100;i++)
 {var md = f[my][mx];if (md==1) break;
  for (var px=-1;px<2;px++){var c=false;
   for (var py=-1;py<2;py++) if(f[my+py][mx+px]==md-1) {if(md-1>1){mx+=px;my+=py;}c=true;break;}
     if (c) break;
    }
 }
var r;
//if (rm==-1) console.log(rm);

if((mx-x)==-1) r=3;
 if ((mx-x)==1) r=4;
 if((my-y)==-1) r=1;
 if((my-y)==1) r=2;
//console.log(f);
//console.log(r+"=r,mx="+mx+",my="+my);
//console.log(x+"=x   y="+y);
return r;
}



