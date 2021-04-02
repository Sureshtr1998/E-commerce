import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Row, Col} from 'react-bootstrap'
import { listProducts } from '../actions/productActions'


const HomeScreen = () => {

    const dispatch = useDispatch()

//const [products, setProducts] = useState([])

    useEffect(() =>{
        dispatch(listProducts())
    }, [dispatch])

    const prodList = useSelector(state => state.productList)

    const {products, loading, error} = prodList

    return (
        <>
        {/* IF loading is true( condition) */}
        <h1> Latest Products</h1>
        {  loading 
        ? (<Loader/>)
        : error ? (
        <Message variant='danger'>{error}</Message>)
        : (<Row>    
            {products.map(product => {
                return (
                <Col key={product._id} sm={12} md ={6} lg={4} xl={3}> 
                <Product product={product}/>
                </Col>
                )
            })}
        </Row>
        )}           
        </>
    )
}

export default HomeScreen
