// ================= structures propres à l'hépatocyte =================
if(CT==1){
  org(8,.3,.7,(q,r)=>{S(Lo,q,r,K(0xed7));cS(CY,q,r,'ld')});                                              // gouttelettes lipidiques
  for(let i=0;i<520;i++){let q=cyp(.09);if(!q)continue;cS(CY,q,.08,'gly',{sf:1});for(let k=0;k<16;k++)S(Lr,ma(q,rd(),.07*cbrt(R())),.013,K(0xc4a))}      // rosettes de glycogène
  for(let i=0;i<9000;i++){let d=rd(),q=ma(Cc,d,Rc);abs(dt(d,v0))>.62&&ds(q,e0)>.75&&Cy(Loxc,q,ma(q,nm(ad(d,ml(rd(),.25))),rr(.35,.6)),.05,K(0xc86))}      // microvillosités des pôles sinusoïdaux
  for(let i=0;i<1500;i++){let g=rr(0,TAU),d=nm(ad(ad(ml(tX,cos(g)),ml(tZ,sin(g))),ml(v0,rr(-.04,.04)))),q=ma(Cc,d,Rc);                                   // canalicule biliaire : ceinture équatoriale
    Cy(Loxc,q,ma(q,nm(ad(d,ml(rd(),.3))),rr(.2,.35)),.04,K(0x9b6));i%3||S(Lox0,ma(q,d,.012),.03,K([0x3b5,0xe93,0x48d][i%9/3|0]))}
  for(let g=0;g<TAU;g+=.005)for(let s of[-1,1])S(Lox0,ma(Cc,nm(ad(ad(ml(tX,cos(g)),ml(tZ,sin(g))),ml(v0,s*.05))),Rc+.012),.032,K(0xeed));                // jonctions serrées
  for(let i=0;i<10;i++){let d;do d=rd();while(abs(dt(d,v0))<.15||abs(dt(d,v0))>.5);let[x,,y]=fr(d);El(Lox,ma(Cc,d,Rc+.01),ml(x,.3),ml(d,.012),ml(y,.3),K(0x567))}      // plaques de jonctions communicantes
}      // endothélium sinusoïdal fenêtré

// ================= structures propres au neurone =================
if(CT==2){
  S(Lmem,Cb,Rb,K(CF.mc,.8));
  PRC.forEach(([d,r,l,ty],i)=>{let J=ma(Cc,d,sqrt(Rc*Rc-r*r)),Ee=ma(Cc,d,Rc+l),[x,,y]=fr(d),ax=s=>ma(Cc,d,Rc+s),k,s;
    Cy(Lmt,J,Ee,r,K(CF.mc,.8));HO.push(ma(Cc,d,Rc).concat(r));                                             // paroi du prolongement, ouverture dans le soma
    if(i)El(Lox,Ee,ml(x,r),ml(d,.02),ml(y,r),K(0x223));else HO.push(ma(Cb,d,-Rb).concat(r));
    for(k=0;k<(i?i>1?6:12:14);k++){let g=rr(0,TAU),o=ad(ml(x,cos(g)),ml(y,sin(g))),w=r*.7*sqrt(R()),s0=ad(ma(Cc,d,Rc*.5),ml(rd(),2)),pts=[];      // microtubules non centrosomaux, en faisceau dans le prolongement
      if(ds(s0,Nc)<Rn+.7)s0=ma(Nc,nm(sb(s0,Nc)),Rn+.9);
      for(s=0;s<11;s++)pts.push(s<3?lp(s0,ma(ax(-.5),o,w),s/3):ma(ax(-.5+(l+.3)*(s-3)/7),o,w));mtl(pts)}
    for(k=0;k<(i?i>1?2:4:6);k++){let w=min(.14,r*.35),g=rr(0,TAU);mito(ad(ax(l*(k+.6)/(i?i>1?2.3:4.3:6.3)),ml(ad(ml(x,cos(g)),ml(y,sin(g))),(r-w-.06)*R())),d,rr(.5,.9),w)}
    if(i)for(s=1.5;s<l-.5;s+=.75){if(i==1&&abs(s-6)<.01)continue;let g=s*2.4,n=ad(ml(x,cos(g)),ml(y,sin(g))),B=ma(ax(s),n,r),[u,,v]=fr(n);                                  // épines dendritiques et leurs boutons afférents
      Cy(Loxc,B,ma(B,n,.45),.06,K(CF.mc));S(Lox,ma(B,n,.62),.22,K(CF.mc));El(Lox,ma(B,n,.83),ml(u,.14),ml(n,.02),ml(v,.14),K(0x334));S(Lox,ma(B,n,1.13),.27,K(0x9b8));pgl(ma(B,n,-.13))}
    else{for(k=0;k<26;k++){let g=rr(0,TAU),w=r*.6*sqrt(R()),o=ad(ml(x,cos(g)),ml(y,sin(g))),a=ma(ax(-.3),o,w),b=ma(ax(l),o,w);Cy(Lt,a,b,.005,K(0xcc9));CY.push({a,b,r:.005,i:'nf',q:lp(a,b,.5),R:l/2+1,sf:1})}      // neurofilaments
      for(s=.2;s<l;s+=.19)for(k=0;k<14;k++){let g=k*TAU/14,h=(k+1)*TAU/14,R1=r-.012;Cy(Lt,ad(ax(s),ad(ml(x,R1*cos(g)),ml(y,R1*sin(g)))),ad(ax(s),ad(ml(x,R1*cos(h)),ml(y,R1*sin(h)))),.004,K(0xcdf))}      // anneaux d'actine, période ≈ 190 nm
      for(k=0;k<260;k++){let g=rr(0,TAU);S(Lr,ad(ax(rr(.3,8)),ml(ad(ml(x,cos(g)),ml(y,sin(g))),r-.01)),.012,K(0xe44))}}});                          // canaux Na+ du segment initial
  {let[x,,y]=fr(dax),k;                                                                    // bouton : vésicules synaptiques, zone active, mitochondrie ; épine d'en face
    for(k=0;k<190;k++){let q=ma(Cb,nm(ad(rd(),ml(dax,.8))),(Rb-.07)*cbrt(R()));{let w=sb(q,Cb),h=dt(w,dax);if(ds(q,e0)<.32||h>Rb-.13&&ln(sb(w,ml(dax,h)))<.17)continue}S(Lv,q,.02,K(0xbdf));cS(CY,q,.02,'sv',{sf:1})}
    mito(ma(Cb,dax,-.3),x,.28,.11);gol(ma(Cc,A0,Rc+5),A0)}                                                                                 // avant-poste golgien de la dendrite apicale
  org(10,.15,.3,(q,r)=>{S(Lo,q,r,K(0x862));cS(CY,q,r,'lf')})}                                                                                // lipofuscine

