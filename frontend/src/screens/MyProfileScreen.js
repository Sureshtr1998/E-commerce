import React, { useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Card, Button, ProgressBar, CardDeck} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {fetchProfileDetails} from '../actions/myProfile'


const MyProfileScreen = () => {   


    const dispatch = useDispatch()
    const [age, setAge] = useState(22)
    const [yrsofexp, setYrsofexp] = useState(2)
    const [min, setMin] = useState(12)
    const [max, setMax] = useState(15)
    const [pdf, setPdf] = useState('')


    const myProfileFetchDetails = useSelector(state => state.myProfileFetchDetails)
    const {profile} = myProfileFetchDetails
    

    useEffect(() => {
        console.log("hi")
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
            setPdf(profile[0].cv)
        }
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const id = entry.target.getAttribute('id');
                    try{
                     if (entry.intersectionRatio > 0) {
                        document.querySelector(`div a[href="#${id}"]`).classList.add('activedisp');
                    } else {
                        document.querySelector(`div a[href="#${id}"]`).classList.remove('activedisp');
                    }
                }
                catch(err){
                    console.log("Ignore")
                }
                });
            });
        
            // Track all sections that have an `id` applied
            document.querySelectorAll('section[id]').forEach((section) => {
                observer.observe(section);
            });
    
    }, [dispatch, profile])

    

    return (
        <>
        <Row >
            <Col style={{position:'fixed'}} sm={1} lg={1} md={1}>
            <ListGroup variant='flush'>
                <ListGroup.Item className='myprofile'>
                        <div className='py-2 my-3 pl-4' style={{backgroundColor:' rgb(212, 158, 56)'}}>
                            <p style={{color:'whitesmoke'}}className='py-0 my-0 pl-3'> Suresh T R </p>
                        </div>
                <nav className="pl-3 section-nav">

                    <a href="#home" ><i className='pl-5 py-3 fas fa-home '/>
                    <p className='pl-4 ml-2'>{`
                        Home`}
                    </p>  
                    </a>
                                
                    <a href="#aboutMe"><i className='pl-5 py-3 fas fa-user'/>
                    <p className='pl-4 '>{`
                        About Me`}
                    </p>  
                    </a>
                
                    <a href="#experience"><i className='pl-5 py-3 fas fa-code-branch'/>
                    <p className='pl-3'>{`
                        Experience`}
                    </p>  
                    </a>
                
                   <a href="#portfolio"><i className='pl-5 py-3 fas fa-briefcase'/>
                    <p className='pl-4 ml-1'>{`
                        Portfolio`}
                    </p>  
                    </a>
                     
                    <a href="#contact"><i className='pl-5 py-3 fas fa-phone'/>
                    <p className='pl-4 ml-1'>{`
                        Contact`}
                    </p>  
                    </a>
                     
                </nav>
             
          </ListGroup.Item>
            </ListGroup>
            </Col>
            <Col className='content' md={10}>  
            <section id="home">
                
                <div className='py-5' style={{width:'100%'}}>  
                
                <Image className='p-3' roundedCircle fluid src='images/outside.PNG' />
                <div className='font'>
                <p className='fontfam'> <del>Hey There!</del> Looking for a web developer...?</p>
                <h4 className='fontfam' style={{ textTransform: 'capitalize'}}><strong><b><u>I'm Suresh T R</u></b></strong></h4>
                <p className='py-4 fontfam'> I'm {age} years old creative web designer based in Bangalore,<br></br> 
                 specializing using  interface Design and Development. <br></br> 
                I build clean, appending and functional interfaces <br></br>
                which comply with the latest web standards.</p>

                <Button  href={`CV\\${pdf}`} download  variant="outline-dark" className='btnp dcv'><i className="fas fa-download"></i>  Download CV </Button>          
                <Button href='#portfolio'  variant="outline-dark" className='btnp'> <i className='fas fa-briefcase'/>  Portfolio</Button>

                </div>
                <hr></hr>
                <hr></hr>
                <hr></hr>
               </div>
            </section>

  
            <section id="aboutMe">
                <div className='fontfam' >
                <h1> <u> About Me</u></h1>
                <p className='py-3'><b>A UI & UX Designer Based in Bangalore </b></p>

                <Image className='py-5' src='images/goal.PNG' rounded fluid style={{float:'right'}}/>

                <div className='pl-5 ml-5'>
                <h1><b>I'm Suresh</b></h1>
                <p><b>
                Obviously I'm a passionate Web Developer with over {yrsofexp} years of experience.<br></br>
            Experienced with all stages of the development cycle for dynamic <u> web projects. </u>
                </b></p>                
                </div>
                <p className='py-5'>
                 I design and develop for clients specializing in creating stylish, modern websites, web services and online stores.
                 My passion is to design digital user experiences through the bold interface and meaningful interactions. <u><a style={{textDecoration:'none'}} href='#portfolio'>Checkout my Portfolio.</a></u>
                </p>

            <h3><u>A Quick Self Intro</u></h3>
            </div>
            <Card className='my-5' border="dark" style={{width: '70%' }}>
            <Card.Header>Career</Card.Header>
            <Card.Body>
            <Card.Title><u>My Career Journey</u></Card.Title>
            <Card.Text className='py-2'>
               Being a BCA graduate I always had passion to be a freelancer.
               Well as usual things didn't come up in my way,<br></br> I couldn't get sufficient clients being a fresher, so ended up in Wipro.
               <br></br>It being a giant IT company in the initial stages I had to fight to get into Web development, I was in different technologies from SAP Ariba to Python.
               <br></br>Gained tons of exposure and knowledge apart from Web Development.
               <br></br> With those experience (thanks to) now I am trying to follow my dreams again with having lots of confidence and knowledge.

            </Card.Text>
            </Card.Body>
        </Card>
                <hr></hr>
                <hr></hr>
                <hr></hr>

            </section>


            <section id="experience">
            <div className='fontfam' >
                <h1 style={{float:'right'}}> <u>Experience</u></h1>
                <p  style={{position:'relative',left:'35%', top:'85px', float:'right'}} ><b>A UI & UX Designer Based in Bangalore </b></p>
                
                <div className='py-5 my-5'> 
                <h1> <u>My Skills</u></h1>
                <div className='py-5 '> 

                <div className='py-2'>
                <label > React JS</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="85" animated now="85" />
                </div>
                <div className='py-2'>
                <label > Node JS</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="70" animated now="70" />
                </div>
                <div className='py-2'> 
                <label> Express JS</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="65" animated now="65" />
                </div>
                
                <div className='py-2'>
                <label> Mongo DB</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="80" animated now="80" />
                </div>
                
                <div className='py-2'>
                <label>Python</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="55" animated now="55" />
                </div>
                
                <div className='py-2'>
                <label>CSS</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="75" animated now="75" />
                </div>
                
                <div className='py-2'>
                <label>BootStrap</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="85" animated now="85" />
                </div>
                
                <div className='py-2'>
                <label>JavaScript</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="90" animated now="90" />
                </div>
                
                <div className='py-2'>
                <label>Vue JS</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="60" animated now="60" />
                </div>

                <div className='py-2'>
                <label>Redux</label>
                <ProgressBar style={{width:'50%', height:'30px'}} variant="info" label="75" animated now="75" />
                </div>

                </div>
                </div>
                </div>

                
                <Card className='float-right' border="dark" style={{ width:'55%', position:'relative',top:'-800px', left:'10%' }}>
                <Card.Header>Experience</Card.Header>
                <Card.Body>
                <Card.Title><u>My Career Experience</u></Card.Title>
                <Card.Text className='py-2'>
                    Being in a large IT giant company like Wipro, only learning new technology wasn't sufficient. <br></br>
                    Getting into suitable project was a main task in the initial stages, I got assigned to service desk, even though I was good at technical,
                    I had to request my managers to change my domain and constantly I had to prove I'm worth then finally one day I cleared client interview to
                    get into a giant text tile account. <br></br>
                    I got lots of exposure as my client was an IT Director, he constantly pushed me to be better than what I was.
                    <br></br> As there were only 2 front-end developers, I had to push the changes to Production environment, each and every team member were recieving
                    responsibilities directly from the client and I had to communicate with different companies from onsite.
                    <br></br>In the initial stages I was not comfortable to take responsibilities because small change could've affected the whole Web Application in Production
                    as there were no one to review my code thoroughly.
                    <br></br> My main area was React JS but however sometimes I had to work using Python, Node JS, Mongo DB also.
                    <br></br> I am happy with the experince I had in this account, as I got to know about the whole proccess, team management and importance of performance etc.

                </Card.Text>
                </Card.Body>
            </Card>
                <hr></hr>
                <hr></hr>
                <hr></hr>

                </section>


            <section id="portfolio">
           
        
            <div className='fontfam py-5'>
                <h1> <u>PORTFOLIO</u></h1>
                <p className='py-3'><b>A UI & UX Designer Based in Bangalore </b></p>

                
                
                <div style={{position:'relative', left:'12%', top:'-250px'}} className='d-flex justify-content-end float-right'>
                <Card border="dark" style={{width: '55%' }}>
                <Card.Header><u>CHARGE</u></Card.Header>
                <Card.Body>
                <Card.Title> Per Hour/ Per Project</Card.Title>
                <Card.Text>
                    Having {yrsofexp}+ years of experience in web development, I still have lot to learn, currently I am focusing to get a good exposure
                    and experience more than money. <br></br>
                    Generally I do charge {min}-{max}$ per hour again it depends, I am flexible in this part, if the work is challenging <br></br> I am happy to even provide free trial. 
                </Card.Text>
                </Card.Body>
            </Card>
            </div>

                    <p className='py-5'>
                        <b> 
                        Being a passionate web developer, I have developed multiple websites but mostly for clients,
                        and I am unable to showcase that as my work and also credentials would be required. Along with that many developers hard work 
                        would be there in those websites. <br></br>
                        <br></br>
                        To showcase my work I have created this E-Commerce web application from scratch using MERN stack.
                        
                        </b>
                    </p>

                    <p className='hid' style={{position:'relative',top:'-200px'}}>Scroll down to view the snapshots of my web application or<br></br> 
                        <Link style={{textDecoration:'none'}} to='/'>
                        <br></br><u> please feel free to explore the UI/UX on your own.</u>
                        </Link> </p>
                    
                </div>

                <p className='fontfam hid' style={{top:'-220px',position:'relative',color:'red'}} >Note: Please don't provide any personal info as an Admin I can be able to view it</p>
                <h1 className='fontfam' style={{top:'-200px',position:'relative',textAlign:'center'}}><u>SNAPSHOTS</u></h1>

                <div style={{top:'-150px',position:'relative'}}>
                <ListGroup className='w-100'> 
                <ListGroup.Item>
                <CardDeck>

                <Card>
                <Card.Img variant="top" src="images/Ecomm/Landing.PNG" />
                <Card.Body>
                <Card.Title>Landing Page</Card.Title>
                <Card.Text>
                <Link style={{textDecoration:'none'}} to='/'>
                    A home page where an user can view all the products, pagination is done.
                    Top 3 products would be displayed in the carousel based on the user review
                    </Link>
                </Card.Text>
                </Card.Body>
                </Card>


                <Card>
                <Card.Img variant="top" src="images/Ecomm/Cart.PNG" />
                <Card.Body>
                <Card.Title>Cart</Card.Title>
                <Card.Text>
                    This is a snapshot of shopping cart 
                    (I've used localstorage to store the items to optimize the performance).
                </Card.Text>
                </Card.Body>
                </Card>
                

      
                

              
                <Card>
                <Card.Img variant="top" src="images/Ecomm/order.PNG" />
                <Card.Body>
                <Card.Title>Order</Card.Title>
                <Card.Text>
                    This is an order confirmation page, once the user submitted shipping address then only he can view this page.
                    After clicking on Place order a unique Order ID will be generated then the user can track his/her order.
                </Card.Text>
                </Card.Body>
                </Card>

                </CardDeck>
                </ListGroup.Item>
                <ListGroup.Item>
                <CardDeck >
                <Card>
                <Card.Img variant="top" src="images/Ecomm/Payment.PNG" />
                <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                    I've integrated third party library called razorPay anyways I've kept it in test mode, so it should accept
                    even if we provide fake card details
                </Card.Text>
                </Card.Body>
                </Card>
                

      
                <Card>
                <Card.Img variant="top" src="images/Ecomm/product.PNG" />
                <Card.Body>
                <Card.Title>List Of Products</Card.Title>
                <Card.Text>
                    Only Admin access this page, he can create/remove/edit the products. He can provide all the info like 
                    Brand Name, Image, Price, Count of stock etc
                </Card.Text>
                </Card.Body>
                </Card>

      
                <Card>
                <Card.Img variant="top" src="images/Ecomm/users.PNG" />
                <Card.Body>
                <Card.Title>List Of Users</Card.Title>
                <Card.Text>
                   Same like list of products, here an Admin can delete/edit the user, he also can make an user as admin.
                </Card.Text>
                </Card.Body>
                </Card>

                </CardDeck>
                </ListGroup.Item>
                </ListGroup>
                </div> 

                 <div className='fontfam d-flex justify-content-start'> 
                <Card border="dark" style={{position:'relative', top:'-40px', width: '35rem' }}>
                <Card.Header><u>Overview </u></Card.Header>
                <Card.Body>
                <Card.Title>A Quick Summary</Card.Title>
                <Card.Text>
                   This is an E-Commerce web application.
                   Here an user will be able to track his order, currently admin is having access to mark orders as delivered or not.
                   A product can be rated by the user only once per the product by providing comments. And top 3 products will 
                   be visible in the carousel, I've built this app from scratch, I am happy to improve this app as and when I gain my experience.
                   I am open for any type of feedback.
                   <br></br><br></br><u>Thanks</u>
                </Card.Text>
                </Card.Body>
            </Card>
            </div>   
                <hr></hr>
                <hr></hr>
                <hr></hr>


                </section>


            <section id="contact">
            <div className='fontfam py-5'>
                <h1 className='d-flex justify-content-end'> <u>Contact</u></h1>
                </div>
                <Card bg='Light' >
                    <Card.Header className='fontfam'> <i className="fas fa-address-book"></i> Contact</Card.Header>
                    <Card.Body>
                    <Card.Title className='fontfam'> <u> Ways to make me happy! </u></Card.Title>
             
                        <ListGroup>
                            <ListGroup.Item>
                             <i className='fas fa-phone'/> <span> Mobile No.: +91 9632972404 </span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                             <i className='fas fa-envelope'/> <span> Mail Id.: <a href={`mailto:sureshtr22i0@gmail.com`}>sureshtr22i0@gmail.com  </a> </span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                             <i className='fas fa-envelope'/> <span>Secondary Mail Id.: <a href={`mailto:sureshtr389@gmail.com`}>sureshtr389@gmail.com  </a> </span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                             <i className='fab fa-linkedin '/> <span> LinkedIn: <a href={`https://www.linkedin.com/in/suresh-tr-15b729147/`} rel="noreferrer" target="_blank">Suresh T R </a> </span>
                            </ListGroup.Item>
                        </ListGroup>
                   
                   
                    </Card.Body>
                    <pre className='d-flex justify-content-center py-2'> <i className= "fas fa-calendar-alt fa-2x"/><b>    <u>Availability</u></b> : 6 AM - 11PM IST </pre>
                </Card>

                <hr></hr>
                <hr></hr>
                <hr></hr>
                
                </section>
            </Col>
          
        </Row>
           
        </>
    )
}

export default MyProfileScreen
