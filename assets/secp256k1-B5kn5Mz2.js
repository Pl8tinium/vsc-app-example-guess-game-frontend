import{H as Zt,c as bt,e as ht,t as Rt,o as Wt,w as Dt,r as M,h as Xt,b as Qt,a as Jt,d as te}from"./index-pFsat_eH.js";function ee(n,e,t,r){if(typeof n.setBigUint64=="function")return n.setBigUint64(e,t,r);const s=BigInt(32),i=BigInt(4294967295),f=Number(t>>s&i),c=Number(t&i),o=r?4:0,a=r?0:4;n.setUint32(e+o,f,r),n.setUint32(e+a,c,r)}class ne extends Zt{constructor(e,t,r,s){super(),this.blockLen=e,this.outputLen=t,this.padOffset=r,this.isLE=s,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(e),this.view=bt(this.buffer)}update(e){ht(this);const{view:t,buffer:r,blockLen:s}=this;e=Rt(e);const i=e.length;for(let f=0;f<i;){const c=Math.min(s-this.pos,i-f);if(c===s){const o=bt(e);for(;s<=i-f;f+=s)this.process(o,f);continue}r.set(e.subarray(f,f+c),this.pos),this.pos+=c,f+=c,this.pos===s&&(this.process(t,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){ht(this),Wt(e,this),this.finished=!0;const{buffer:t,view:r,blockLen:s,isLE:i}=this;let{pos:f}=this;t[f++]=128,this.buffer.subarray(f).fill(0),this.padOffset>s-f&&(this.process(r,0),f=0);for(let l=f;l<s;l++)t[l]=0;ee(r,s-8,BigInt(this.length*8),i),this.process(r,0);const c=bt(e),o=this.outputLen;if(o%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const a=o/4,p=this.get();if(a>p.length)throw new Error("_sha2: outputLen bigger than state");for(let l=0;l<a;l++)c.setUint32(4*l,p[l],i)}digest(){const{buffer:e,outputLen:t}=this;this.digestInto(e);const r=e.slice(0,t);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());const{blockLen:t,buffer:r,length:s,finished:i,destroyed:f,pos:c}=this;return e.length=s,e.pos=c,e.finished=i,e.destroyed=f,s%t&&e.buffer.set(r),e}}const re=(n,e,t)=>n&e^~n&t,se=(n,e,t)=>n&e^n&t^e&t,oe=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),X=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),Q=new Uint32Array(64);class ie extends ne{constructor(){super(64,32,8,!1),this.A=X[0]|0,this.B=X[1]|0,this.C=X[2]|0,this.D=X[3]|0,this.E=X[4]|0,this.F=X[5]|0,this.G=X[6]|0,this.H=X[7]|0}get(){const{A:e,B:t,C:r,D:s,E:i,F:f,G:c,H:o}=this;return[e,t,r,s,i,f,c,o]}set(e,t,r,s,i,f,c,o){this.A=e|0,this.B=t|0,this.C=r|0,this.D=s|0,this.E=i|0,this.F=f|0,this.G=c|0,this.H=o|0}process(e,t){for(let l=0;l<16;l++,t+=4)Q[l]=e.getUint32(t,!1);for(let l=16;l<64;l++){const v=Q[l-15],A=Q[l-2],y=M(v,7)^M(v,18)^v>>>3,u=M(A,17)^M(A,19)^A>>>10;Q[l]=u+Q[l-7]+y+Q[l-16]|0}let{A:r,B:s,C:i,D:f,E:c,F:o,G:a,H:p}=this;for(let l=0;l<64;l++){const v=M(c,6)^M(c,11)^M(c,25),A=p+v+re(c,o,a)+oe[l]+Q[l]|0,u=(M(r,2)^M(r,13)^M(r,22))+se(r,s,i)|0;p=a,a=o,o=c,c=f+A|0,f=i,i=s,s=r,r=A+u|0}r=r+this.A|0,s=s+this.B|0,i=i+this.C|0,f=f+this.D|0,c=c+this.E|0,o=o+this.F|0,a=a+this.G|0,p=p+this.H|0,this.set(r,s,i,f,c,o,a,p)}roundClean(){Q.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const ce=Dt(()=>new ie);/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const kt=BigInt(0),gt=BigInt(1),fe=BigInt(2),wt=n=>n instanceof Uint8Array,ae=Array.from({length:256},(n,e)=>e.toString(16).padStart(2,"0"));function ct(n){if(!wt(n))throw new Error("Uint8Array expected");let e="";for(let t=0;t<n.length;t++)e+=ae[n[t]];return e}function zt(n){const e=n.toString(16);return e.length&1?`0${e}`:e}function St(n){if(typeof n!="string")throw new Error("hex string expected, got "+typeof n);return BigInt(n===""?"0":`0x${n}`)}function ft(n){if(typeof n!="string")throw new Error("hex string expected, got "+typeof n);const e=n.length;if(e%2)throw new Error("padded hex string expected, got unpadded hex of length "+e);const t=new Uint8Array(e/2);for(let r=0;r<t.length;r++){const s=r*2,i=n.slice(s,s+2),f=Number.parseInt(i,16);if(Number.isNaN(f)||f<0)throw new Error("Invalid byte sequence");t[r]=f}return t}function nt(n){return St(ct(n))}function vt(n){if(!wt(n))throw new Error("Uint8Array expected");return St(ct(Uint8Array.from(n).reverse()))}function at(n,e){return ft(n.toString(16).padStart(e*2,"0"))}function At(n,e){return at(n,e).reverse()}function ue(n){return ft(zt(n))}function K(n,e,t){let r;if(typeof e=="string")try{r=ft(e)}catch(i){throw new Error(`${n} must be valid hex string, got "${e}". Cause: ${i}`)}else if(wt(e))r=Uint8Array.from(e);else throw new Error(`${n} must be hex string or Uint8Array`);const s=r.length;if(typeof t=="number"&&s!==t)throw new Error(`${n} expected ${t} bytes, got ${s}`);return r}function lt(...n){const e=new Uint8Array(n.reduce((r,s)=>r+s.length,0));let t=0;return n.forEach(r=>{if(!wt(r))throw new Error("Uint8Array expected");e.set(r,t),t+=r.length}),e}function le(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}function de(n){if(typeof n!="string")throw new Error(`utf8ToBytes expected string, got ${typeof n}`);return new Uint8Array(new TextEncoder().encode(n))}function he(n){let e;for(e=0;n>kt;n>>=gt,e+=1);return e}function ge(n,e){return n>>BigInt(e)&gt}const we=(n,e,t)=>n|(t?gt:kt)<<BigInt(e),Nt=n=>(fe<<BigInt(n-1))-gt,yt=n=>new Uint8Array(n),Ut=n=>Uint8Array.from(n);function Vt(n,e,t){if(typeof n!="number"||n<2)throw new Error("hashLen must be a number");if(typeof e!="number"||e<2)throw new Error("qByteLen must be a number");if(typeof t!="function")throw new Error("hmacFn must be a function");let r=yt(n),s=yt(n),i=0;const f=()=>{r.fill(1),s.fill(0),i=0},c=(...l)=>t(s,r,...l),o=(l=yt())=>{s=c(Ut([0]),l),r=c(),l.length!==0&&(s=c(Ut([1]),l),r=c())},a=()=>{if(i++>=1e3)throw new Error("drbg: tried 1000 values");let l=0;const v=[];for(;l<e;){r=c();const A=r.slice();v.push(A),l+=r.length}return lt(...v)};return(l,v)=>{f(),o(l);let A;for(;!(A=v(a()));)o();return f(),A}}const pe={bigint:n=>typeof n=="bigint",function:n=>typeof n=="function",boolean:n=>typeof n=="boolean",string:n=>typeof n=="string",stringOrUint8Array:n=>typeof n=="string"||n instanceof Uint8Array,isSafeInteger:n=>Number.isSafeInteger(n),array:n=>Array.isArray(n),field:(n,e)=>e.Fp.isValid(n),hash:n=>typeof n=="function"&&Number.isSafeInteger(n.outputLen)};function dt(n,e,t={}){const r=(s,i,f)=>{const c=pe[i];if(typeof c!="function")throw new Error(`Invalid validator "${i}", expected function`);const o=n[s];if(!(f&&o===void 0)&&!c(o,n))throw new Error(`Invalid param ${String(s)}=${o} (${typeof o}), expected ${i}`)};for(const[s,i]of Object.entries(e))r(s,i,!1);for(const[s,i]of Object.entries(t))r(s,i,!0);return n}const be=Object.freeze(Object.defineProperty({__proto__:null,bitGet:ge,bitLen:he,bitMask:Nt,bitSet:we,bytesToHex:ct,bytesToNumberBE:nt,bytesToNumberLE:vt,concatBytes:lt,createHmacDrbg:Vt,ensureBytes:K,equalBytes:le,hexToBytes:ft,hexToNumber:St,numberToBytesBE:at,numberToBytesLE:At,numberToHexUnpadded:zt,numberToVarBytesBE:ue,utf8ToBytes:de,validateObject:dt},Symbol.toStringTag,{value:"Module"}));/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const $=BigInt(0),L=BigInt(1),tt=BigInt(2),ye=BigInt(3),xt=BigInt(4),Lt=BigInt(5),Tt=BigInt(8);BigInt(9);BigInt(16);function _(n,e){const t=n%e;return t>=$?t:e+t}function me(n,e,t){if(t<=$||e<$)throw new Error("Expected power/modulo > 0");if(t===L)return $;let r=L;for(;e>$;)e&L&&(r=r*n%t),n=n*n%t,e>>=L;return r}function V(n,e,t){let r=n;for(;e-- >$;)r*=r,r%=t;return r}function Et(n,e){if(n===$||e<=$)throw new Error(`invert: expected positive integers, got n=${n} mod=${e}`);let t=_(n,e),r=e,s=$,i=L;for(;t!==$;){const c=r/t,o=r%t,a=s-i*c;r=t,t=o,s=i,i=a}if(r!==L)throw new Error("invert: does not exist");return _(s,e)}function xe(n){const e=(n-L)/tt;let t,r,s;for(t=n-L,r=0;t%tt===$;t/=tt,r++);for(s=tt;s<n&&me(s,e,n)!==n-L;s++);if(r===1){const f=(n+L)/xt;return function(o,a){const p=o.pow(a,f);if(!o.eql(o.sqr(p),a))throw new Error("Cannot find square root");return p}}const i=(t+L)/tt;return function(c,o){if(c.pow(o,e)===c.neg(c.ONE))throw new Error("Cannot find square root");let a=r,p=c.pow(c.mul(c.ONE,s),t),l=c.pow(o,i),v=c.pow(o,t);for(;!c.eql(v,c.ONE);){if(c.eql(v,c.ZERO))return c.ZERO;let A=1;for(let u=c.sqr(v);A<a&&!c.eql(u,c.ONE);A++)u=c.sqr(u);const y=c.pow(p,L<<BigInt(a-A-1));p=c.sqr(y),l=c.mul(l,y),v=c.mul(v,p),a=A}return l}}function Ee(n){if(n%xt===ye){const e=(n+L)/xt;return function(r,s){const i=r.pow(s,e);if(!r.eql(r.sqr(i),s))throw new Error("Cannot find square root");return i}}if(n%Tt===Lt){const e=(n-Lt)/Tt;return function(r,s){const i=r.mul(s,tt),f=r.pow(i,e),c=r.mul(s,f),o=r.mul(r.mul(c,tt),f),a=r.mul(c,r.sub(o,r.ONE));if(!r.eql(r.sqr(a),s))throw new Error("Cannot find square root");return a}}return xe(n)}const Be=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function Ie(n){const e={ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"},t=Be.reduce((r,s)=>(r[s]="function",r),e);return dt(n,t)}function Se(n,e,t){if(t<$)throw new Error("Expected power > 0");if(t===$)return n.ONE;if(t===L)return e;let r=n.ONE,s=e;for(;t>$;)t&L&&(r=n.mul(r,s)),s=n.sqr(s),t>>=L;return r}function ve(n,e){const t=new Array(e.length),r=e.reduce((i,f,c)=>n.is0(f)?i:(t[c]=i,n.mul(i,f)),n.ONE),s=n.inv(r);return e.reduceRight((i,f,c)=>n.is0(f)?i:(t[c]=n.mul(i,t[c]),n.mul(i,f)),s),t}function jt(n,e){const t=e!==void 0?e:n.toString(2).length,r=Math.ceil(t/8);return{nBitLength:t,nByteLength:r}}function Ae(n,e,t=!1,r={}){if(n<=$)throw new Error(`Expected Field ORDER > 0, got ${n}`);const{nBitLength:s,nByteLength:i}=jt(n,e);if(i>2048)throw new Error("Field lengths over 2048 bytes are not supported");const f=Ee(n),c=Object.freeze({ORDER:n,BITS:s,BYTES:i,MASK:Nt(s),ZERO:$,ONE:L,create:o=>_(o,n),isValid:o=>{if(typeof o!="bigint")throw new Error(`Invalid field element: expected bigint, got ${typeof o}`);return $<=o&&o<n},is0:o=>o===$,isOdd:o=>(o&L)===L,neg:o=>_(-o,n),eql:(o,a)=>o===a,sqr:o=>_(o*o,n),add:(o,a)=>_(o+a,n),sub:(o,a)=>_(o-a,n),mul:(o,a)=>_(o*a,n),pow:(o,a)=>Se(c,o,a),div:(o,a)=>_(o*Et(a,n),n),sqrN:o=>o*o,addN:(o,a)=>o+a,subN:(o,a)=>o-a,mulN:(o,a)=>o*a,inv:o=>Et(o,n),sqrt:r.sqrt||(o=>f(c,o)),invertBatch:o=>ve(c,o),cmov:(o,a,p)=>p?a:o,toBytes:o=>t?At(o,i):at(o,i),fromBytes:o=>{if(o.length!==i)throw new Error(`Fp.fromBytes: expected ${i}, got ${o.length}`);return t?vt(o):nt(o)}});return Object.freeze(c)}function Yt(n){if(typeof n!="bigint")throw new Error("field order must be bigint");const e=n.toString(2).length;return Math.ceil(e/8)}function Kt(n){const e=Yt(n);return e+Math.ceil(e/2)}function Ne(n,e,t=!1){const r=n.length,s=Yt(e),i=Kt(e);if(r<16||r<i||r>1024)throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);const f=t?nt(n):vt(n),c=_(f,e-L)+L;return t?At(c,s):at(c,s)}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const qe=BigInt(0),mt=BigInt(1);function Oe(n,e){const t=(s,i)=>{const f=i.negate();return s?f:i},r=s=>{const i=Math.ceil(e/s)+1,f=2**(s-1);return{windows:i,windowSize:f}};return{constTimeNegate:t,unsafeLadder(s,i){let f=n.ZERO,c=s;for(;i>qe;)i&mt&&(f=f.add(c)),c=c.double(),i>>=mt;return f},precomputeWindow(s,i){const{windows:f,windowSize:c}=r(i),o=[];let a=s,p=a;for(let l=0;l<f;l++){p=a,o.push(p);for(let v=1;v<c;v++)p=p.add(a),o.push(p);a=p.double()}return o},wNAF(s,i,f){const{windows:c,windowSize:o}=r(s);let a=n.ZERO,p=n.BASE;const l=BigInt(2**s-1),v=2**s,A=BigInt(s);for(let y=0;y<c;y++){const u=y*o;let h=Number(f&l);f>>=A,h>o&&(h-=v,f+=mt);const g=u,m=u+Math.abs(h)-1,E=y%2!==0,N=h<0;h===0?p=p.add(t(E,i[g])):a=a.add(t(N,i[m]))}return{p:a,f:p}},wNAFCached(s,i,f,c){const o=s._WINDOW_SIZE||1;let a=i.get(s);return a||(a=this.precomputeWindow(s,o),o!==1&&i.set(s,c(a))),this.wNAF(o,a,f)}}}function Mt(n){return Ie(n.Fp),dt(n,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...jt(n.n,n.nBitLength),...n,p:n.Fp.ORDER})}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */function He(n){const e=Mt(n);dt(e,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:t,Fp:r,a:s}=e;if(t){if(!r.eql(s,r.ZERO))throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");if(typeof t!="object"||typeof t.beta!="bigint"||typeof t.splitScalar!="function")throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")}return Object.freeze({...e})}const{bytesToNumberBE:Ue,hexToBytes:Le}=be,et={Err:class extends Error{constructor(e=""){super(e)}},_parseInt(n){const{Err:e}=et;if(n.length<2||n[0]!==2)throw new e("Invalid signature integer tag");const t=n[1],r=n.subarray(2,t+2);if(!t||r.length!==t)throw new e("Invalid signature integer: wrong length");if(r[0]&128)throw new e("Invalid signature integer: negative");if(r[0]===0&&!(r[1]&128))throw new e("Invalid signature integer: unnecessary leading zero");return{d:Ue(r),l:n.subarray(t+2)}},toSig(n){const{Err:e}=et,t=typeof n=="string"?Le(n):n;if(!(t instanceof Uint8Array))throw new Error("ui8a expected");let r=t.length;if(r<2||t[0]!=48)throw new e("Invalid signature tag");if(t[1]!==r-2)throw new e("Invalid signature: incorrect length");const{d:s,l:i}=et._parseInt(t.subarray(2)),{d:f,l:c}=et._parseInt(i);if(c.length)throw new e("Invalid signature: left bytes after parsing");return{r:s,s:f}},hexFromSig(n){const e=a=>Number.parseInt(a[0],16)&8?"00"+a:a,t=a=>{const p=a.toString(16);return p.length&1?`0${p}`:p},r=e(t(n.s)),s=e(t(n.r)),i=r.length/2,f=s.length/2,c=t(i),o=t(f);return`30${t(f+i+4)}02${o}${s}02${c}${r}`}},G=BigInt(0),j=BigInt(1);BigInt(2);const $t=BigInt(3);BigInt(4);function Te(n){const e=He(n),{Fp:t}=e,r=e.toBytes||((y,u,h)=>{const g=u.toAffine();return lt(Uint8Array.from([4]),t.toBytes(g.x),t.toBytes(g.y))}),s=e.fromBytes||(y=>{const u=y.subarray(1),h=t.fromBytes(u.subarray(0,t.BYTES)),g=t.fromBytes(u.subarray(t.BYTES,2*t.BYTES));return{x:h,y:g}});function i(y){const{a:u,b:h}=e,g=t.sqr(y),m=t.mul(g,y);return t.add(t.add(m,t.mul(y,u)),h)}if(!t.eql(t.sqr(e.Gy),i(e.Gx)))throw new Error("bad generator point: equation left != right");function f(y){return typeof y=="bigint"&&G<y&&y<e.n}function c(y){if(!f(y))throw new Error("Expected valid bigint: 0 < bigint < curve.n")}function o(y){const{allowedPrivateKeyLengths:u,nByteLength:h,wrapPrivateKey:g,n:m}=e;if(u&&typeof y!="bigint"){if(y instanceof Uint8Array&&(y=ct(y)),typeof y!="string"||!u.includes(y.length))throw new Error("Invalid key");y=y.padStart(h*2,"0")}let E;try{E=typeof y=="bigint"?y:nt(K("private key",y,h))}catch{throw new Error(`private key must be ${h} bytes, hex or bigint, not ${typeof y}`)}return g&&(E=_(E,m)),c(E),E}const a=new Map;function p(y){if(!(y instanceof l))throw new Error("ProjectivePoint expected")}class l{constructor(u,h,g){if(this.px=u,this.py=h,this.pz=g,u==null||!t.isValid(u))throw new Error("x required");if(h==null||!t.isValid(h))throw new Error("y required");if(g==null||!t.isValid(g))throw new Error("z required")}static fromAffine(u){const{x:h,y:g}=u||{};if(!u||!t.isValid(h)||!t.isValid(g))throw new Error("invalid affine point");if(u instanceof l)throw new Error("projective point not allowed");const m=E=>t.eql(E,t.ZERO);return m(h)&&m(g)?l.ZERO:new l(h,g,t.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(u){const h=t.invertBatch(u.map(g=>g.pz));return u.map((g,m)=>g.toAffine(h[m])).map(l.fromAffine)}static fromHex(u){const h=l.fromAffine(s(K("pointHex",u)));return h.assertValidity(),h}static fromPrivateKey(u){return l.BASE.multiply(o(u))}_setWindowSize(u){this._WINDOW_SIZE=u,a.delete(this)}assertValidity(){if(this.is0()){if(e.allowInfinityPoint&&!t.is0(this.py))return;throw new Error("bad point: ZERO")}const{x:u,y:h}=this.toAffine();if(!t.isValid(u)||!t.isValid(h))throw new Error("bad point: x or y not FE");const g=t.sqr(h),m=i(u);if(!t.eql(g,m))throw new Error("bad point: equation left != right");if(!this.isTorsionFree())throw new Error("bad point: not in prime-order subgroup")}hasEvenY(){const{y:u}=this.toAffine();if(t.isOdd)return!t.isOdd(u);throw new Error("Field doesn't support isOdd")}equals(u){p(u);const{px:h,py:g,pz:m}=this,{px:E,py:N,pz:S}=u,b=t.eql(t.mul(h,S),t.mul(E,m)),x=t.eql(t.mul(g,S),t.mul(N,m));return b&&x}negate(){return new l(this.px,t.neg(this.py),this.pz)}double(){const{a:u,b:h}=e,g=t.mul(h,$t),{px:m,py:E,pz:N}=this;let S=t.ZERO,b=t.ZERO,x=t.ZERO,I=t.mul(m,m),z=t.mul(E,E),U=t.mul(N,N),q=t.mul(m,E);return q=t.add(q,q),x=t.mul(m,N),x=t.add(x,x),S=t.mul(u,x),b=t.mul(g,U),b=t.add(S,b),S=t.sub(z,b),b=t.add(z,b),b=t.mul(S,b),S=t.mul(q,S),x=t.mul(g,x),U=t.mul(u,U),q=t.sub(I,U),q=t.mul(u,q),q=t.add(q,x),x=t.add(I,I),I=t.add(x,I),I=t.add(I,U),I=t.mul(I,q),b=t.add(b,I),U=t.mul(E,N),U=t.add(U,U),I=t.mul(U,q),S=t.sub(S,I),x=t.mul(U,z),x=t.add(x,x),x=t.add(x,x),new l(S,b,x)}add(u){p(u);const{px:h,py:g,pz:m}=this,{px:E,py:N,pz:S}=u;let b=t.ZERO,x=t.ZERO,I=t.ZERO;const z=e.a,U=t.mul(e.b,$t);let q=t.mul(h,E),C=t.mul(g,N),Z=t.mul(m,S),F=t.add(h,g),d=t.add(E,N);F=t.mul(F,d),d=t.add(q,C),F=t.sub(F,d),d=t.add(h,m);let w=t.add(E,S);return d=t.mul(d,w),w=t.add(q,Z),d=t.sub(d,w),w=t.add(g,m),b=t.add(N,S),w=t.mul(w,b),b=t.add(C,Z),w=t.sub(w,b),I=t.mul(z,d),b=t.mul(U,Z),I=t.add(b,I),b=t.sub(C,I),I=t.add(C,I),x=t.mul(b,I),C=t.add(q,q),C=t.add(C,q),Z=t.mul(z,Z),d=t.mul(U,d),C=t.add(C,Z),Z=t.sub(q,Z),Z=t.mul(z,Z),d=t.add(d,Z),q=t.mul(C,d),x=t.add(x,q),q=t.mul(w,d),b=t.mul(F,b),b=t.sub(b,q),q=t.mul(F,C),I=t.mul(w,I),I=t.add(I,q),new l(b,x,I)}subtract(u){return this.add(u.negate())}is0(){return this.equals(l.ZERO)}wNAF(u){return A.wNAFCached(this,a,u,h=>{const g=t.invertBatch(h.map(m=>m.pz));return h.map((m,E)=>m.toAffine(g[E])).map(l.fromAffine)})}multiplyUnsafe(u){const h=l.ZERO;if(u===G)return h;if(c(u),u===j)return this;const{endo:g}=e;if(!g)return A.unsafeLadder(this,u);let{k1neg:m,k1:E,k2neg:N,k2:S}=g.splitScalar(u),b=h,x=h,I=this;for(;E>G||S>G;)E&j&&(b=b.add(I)),S&j&&(x=x.add(I)),I=I.double(),E>>=j,S>>=j;return m&&(b=b.negate()),N&&(x=x.negate()),x=new l(t.mul(x.px,g.beta),x.py,x.pz),b.add(x)}multiply(u){c(u);let h=u,g,m;const{endo:E}=e;if(E){const{k1neg:N,k1:S,k2neg:b,k2:x}=E.splitScalar(h);let{p:I,f:z}=this.wNAF(S),{p:U,f:q}=this.wNAF(x);I=A.constTimeNegate(N,I),U=A.constTimeNegate(b,U),U=new l(t.mul(U.px,E.beta),U.py,U.pz),g=I.add(U),m=z.add(q)}else{const{p:N,f:S}=this.wNAF(h);g=N,m=S}return l.normalizeZ([g,m])[0]}multiplyAndAddUnsafe(u,h,g){const m=l.BASE,E=(S,b)=>b===G||b===j||!S.equals(m)?S.multiplyUnsafe(b):S.multiply(b),N=E(this,h).add(E(u,g));return N.is0()?void 0:N}toAffine(u){const{px:h,py:g,pz:m}=this,E=this.is0();u==null&&(u=E?t.ONE:t.inv(m));const N=t.mul(h,u),S=t.mul(g,u),b=t.mul(m,u);if(E)return{x:t.ZERO,y:t.ZERO};if(!t.eql(b,t.ONE))throw new Error("invZ was invalid");return{x:N,y:S}}isTorsionFree(){const{h:u,isTorsionFree:h}=e;if(u===j)return!0;if(h)return h(l,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:u,clearCofactor:h}=e;return u===j?this:h?h(l,this):this.multiplyUnsafe(e.h)}toRawBytes(u=!0){return this.assertValidity(),r(l,this,u)}toHex(u=!0){return ct(this.toRawBytes(u))}}l.BASE=new l(e.Gx,e.Gy,t.ONE),l.ZERO=new l(t.ZERO,t.ONE,t.ZERO);const v=e.nBitLength,A=Oe(l,e.endo?Math.ceil(v/2):v);return{CURVE:e,ProjectivePoint:l,normPrivateKeyToScalar:o,weierstrassEquation:i,isWithinCurveOrder:f}}function $e(n){const e=Mt(n);return dt(e,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...e})}function _e(n){const e=$e(n),{Fp:t,n:r}=e,s=t.BYTES+1,i=2*t.BYTES+1;function f(d){return G<d&&d<t.ORDER}function c(d){return _(d,r)}function o(d){return Et(d,r)}const{ProjectivePoint:a,normPrivateKeyToScalar:p,weierstrassEquation:l,isWithinCurveOrder:v}=Te({...e,toBytes(d,w,B){const H=w.toAffine(),O=t.toBytes(H.x),T=lt;return B?T(Uint8Array.from([w.hasEvenY()?2:3]),O):T(Uint8Array.from([4]),O,t.toBytes(H.y))},fromBytes(d){const w=d.length,B=d[0],H=d.subarray(1);if(w===s&&(B===2||B===3)){const O=nt(H);if(!f(O))throw new Error("Point is not on curve");const T=l(O);let R=t.sqrt(T);const k=(R&j)===j;return(B&1)===1!==k&&(R=t.neg(R)),{x:O,y:R}}else if(w===i&&B===4){const O=t.fromBytes(H.subarray(0,t.BYTES)),T=t.fromBytes(H.subarray(t.BYTES,2*t.BYTES));return{x:O,y:T}}else throw new Error(`Point of length ${w} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`)}}),A=d=>ct(at(d,e.nByteLength));function y(d){const w=r>>j;return d>w}function u(d){return y(d)?c(-d):d}const h=(d,w,B)=>nt(d.slice(w,B));class g{constructor(w,B,H){this.r=w,this.s=B,this.recovery=H,this.assertValidity()}static fromCompact(w){const B=e.nByteLength;return w=K("compactSignature",w,B*2),new g(h(w,0,B),h(w,B,2*B))}static fromDER(w){const{r:B,s:H}=et.toSig(K("DER",w));return new g(B,H)}assertValidity(){if(!v(this.r))throw new Error("r must be 0 < r < CURVE.n");if(!v(this.s))throw new Error("s must be 0 < s < CURVE.n")}addRecoveryBit(w){return new g(this.r,this.s,w)}recoverPublicKey(w){const{r:B,s:H,recovery:O}=this,T=x(K("msgHash",w));if(O==null||![0,1,2,3].includes(O))throw new Error("recovery id invalid");const R=O===2||O===3?B+e.n:B;if(R>=t.ORDER)throw new Error("recovery id 2 or 3 invalid");const k=O&1?"03":"02",P=a.fromHex(k+A(R)),W=o(R),rt=c(-T*W),ut=c(H*W),D=a.BASE.multiplyAndAddUnsafe(P,rt,ut);if(!D)throw new Error("point at infinify");return D.assertValidity(),D}hasHighS(){return y(this.s)}normalizeS(){return this.hasHighS()?new g(this.r,c(-this.s),this.recovery):this}toDERRawBytes(){return ft(this.toDERHex())}toDERHex(){return et.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return ft(this.toCompactHex())}toCompactHex(){return A(this.r)+A(this.s)}}const m={isValidPrivateKey(d){try{return p(d),!0}catch{return!1}},normPrivateKeyToScalar:p,randomPrivateKey:()=>{const d=Kt(e.n);return Ne(e.randomBytes(d),e.n)},precompute(d=8,w=a.BASE){return w._setWindowSize(d),w.multiply(BigInt(3)),w}};function E(d,w=!0){return a.fromPrivateKey(d).toRawBytes(w)}function N(d){const w=d instanceof Uint8Array,B=typeof d=="string",H=(w||B)&&d.length;return w?H===s||H===i:B?H===2*s||H===2*i:d instanceof a}function S(d,w,B=!0){if(N(d))throw new Error("first arg must be private key");if(!N(w))throw new Error("second arg must be public key");return a.fromHex(w).multiply(p(d)).toRawBytes(B)}const b=e.bits2int||function(d){const w=nt(d),B=d.length*8-e.nBitLength;return B>0?w>>BigInt(B):w},x=e.bits2int_modN||function(d){return c(b(d))},I=Nt(e.nBitLength);function z(d){if(typeof d!="bigint")throw new Error("bigint expected");if(!(G<=d&&d<I))throw new Error(`bigint expected < 2^${e.nBitLength}`);return at(d,e.nByteLength)}function U(d,w,B=q){if(["recovered","canonical"].some(J=>J in B))throw new Error("sign() legacy options not supported");const{hash:H,randomBytes:O}=e;let{lowS:T,prehash:R,extraEntropy:k}=B;T==null&&(T=!0),d=K("msgHash",d),R&&(d=K("prehashed msgHash",H(d)));const P=x(d),W=p(w),rt=[z(W),z(P)];if(k!=null){const J=k===!0?O(t.BYTES):k;rt.push(K("extraEntropy",J))}const ut=lt(...rt),D=P;function pt(J){const st=b(J);if(!v(st))return;const qt=o(st),ot=a.BASE.multiply(st).toAffine(),Y=c(ot.x);if(Y===G)return;const it=c(qt*c(D+Y*W));if(it===G)return;let Ot=(ot.x===Y?0:2)|Number(ot.y&j),Ht=it;return T&&y(it)&&(Ht=u(it),Ot^=1),new g(Y,Ht,Ot)}return{seed:ut,k2sig:pt}}const q={lowS:e.lowS,prehash:!1},C={lowS:e.lowS,prehash:!1};function Z(d,w,B=q){const{seed:H,k2sig:O}=U(d,w,B),T=e;return Vt(T.hash.outputLen,T.nByteLength,T.hmac)(H,O)}a.BASE._setWindowSize(8);function F(d,w,B,H=C){var ot;const O=d;if(w=K("msgHash",w),B=K("publicKey",B),"strict"in H)throw new Error("options.strict was renamed to lowS");const{lowS:T,prehash:R}=H;let k,P;try{if(typeof O=="string"||O instanceof Uint8Array)try{k=g.fromDER(O)}catch(Y){if(!(Y instanceof et.Err))throw Y;k=g.fromCompact(O)}else if(typeof O=="object"&&typeof O.r=="bigint"&&typeof O.s=="bigint"){const{r:Y,s:it}=O;k=new g(Y,it)}else throw new Error("PARSE");P=a.fromHex(B)}catch(Y){if(Y.message==="PARSE")throw new Error("signature must be Signature instance, Uint8Array or hex string");return!1}if(T&&k.hasHighS())return!1;R&&(w=e.hash(w));const{r:W,s:rt}=k,ut=x(w),D=o(rt),pt=c(ut*D),J=c(W*D),st=(ot=a.BASE.multiplyAndAddUnsafe(P,pt,J))==null?void 0:ot.toAffine();return st?c(st.x)===W:!1}return{CURVE:e,getPublicKey:E,getSharedSecret:S,sign:Z,verify:F,ProjectivePoint:a,Signature:g,utils:m}}class Gt extends Zt{constructor(e,t){super(),this.finished=!1,this.destroyed=!1,Xt(e);const r=Rt(t);if(this.iHash=e.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const s=this.blockLen,i=new Uint8Array(s);i.set(r.length>s?e.create().update(r).digest():r);for(let f=0;f<i.length;f++)i[f]^=54;this.iHash.update(i),this.oHash=e.create();for(let f=0;f<i.length;f++)i[f]^=106;this.oHash.update(i),i.fill(0)}update(e){return ht(this),this.iHash.update(e),this}digestInto(e){ht(this),Qt(e,this.outputLen),this.finished=!0,this.iHash.digestInto(e),this.oHash.update(e),this.oHash.digestInto(e),this.destroy()}digest(){const e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||(e=Object.create(Object.getPrototypeOf(this),{}));const{oHash:t,iHash:r,finished:s,destroyed:i,blockLen:f,outputLen:c}=this;return e=e,e.finished=s,e.destroyed=i,e.blockLen=f,e.outputLen=c,e.oHash=t._cloneInto(e.oHash),e.iHash=r._cloneInto(e.iHash),e}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const Ft=(n,e,t)=>new Gt(n,e).update(t).digest();Ft.create=(n,e)=>new Gt(n,e);/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */function Ce(n){return{hash:n,hmac:(e,...t)=>Ft(n,e,Jt(...t)),randomBytes:te}}function Ze(n,e){const t=r=>_e({...n,...Ce(r)});return Object.freeze({...t(e),create:t})}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const Pt=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),_t=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),Re=BigInt(1),Bt=BigInt(2),Ct=(n,e)=>(n+e/Bt)/e;function ke(n){const e=Pt,t=BigInt(3),r=BigInt(6),s=BigInt(11),i=BigInt(22),f=BigInt(23),c=BigInt(44),o=BigInt(88),a=n*n*n%e,p=a*a*n%e,l=V(p,t,e)*p%e,v=V(l,t,e)*p%e,A=V(v,Bt,e)*a%e,y=V(A,s,e)*A%e,u=V(y,i,e)*y%e,h=V(u,c,e)*u%e,g=V(h,o,e)*h%e,m=V(g,c,e)*u%e,E=V(m,t,e)*p%e,N=V(E,f,e)*y%e,S=V(N,r,e)*a%e,b=V(S,Bt,e);if(!It.eql(It.sqr(b),n))throw new Error("Cannot find square root");return b}const It=Ae(Pt,void 0,void 0,{sqrt:ke}),ze=Ze({a:BigInt(0),b:BigInt(7),Fp:It,n:_t,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:n=>{const e=_t,t=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),r=-Re*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),s=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),i=t,f=BigInt("0x100000000000000000000000000000000"),c=Ct(i*n,e),o=Ct(-r*n,e);let a=_(n-c*t-o*s,e),p=_(-c*r-o*i,e);const l=a>f,v=p>f;if(l&&(a=e-a),v&&(p=e-p),a>f||p>f)throw new Error("splitScalar: Endomorphism failed, k="+n);return{k1neg:l,k1:a,k2neg:v,k2:p}}}},ce);BigInt(0);ze.ProjectivePoint;export{ze as secp256k1};
