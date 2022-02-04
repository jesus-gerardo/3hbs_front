// import Vue from "vue";

export default function auth({next}){
    console.log("entre al middleware");
    if(!localStorage.getItem('token')){
        return next({name: 'login'});
    }
    return next();
}