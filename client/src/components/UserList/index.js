import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const UsersList = ({ users, setSelectedUser, deleteUser }) => {
    const [currentPage,setCurrentPage]=useState(1)
    const [searchValue,setSearchValue]=useState('')
    const onSearch=(e)=>{
        setSearchValue(e.target.value)
    }

    const filteredUsers = users.filter((eachUser) =>
        eachUser.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    const recordsperPage=5
    const lastIndex=currentPage*recordsperPage
    const firstIndex=lastIndex-recordsperPage
    const records=filteredUsers.slice(firstIndex,lastIndex)

    const npages=Math.ceil(filteredUsers.length/recordsperPage)
    const numbers=[...Array(npages+1).keys()].slice(1)

    

    return (
        /*<table className='users-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((eachuser)=> <tr key={eachuser.id}>
                    <td>{eachuser.name}</td>
                    <td>{eachuser.contact}</td>
                    <td className='buttons'><button className='viewbtn' onClick={() => setSelectedUser(eachuser)}>View</button> <button className='deletebtn' onClick={() => deleteUser(eachuser.id)}>Delete</button></td>
                </tr>)}
            </tbody>
        </table>*/
        <div className='table-con'>
            <div className='search-con'> 
                <h1>Users</h1>
                <input type="search" className='search-el' placeholder='Search User' onChange={onSearch} value={searchValue}/>
            </div>
            <table className='table'>
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                </thead>
                <tbody>
                    {records.map((eachuser)=> (
                        <tr id='row-style' key={eachuser.id}>
                            <td >{eachuser.name}</td>
                            <td >{eachuser.email}</td>
                            <td ><button className='viewbtn' onClick={() => setSelectedUser(eachuser)}>View</button> <button className='deletebtn' onClick={() => deleteUser(eachuser.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={prevPage}>Prev</a>
                    </li>
                    {numbers.map((n)=>(<li className={`page-item ${currentPage===n?'active':''}`}> <a href='#' className='page-link' onClick={()=>changeCPage(n)}>{n}</a></li>))}
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={nxtPage}>Next</a>

                    </li>
                </ul>
            </nav>

        </div>
    );

    function nxtPage(){
        if (currentPage!==npages){
            setCurrentPage(currentPage+1)
        }
    }
    function prevPage(){
        if (currentPage!==npages){
            setCurrentPage(currentPage-1)
        }

    }
    function changeCPage(n){
        setCurrentPage(n)
    }

};

export default UsersList;



