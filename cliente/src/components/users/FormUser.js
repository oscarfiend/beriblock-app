import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { addUser, updateUser } from "../../redux/actions/userActions";

const Button = styled.button`
  font-size: calc(15px + 8 * ((100vw - 320px) / 680));
  width: 100%;
  margin-bottom: 1vw;
  font-family: Anybodyblack;
  padding: calc(15px + 5 * ((100vw - 320px) / 680));
  border-radius: 0;
  margin:0;

  @media (max-width: 600px) {
    width: 35vw;
  }

  &:hover {
    background-color: #b1b2bb;
    transition: all 0.3s ease 0s;
    transform: none;
  }
`;

const ContData = styled.div`
  background-color: #000000;
  padding: 0.1vw 2vw 2vw 2vw;
  margin-bottom: 3vw;
  color: white;
  font-size: calc(8px + 10 * ((100vw - 320px) / 680));
`;

const Input = styled.input`
  font-size: calc(12px + 10 * ((100vw - 320px) / 680));
  height: 3vw;
  padding: 0.3vw;
  min-width: 100%;
  font-family: Anybodythink;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;

  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

const Col = styled.div`
  flex: 50%;
  margin-right: 2vw;
  margin-top: 2vw;
`;

const Title=styled.h2`
  font-size:calc(23px + 8 * ((100vw - 320px) / 680));
  text-align:center;
  margin-bottom:1rem;
`

const FormUser = () => {
  const {user} = useSelector(state => state)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    dni: "",
    birthday:""
  });

  const dispatch = useDispatch()
  const ref = useRef()

  useEffect(() => {
    if (user !== null) {
      setNewUser(user);
      ref.current.focus()
    }else{
      //reset form
    resetForm()
    }
  }, [user]);

  const { name, email, dni, birthday } = newUser;

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validate inputs
    if (name.trim() === "" || email.trim() === "" || dni.trim()==="" || birthday==="") {
      Swal.fire("All fields are required");
      return
    }

    if (!isValid(email)) {
      Swal.fire("The email is not valid");
      return
    }

    //if all is ok
    //save date
    if (user) {
      dispatch(updateUser(user._id,newUser));
    } else {
      dispatch(addUser(newUser));
      //reset form
      resetForm()
    }

    
  };

  const resetForm=()=>{
    setNewUser({
      name: "",
      email: "",
      dni: "",
      birthday:""
    })
  }

  const isValid = (email) => {
    if (
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <form autoComplete="off">
      <Title>Users ADD</Title>
      <ContData>
        <Row>
          <Col>
            <label htmlFor="name">Name : </label>
            <Input
              type="text"
              value={name} 
              name="name"
              onChange={handleChange}
              ref={ref}
            />
          </Col>
        </Row>
        <Row>

          <Col>
            <label htmlFor="dni">DNI : </label>
            <Input
              type="dni"
              value={dni}
              name="dni"
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
        <Col>
            <label htmlFor="email">Email : </label>
            <Input
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </Col>
          </Row>
          <Row>
          <Col>
            <label htmlFor="birthday">Birthday : </label>
            <Input
              type="date"
              value={birthday.substring(0,10)}
              name="birthday"
              onChange={handleChange}
            />
          </Col>
        </Row>
      </ContData>
        <Button onClick={handleSubmit}>
          {!user ? "Add User" : "Update User"}
        </Button>
    </form>
  );
};

export default FormUser;
