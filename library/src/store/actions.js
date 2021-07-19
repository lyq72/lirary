import {books,showUserMeg,getIntocenter,hotBook,getBorrow} from "../api";

export default {
  async getBooksDate({commit,state}){
    console.log(state.UserMeg.stuno)
    const result=await books(state.UserMeg.stuno)
    console.log("获得书本信息",result.data)
    commit('receive_booksDate',{booksDate:result.data})
  },
  async getUserLogin({commit,state}){
    const result=await sentLogin({commit})
    // console.log(result.data)
    commit('receive_booksDate',{booksDate:result.data})
  },
  userMeg({commit},platform){
    commit('SetUserMeg',platform)
  },
  async getUserMeg({commit}){
    const result=await showUserMeg()
    console.log(result.data)
    commit('receive_userMeg',{allUserMeg:result.data})
  },
  async getUserAllMeg({commit,state}){
    console.log('用户名',state.UserMeg.stuno)
    const result=await getIntocenter(state.UserMeg.stuno)
    console.log('获得的用户所有信息',result.data)
    commit('userAllMeg',{allMeg:result.data,favorVO:result.data.favorVO,
      borrowInfos:result.data.borrowInfos,comments:result.data.comments})
  },
  async hotBook({commit,state}){
    const result=await hotBook()
    commit('gethotBook',{hotBooks:result.data})
  },
  async getBorrow({commit,state}) {
    const result = await getBorrow()
    commit('getBorrow',{allStuBorrow:result.data})
  }
}
