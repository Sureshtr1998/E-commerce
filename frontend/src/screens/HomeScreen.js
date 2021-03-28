import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Product from '../components/Product'
import {Row, Col} from 'react-bootstrap'
const HomeScreen = () => {

    const [products, setProducts] = useState([])

    useEffect(() =>{

        const fetchproducts = async() =>{
            // instead of res.data you can use {data}
           const {data} = await axios.get('/api/products')

           setProducts(data)

        }
        fetchproducts()
    }, [])
    return (
        <>
        <h1> Latest Products</h1>
        <Row>    
            {products.map(product => {
                return (
                <Col key={product._id} sm={12} md ={6} lg={4} xl={3}> 
                <Product product={product}/>
                </Col>
                )
            })}
        </Row>
        </>
    )
}

export default HomeScreen
