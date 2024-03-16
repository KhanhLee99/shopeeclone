import{Q as D,g as O,h as G,k as Z,m as K,r as g,u as R,a as L,c as U,o as J,U as v,n as j,p as X,j as e,C as T,N as Y,B as S,q,L as A,s as E,t as k,v as ee,P as se,w as te,W as _,x as Q,H as re,y as ae}from"./index.f8c4847e.js";import{P as B,p as V}from"./Product.50f7fb53.js";import{I as W}from"./InputNumber.bce825c0.js";var oe=class extends D{constructor(s,t){super(s,t)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(s,t){super.setOptions({...s,behavior:O()},t)}getOptimisticResult(s){return s.behavior=O(),super.getOptimisticResult(s)}fetchNextPage(s){return this.fetch({...s,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(s){return this.fetch({...s,meta:{fetchMore:{direction:"backward"}}})}createResult(s,t){var n,x,a,p;const{state:r}=s,o=super.createResult(s,t),{isFetching:d,isRefetching:c}=o,l=d&&((x=(n=r.fetchMeta)==null?void 0:n.fetchMore)==null?void 0:x.direction)==="forward",i=d&&((p=(a=r.fetchMeta)==null?void 0:a.fetchMore)==null?void 0:p.direction)==="backward";return{...o,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:G(t,r.data),hasPreviousPage:Z(t,r.data),isFetchingNextPage:l,isFetchingPreviousPage:i,isRefetching:c&&!l&&!i}}};function ne(s,t){return K(s,oe,t)}var z=new Map,F=new WeakMap,H=0,ie=void 0;function ce(s){return s?(F.has(s)||(H+=1,F.set(s,H.toString())),F.get(s)):"0"}function le(s){return Object.keys(s).sort().filter(t=>s[t]!==void 0).map(t=>`${t}_${t==="root"?ce(s.root):s[t]}`).toString()}function de(s){const t=le(s);let r=z.get(t);if(!r){const o=new Map;let d;const c=new IntersectionObserver(l=>{l.forEach(i=>{var n;const x=i.isIntersecting&&d.some(a=>i.intersectionRatio>=a);s.trackVisibility&&typeof i.isVisible>"u"&&(i.isVisible=x),(n=o.get(i.target))==null||n.forEach(a=>{a(x,i)})})},s);d=c.thresholds||(Array.isArray(s.threshold)?s.threshold:[s.threshold||0]),r={id:t,observer:c,elements:o},z.set(t,r)}return r}function pe(s,t,r={},o=ie){if(typeof window.IntersectionObserver>"u"&&o!==void 0){const n=s.getBoundingClientRect();return t(o,{isIntersecting:o,target:s,intersectionRatio:typeof r.threshold=="number"?r.threshold:0,time:0,boundingClientRect:n,intersectionRect:n,rootBounds:n}),()=>{}}const{id:d,observer:c,elements:l}=de(r),i=l.get(s)||[];return l.has(s)||l.set(s,i),i.push(t),c.observe(s),function(){i.splice(i.indexOf(t),1),i.length===0&&(l.delete(s),c.unobserve(s)),l.size===0&&(c.disconnect(),z.delete(d))}}function xe({threshold:s,delay:t,trackVisibility:r,rootMargin:o,root:d,triggerOnce:c,skip:l,initialInView:i,fallbackInView:n,onChange:x}={}){var a;const[p,b]=g.exports.useState(null),h=g.exports.useRef(),[u,y]=g.exports.useState({inView:!!i,entry:void 0});h.current=x,g.exports.useEffect(()=>{if(l||!p)return;let w;return w=pe(p,(I,M)=>{y({inView:I,entry:M}),h.current&&h.current(I,M),M.isIntersecting&&c&&w&&(w(),w=void 0)},{root:d,rootMargin:o,threshold:s,trackVisibility:r,delay:t},n),()=>{w&&w()}},[Array.isArray(s)?s.toString():s,p,d,o,c,l,r,n,t]);const P=(a=u.entry)==null?void 0:a.target,C=g.exports.useRef();!p&&P&&!c&&!l&&C.current!==P&&(C.current=P,y({inView:!!i,entry:void 0}));const N=[b,u.inView,u.entry];return N.ref=N[0],N.inView=N[1],N.entry=N[2],N}function he({queryConfig:s}){var x;const{t}=R(),r=L(),{control:o,handleSubmit:d,trigger:c,reset:l,formState:{errors:i}}=U({defaultValues:{price_min:s.price_min||"",price_max:s.price_max||""},resolver:J(q),shouldFocusError:!1});g.exports.useEffect(()=>{const{price_min:a,price_max:p}=s;!a&&!p&&l({price_min:"",price_max:""})},[s.price_min,s.price_max]);const n=d(a=>{const{price_min:p="",price_max:b=""}=a;r({pathname:v.productList,search:j(X({...s,price_min:p,price_max:b},h=>h==="")).toString()})});return e.exports.jsxs("form",{className:"mt-2",onSubmit:n,children:[e.exports.jsxs("div",{className:"flex items-start",children:[e.exports.jsx(T,{control:o,name:"price_min",render:({field:a})=>e.exports.jsx(W,{type:"text",className:"grow",placeholder:t("price min"),classNameInput:"p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",classNameError:"hidden",value:a.value,ref:a.ref,onChange:p=>{a.onChange(p),c("price_max")}})}),e.exports.jsx("div",{className:"mx-2 mt-2 shrink-0",children:"-"}),e.exports.jsx(T,{control:o,name:"price_max",render:({field:a})=>e.exports.jsx(W,{type:"text",className:"grow",placeholder:t("price max"),classNameInput:"p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",classNameError:"hidden",value:a.value,ref:a.ref,onChange:p=>{a.onChange(p),c("price_min")}})})]}),e.exports.jsx("div",{className:"mt-1 min-h-[1.25rem] text-center text-sm text-red-600",children:(x=i.price_min)!=null&&x.message?t(`${Y}:${i.price_min.message}`):""}),e.exports.jsx(S,{className:"uppercase",block:!0,children:t("apply")})]})}function ue({queryConfig:s}){const{t}=R(),r=L(),o=d=>{r({pathname:v.productList,search:j({...s,rating_filter:String(d)}).toString()})};return e.exports.jsx("ul",{className:"my-3",children:Array(5).fill(0).map((d,c)=>e.exports.jsx("li",{className:"py-1 pl-2",children:e.exports.jsxs("div",{className:"flex cursor-pointer items-center text-sm",onClick:()=>o(5-c),tabIndex:0,role:"button","aria-hidden":"true",children:[Array(5).fill(0).map((l,i)=>i<5-c?e.exports.jsxs("svg",{viewBox:"0 0 9.5 8",className:"mr-1 h-4 w-4",children:[e.exports.jsxs("defs",{children:[e.exports.jsxs("linearGradient",{id:"ratingStarGradient",x1:"50%",x2:"50%",y1:"0%",y2:"100%",children:[e.exports.jsx("stop",{offset:0,stopColor:"#ffca11"}),e.exports.jsx("stop",{offset:1,stopColor:"#ffad27"})]}),e.exports.jsx("polygon",{id:"ratingStar",points:"14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"})]}),e.exports.jsx("g",{fill:"url(#ratingStarGradient)",fillRule:"evenodd",stroke:"none",strokeWidth:1,children:e.exports.jsx("g",{transform:"translate(-876 -1270)",children:e.exports.jsx("g",{transform:"translate(155 992)",children:e.exports.jsx("g",{transform:"translate(600 29)",children:e.exports.jsx("g",{transform:"translate(10 239)",children:e.exports.jsx("g",{transform:"translate(101 10)",children:e.exports.jsx("use",{stroke:"#ffa727",strokeWidth:".5",xlinkHref:"#ratingStar"})})})})})})})]},i):e.exports.jsxs("svg",{viewBox:"0 0 30 30",className:"mr-1 h-4 w-4",children:[e.exports.jsx("defs",{children:e.exports.jsxs("linearGradient",{id:"star__hollow",x1:"50%",x2:"50%",y1:"0%",y2:"99.0177926%",children:[e.exports.jsx("stop",{offset:"0%",stopColor:"#FFD211"}),e.exports.jsx("stop",{offset:"100%",stopColor:"#FFAD27"})]})}),e.exports.jsx("path",{fill:"none",fillRule:"evenodd",stroke:"url(#star__hollow)",strokeWidth:2,d:"M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"})]},i)),c!==0&&e.exports.jsx("span",{children:t("rating up")})]})},c))})}function me({queryConfig:s,categories:t}){const{t:r}=R(),{category:o}=s,d=L(),c=()=>{d({pathname:v.productList,search:j(E(s,["category","price_min","price_max","rating_filter"])).toString()})};return e.exports.jsxs("div",{className:"sticky top-[120px] py-4",children:[e.exports.jsxs(A,{to:{pathname:v.productList,search:j(E(s,["category"])).toString()},className:k("flex items-center font-bold",{"text-orange":!o}),children:[e.exports.jsx("svg",{viewBox:"0 0 12 10",className:"mr-3 h-4 w-3 fill-current",children:e.exports.jsx("g",{fillRule:"evenodd",stroke:"none",strokeWidth:1,children:e.exports.jsx("g",{transform:"translate(-373 -208)",children:e.exports.jsx("g",{transform:"translate(155 191)",children:e.exports.jsxs("g",{transform:"translate(218 17)",children:[e.exports.jsx("path",{d:"m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"}),e.exports.jsx("path",{d:"m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"}),e.exports.jsx("path",{d:"m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"})]})})})})}),r("all categories")]}),e.exports.jsx("div",{className:"my-4 h-[1px] bg-gray-300"}),e.exports.jsx("ul",{children:t.map(l=>{const i=o===l._id;return e.exports.jsx("li",{className:"py-2 pl-2",children:e.exports.jsxs(A,{to:{pathname:v.productList,search:j({...s,category:l._id}).toString()},className:k("relative px-2",{"font-semibold text-orange":i}),children:[e.exports.jsx("svg",{viewBox:"0 0 4 7",className:"absolute left-[-10px] top-1 h-2 w-2 fill-orange",children:e.exports.jsx("polygon",{points:"4 3.5 0 0 0 7"})}),l.name]})},l._id)})}),e.exports.jsxs("div",{className:"mt-4 flex items-center font-bold uppercase",children:[e.exports.jsx("svg",{enableBackground:"new 0 0 15 15",viewBox:"0 0 15 15",x:0,y:0,className:"mr-3 h-4 w-3 fill-current stroke-current",children:e.exports.jsx("g",{children:e.exports.jsx("polyline",{fill:"none",points:"5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:10})})}),r("filter search")]}),e.exports.jsx("div",{className:"my-4 h-[1px] bg-gray-300"}),e.exports.jsxs("div",{className:"my-5",children:[e.exports.jsx("div",{children:r("price range")}),e.exports.jsx(he,{queryConfig:s})]}),e.exports.jsx("div",{className:"my-4 h-[1px] bg-gray-300"}),e.exports.jsx("div",{className:"text-sm",children:r("rating")}),e.exports.jsx(ue,{queryConfig:s}),e.exports.jsx("div",{className:"my-4 h-[1px] bg-gray-300"}),e.exports.jsx(S,{block:!0,className:"uppercase",onClick:c,children:r("clear all")})]})}const f={createdAt:"createdAt",view:"view",sold:"sold",price:"price"},$={asc:"asc",desc:"desc"};function ge({queryConfig:s}){const{t}=R(),r=L(),{sort_by:o=f.createdAt,order:d}=s,c=n=>o===n,l=n=>{r({pathname:v.productList,search:j(E({...s,sort_by:n},["order"])).toString()})},i=n=>{r({pathname:v.productList,search:j({...s,sort_by:f.price,order:n}).toString()})};return e.exports.jsx("div",{className:"bg-gray-300/40 px-3 py-4",children:e.exports.jsx("div",{className:"flex flex-wrap items-center justify-between gap-2",children:e.exports.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.exports.jsx("div",{children:t("sort by")}),e.exports.jsx(S,{onClick:()=>l(f.view),buttonType:c(f.view)?"primary":"secondary",className:"h-8 px-4 capitalize",children:t("popular")}),e.exports.jsx(S,{onClick:()=>l(f.createdAt),buttonType:c(f.createdAt)?"primary":"secondary",className:"h-8 px-4 capitalize",children:t("latest")}),e.exports.jsx(S,{onClick:()=>l(f.sold),buttonType:c(f.sold)?"primary":"secondary",className:"h-8 px-4 capitalize",children:t("top sales")}),e.exports.jsxs("select",{className:k("h-8  px-4 text-left text-sm capitalize  outline-none ",{"bg-orange text-white hover:bg-orange/80":c(f.price),"bg-white text-black hover:bg-slate-100":!c(f.price)}),value:d||"",onChange:n=>i(n.target.value),children:[e.exports.jsx("option",{value:"",disabled:!0,className:"bg-white text-black",children:t("price")}),e.exports.jsx("option",{value:$.asc,className:"bg-white text-black",children:t("price low to high")}),e.exports.jsx("option",{value:$.desc,className:"bg-white text-black",children:t("price high to low")})]})]})})})}const m=2;function fe({queryConfig:s,pageSize:t}){const r=Number(s.page),o=()=>{let d=!1,c=!1;const l=n=>c?null:(c=!0,e.exports.jsx("span",{className:"mx-2 rounded border bg-white px-3 py-2 shadow-sm",children:"..."},n)),i=n=>d?null:(d=!0,e.exports.jsx("span",{className:"mx-2 rounded border bg-white px-3 py-2 shadow-sm",children:"..."},n));return Array(t).fill(0).map((n,x)=>{const a=x+1;if(r<=m*2+1&&a>r+m&&a<t-m+1)return i(x);if(r>m*2+1&&r<t-m*2){if(a<r-m&&a>m)return l(x);if(a>r+m&&a<t-m+1)return i(x)}else if(r>=t-m*2&&a>m&&a<r-m)return l(x);return e.exports.jsx(A,{to:{pathname:v.productList,search:j({...s,page:a.toString()}).toString()},className:k("mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm",{"border-cyan-500":a===r,"border-transparent":a!==r}),children:a},x)})};return e.exports.jsxs("div",{className:"mt-6 flex flex-wrap justify-center",children:[r===1?e.exports.jsx("span",{className:"mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2  shadow-sm",children:"Prev"}):e.exports.jsx(A,{to:{pathname:v.productList,search:j({...s,page:(r-1).toString()}).toString()},className:"mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm",children:"Prev"}),o(),r===t?e.exports.jsx("span",{className:"mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2  shadow-sm",children:"Next"}):e.exports.jsx(A,{to:{pathname:v.productList,search:j({...s,page:(r+1).toString()}).toString()},className:"mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm",children:"Next"})]})}const ve={getCategories(){return ee.get(se.categories)}},je=ve,be="/shopeeclone/assets/empty.27da84ba.png";function Ne(){return e.exports.jsxs("div",{className:"h-full animate-pulse overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md",children:[e.exports.jsx("div",{className:"flex h-48 items-center justify-center bg-gray-300",children:e.exports.jsxs("svg",{className:"h-10 w-10 bg-gray-300 object-cover text-gray-200","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 16 20",children:[e.exports.jsx("path",{d:"M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"}),e.exports.jsx("path",{d:"M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"})]})}),e.exports.jsxs("div",{className:"overflow-hidden p-2",children:[e.exports.jsx("div",{className:"mb-[12px] h-2 rounded-full bg-gray-200"}),e.exports.jsx("div",{className:"mb-[12px] h-2 rounded-full bg-gray-200"}),e.exports.jsx("div",{className:"mb-[12px] h-2 rounded-full bg-gray-200"}),e.exports.jsx("div",{className:"h-2 rounded-full bg-gray-200"})]})]})}function Pe(){const{ref:s,inView:t}=xe(),{t:r}=R(),o=te(),[d,c]=g.exports.useState(_.pagination),[l,i]=g.exports.useState(0),n=d===_.pagination?Q({queryKey:["products",o],queryFn:()=>V.getProducts(o),placeholderData:ae,staleTime:3*60*1e3}):ne({queryKey:["products",o],queryFn:async({pageParam:h})=>{const u=await V.getProducts({...o,page:h});return l==0&&i(u.data.data.pagination.page_size),u.data.data.products},initialPageParam:1,getNextPageParam:(h,u)=>u.length<l?u.length+1:void 0}),{data:x}=Q({queryKey:["categories"],queryFn:()=>je.getCategories()}),a=e.exports.jsxs(re,{children:[e.exports.jsxs("title",{children:[r("home")," | Shopee Clone"]}),e.exports.jsx("meta",{name:"description",content:"Trang ch\u1EE7 d\u1EF1 \xE1n Shopee Clone"})]});if(g.exports.useEffect(()=>{d===_.scroll&&t&&n.hasNextPage&&n.fetchNextPage()},[t,d]),!n.data)return a;const p=d===_.pagination?n.data.data.data.products:n.data.pages,b=p.length>0||p.length==0&&(o.price_min||o.price_max||o.rating_filter||o.category);return e.exports.jsxs("div",{className:"bg-gray-200 py-6",children:[a,e.exports.jsx("div",{className:"container",children:e.exports.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[b&&e.exports.jsx("div",{className:"col-span-3",children:e.exports.jsx(me,{queryConfig:{...o,page:"1"},categories:(x==null?void 0:x.data.data)||[]})}),p.length>0&&e.exports.jsxs("div",{className:"col-span-9",children:[e.exports.jsx(ge,{queryConfig:o}),d===_.pagination&&e.exports.jsxs(g.exports.Fragment,{children:[e.exports.jsx("div",{className:"mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",children:p.map(h=>e.exports.jsx("div",{className:"col-span-1",children:e.exports.jsx(B,{product:h})},h._id))}),e.exports.jsx(fe,{queryConfig:o,pageSize:n.data.data.data.pagination.page_size})]}),d===_.scroll&&e.exports.jsxs("div",{className:"mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",children:[p.map((h,u)=>e.exports.jsx(g.exports.Fragment,{children:h.map((y,P)=>e.exports.jsx("div",{className:"col-span-1",children:h.length===P+1?e.exports.jsx(B,{product:y,ref:s}):e.exports.jsx(B,{product:y})},y._id))},u)),n.isFetchingNextPage&&Array(5).fill(0).map((h,u)=>e.exports.jsx("div",{className:"col-span-1 bg-white",children:e.exports.jsx(Ne,{})},u))]})]}),p.length==0&&e.exports.jsx("div",{className:k({"col-span-9":b,"col-span-12":!b}),children:e.exports.jsxs("div",{className:"flex h-[500px] flex-col items-center justify-center  p-2",children:[e.exports.jsx("img",{src:be,alt:"no purchase",className:"h-[160px] w-[160px]"}),e.exports.jsx("div",{className:"mt-3 capitalize",children:r("no_result_found")})]})})]})})]})}export{Pe as default};
