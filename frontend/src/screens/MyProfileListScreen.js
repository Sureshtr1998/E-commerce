import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {sureshDetails, fetchProfileDetails} from '../actions/myProfile'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'

const MyProfileListScreen = ({history}) => {

    const [age, setAge] = useState(22)
    const [yrsofexp, setYrsofexp] = useState(2)
    const [min, setMin] = useState(12)
    const [max, setMax] = useState(15)
    const [pdf, setPdf] = useState('')
    const [uploading, setUploading] = useState(true)


    const dispatch = useDispatch()


    const myProfileFetchDetails = useSelector(state => state.myProfileFetchDetails)
    const {profile} = myProfileFetchDetails
   

    useEffect(() =>{
        setUploading(true)
        console.log(profile)
        if(!profile || !profile?.length)
        {
        dispatch(fetchProfileDetails())
        //setAge(profile[0]?.age)
        }
        else{
            setAge(profile[0].age)
            setYrsofexp(profile[0].yrs)
            setMin(profile[0].min)
            setMax(profile[0].max)
            console.log(profile)
        }
    }, [dispatch, profile])

    const uploadFIleHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('File', file)
        setUploading(true)
        try{
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
           const {data} =await axios.post('/api/mycv', formData, config)
           dispatch({type:'SET_PDF_PATH', val: data})
           setPdf(data)
           setUploading(false)
        } catch(err){
            console.log(err, "Uploading failed")
        }
    }
    
    const submithandler = (e) => {

        e.preventDefault()
       dispatch(sureshDetails(
        age, 
        yrsofexp,
        min,
        max,
       ))
       history.push('/my-profile-suresh')
      
    }

    return <> 
    <Link to ='/my-profile-suresh' className='btn btn-light my-3'>
        Go Back
    </Link>
     <FormContainer>
         {!uploading && <Message>Updated Successfully</Message>}
            <h1>Edit User Profile</h1>
            
                <Form onSubmit={submithandler}>

            <Form.Group controlId='age'>
                    <Form.Label>Age</Form.Label>
                    <Form.Control type='age' 
                    placeholder='Enter Age' 
                    value={age} 
                    onChange={e => setAge(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='yrs'>
                    <Form.Label>Years Of Experience</Form.Label>
                    <Form.Control type='number' 
                    placeholder='Enter Number of Year Experience' 
                    value={yrsofexp} 
                    onChange={e => setYrsofexp(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='min'>
                    <Form.Label>Minimum Rate</Form.Label>
                    <Form.Control type='number' 
                    placeholder='Enter Minimum Rate' 
                    value={min} 
                    onChange={e => setMin(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='max'>
                    <Form.Label>Maximum Rate</Form.Label>
                    <Form.Control type='number' 
                    placeholder='Enter Maximum Rate' 
                    value={max} 
                    onChange={e => setMax(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='pdf'>
                   <Form.Label> Upload CV</Form.Label>
                   <Form.Control type='text' 
                    placeholder='Enter PDF url' 
                    value={pdf} 
                    onChange={e => setPdf(e.target.value)}>
                    </Form.Control>
                    <Form.File id='pdf-file' label='Choose File' custom onChange={uploadFIleHandler}> 
                    </Form.File>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
       
         </FormContainer>
         </>
    
}

export default MyProfileListScreen
