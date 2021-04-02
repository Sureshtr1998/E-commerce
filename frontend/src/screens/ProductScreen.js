import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import {listProductDetails} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

//match is coming from the Route(path) from the App.js
const ProductScreen = ({match}) => {
    const dispatch = useDispatch()


    let id = match.params.id
   // const [product, setProduct] = useState([])

    useEffect(() =>{
        dispatch(listProductDetails(id))
    }, [dispatch, id])


    const productDetails = useSelector(state => state.productDetail)

    const {loading, error, product}= productDetails

//const product = products.find(p => p._id === match.params.id)

    return (
        <>
        <Link className='btn btn-light my-3' to ='/'>
            Go Back
        </Link>
        { loading 
        ? <Loader/> 
        : error 
        ? <Message variant='danger'>{error}</Message>
        : (
            <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md = {3}>
                <ListGroup variant='flush' >
                    <ListGroup.Item>
                        <h3> {product.name}</h3>
                    </ListGroup.Item>
                
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ₹ {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description: {product.description}
                </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong>
                                    ₹ {product.price}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                {product.countInStock>0 ? 'In Stock' : 'Out Of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled={!product.countInStock}>
                                Add To Cart
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            
            
            </Col>
        </Row>
        )}
        
        </>
    )
}

export default ProductScreen
