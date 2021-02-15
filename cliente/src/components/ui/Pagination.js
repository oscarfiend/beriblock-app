import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/actions/userActions';
import './pagination.css';

const Pagination = () => {
    const {totalPages,page} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if(totalPages<page){
            dispatch(setPage(totalPages))
        }
    }, [totalPages,page,dispatch])
    return (
        <ReactPaginate
        pageCount={totalPages}
        onPageChange={(p)=>dispatch(setPage(p.selected+1))} 
        previousLabel={"← Previous"}
        nextLabel={"Next →"}  
        containerClassName={"pagination"}
        pageClassName={"pagination__link"}
        activeClassName={"pagination__link--active"}
        activeLinkClassName={"active_link"}
        />
    )
}

export default Pagination
