import ajax from "./ajax";
const BASE_URL='http://66ddb5fw.dongtaiyuming.net'

//获取热门书籍
export const hotBook=()=>ajax(BASE_URL+'/book/gethot')

//书本详细列表
export const books =(stuno)=>ajax(BASE_URL+'/book/get',{stuno})

//注册
export const sentRegister=(stuno,name,password,email,sex)=>
  ajax(BASE_URL+'/student/regist',{stuno,name,password,email,sex},'post')

//发送邮箱验证
export const sentCode=(email)=>ajax(BASE_URL+'/student/sendcode',{email},'post')

//登录
export const sentLogin=(stuno,password)=>ajax(BASE_URL+'/student/login',{stuno,password},'post')

//添加收藏
export const addFavor=(belongstu,isbn)=>ajax(BASE_URL+'/favor/add',{belongstu,isbn},'post')

//取消收藏
export const deleteFavor=(belongstu,isbn)=>ajax(BASE_URL+'/favor/cancel',{belongstu,isbn},'post')

//借阅书籍
export const borrow=(borrowstu,borrowtime,category,isbn,name,readtime)=>ajax(BASE_URL+'/student/borrow',{borrowstu,category,isbn,name,readtime},'post')

//获得借阅记录、收藏记录
export const getIntocenter=(stuno)=>ajax(BASE_URL+'/student/intocenter',{stuno})

//评论
export const postcomment=(author,content,isbn,releasettime,score,writer)=>ajax(BASE_URL+'/student/postcomment',{author,content,isbn,releasettime,score,writer},'post')

//删除一条评论
export const deleteOneComment=(id)=>ajax(BASE_URL+'/student/deleteone',{id},'post')

//删除多条评论
export const deleteMulComment=(ids)=>ajax(BASE_URL+'/student/multidelete',{ids},'post')

//归还书籍
export const retBook=(id)=>ajax(BASE_URL+'/student/retbook',{id},'post')

//修改个人密码
export const resetPass=(newpsw,oldpsw,id)=>ajax(BASE_URL+'/student/resetpwd',{newpsw,oldpsw,id},'post')

//管理员

//展示所有用户信息
export const showUserMeg=()=>ajax(BASE_URL+'/admin/getallstu')

//修改用户状态
export const setUserState=(stuno,status)=>ajax(BASE_URL+'/admin/updatestatus',{stuno,status},'post')

//展示所有借阅信息
export const getBorrow=()=>ajax(BASE_URL+'/admin/getborrow')

//增加书籍
export const setNewBook=(category,introduction,isbn,name,position,publisher,stock,writer,file)=>ajax(BASE_URL+'/admin/addbook',{category,introduction,isbn,name,position,publisher,stock,writer,file},'post')

//上传图片
export const setPic=(file)=>ajax(BASE_URL+'/admin/image',{file},'post')
//修改书籍信息
export const setBookMeg=(category,introduction,isbn,name,position,publisher,stock,writer)=>ajax(BASE_URL+'/admin/updatebook',{category,introduction,isbn,name,position,publisher,stock,writer},'post')

//删除书籍
export const deleteBook=(isbns)=>ajax(BASE_URL+'/admin/deletebook',{isbns},'post')

