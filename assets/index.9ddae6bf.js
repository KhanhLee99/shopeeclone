import{u as i,c as x,o as u,d as w,B as d,j as s,H as f,z as h,e as g}from"./index.8bd769ea.js";import{B as j}from"./Button.0388d39a.js";import{I as t}from"./InputPassword.7d3b602d.js";import{u as b}from"./user.api.a59db146.js";const v=h.pick(["password","new_password","confirm_password"]);function z(){const{t:e}=i(),{register:a,handleSubmit:l,reset:m,setError:N,formState:{errors:c}}=x({defaultValues:{password:"",new_password:"",confirm_password:""},resolver:u(v),shouldFocusError:!1}),n=w({mutationFn:b.updateProfile,onSuccess:r=>{d.success(r.data.message,{position:"top-center",autoClose:1e3}),m()}}),p=l(r=>{d.error(e("cannot_change_password"))}),o=r=>g(c,r);return s.exports.jsxs("div",{className:"rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20",children:[s.exports.jsxs(f,{children:[s.exports.jsxs("title",{children:[e("my profile")," | Shopee Clone"]}),s.exports.jsx("meta",{name:"description",content:"Trang th\xF4ng tin c\xE1 nh\xE2n"})]}),s.exports.jsxs("div",{className:"border-b border-b-gray-200 py-6",children:[s.exports.jsx("h1",{className:"text-lg font-medium capitalize text-gray-900",children:e("change password")}),s.exports.jsx("div",{className:"mt-1 text-sm text-gray-700",children:e("protect account")})]}),s.exports.jsx("form",{className:"mt-8 mr-auto max-w-3xl",onSubmit:p,children:s.exports.jsxs("div",{className:"mt-6 flex-grow md:mt-0 md:pr-12",children:[s.exports.jsxs("div",{className:"relative mt-2 flex flex-col flex-wrap sm:flex-row",children:[s.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[30%] sm:text-right",children:e("current password")}),s.exports.jsx("div",{className:"sm:w-[70%] sm:pl-5",children:s.exports.jsx(t,{classNameInput:"w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm",name:"password",placeholder:e("current password"),errorMessage:o("password"),register:a})})]}),s.exports.jsxs("div",{className:"relative mt-2 flex flex-col flex-wrap sm:flex-row",children:[s.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[30%] sm:text-right",children:e("new password")}),s.exports.jsx("div",{className:"sm:w-[70%] sm:pl-5",children:s.exports.jsx(t,{classNameInput:"w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm",name:"new_password",placeholder:e("new password"),errorMessage:o("new_password"),register:a})})]}),s.exports.jsxs("div",{className:"relative mt-2 flex flex-col flex-wrap sm:flex-row",children:[s.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[30%] sm:text-right",children:e("confirm password")}),s.exports.jsx("div",{className:"sm:w-[70%] sm:pl-5",children:s.exports.jsx(t,{classNameInput:"w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm",name:"confirm_password",placeholder:e("confirm password"),errorMessage:o("confirm_password"),register:a})})]}),s.exports.jsxs("div",{className:"mt-2 flex flex-col flex-wrap sm:flex-row",children:[s.exports.jsx("div",{className:"truncate pt-3 capitalize sm:w-[30%] sm:text-right"}),s.exports.jsx("div",{className:"sm:w-[70%] sm:pl-5",children:s.exports.jsx(j,{className:"flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80",type:"submit",isLoading:n.isPending,disabled:n.isPending,children:e("save")})})]})]})})]})}export{z as default};