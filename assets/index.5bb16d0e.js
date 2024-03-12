import{u as N,a as v,r as y,A as E,b,c as w,d as S,U as m,i as P,j as e,H as L,L as M,e as A,o as I,l as C,f as F}from"./index.f26701b0.js";import{I as U}from"./Input.18efc2db.js";import{B as q}from"./Button.5d78e8cf.js";import{I as B}from"./InputPassword.5b8201c5.js";function O(){const{t:s}=N(),p=v(),{setIsAuthenticated:x,setProfile:u}=y.exports.useContext(E),n=b().next||"",{register:i,handleSubmit:g,setError:h,formState:{errors:j}}=w({resolver:I(C)}),a=S({mutationFn:t=>F.login(t)}),f=g(t=>{a.mutate(t,{onSuccess:r=>{x(!0),u(r.data.data.user),n&&p(`${m.productList}${n}`)},onError:r=>{var c;if(P(r)){const o=(c=r.response)==null?void 0:c.data.data;o&&Object.keys(o).forEach(d=>h(d,{message:o[d],type:"Server"}))}}})}),l=t=>A(j,t);return e.exports.jsxs("div",{className:"bg-orange",children:[e.exports.jsxs(L,{children:[e.exports.jsxs("title",{children:[s("login")," | Shopee Clone"]}),e.exports.jsx("meta",{name:"description",content:"\u0110\u0103ng nh\u1EADp v\xE0o d\u1EF1 \xE1n Shopee Clone"})]}),e.exports.jsx("div",{className:"container",children:e.exports.jsx("div",{className:"grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10",children:e.exports.jsx("div",{className:"lg:col-span-2 lg:col-start-4",children:e.exports.jsxs("form",{className:"rounded bg-white p-10 shadow-sm",onSubmit:f,noValidate:!0,children:[e.exports.jsx("div",{className:"text-2xl",children:s("login")}),e.exports.jsx(U,{className:"mt-8",type:"email",placeholder:"Email",name:"email",errorMessage:l("email"),register:i}),e.exports.jsx(B,{className:"mt-2",classNameEye:"top-[13px]",name:"password",placeholder:s("password"),errorMessage:l("password"),register:i}),e.exports.jsx("div",{className:"mt-2",children:e.exports.jsx(q,{type:"submit",className:"flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600",isLoading:a.isPending,disabled:a.isPending,children:s("login")})}),e.exports.jsxs("div",{className:"mt-8 flex items-center justify-center",children:[e.exports.jsx("span",{className:"text-gray-400",children:s("dont have account")}),e.exports.jsx(M,{className:"ml-1 text-red-400",to:m.register,children:s("sign up")})]})]})})})})]})}export{O as default};
