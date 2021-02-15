import React from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components'
import { deleteUser, setuserSelected } from "../../redux/actions/userActions";

const DeleteButton=styled.button`
    background-color:#b1b2bb;
    color:#000000;
`

const Usertr=styled.tr`
    animation: fadeIn;
    animation-duration: 1s;
`


const User = ({ user}) => {
  const { _id, name, email, dni, birthday } = user;

  const dispatch = useDispatch()

  const selectUser=()=>{
    dispatch(setuserSelected(user._id));
  }

  const handleDelete=()=>{
    dispatch(deleteUser(_id));
  }

  return (
    <Usertr>
      <td>{name}</td>
      <td>{dni}</td>
      <td>{email}</td>
      <td>{birthday.substring(0,10)}</td>
      <td>
          <>
          <button onClick={selectUser}><i className="fa fa-pencil"></i></button>
          <DeleteButton onClick={handleDelete}><i className="fa fa-trash"></i></DeleteButton>
          </>
    </td>
    </Usertr>
  );
};

export default User;
