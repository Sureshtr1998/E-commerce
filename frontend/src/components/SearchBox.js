import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'

const SearchBox = ({history, match}) => {
    
    const [val, setVal] =useState('')

    let currurl = window.location.pathname
    useEffect(() => {
        console.log(currurl)
        if(currurl=== '/'){
        setVal('')
        }
    }, [currurl])

    const submitHandler =(e) =>{
        e.preventDefault()
        let keyword = e.target.value
        setVal(keyword)        
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        }
    }

    return (
        <Form inline>
        <Form.Control type='text' name='q' value={val} onChange={e => submitHandler(e)} placeholder='Search Products....' 
        className='mr-sm-2 ml-sm-5'>
        </Form.Control>
    </Form>
    )
}

export default SearchBox
