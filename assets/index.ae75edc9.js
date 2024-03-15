import{u as y,r as x,j as e,p as v,D as I,A as U,c as O,o as T,d as F,w as G,E as V,H as Y,C as M,F as q,G as H,e as J}from"./index.39bdda90.js";import{B as K}from"./Button.da11a96d.js";import{I as A}from"./Input.b3d84aa4.js";import{u as N}from"./user.api.b2c71549.js";import{I as Q}from"./InputNumber.e1164869.js";function X({value:s,onChange:d,errorMessage:p}){const{t:i}=y(),[c,n]=x.exports.useState({date:f.getDate(),month:f.getMonth(),year:f.getFullYear()});x.exports.useEffect(()=>{s&&n({date:s.getDate(),month:s.getMonth(),year:s.getFullYear()})},[s]);const o=r=>{const{value:l,name:g}=r.target,h={...c,[g]:l};n(h),d&&d(new Date(h.year,h.month,h.date))};return e.exports.jsxs("div",{className:"mt-2 flex flex-col flex-wrap sm:flex-row",children:[e.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[20%] sm:text-right",children:i("date of birth")}),e.exports.jsxs("div",{className:"sm:w-[80%] sm:pl-5",children:[e.exports.jsxs("div",{className:"flex justify-between",children:[e.exports.jsxs("select",{onChange:o,name:"date",className:"h-10 w-[32%] rounded-sm border border-black/10 px-3",value:(s==null?void 0:s.getDate())||c.date,children:[e.exports.jsx("option",{disabled:!0,children:i("day")}),v.exports.range(1,32).map(r=>e.exports.jsx("option",{value:r,children:r},r))]}),e.exports.jsxs("select",{onChange:o,name:"month",className:"h-10 w-[32%] rounded-sm border border-black/10 px-3",value:(s==null?void 0:s.getMonth())||c.month,children:[e.exports.jsx("option",{disabled:!0,children:i("month")}),v.exports.range(0,12).map(r=>e.exports.jsx("option",{value:r,children:r+1},r))]}),e.exports.jsxs("select",{onChange:o,name:"year",className:"h-10 w-[32%] rounded-sm border border-black/10 px-3",value:(s==null?void 0:s.getFullYear())||c.year,children:[e.exports.jsx("option",{disabled:!0,children:i("year")}),v.exports.range(1950,2025).map(r=>e.exports.jsx("option",{value:r,children:r},r))]})]}),e.exports.jsx("div",{className:"mt-1 min-h-[1.25rem] text-sm text-red-600",children:p})]})]})}const Z=1048576;function W({onChange:s}){const{t:d}=y(),p=x.exports.useRef(null),i=n=>{var o;n.preventDefault(),(o=p.current)==null||o.click()},c=n=>{var r;const o=(r=n.target.files)==null?void 0:r[0];o&&(o.size>=Z||!o.type.includes("image"))?I.error("D\u1EE5ng l\u01B0\u1EE3ng file t\u1ED1i \u0111a 1 MB. \u0110\u1ECBnh d\u1EA1ng:.JPEG, .PNG",{position:"top-center"}):s&&s(o)};return e.exports.jsxs(x.exports.Fragment,{children:[e.exports.jsx("input",{className:"hidden",type:"file",accept:".jpg,.jpeg,.png",ref:p,onChange:c,onClick:n=>n.target.value=null}),e.exports.jsx("button",{className:"flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm",onClick:i,children:d("select image")})]})}const $=H.pick(["name","address","phone","date_of_birth","avatar"]),f=new Date(1990,0,1);function ne(){const{t:s}=y(),[d,p]=x.exports.useState(),i=x.exports.useMemo(()=>d?URL.createObjectURL(d):"",[d]),{setProfile:c}=x.exports.useContext(U),{control:n,register:o,handleSubmit:r,setValue:l,watch:g,formState:{errors:h,isValid:P}}=O({defaultValues:{name:"",phone:"",address:"",avatar:"",date_of_birth:f},resolver:T($),mode:"onBlur"}),_=F({mutationFn:N.updateProfile,onSuccess:a=>{I.success(a.data.message,{position:"top-center",autoClose:1e3})}}),C=F({mutationFn:N.uploadAvatar}),{data:w,refetch:z}=G({queryKey:["profile"],queryFn:N.getProfile}),t=w==null?void 0:w.data.data,D=g("avatar"),B=()=>{const{name:a,phone:b,address:m,date_of_birth:u}=g();return t&&a===t.name&&b===t.phone&&m===t.address&&D===t.avatar&&(u==null?void 0:u.toISOString())===t.date_of_birth},E=_.isPending||C.isPending,L=E||!P||B();x.exports.useEffect(()=>{t&&(l("name",t.name),l("phone",t.phone),l("address",t.address),l("avatar",t.avatar),l("date_of_birth",t.date_of_birth?new Date(t.date_of_birth):f))},[t]);const R=a=>{p(a),l("avatar",URL.createObjectURL(a))},k=r(async a=>{var b;try{let m=D;if(d){const S=new FormData;S.append("image",d),m=(await C.mutateAsync(S)).data.data,l("avatar",m)}const u=await _.mutateAsync({...a,avatar:m,date_of_birth:(b=a.date_of_birth)==null?void 0:b.toISOString()});c(u.data.data),V(u.data.data),z()}catch(m){console.log(m)}}),j=a=>J(h,a);return e.exports.jsxs("div",{className:"rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20",children:[e.exports.jsxs(Y,{children:[e.exports.jsxs("title",{children:[s("my profile")," | Shopee Clone"]}),e.exports.jsx("meta",{name:"description",content:"Trang th\xF4ng tin c\xE1 nh\xE2n"})]}),e.exports.jsxs("div",{className:"border-b border-b-gray-200 py-6",children:[e.exports.jsx("h1",{className:"text-lg font-medium capitalize text-gray-900",children:s("my profile")}),e.exports.jsx("div",{className:"mt-1 text-sm text-gray-700",children:s("protect account")})]}),e.exports.jsxs("form",{className:"mt-8 flex flex-col-reverse md:flex-row md:items-start",onSubmit:k,children:[e.exports.jsxs("div",{className:"mt-6 flex-grow md:mt-0 md:pr-12",children:[e.exports.jsxs("div",{className:"flex flex-col flex-wrap sm:flex-row",children:[e.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[20%] sm:text-right",children:s("email")}),e.exports.jsx("div",{className:"sm:w-[80%] sm:pl-5",children:e.exports.jsx("div",{className:"pt-3 text-gray-700",children:t==null?void 0:t.email})})]}),e.exports.jsxs("div",{className:"mt-6 flex flex-col flex-wrap sm:flex-row",children:[e.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[20%] sm:text-right",children:s("name")}),e.exports.jsx("div",{className:"sm:w-[80%] sm:pl-5",children:e.exports.jsx(A,{classNameInput:"w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm",name:"name",placeholder:s("name"),errorMessage:j("name"),setValue:l,register:o})})]}),e.exports.jsxs("div",{className:"mt-2 flex flex-col flex-wrap sm:flex-row",children:[e.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[20%] sm:text-right",children:s("phone")}),e.exports.jsx("div",{className:"sm:w-[80%] sm:pl-5",children:e.exports.jsx(M,{control:n,name:"phone",render:({field:a})=>e.exports.jsx(Q,{type:"text",placeholder:s("phone"),classNameInput:"w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm",errorMessage:j("phone"),...a,onChange:a.onChange})})})]}),e.exports.jsxs("div",{className:"mt-2 flex flex-col flex-wrap sm:flex-row",children:[e.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[20%] sm:text-right",children:s("address")}),e.exports.jsx("div",{className:"sm:w-[80%] sm:pl-5",children:e.exports.jsx(A,{classNameInput:"w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm",name:"address",placeholder:s("address"),errorMessage:j("address"),setValue:l,register:o})})]}),e.exports.jsx(M,{control:n,name:"date_of_birth",render:({field:a})=>e.exports.jsx(X,{errorMessage:j("date_of_birth"),value:a.value,onChange:a.onChange})}),e.exports.jsxs("div",{className:"mt-2 flex flex-col flex-wrap sm:flex-row",children:[e.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[20%] sm:text-right"}),e.exports.jsx("div",{className:"sm:w-[80%] sm:pl-5",children:e.exports.jsx(K,{className:"flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80",type:"submit",isLoading:E,disabled:L,children:s("save")})})]})]}),e.exports.jsx("div",{className:"flex justify-center md:w-72 md:border-l md:border-l-gray-200",children:e.exports.jsxs("div",{className:"flex flex-col items-center",children:[e.exports.jsx("div",{className:"my-5 h-24 w-24",children:e.exports.jsx("img",{src:i||q(t==null?void 0:t.avatar),alt:"",className:"h-full w-full rounded-full border border-black/10 object-cover"})}),e.exports.jsx(W,{onChange:R}),e.exports.jsxs("div",{className:"mt-3 text-gray-400",children:[e.exports.jsx("div",{children:s("file size max")}),e.exports.jsx("div",{children:s("file extension format")})]})]})})]})]})}export{ne as default};
