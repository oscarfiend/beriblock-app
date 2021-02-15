import React, { useEffect, useState } from "react";
import styled from "styled-components";
import User from "./User";
import FormUser from "./FormUser";
import { filterUsers, getUsers, sortList, sortUsers } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../ui/Pagination";

const Container = styled.div`
  margin-top: 5vw;
  padding: 5vw;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const Table = styled.table`
  color: #000000;
  font-size: calc(5px + 10 * ((100vw - 320px) / 680));
  font-weight: 400;
  font-family: Anybodythink;
  border-spacing: 15px 5px;
`;

const Thtable = styled.th`
  color: #b2b1bb;
  text-align: left;
  font-size: calc(15px + 10 * ((100vw - 320px) / 680));
  font-family: Anybody;
  width: 100%;
  position: relative;
  height:100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 3rem;
  max-width: 100%;
`;

const TitleTable = styled.h2`
  font-size: calc(23px + 8 * ((100vw - 320px) / 680));
  text-align: center;
  margin-bottom: 1rem;
  width:100%;
`;

const Span = styled.span`
  height:100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items:flex-end;
  justify-content:flex-start;
`;
const InputSearch = styled.input`
  width: 90%;
`;
const ListUsers = () => {
  const initialSearch={
    name:"",
    email:"",
    dni:"",
    birthday:""
  }

  const [search, setSearch] = useState(initialSearch)
  const [showUsers, setShowUsers] = useState([]);

  const { users, page, sort, typeSort } = useSelector((state) => state);

  const{name,email,dni,birthday}=search

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length !== 0) {
      console.log("users: ",users)
      setShowUsers(
        users.filter((user, index) =>{   
          console.log("index: ",index," page: ",page)       
          return index >= ((page - 1) * 10) && index < page * 10 ? user : null
        }
        )
      );
    }
  }, [page, users]);

  useEffect(() => {
    if (sort !== null) {
      dispatch(sortList());
    }
  }, [sort, typeSort, dispatch]);

  const handleChange=(e)=>{
    dispatch(filterUsers(e.target.name,e.target.value.toLowerCase()))
    setSearch({
      ...initialSearch,
      [e.target.name]:e.target.value
    })
  }

  return (
    <Container>
      <Content>
        <FormUser />
  
          <div>
            <TitleTable>Users List</TitleTable>
            <Table>
              <thead>
                <tr style={{height:'100%'}}>
                  <Thtable>
                    <Span>
                      Name{" "}
                      <i
                        className="fa fa-sort"
                        style={{
                          cursor: "pointer",
                          fontSize: "25px",
                          marginLeft: "5px",
                        }}
                        onClick={() => dispatch(sortUsers("name"))}
                      ></i>
                    </Span>
                    <InputSearch type="text"  name="name" value={name} onChange={handleChange} placeholder="Search name"/>
                  </Thtable>
                  <Thtable>
                    <Span>
                      DNI{" "}
                      <i
                        className="fa fa-sort"
                        style={{
                          cursor: "pointer",
                          fontSize: "25px",
                          marginLeft: "5px",
                        }}
                        onClick={() => dispatch(sortUsers("dni"))}
                      ></i>
                    </Span>
                    <InputSearch type="text" name="dni" value={dni} onChange={handleChange} placeholder="DNI..."/>
                  </Thtable>
                  <Thtable>
                    <Span>
                      Email{" "}
                      <i
                        className="fa fa-sort"
                        style={{
                          cursor: "pointer",
                          fontSize: "25px",
                          marginLeft: "5px",
                        }}
                        onClick={() => dispatch(sortUsers("email"))}
                      ></i>
                    </Span>
                    <InputSearch type="text" name="email" value={email} onChange={handleChange} placeholder="Search email"/>
                  </Thtable>
                  <Thtable>
                    <Span>
                      Birthday{" "}
                      <i
                        className="fa fa-sort"
                        style={{
                          cursor: "pointer",
                          fontSize: "25px",
                          marginLeft: "5px",
                        }}
                        onClick={() => dispatch(sortUsers("birthday"))}
                      ></i>
                    </Span>
                    <InputSearch type="text" name="birthday" value={birthday} onChange={handleChange} placeholder="Search birthday"/>
                  </Thtable>
                  <Thtable>
                    <Span>Actions </Span>
                  </Thtable>
                </tr>
              </thead>
              {users.length !== 0?
              <tbody>
                {showUsers.map((user) => (
                  <User user={user} key={user._id} users={users} />
                ))}
              </tbody>
              :
              <h2>No users</h2>
              }
            </Table>
            <Pagination />
          </div>
      </Content>
    </Container>
  );
};

export default ListUsers;
