import{v as r,P as e}from"./index.ec910cc5.js";const a={getProfile(){return r.get(e.me)},updateProfile(t){return r.put("user",t)},uploadAvatar(t){return r.post("user/upload-avatar",t,{headers:{"Content-Type":"multipart/form-data"}})}},o=a;export{o as u};