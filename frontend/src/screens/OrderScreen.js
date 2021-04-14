import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
// import GooglePayButton from '@google-pay/button-react'
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({match, history }) => {

    const orderId = match.params.id
    const dispatch = useDispatch()

    const addDecimals = (num) => {
        return num.toFixed(2)
    }

    // const userDetails = useSelector(state => state.userLogin)

    // const {userInfo} = userDetails

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() =>{
        if(!userInfo){
            history.push('/login')
        }
        const script = document.createElement('script')
        script.type= 'text/javascript'
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
        dispatch({type: ORDER_PAY_RESET})
        dispatch({type: ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
        
    }, [dispatch, orderId,successPay,history, userInfo, successDeliver])
    
    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }

    // const successPaymentHandler = (paymentRequest) =>{
    //     dispatch(payOrder(orderId))
    //     console.log(paymentRequest)
    // }
   
    const options =  {
    key: 'rzp_test_rEmSmAdMb9GO0u', // Enter the Key ID generated from the Dashboard
    amount: String(order?.totalPrice * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Test",
    description: "Description here",
    
    handler: (response) =>{
        console.log(response)
        dispatch(payOrder(orderId, response.razorpay_payment_id))
      
    },
    prefill: {
        name: userInfo?.name,
        email:userInfo?.email,
        contact: "9632972404",
    },
    notes: {
        address: "Bangalore"
    },
}

    const razorpayhandler = (e) =>{
        let rzp1 = new window.Razorpay(options);
        rzp1.open();
        e.preventDefault();
    }

    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> 
    :<>
    <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2> Shipping </h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p> <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, 
                                 {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            :<Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2> Payment Method</h2>
                            <p> 
                            <strong>Method: </strong>
                            {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidFormattedTime}</Message>
                            :<Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2> Order Items</h2>
                            {
                            order.orderItems.length === 0 ? <Message> Order is empty</Message>
                            :<ListGroup variant='flash'>
                                    {
                                    order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>                                        
                                       <Row>
                                           <Col md={1}>
                                               <Image src={item.image} alt={item.name} fluid rounded/>

                                           </Col>
                                           <Col>
                                           <Link to = {`/product/${item.product}`}>
                                                   {item.name}
                                            </Link>
                                               
                                           </Col>
                                           <Col md={4}>
                                               {item.qty} x ₹{item.price} = ₹{addDecimals(item.qty*item.price)}
                                           </Col>

                                       </Row>
                                   </ListGroup.Item>
                                       
                                    ))}
                                </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>  
                            <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₹{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₹{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>₹{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                          
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay ? <Loader/> 
                                        : (
                                            <>
                                            {/* <GooglePayButton
                                            environment='TEST'
                                            paymentRequest={{
                                                apiVersion: 2,
                                                apiVersionMinor: 0,
                                                merchantInfo: {
                                                    merchantId: '12345678901234567890',
                                                    merchantName: 'Example Merchant'
                                                  },
                                                allowedPaymentMethods: [
                                                  {
                                                    type: 'CARD',
                                                    parameters: {
                                                      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                      allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                    },
                                                    tokenizationSpecification: {
                                                      type: 'PAYMENT_GATEWAY',
                                                      parameters: {
                                                        'gateway': 'example',
                                                        'gatewayMerchantId': 'exampleGatewayMerchantId'
                                                      }
                                                    },
                                                  },
                                                ],
                                                  transactionInfo: {
                                                    totalPriceStatus: 'FINAL',
                                                    totalPriceLabel: 'Total',
                                                    totalPrice: String(order.totalPrice),
                                                    currencyCode: 'INR',
                                                    countryCode: 'IN',
                                                  },
                                                  callbackIntents: ['PAYMENT_AUTHORIZATION'],
                                                }}
                                                onLoadPaymentData={(paymentRequest)=> successPaymentHandler(paymentRequest)}

                                                onPaymentAuthorized={paymentData =>{
                                                    console.log('onPaymentAuthorized', paymentData)
                                                    return {transactionState: 'SUCCESS'}
                                                }}
                                                
                                                existingPaymentMethodRequired='false'
                                                buttonColor= 'black'
                                                buttonType='Buy'

                                            /> */}
                                            <Button type='button' className='btn-block' onClick={(e) => razorpayhandler(e)}><i className="fas fa-gem"></i>  <strong>Pay  ₹ {order.totalPrice} now  </strong></Button>
                                        </>
                                        )
                                        }
                                </ListGroup.Item>
                                )}
                                {loadingDeliver && <Loader/>}
                                {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen
