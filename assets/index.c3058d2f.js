import{a2 as Ce,I as Fe,a3 as Oe,G as Se,a4 as ze,a5 as Ee,a6 as De,u as Me,a7 as Te,r as k,A as Be,x as Ie,d as Z,j as i,H as Re,L as le,z as de,D,a8 as $e,B as We,a0 as R,J as Le,a1 as fe}from"./index.f8c4847e.js";import{t as qe}from"./toNumber.0f625372.js";import{Q as Ke}from"./QuantityController.06d78654.js";import{P as Qe}from"./PurchaseSkeleton.53fce947.js";import"./InputNumber.bce825c0.js";var Ue=Object.defineProperty,pe=Object.getOwnPropertySymbols,Ge=Object.prototype.hasOwnProperty,He=Object.prototype.propertyIsEnumerable,me=(e,t,r)=>t in e?Ue(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Xe=(e,t)=>{for(var r in t||(t={}))Ge.call(t,r)&&me(e,r,t[r]);if(pe)for(var r of pe(t))He.call(t,r)&&me(e,r,t[r]);return e},je=Symbol.for("immer-nothing"),he=Symbol.for("immer-draftable"),h=Symbol.for("immer-state");function y(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var O=Object.getPrototypeOf;function S(e){return!!e&&!!e[h]}function A(e){var t;return e?Pe(e)||Array.isArray(e)||!!e[he]||!!((t=e.constructor)!=null&&t[he])||Q(e)||U(e):!1}var Je=Object.prototype.constructor.toString();function Pe(e){if(!e||typeof e!="object")return!1;const t=O(e);if(t===null)return!0;const r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object?!0:typeof r=="function"&&Function.toString.call(r)===Je}function W(e,t){K(e)===0?Reflect.ownKeys(e).forEach(r=>{t(r,e[r],e)}):e.forEach((r,n)=>t(n,r,e))}function K(e){const t=e[h];return t?t.type_:Array.isArray(e)?1:Q(e)?2:U(e)?3:0}function re(e,t){return K(e)===2?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function Ne(e,t,r){const n=K(e);n===2?e.set(t,r):n===3?e.add(r):e[t]=r}function Ye(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}function Q(e){return e instanceof Map}function U(e){return e instanceof Set}function w(e){return e.copy_||e.base_}function ne(e,t){if(Q(e))return new Map(e);if(U(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);if(!t&&Pe(e))return O(e)?Xe({},e):Object.assign(Object.create(null),e);const r=Object.getOwnPropertyDescriptors(e);delete r[h];let n=Reflect.ownKeys(r);for(let s=0;s<n.length;s++){const o=n[s],a=r[o];a.writable===!1&&(a.writable=!0,a.configurable=!0),(a.get||a.set)&&(r[o]={configurable:!0,writable:!0,enumerable:a.enumerable,value:e[o]})}return Object.create(O(e),r)}function ae(e,t=!1){return G(e)||S(e)||!A(e)||(K(e)>1&&(e.set=e.add=e.clear=e.delete=Ze),Object.freeze(e),t&&Object.entries(e).forEach(([r,n])=>ae(n,!0))),e}function Ze(){y(2)}function G(e){return Object.isFrozen(e)}var Ve={};function C(e){const t=Ve[e];return t||y(0,e),t}var M;function ke(){return M}function et(e,t){return{drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function xe(e,t){t&&(C("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function se(e){ie(e),e.drafts_.forEach(tt),e.drafts_=null}function ie(e){e===M&&(M=e.parent_)}function _e(e){return M=et(M,e)}function tt(e){const t=e[h];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function ye(e,t){t.unfinalizedDrafts_=t.drafts_.length;const r=t.drafts_[0];return e!==void 0&&e!==r?(r[h].modified_&&(se(t),y(4)),A(e)&&(e=L(t,e),t.parent_||q(t,e)),t.patches_&&C("Patches").generateReplacementPatches_(r[h].base_,e,t.patches_,t.inversePatches_)):e=L(t,r,[]),se(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==je?e:void 0}function L(e,t,r){if(G(t))return t;const n=t[h];if(!n)return W(t,(s,o)=>ge(e,n,t,s,o,r)),t;if(n.scope_!==e)return t;if(!n.modified_)return q(e,n.base_,!0),n.base_;if(!n.finalized_){n.finalized_=!0,n.scope_.unfinalizedDrafts_--;const s=n.copy_;let o=s,a=!1;n.type_===3&&(o=new Set(s),s.clear(),a=!0),W(o,(l,f)=>ge(e,n,s,l,f,r,a)),q(e,s,!1),r&&e.patches_&&C("Patches").generatePatches_(n,r,e.patches_,e.inversePatches_)}return n.copy_}function ge(e,t,r,n,s,o,a){if(S(s)){const l=o&&t&&t.type_!==3&&!re(t.assigned_,n)?o.concat(n):void 0,f=L(e,s,l);if(Ne(r,n,f),S(f))e.canAutoFreeze_=!1;else return}else a&&r.add(s);if(A(s)&&!G(s)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;L(e,s),(!t||!t.scope_.parent_)&&typeof n!="symbol"&&Object.prototype.propertyIsEnumerable.call(r,n)&&q(e,s)}}function q(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&ae(t,r)}function rt(e,t){const r=Array.isArray(e),n={type_:r?1:0,scope_:t?t.scope_:ke(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let s=n,o=ue;r&&(s=[n],o=T);const{revoke:a,proxy:l}=Proxy.revocable(s,o);return n.draft_=l,n.revoke_=a,l}var ue={get(e,t){if(t===h)return e;const r=w(e);if(!re(r,t))return nt(e,r,t);const n=r[t];return e.finalized_||!A(n)?n:n===V(e.base_,t)?(ee(e),e.copy_[t]=oe(n,e)):n},has(e,t){return t in w(e)},ownKeys(e){return Reflect.ownKeys(w(e))},set(e,t,r){const n=we(w(e),t);if(n!=null&&n.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){const s=V(w(e),t),o=s==null?void 0:s[h];if(o&&o.base_===r)return e.copy_[t]=r,e.assigned_[t]=!1,!0;if(Ye(r,s)&&(r!==void 0||re(e.base_,t)))return!0;ee(e),ce(e)}return e.copy_[t]===r&&(r!==void 0||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=r,e.assigned_[t]=!0),!0},deleteProperty(e,t){return V(e.base_,t)!==void 0||t in e.base_?(e.assigned_[t]=!1,ee(e),ce(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const r=w(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n&&{writable:!0,configurable:e.type_!==1||t!=="length",enumerable:n.enumerable,value:r[t]}},defineProperty(){y(11)},getPrototypeOf(e){return O(e.base_)},setPrototypeOf(){y(12)}},T={};W(ue,(e,t)=>{T[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}});T.deleteProperty=function(e,t){return T.set.call(this,e,t,void 0)};T.set=function(e,t,r){return ue.set.call(this,e[0],t,r,e[0])};function V(e,t){const r=e[h];return(r?w(r):e)[t]}function nt(e,t,r){var n;const s=we(t,r);return s?"value"in s?s.value:(n=s.get)==null?void 0:n.call(e.draft_):void 0}function we(e,t){if(!(t in e))return;let r=O(e);for(;r;){const n=Object.getOwnPropertyDescriptor(r,t);if(n)return n;r=O(r)}}function ce(e){e.modified_||(e.modified_=!0,e.parent_&&ce(e.parent_))}function ee(e){e.copy_||(e.copy_=ne(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var st=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(t,r,n)=>{if(typeof t=="function"&&typeof r!="function"){const o=r;r=t;const a=this;return function(f=o,...g){return a.produce(f,N=>r.call(this,N,...g))}}typeof r!="function"&&y(6),n!==void 0&&typeof n!="function"&&y(7);let s;if(A(t)){const o=_e(this),a=oe(t,void 0);let l=!0;try{s=r(a),l=!1}finally{l?se(o):ie(o)}return xe(o,n),ye(s,o)}else if(!t||typeof t!="object"){if(s=r(t),s===void 0&&(s=t),s===je&&(s=void 0),this.autoFreeze_&&ae(s,!0),n){const o=[],a=[];C("Patches").generateReplacementPatches_(t,s,o,a),n(o,a)}return s}else y(1,t)},this.produceWithPatches=(t,r)=>{if(typeof t=="function")return(a,...l)=>this.produceWithPatches(a,f=>t(f,...l));let n,s;return[this.produce(t,r,(a,l)=>{n=a,s=l}),n,s]},typeof(e==null?void 0:e.autoFreeze)=="boolean"&&this.setAutoFreeze(e.autoFreeze),typeof(e==null?void 0:e.useStrictShallowCopy)=="boolean"&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){A(e)||y(8),S(e)&&(e=it(e));const t=_e(this),r=oe(e,void 0);return r[h].isManual_=!0,ie(t),r}finishDraft(e,t){const r=e&&e[h];(!r||!r.isManual_)&&y(9);const{scope_:n}=r;return xe(n,t),ye(void 0,n)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let r;for(r=t.length-1;r>=0;r--){const s=t[r];if(s.path.length===0&&s.op==="replace"){e=s.value;break}}r>-1&&(t=t.slice(r+1));const n=C("Patches").applyPatches_;return S(e)?n(e,t):this.produce(e,s=>n(s,t))}};function oe(e,t){const r=Q(e)?C("MapSet").proxyMap_(e,t):U(e)?C("MapSet").proxySet_(e,t):rt(e,t);return(t?t.scope_:ke()).drafts_.push(r),r}function it(e){return S(e)||y(10,e),Ae(e)}function Ae(e){if(!A(e)||G(e))return e;const t=e[h];let r;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,r=ne(e,t.scope_.immer_.useStrictShallowCopy_)}else r=ne(e,!0);return W(r,(n,s)=>{Ne(r,n,Ae(s))}),t&&(t.finalized_=!1),r}var x=new st,$=x.produce;x.produceWithPatches.bind(x);x.setAutoFreeze.bind(x);x.setUseStrictShallowCopy.bind(x);x.applyPatches.bind(x);x.createDraft.bind(x);x.finishDraft.bind(x);var ct=Ce,ot=function(){return ct.Date.now()},at=ot,ut=Fe,te=at,ve=qe,lt="Expected a function",dt=Math.max,ft=Math.min;function pt(e,t,r){var n,s,o,a,l,f,g=0,N=!1,b=!1,_=!0;if(typeof e!="function")throw new TypeError(lt);t=ve(t)||0,ut(r)&&(N=!!r.leading,b="maxWait"in r,o=b?dt(ve(r.maxWait)||0,t):o,_="trailing"in r?!!r.trailing:_);function F(p){var v=n,P=s;return n=s=void 0,g=p,a=e.apply(P,v),a}function H(p){return g=p,l=setTimeout(j,t),N?F(p):a}function X(p){var v=p-f,P=p-g,c=t-v;return b?ft(c,o-P):c}function B(p){var v=p-f,P=p-g;return f===void 0||v>=t||v<0||b&&P>=o}function j(){var p=te();if(B(p))return I(p);l=setTimeout(j,X(p))}function I(p){return l=void 0,_&&n?F(p):(n=s=void 0,a)}function z(){l!==void 0&&clearTimeout(l),g=0,n=f=s=l=void 0}function J(){return l===void 0?a:I(te())}function E(){var p=te(),v=B(p);if(n=arguments,s=this,f=p,v){if(l===void 0)return H(f);if(b)return clearTimeout(l),l=setTimeout(j,t),F(f)}return l===void 0&&(l=setTimeout(j,t)),a}return E.cancel=z,E.flush=J,E}var mt=pt;const ht=mt;function xt(e,t,r,n){for(var s=-1,o=e==null?0:e.length;++s<o;){var a=e[s];t(n,a,r(a),e)}return n}var _t=xt;function yt(e){return function(t,r,n){for(var s=-1,o=Object(t),a=n(t),l=a.length;l--;){var f=a[e?l:++s];if(r(o[f],f,o)===!1)break}return t}}var gt=yt,vt=gt,bt=vt(),jt=bt,Pt=jt,Nt=Oe;function kt(e,t){return e&&Pt(e,t,Nt)}var wt=kt,At=Se;function Ct(e,t){return function(r,n){if(r==null)return r;if(!At(r))return e(r,n);for(var s=r.length,o=t?s:-1,a=Object(r);(t?o--:++o<s)&&n(a[o],o,a)!==!1;);return r}}var Ft=Ct,Ot=wt,St=Ft,zt=St(Ot),Et=zt,Dt=Et;function Mt(e,t,r,n){return Dt(e,function(s,o,a){t(n,s,r(s),a)}),n}var Tt=Mt,Bt=_t,It=Tt,Rt=ze,$t=Ee;function Wt(e,t){return function(r,n){var s=$t(r)?Bt:It,o=t?t():{};return s(r,e,Rt(n),o)}}var Lt=Wt,qt=De,Kt=Lt,Qt=Kt(function(e,t,r){qt(e,r,t)}),Ut=Qt;const be=Ut;function Zt(){var P;const{t:e}=Me(),r=((P=Te().state)==null?void 0:P.purchaseId)||null,{extendedPurchase:n,setExtendedPurchase:s}=k.exports.useContext(Be),{data:o,isPending:a}=Ie({queryKey:["purchases",{status:fe.inCart}],queryFn:()=>R.getPurchases({status:fe.inCart})}),l=o==null?void 0:o.data.data,f=Z({mutationFn:R.updatePurchase,onSuccess:()=>{s(c=>{const u=be(c,"_id");return c.map(d=>{var m;return{...d,disabled:!1,checked:Boolean((m=u[d._id])==null?void 0:m.checked)}})||[]})}}),g=Z({mutationFn:R.buyProducts,onSuccess:(c,u)=>{const d=u.map(m=>m.product_id);s(m=>m.filter(Y=>!d.includes(Y.product._id))),Le.success(c.data.message,{position:"top-center",autoClose:1e3})}}),N=Z({mutationFn:R.deletePurchase,onSuccess:(c,u)=>{s(d=>d.filter(m=>!u.includes(m._id)))}}),b=k.exports.useMemo(()=>n.every(c=>c.checked),[n]),_=k.exports.useMemo(()=>n.filter(c=>c.checked),[n]),F=_.length,H=k.exports.useMemo(()=>_.reduce((c,u)=>c+u.product.price*u.buy_count,0),[_]),X=k.exports.useMemo(()=>_.reduce((c,u)=>c+(u.product.price_before_discount-u.product.price)*u.buy_count,0),[_]);k.exports.useEffect(()=>{l&&s(c=>{const u=be(c,"_id");return l.map(d=>{var m;return{...d,disabled:!1,checked:d._id===r||Boolean((m=u[d._id])==null?void 0:m.checked)}})})},[l,r]);const B=c=>u=>{s($(d=>{d[c].checked=u.target.checked}))},j=()=>{s(c=>c.map(u=>({...u,checked:!b})))},I=c=>u=>{s($(d=>{d[c].buy_count=Number(u)}))},z=(c,u,d)=>{if(d){const m=n[c];s($(Y=>{Y[c].buy_count=u})),J(m,c,u)}},J=k.exports.useCallback(ht((c,u,d)=>{s($(m=>{m[u].disabled=!0})),f.mutate({product_id:c.product._id,buy_count:d})},1e3),[]),E=c=>()=>{const u=n[c]._id;N.mutate([u])},p=()=>{const c=_.map(u=>u._id);N.mutate(c)},v=()=>{if(_.length>0){const c=_.map(u=>({product_id:u.product._id,buy_count:u.buy_count}));g.mutate(c)}};return i.exports.jsxs("div",{className:"bg-neutral-100 py-16",children:[i.exports.jsxs(Re,{children:[i.exports.jsxs("title",{children:[e("shopping cart")," | Shopee Clone"]}),i.exports.jsx("meta",{name:"description",content:"Gi\u1ECF h\xE0ng c\u1EE7a b\u1EA1n"})]}),i.exports.jsxs("div",{className:"container",children:[i.exports.jsx("div",{className:"overflow-auto",children:i.exports.jsxs("div",{className:"min-w-[1000px]",children:[i.exports.jsxs("div",{className:"grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow",children:[i.exports.jsx("div",{className:"col-span-6",children:i.exports.jsxs("div",{className:"flex items-center",children:[i.exports.jsx("div",{className:"flex flex-shrink-0 items-center justify-center pr-3",children:i.exports.jsx("input",{type:"checkbox",className:"h-5 w-5 accent-orange",checked:b,onChange:j})}),i.exports.jsx("div",{className:"flex-grow text-black",children:e("product")})]})}),i.exports.jsx("div",{className:"col-span-6",children:i.exports.jsxs("div",{className:"grid grid-cols-5 text-center",children:[i.exports.jsx("div",{className:"col-span-2",children:e("unit price")}),i.exports.jsx("div",{className:"col-span-1",children:e("quantity")}),i.exports.jsx("div",{className:"col-span-1",children:e("total price")}),i.exports.jsx("div",{className:"col-span-1",children:e("actions")})]})})]}),i.exports.jsxs("div",{className:"my-3 rounded-sm bg-white p-5 shadow",children:[a&&Array(5).fill(0).map((c,u)=>i.exports.jsx(Qe,{},u)),n.length>0&&n.map((c,u)=>i.exports.jsxs("div",{className:"mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0",children:[i.exports.jsx("div",{className:"col-span-6",children:i.exports.jsxs("div",{className:"flex",children:[i.exports.jsx("div",{className:"flex flex-shrink-0 items-center justify-center pr-3",children:i.exports.jsx("input",{type:"checkbox",className:"h-5 w-5 accent-orange",checked:c.checked,onChange:B(u)})}),i.exports.jsx("div",{className:"flex-grow",children:i.exports.jsxs("div",{className:"flex",children:[i.exports.jsx(le,{className:"h-20 w-20 flex-shrink-0",to:de({name:c.product.name,id:c.product._id}),children:i.exports.jsx("img",{alt:c.product.name,src:c.product.image})}),i.exports.jsx("div",{className:"flex flex-grow items-center px-2 pb-2 pt-1",children:i.exports.jsx(le,{to:de({name:c.product.name,id:c.product._id}),className:"line-clamp-2 text-left",children:c.product.name})})]})})]})}),i.exports.jsx("div",{className:"col-span-6",children:i.exports.jsxs("div",{className:"grid grid-cols-5 items-center",children:[i.exports.jsx("div",{className:"col-span-2",children:i.exports.jsxs("div",{className:"flex items-center justify-center",children:[i.exports.jsxs("span",{className:"text-gray-300 line-through",children:["\u20AB",D(c.product.price_before_discount)]}),i.exports.jsxs("span",{className:"ml-3",children:["\u20AB",D(c.product.price)]})]})}),i.exports.jsx("div",{className:"col-span-1",children:i.exports.jsx(Ke,{max:c.product.quantity,value:c.buy_count,classNameWrapper:"",onIncrease:d=>z(u,d,d<=c.product.quantity),onDecrease:d=>z(u,d,d>=1),onType:I(u),onFocusOut:d=>z(u,d,d>=1&&d<=c.product.quantity&&d!==n[u].buy_count),disabled:c.disabled})}),i.exports.jsx("div",{className:"col-span-1",children:i.exports.jsxs("span",{className:"text-orange",children:["\u20AB",D(c.product.price*(c.buy_count||0))]})}),i.exports.jsx("div",{className:"col-span-1",children:i.exports.jsx("button",{className:"bg-none text-black transition-colors hover:text-orange",onClick:E(u),children:e("delete")})})]})})]},c._id))]}),n.length==0&&i.exports.jsxs("div",{className:"mt-[15px] flex h-[300px] flex-col items-center justify-center bg-white p-2",children:[i.exports.jsx("img",{src:$e,alt:"no purchase",className:"h-[160px] w-[160px]"}),i.exports.jsx("div",{className:"mt-3 capitalize",children:e("no product")})]})]})}),i.exports.jsxs("div",{className:"sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center",children:[i.exports.jsxs("div",{className:"flex items-center",children:[i.exports.jsx("div",{className:"flex flex-shrink-0 items-center justify-center pr-3",children:i.exports.jsx("input",{type:"checkbox",className:"h-5 w-5 accent-orange",checked:b,onChange:j})}),i.exports.jsxs("button",{className:"mx-3 border-none bg-none",onClick:j,children:[e("select all")," (",n.length,")"]}),i.exports.jsx("button",{className:"mx-3 border-none bg-none",onClick:p,children:e("delete")})]}),i.exports.jsxs("div",{className:"mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center",children:[i.exports.jsxs("div",{children:[i.exports.jsxs("div",{className:"flex items-center sm:justify-end",children:[i.exports.jsxs("div",{children:[e("total pay")," (",F," ",F>1?e("items"):e("item"),"):"]}),i.exports.jsxs("div",{className:"ml-2 text-2xl text-orange",children:["\u20AB",D(H)]})]}),i.exports.jsxs("div",{className:"flex items-center text-sm sm:justify-end",children:[i.exports.jsx("div",{className:"text-gray-500",children:e("saved")}),i.exports.jsxs("div",{className:"ml-6 text-orange",children:["\u20AB",D(X)]})]})]}),i.exports.jsx(We,{className:"mt-5 h-10 w-52 uppercase sm:ml-4 sm:mt-0",onClick:v,disabled:g.isPending,children:e("check out")})]})]})]})]})}export{Zt as default};
