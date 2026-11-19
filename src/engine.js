'use strict';
let LG=0;       // langue : 0 français, 1 anglais (le build double chaque chaîne traduite : LG?anglais:français)
// ================= utilitaires =================
const {sin,cos,sqrt,PI,min,max,abs,floor,hypot,cbrt,atan2,acos,asin,ceil,atan,tan,sign}=Math,TAU=2*PI,$=i=>document.getElementById(i);
let sd=4242;
const R=()=>{sd=sd+0x6D2B79F5|0;let t=Math.imul(sd^sd>>>15,1|sd);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296},
rr=(a,b)=>a+(b-a)*R(),
ad=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],
sb=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],
ml=(a,s)=>[a[0]*s,a[1]*s,a[2]*s],
ma=(a,b,s)=>[a[0]+b[0]*s,a[1]+b[1]*s,a[2]+b[2]*s],
dt=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],
cr=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],
ln=a=>hypot(a[0],a[1],a[2]),
nm=a=>ml(a,1/(ln(a)||1)),
ds=(a,b)=>hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]),
lp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t],
cl=(x,a,b)=>min(b,max(a,x)),
ss=t=>(t=cl(t,0,1),t*t*(3-2*t)),
pp=a=>nm(cr(a,abs(a[1])<.9*ln(a)?[0,1,0]:[1,0,0])),
fr=y=>{y=nm(y);let x=pp(y);return[x,y,cr(x,y)]},          // repère direct (x,y,z), y imposé
rd=()=>{let z=rr(-1,1),t=rr(0,TAU),s=sqrt(1-z*z);return[s*cos(t),s*sin(t),z]},
rot=(v,k,a)=>{let c=cos(a),s=sin(a),d=dt(k,v)*(1-c),x=cr(k,v);return[v[0]*c+x[0]*s+k[0]*d,v[1]*c+x[1]*s+k[1]*d,v[2]*c+x[2]*s+k[2]*d]},
K=(h,a=1)=>[(h>>8)/15,(h>>4&15)/15,(h&15)/15,a],
hs=(h,s,l)=>{let f=n=>{let k=(n+h*12)%12;return l-s*min(l,1-l)*max(-1,min(k-3,9-k,1))};return[f(0),f(8),f(4),1]};

// ================= mini-moteur WebGL2 (tout est instancié) =================
const cv=$('c'),gl=cv.getContext('webgl2',{antialias:true,alpha:false});
function ico(l){
  const t=(1+sqrt(5))/2,v=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(nm);
  let f=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],g=[];
  for(let i=0;i<60;i+=3)g.push([v[f[i]],v[f[i+1]],v[f[i+2]]]);
  while(l--)g=g.flatMap(([a,b,c])=>{let x=nm(ad(a,b)),y=nm(ad(b,c)),z=nm(ad(c,a));return[[a,x,z],[b,y,x],[c,z,y],[x,y,z]]});
  return g}
function cyl(n){let o=[];for(let i=0;i<n;i++){let a=i/n*TAU,b=(i+1)/n*TAU,x=cos(a),z=sin(a),X=cos(b),Z=sin(b);o.push(x,0,z,x,1,z,X,0,Z,X,0,Z,x,1,z,X,1,Z)}return o}
const mesh=(a,t)=>{let b=gl.createBuffer();gl.bindBuffer(34962,b);gl.bufferData(34962,new Float32Array(a.flat(2)),35044);return{b,n:a.flat(2).length/3,t}};
const I1F=ico(1),M0=mesh(ico(0),0),M1=mesh(I1F,0),M2=mesh(ico(2),0),M3=mesh(ico(3),0),M4=mesh(ico(4),0),M5=mesh(ico(5),0),MC=mesh(cyl(7),1),MD=mesh(cyl(5),1),MW=mesh(cyl(28),1),MO=mesh([1,0,0,0,1,0,0,0,1,0,1,0,-1,0,0,0,0,1,-1,0,0,0,-1,0,0,0,1,0,-1,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,-1,-1,0,0,0,1,0,0,0,-1,0,-1,0,-1,0,0,0,0,-1,1,0,0,0,-1,0,0,0,-1],0);

const sh=(t,s)=>{let o=gl.createShader(t);gl.shaderSource(o,'#version 300 es\nprecision highp float;'+s);gl.compileShader(o);return o},PG=gl.createProgram();
gl.attachShader(PG,sh(35633,`layout(location=0)in vec3 p;layout(location=1)in vec4 a;layout(location=2)in vec4 b;layout(location=3)in vec4 c;layout(location=4)in vec4 k;
uniform mat4 V,M;uniform float T;out vec3 n,w;out vec4 q;
void main(){vec4 h=vec4(p,1);vec3 N=T>0.?vec3(p.x,0,p.z):p;
N/=vec3(a.x*a.x+b.x*b.x+c.x*c.x,a.y*a.y+b.y*b.y+c.y*c.y,a.z*a.z+b.z*b.z+c.z*c.z);
n=mat3(M)*vec3(dot(a.xyz,N),dot(b.xyz,N),dot(c.xyz,N));
w=(M*vec4(dot(a,h),dot(b,h),dot(c,h),1)).xyz;gl_Position=V*vec4(w,1);q=k;}`));
gl.attachShader(PG,sh(35632,`in vec3 n,w;in vec4 q;uniform vec3 F;uniform vec4 P,C,Q,H[6],S[4];uniform float D,G,A,B,N;out vec4 o;
void main(){if(G==3.&&(length(w)<N||distance(w,Q.xyz)<Q.w))discard;if(G==1.){if(distance(w,P.xyz)<P.w)discard;for(int i=0;i<6;i++)if(distance(w,H[i].xyz)<H[i].w)discard;}if(G==2.&&distance(w,C.xyz)>C.w)discard;if(G>3.5){int i=G>5.5?2:0;if(mod(G,2.)<.5?distance(w,S[i].xyz)<S[i].w:distance(w,S[i+1].xyz)>S[i+1].w)discard;}
vec3 N=normalize(n),v=normalize(-w);float s=dot(N,v);if(s<0.){N=-N;s=-s;}
float r=1.-s,l=max(dot(N,normalize(vec3(.4,.8,.45))),0.);
vec3 c=(q.rgb*(.3+.5*s+.3*l)+vec3(.5,.7,.8)*r*r*r*.35+vec3(.2)*pow(max(dot(N,normalize(v+normalize(vec3(.4,.8,.45)))),0.),40.))*B;
float e=q.a*A;if(q.a<1.)e=min(1.,e*(1.+2.2*r*r));
o=vec4(mix(F,c,exp(-length(w)*D)),e);}`));
gl.linkProgram(PG);gl.useProgram(PG);
const U={};for(let n of'VMTFPCDGABNQHS')U[n]=gl.getUniformLocation(PG,n);
let GEN=0;

// couches -> blocs spatiaux (LOD + culling par bloc)
const LY=[];
function Ly(m,vis,g,o){let L=Object.assign({m,vis,g,k:new Map,ch:[],al:0,G:0,vz:1e9},o);LY.push(L);return L}
function put(L,m,c){let g=L.g,k=g?floor(m[3]/g)+'_'+floor(m[7]/g)+'_'+floor(m[11]/g):'',a=L.k.get(k);a||L.k.set(k,a=[]);a.push(m[0],m[1],m[2],m[3],m[4],m[5],m[6],m[7],m[8],m[9],m[10],m[11],c[0],c[1],c[2],c[3])}
const S=(L,p,r,c)=>put(L,[r,0,0,p[0],0,r,0,p[1],0,0,r,p[2]],c),
El=(L,p,X,Y,Z,c)=>put(L,[X[0],Y[0],Z[0],p[0],X[1],Y[1],Z[1],p[1],X[2],Y[2],Z[2],p[2]],c),
Cy=(L,a,b,r,c)=>{let y=sb(b,a),x=pp(y);El(L,a,ml(x,r),y,ml(cr(x,nm(y)),r),c)};
function mkch(L,a,cap,org,rad){
  let n=a?a.length/16:0,f=new Float32Array(a||cap*16),c=org||[0,0,0],r=rad||0,i,o;
  if(a){if(!org){for(i=0;i<n;i++)o=i*16,c[0]+=f[o+3]/n,c[1]+=f[o+7]/n,c[2]+=f[o+11]/n}
    for(i=0;i<n;i++){o=i*16;let x=a[o+3]-c[0],y=a[o+7]-c[1],z=a[o+11]-c[2];f[o+3]=x;f[o+7]=y;f[o+11]=z;
      r=max(r,hypot(x,y,z)+sqrt(max(a[o]**2+a[o+4]**2+a[o+8]**2,a[o+1]**2+a[o+5]**2+a[o+9]**2,a[o+2]**2+a[o+6]**2+a[o+10]**2)))}}
  let v=gl.createVertexArray(),b=gl.createBuffer();gl.bindVertexArray(v);
  gl.bindBuffer(34962,L.m.b);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,5126,false,0,0);
  gl.bindBuffer(34962,b);gl.bufferData(34962,f,a?35044:35048);
  for(i=1;i<5;i++)gl.enableVertexAttribArray(i),gl.vertexAttribPointer(i,4,5126,false,64,i*16-16),gl.vertexAttribDivisor(i,1);
  let h={L,n,N:n,f:a?0:f,c,r,A:1,m:0,v,b,cap};L.ch.push(h);return h}
const fin=()=>{for(let L of LY)if(L.k){for(let a of L.k.values())mkch(L,a,0,L.z0&&[0,0,0]);L.k=0}},
dy=(L,cap,org,rad)=>mkch(L,0,cap,org,rad),
clr=L=>{L.ch.forEach(h=>{gl.deleteBuffer(h.b);gl.deleteVertexArray(h.v)});L.ch=[];L.k=new Map},
up=h=>{h.n&&(gl.bindBuffer(34962,h.b),gl.bufferSubData(34962,0,h.f,0,h.n*16))};
function dS(h,p,r,c){if(h.n>=h.cap)return;let f=h.f,o=h.n++*16,q=h.c;f[o]=f[o+5]=f[o+10]=r;f[o+3]=p[0]-q[0];f[o+7]=p[1]-q[1];f[o+11]=p[2]-q[2];f[o+12]=c[0];f[o+13]=c[1];f[o+14]=c[2];f[o+15]=c[3]}
function dCy(h,a,b,r,c){if(h.n>=h.cap)return;let y=sb(b,a),x=pp(y),w=cr(x,nm(y)),f=h.f,o=h.n++*16,q=h.c;
  f[o]=x[0]*r;f[o+1]=y[0];f[o+2]=w[0]*r;f[o+3]=a[0]-q[0];f[o+4]=x[1]*r;f[o+5]=y[1];f[o+6]=w[1]*r;f[o+7]=a[1]-q[1];f[o+8]=x[2]*r;f[o+9]=y[2];f[o+10]=w[2]*r;f[o+11]=a[2]-q[2];f[o+12]=c[0];f[o+13]=c[1];f[o+14]=c[2];f[o+15]=c[3]}
function dT(h,a,b,r,c){if(h.n>=h.cap)return;let yx=b[0]-a[0],yy=b[1]-a[1],yz=b[2]-a[2],l=hypot(yx,yy,yz)||1,xx,xy,xz,f=h.f,o=h.n++*16,q=h.c;
  if(abs(yy)<.9*l)xx=-yz,xy=0,xz=yx;else xx=0,xy=yz,xz=-yy;let m=r/(hypot(xx,xy,xz)||1);xx*=m;xy*=m;xz*=m;
  f[o]=xx;f[o+1]=yx;f[o+2]=(xy*yz-xz*yy)/l;f[o+3]=a[0]-q[0];f[o+4]=xy;f[o+5]=yy;f[o+6]=(xz*yx-xx*yz)/l;f[o+7]=a[1]-q[1];f[o+8]=xz;f[o+9]=yz;f[o+10]=(xx*yy-xy*yx)/l;f[o+11]=a[2]-q[2];f[o+12]=c[0];f[o+13]=c[1];f[o+14]=c[2];f[o+15]=c[3]}
