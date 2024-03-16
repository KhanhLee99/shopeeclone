import{Q,g as L,h as I,k as O,m as T,u as P,a as k,c as V,o as H,r as v,U as g,n as f,p as W,j as e,C as B,N as D,B as y,q as G,L as w,s as F,t as _,v as Z,P as $,w as K,W as b,x as M,H as U,y as J}from"./index.e81ae4aa.js";import{P as A,p as R}from"./Product.78029343.js";import{I as z}from"./InputNumber.9254d515.js";var X=class extends Q{constructor(s,r){super(s,r)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(s,r){super.setOptions({...s,behavior:L()},r)}getOptimisticResult(s){return s.behavior=L(),super.getOptimisticResult(s)}fetchNextPage(s){return this.fetch({...s,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(s){return this.fetch({...s,meta:{fetchMore:{direction:"backward"}}})}createResult(s,r){var i,d,a,x;const{state:t}=s,o=super.createResult(s,r),{isFetching:c,isRefetching:n}=o,l=c&&((d=(i=t.fetchMeta)==null?void 0:i.fetchMore)==null?void 0:d.direction)==="forward",p=c&&((x=(a=t.fetchMeta)==null?void 0:a.fetchMore)==null?void 0:x.direction)==="backward";return{...o,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:I(r,t.data),hasPreviousPage:O(r,t.data),isFetchingNextPage:l,isFetchingPreviousPage:p,isRefetching:n&&!l&&!p}}};function Y(s,r){return T(s,X,r)}function q({queryConfig:s}){var d;const{t:r}=P(),t=k(),{control:o,handleSubmit:c,trigger:n,reset:l,formState:{errors:p}}=V({defaultValues:{price_min:s.price_min||"",price_max:s.price_max||""},resolver:H(G),shouldFocusError:!1});v.exports.useEffect(()=>{const{price_min:a,price_max:x}=s;!a&&!x&&l({price_min:"",price_max:""})},[s.price_min,s.price_max]);const i=c(a=>{const{price_min:x="",price_max:N=""}=a;t({pathname:g.productList,search:f(W({...s,price_min:x,price_max:N},m=>m==="")).toString()})});return e.exports.jsxs("form",{className:"mt-2",onSubmit:i,children:[e.exports.jsxs("div",{className:"flex items-start",children:[e.exports.jsx(B,{control:o,name:"price_min",render:({field:a})=>e.exports.jsx(z,{type:"text",className:"grow",placeholder:r("price min"),classNameInput:"p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",classNameError:"hidden",value:a.value,ref:a.ref,onChange:x=>{a.onChange(x),n("price_max")}})}),e.exports.jsx("div",{className:"mx-2 mt-2 shrink-0",children:"-"}),e.exports.jsx(B,{control:o,name:"price_max",render:({field:a})=>e.exports.jsx(z,{type:"text",className:"grow",placeholder:r("price max"),classNameInput:"p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",classNameError:"hidden",value:a.value,ref:a.ref,onChange:x=>{a.onChange(x),n("price_min")}})})]}),e.exports.jsx("div",{className:"mt-1 min-h-[1.25rem] text-center text-sm text-red-600",children:(d=p.price_min)!=null&&d.message?r(`${D}:${p.price_min.message}`):""}),e.exports.jsx(y,{className:"uppercase",block:!0,children:r("apply")})]})}function ee({queryConfig:s}){const{t:r}=P(),t=k(),o=c=>{t({pathname:g.productList,search:f({...s,rating_filter:String(c)}).toString()})};return e.exports.jsx("ul",{className:"my-3",children:Array(5).fill(0).map((c,n)=>e.exports.jsx("li",{className:"py-1 pl-2",children:e.exports.jsxs("div",{className:"flex cursor-pointer items-center text-sm",onClick:()=>o(5-n),tabIndex:0,role:"button","aria-hidden":"true",children:[Array(5).fill(0).map((l,p)=>p<5-n?e.exports.jsxs("svg",{viewBox:"0 0 9.5 8",className:"mr-1 h-4 w-4",children:[e.exports.jsxs("defs",{children:[e.exports.jsxs("linearGradient",{id:"ratingStarGradient",x1:"50%",x2:"50%",y1:"0%",y2:"100%",children:[e.exports.jsx("stop",{offset:0,stopColor:"#ffca11"}),e.exports.jsx("stop",{offset:1,stopColor:"#ffad27"})]}),e.exports.jsx("polygon",{id:"ratingStar",points:"14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"})]}),e.exports.jsx("g",{fill:"url(#ratingStarGradient)",fillRule:"evenodd",stroke:"none",strokeWidth:1,children:e.exports.jsx("g",{transform:"translate(-876 -1270)",children:e.exports.jsx("g",{transform:"translate(155 992)",children:e.exports.jsx("g",{transform:"translate(600 29)",children:e.exports.jsx("g",{transform:"translate(10 239)",children:e.exports.jsx("g",{transform:"translate(101 10)",children:e.exports.jsx("use",{stroke:"#ffa727",strokeWidth:".5",xlinkHref:"#ratingStar"})})})})})})})]},p):e.exports.jsxs("svg",{viewBox:"0 0 30 30",className:"mr-1 h-4 w-4",children:[e.exports.jsx("defs",{children:e.exports.jsxs("linearGradient",{id:"star__hollow",x1:"50%",x2:"50%",y1:"0%",y2:"99.0177926%",children:[e.exports.jsx("stop",{offset:"0%",stopColor:"#FFD211"}),e.exports.jsx("stop",{offset:"100%",stopColor:"#FFAD27"})]})}),e.exports.jsx("path",{fill:"none",fillRule:"evenodd",stroke:"url(#star__hollow)",strokeWidth:2,d:"M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"})]},p)),n!==0&&e.exports.jsx("span",{children:r("rating up")})]})},n))})}function se({queryConfig:s,categories:r}){const{t}=P(),{category:o}=s,c=k(),n=()=>{c({pathname:g.productList,search:f(F(s,["category","price_min","price_max","rating_filter"])).toString()})};return e.exports.jsxs("div",{className:"sticky top-[120px] py-4",children:[e.exports.jsxs(w,{to:{pathname:g.productList,search:f(F(s,["category"])).toString()},className:_("flex items-center font-bold",{"text-orange":!o}),children:[e.exports.jsx("svg",{viewBox:"0 0 12 10",className:"mr-3 h-4 w-3 fill-current",children:e.exports.jsx("g",{fillRule:"evenodd",stroke:"none",strokeWidth:1,children:e.exports.jsx("g",{transform:"translate(-373 -208)",children:e.exports.jsx("g",{transform:"translate(155 191)",children:e.exports.jsxs("g",{transform:"translate(218 17)",children:[e.exports.jsx("path",{d:"m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"}),e.exports.jsx("path",{d:"m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"}),e.exports.jsx("path",{d:"m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"})]})})})})}),t("all categories")]}),e.exports.jsx("div",{className:"my-4 h-[1px] bg-gray-300"}),e.exports.jsx("ul",{children:r.map(l=>{const p=o===l._id;return e.exports.jsx("li",{className:"py-2 pl-2",children:e.exports.jsxs(w,{to:{pathname:g.productList,search:f({...s,category:l._id}).toString()},className:_("relative px-2",{"font-semibold text-orange":p}),children:[e.exports.jsx("svg",{viewBox:"0 0 4 7",className:"absolute left-[-10px] top-1 h-2 w-2 fill-orange",children:e.exports.jsx("polygon",{points:"4 3.5 0 0 0 7"})}),l.name]})},l._id)})}),e.exports.jsxs("div",{className:"mt-4 flex items-center font-bold uppercase",children:[e.exports.jsx("svg",{enableBackground:"new 0 0 15 15",viewBox:"0 0 15 15",x:0,y:0,className:"mr-3 h-4 w-3 fill-current stroke-current",children:e.exports.jsx("g",{children:e.exports.jsx("polyline",{fill:"none",points:"5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:10})})}),t("filter search")]}),e.exports.jsx("div",{className:"my-4 h-[1px] bg-gray-300"}),e.exports.jsxs("div",{className:"my-5",children:[e.exports.jsx("div",{children:t("price range")}),e.exports.jsx(q,{queryConfig:s})]}),e.exports.jsx("div",{className:"my-4 h-[1px] bg-gray-300"}),e.exports.jsx("div",{className:"text-sm",children:t("rating")}),e.exports.jsx(ee,{queryConfig:s}),e.exports.jsx("div",{className:"my-4 h-[1px] bg-gray-300"}),e.exports.jsx(y,{block:!0,className:"uppercase",onClick:n,children:t("clear all")})]})}const u={createdAt:"createdAt",view:"view",sold:"sold",price:"price"},E={asc:"asc",desc:"desc"};function re({queryConfig:s}){const{t:r}=P(),t=k(),{sort_by:o=u.createdAt,order:c}=s,n=i=>o===i,l=i=>{t({pathname:g.productList,search:f(F({...s,sort_by:i},["order"])).toString()})},p=i=>{t({pathname:g.productList,search:f({...s,sort_by:u.price,order:i}).toString()})};return e.exports.jsx("div",{className:"sticky top-[116px] z-20 bg-gray-100 px-3 py-4 shadow-sm",children:e.exports.jsx("div",{className:"flex flex-wrap items-center justify-between gap-2",children:e.exports.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.exports.jsx("div",{children:r("sort by")}),e.exports.jsx(y,{onClick:()=>l(u.view),buttonType:n(u.view)?"primary":"secondary",className:"h-8 px-4 capitalize",children:r("popular")}),e.exports.jsx(y,{onClick:()=>l(u.createdAt),buttonType:n(u.createdAt)?"primary":"secondary",className:"h-8 px-4 capitalize",children:r("latest")}),e.exports.jsx(y,{onClick:()=>l(u.sold),buttonType:n(u.sold)?"primary":"secondary",className:"h-8 px-4 capitalize",children:r("top sales")}),e.exports.jsxs("select",{className:_("h-8  px-4 text-left text-sm capitalize  outline-none ",{"bg-orange text-white hover:bg-orange/80":n(u.price),"bg-white text-black hover:bg-slate-100":!n(u.price)}),value:c||"",onChange:i=>p(i.target.value),children:[e.exports.jsx("option",{value:"",disabled:!0,className:"bg-white text-black",children:r("price")}),e.exports.jsx("option",{value:E.asc,className:"bg-white text-black",children:r("price low to high")}),e.exports.jsx("option",{value:E.desc,className:"bg-white text-black",children:r("price high to low")})]})]})})})}const h=2;function te({queryConfig:s,pageSize:r}){const t=Number(s.page),o=()=>{let c=!1,n=!1;const l=i=>n?null:(n=!0,e.exports.jsx("span",{className:"mx-2 rounded border bg-white px-3 py-2 shadow-sm",children:"..."},i)),p=i=>c?null:(c=!0,e.exports.jsx("span",{className:"mx-2 rounded border bg-white px-3 py-2 shadow-sm",children:"..."},i));return Array(r).fill(0).map((i,d)=>{const a=d+1;if(t<=h*2+1&&a>t+h&&a<r-h+1)return p(d);if(t>h*2+1&&t<r-h*2){if(a<t-h&&a>h)return l(d);if(a>t+h&&a<r-h+1)return p(d)}else if(t>=r-h*2&&a>h&&a<t-h)return l(d);return e.exports.jsx(w,{to:{pathname:g.productList,search:f({...s,page:a.toString()}).toString()},className:_("mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm",{"border-cyan-500":a===t,"border-transparent":a!==t}),children:a},d)})};return e.exports.jsxs("div",{className:"mt-6 flex flex-wrap justify-center",children:[t===1?e.exports.jsx("span",{className:"mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2  shadow-sm",children:"Prev"}):e.exports.jsx(w,{to:{pathname:g.productList,search:f({...s,page:(t-1).toString()}).toString()},className:"mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm",children:"Prev"}),o(),t===r?e.exports.jsx("span",{className:"mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2  shadow-sm",children:"Next"}):e.exports.jsx(w,{to:{pathname:g.productList,search:f({...s,page:(t+1).toString()}).toString()},className:"mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm",children:"Next"})]})}const ae={getCategories(){return Z.get($.categories)}},oe=ae,ne="/shopeeclone/assets/empty.27da84ba.png";function ie(){return e.exports.jsxs("div",{className:"h-full animate-pulse overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md",children:[e.exports.jsx("div",{className:"flex h-48 items-center justify-center bg-gray-300",children:e.exports.jsxs("svg",{className:"h-10 w-10 bg-gray-300 object-cover text-gray-200","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 16 20",children:[e.exports.jsx("path",{d:"M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"}),e.exports.jsx("path",{d:"M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"})]})}),e.exports.jsxs("div",{className:"overflow-hidden p-2",children:[e.exports.jsx("div",{className:"mb-[12px] h-2 rounded-full bg-gray-200"}),e.exports.jsx("div",{className:"mb-[12px] h-2 rounded-full bg-gray-200"}),e.exports.jsx("div",{className:"mb-[12px] h-2 rounded-full bg-gray-200"}),e.exports.jsx("div",{className:"h-2 rounded-full bg-gray-200"})]})]})}function ce(s={threshold:1}){const r=v.exports.useRef(null),[t,o]=v.exports.useState(!1),c=n=>{const[l]=n;o(l.isIntersecting)};return v.exports.useEffect(()=>{const n=new IntersectionObserver(c,s);return r.current&&n.observe(r.current),()=>{r.current&&n.unobserve(r.current)}},[r,s]),{isVisible:t,ref:r}}function de(){const{isVisible:s,ref:r}=ce(),{t}=P(),o=K(),[c,n]=v.exports.useState(b.pagination),[l,p]=v.exports.useState(0),i=c===b.pagination?M({queryKey:["products",o],queryFn:()=>(window.scrollTo(0,0),R.getProducts(o)),placeholderData:J,staleTime:3*60*1e3}):Y({queryKey:["products",o],queryFn:async({pageParam:m})=>{const j=await R.getProducts({...o,page:m});return l==0&&p(j.data.data.pagination.page_size),j.data.data.products},initialPageParam:1,getNextPageParam:(m,j)=>j.length<l?j.length+1:void 0}),{data:d}=M({queryKey:["categories"],queryFn:()=>oe.getCategories()});v.exports.useEffect(()=>{c===b.scroll&&s&&i.hasNextPage&&i.fetchNextPage()},[s,c]),console.log("isVisible",s);const a=e.exports.jsxs(U,{children:[e.exports.jsxs("title",{children:[t("home")," | Shopee Clone"]}),e.exports.jsx("meta",{name:"description",content:"Trang ch\u1EE7 d\u1EF1 \xE1n Shopee Clone"})]});if(!i.data)return a;const x=c===b.pagination?i.data.data.data.products:i.data.pages,N=x.length>0||x.length==0&&(o.price_min||o.price_max||o.rating_filter||o.category);return e.exports.jsxs("div",{className:"bg-gray-200 py-6",children:[a,e.exports.jsx("div",{className:"container",children:e.exports.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[N&&e.exports.jsx("div",{className:"col-span-3",children:e.exports.jsx(se,{queryConfig:{...o,page:"1"},categories:(d==null?void 0:d.data.data)||[]})}),x.length>0&&e.exports.jsxs("div",{className:"col-span-9",children:[e.exports.jsx(re,{queryConfig:o}),c===b.pagination&&e.exports.jsxs(v.exports.Fragment,{children:[e.exports.jsx("div",{className:"mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",children:x.map(m=>e.exports.jsx("div",{className:"col-span-1",children:e.exports.jsx(A,{product:m})},m._id))}),e.exports.jsx(te,{queryConfig:o,pageSize:i.data.data.data.pagination.page_size})]}),c===b.scroll&&e.exports.jsxs("div",{className:"mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",children:[x.map((m,j)=>e.exports.jsx(v.exports.Fragment,{children:m.map((S,C)=>e.exports.jsx("div",{className:"col-span-1",children:m.length===C+1?e.exports.jsx(A,{product:S,ref:r}):e.exports.jsx(A,{product:S})},S._id))},j)),i.isFetchingNextPage&&Array(5).fill(0).map((m,j)=>e.exports.jsx("div",{className:"col-span-1 bg-white",children:e.exports.jsx(ie,{})},j))]})]}),x.length==0&&e.exports.jsx("div",{className:_({"col-span-9":N,"col-span-12":!N}),children:e.exports.jsxs("div",{className:"flex h-[500px] flex-col items-center justify-center  p-2",children:[e.exports.jsx("img",{src:ne,alt:"no purchase",className:"h-[160px] w-[160px]"}),e.exports.jsx("div",{className:"mt-3 capitalize",children:t("no_result_found")})]})})]})})]})}export{de as default};
