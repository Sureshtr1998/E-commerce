import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {addToCart, removeFromCart} from '../actions/cartActions'
import Message from '../components/Message'
import {ORDER_PAY_SUCCESS_RESET} from '../constants/orderConstants'
const CartScreen = ({match, location, history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart
    const id = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    // qty o/p ?qty=3

    
    
    useEffect(() => {
        if(id) {
     dispatch(addToCart(id,qty))
     dispatch({type:ORDER_PAY_SUCCESS_RESET})
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
        dispatch({type: ORDER_PAY_SUCCESS_RESET})
    }

    const checkoutHandler = () => {
        history.push(`/login?redirect=shipping`)
    }

    const backHandler = () => {
        history.goBack()
    }

    return (
        <Row>
            <Col md={8}>
                <h1> Shopping Cart</h1>
                <Button className='btn-light my-3' onClick={backHandler}>
                    Go Back
                </Button>
                {cartItems.length === 0 
                ? <Message> Your cart is empty <Link to='/'>Go Back</Link></Message> 
                :(
                    <ListGroup variant='flush'>
                        {cartItems.map(item =>
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                    ₹{item.price}
                                    </Col>
                                    <Col md={2}>
                                    <Form.Control 
                                    as='select' 
                                    value={item.qty} 
                                    onChange={e => 
                                    dispatch(addToCart(item.product, Number(e.target.value)))
                                    }>
                                    {
                                        // displays [0,1,2,3] if value is 3
                                        [...Array(item.countInStock).keys()].map(x =>(
                                            <option key={x+1} value={x+1}> {x+1} </option>
                                            ))
                                    }
                                </Form.Control>
                                    </Col>
                                <Col md={2}>
                                    <Button type='button' variant='white' 
                                    onClick={() => removeFromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>

                                </Row>
                            </ListGroup.Item>
                            )}
                    </ListGroup>
                )
                
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ₹{
                                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled= {cartItems.length===0}
                            onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
