import React, {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)


    const {shippingAddress} = cart
    if(!shippingAddress) {
        history.oush('/shipping')
    }
    const [paymentMethod, setpaymentMethod] = useState('GooglePay')


    const submithandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckOutSteps step2 step3 step4/>
            <h1>Payment Method</h1>
            <Form onSubmit={submithandler}>
                <Form.Group>
                    <Form.Label as='legend'> Select Method</Form.Label>
                <Col>
                    <Form.Check type='radio' label='GooglePay or Credit Card' 
                    id='GPay' 
                    name='paymentMethod' 
                    value='GPay'
                    checked
                    onChange={(e) => setpaymentMethod(e.target.value)}
                    > 
                    </Form.Check>

                    {/* <Form.Check type='radio' label='Bhim' 
                    id='Bhim' 
                    name='paymentMethod' 
                    value='Bhim'
                    checked
                    onChange={(e) => setpaymentMethod(e.target.value)}
                    > 
                    </Form.Check> */}
                </Col>
                </Form.Group>
                <Button type='submit' variant='primary'> Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
