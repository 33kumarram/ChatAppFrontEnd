import { axiosInstances, axiosMultipartInstances } from "../Helpers/axiosWrapper"

const baseURL=process.env.REACT_APP_API_URL
//sample request
//need call service : {url:'/', method:'post', data:'params'}
function userSignUp(params){
    return axiosInstances({url:`${baseURL}/users/signup`, method:'post', data:params})
}

function userLogIn(params){
    return axiosInstances({url:`${baseURL}/users/login`, method:'post', data:params})
}

function uploadCoverImage(params){
    return axiosMultipartInstances({url:`${baseURL}/files/uploadimage`, method:'post', data:params})
}

function saveArticle(params){
    return axiosInstances({url:`${baseURL}/articles/save`, method:'post', data:params})
}

function updateArticle(id,params){
    return axiosInstances({url:`${baseURL}/articles/update/${id}`, method:'post', data:params})
}

function getArticles(category){
    return axiosInstances({url:`${baseURL}/articles/${category}`, method:'get'})
}

function getArticleById(id){
    return axiosInstances({url:`${baseURL}/articles/getbyid/${id}`, method:'get'})
}

function deleteArticle(id){
    return axiosInstances({url:`${baseURL}/articles/delete/${id}`, method:'delete'})
}

function saveNewComment(params){
    return axiosInstances({url:`${baseURL}/comments/save`, method:'post', data: params})
}

function getCommentOfArticle(id){
    return axiosInstances({url:`${baseURL}/comments/get/${id}`, method:'get'})
}

function deleteComment(id){
    return axiosInstances({url:`${baseURL}/comments/delete/${id}`, method:'delete'})
}


export const API_URLS ={
    userSignUp,
    userLogIn,
    uploadCoverImage,
    saveArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    saveNewComment,
    getCommentOfArticle,
    deleteComment
}