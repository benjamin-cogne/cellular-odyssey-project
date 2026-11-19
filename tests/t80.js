const {open}=require('./tl.js');
(async()=>{const {b,pg,errs,ev}=await open(1);
 console.log(await ev(()=>{let bad=[],nst=0,t0=performance.now(),maxR=0,nm_=0;
   for(let P of RXP)for(let s of P[6]){nst++;let cnt=l=>{let c={};for(let w of l.split(' ')){let[x,y]=w.split('*'),k=y||x,n=y?+x:1,m=MOL[k];if(!m){bad.push(P[0]+': clé inconnue '+k);continue}m[2]=m[2]||(nm_++,rxL(m[1]));
       if(m[2].P.some(q=>q.some(isNaN)))bad.push('NaN '+k);maxR=Math.max(maxR,m[2].R);for(let a of m[2].a)if(a.el!='H'&&a.el!='e')c[a.el]=(c[a.el]||0)+n}return c},A=cnt(s[1]),B=cnt(s[2]),d=[];
     for(let k of new Set(Object.keys(A).concat(Object.keys(B))))if((A[k]||0)!=(B[k]||0))d.push(k+':'+(A[k]||0)+'→'+(B[k]||0));if(d.length)bad.push(P[0]+' « '+s[0].slice(0,28)+' » '+d.join(' '));
     if(s.length!=9)bad.push(P[0]+' champs '+s.length)}
   return JSON.stringify({voies:RXP.length,etapes:nst,molecules:nm_,ms:Math.round(performance.now()-t0),maxR:Math.round(maxR),ecarts:bad},null,1)}));
 console.log(errs.slice(0,3));await b.close()})();
