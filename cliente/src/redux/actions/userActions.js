import Swal from "sweetalert2";
import axiosInstance from "../../config/axios";
import { userTypes } from "../../types";

export const getUsers=()=>{
    return async(dispatch,getState)=>{
        try {
            dispatch(setLoading(true));
            const res = await axiosInstance.get(`/users`);
            dispatch(setUsers({users:res.data,totalPages:Math.ceil((res.data.length)/getState().maxResults)}));
          } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
          } finally {
            setLoading(false);
          }
    }
}

export const updateUser=(id,user)=>{
    return (dispatch)=>{
        Swal.fire({
            icon: "info",
            title: "Are you sure?",
            iconColor: "#b1b2bb",
            text: "Do you want to update the user?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Update`
          }).then( async (result) => {
            if (result.isConfirmed) {
              try {
                const userUpdated=await axiosInstance.put(`/users/${id}`,user)
                dispatch(updateLocal(userUpdated.data.user))
                Swal.fire({
                  iconColor: "#b1b2bb",
                  icon: "success",
                  title: "Updated!",
                  text: "The user has been updated."
                });
              } catch (error) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            }
          });
    
    }
}

export const deleteUser=(id)=>{
    return(dispatch)=>{
    Swal.fire({
        icon: "info",
        title: "Are you sure?",
        iconColor: "#b1b2bb",
        text: "You won't be able to revert this!",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: `Delete`
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axiosInstance.delete(`/users/${id}`)
            dispatch(deleteLocal(id))
            Swal.fire({
              iconColor: "#b1b2bb",
              icon: "success",
              title: "Deleted!",
              text: "The user has been deleted."
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      });
    }
}

export const addUser=(user)=>{
    console.log("añanid: ",user)
    return async (dispatch)=>{
    try {
        const result=await axiosInstance.post(`/users`,user);
        console.log(result.data)
        dispatch(addLocal(result.data))
        Swal.fire({
          iconColor: "#b1b2bb",
          icon: "success",
          title: "Add!",
          text: "The user has been saved."
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
}
}

const addLocal=(user)=>({
    type:userTypes.ADD_USER,
    payload:user
})

const setUsers=(data)=>({
    type:userTypes.GET_USERS,
    payload:data
})

const setLoading=(state)=>({
    type:userTypes.CHANGE_LOADING,
    payload:state
})

export const setuserSelected=(id)=>({
    type:userTypes.SELECT_USER,
    payload:id
})

const updateLocal=(newUser)=>({
    type:userTypes.UPDATE_USER,
    payload:newUser
})

const deleteLocal=(id)=>({
    type:userTypes.DELETE_USER,
    payload:id
})

export const setPage=(page)=>({
    type:userTypes.CHANGE_PAGE,
    payload:page
})

export const sortUsers=(cat)=>({
  type:userTypes.SORT_USERS,
  payload:cat
})

export const sortList=()=>({
  type:userTypes.SORT
})

export const filterUsers=(field,value)=>({
  type:userTypes.FILTER_USERS,
  payload:{field,value}
})