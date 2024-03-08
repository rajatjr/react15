import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { MDBCol } from "mdbreact";
import Navbar from "./Navbar";
import image from "./shopping.jpg"
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Product() {
  const token = localStorage.getItem("token")
  var decodeToken = jwt_decode(token);
  const user_id = decodeToken.user.Id
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('');
  
  const [userId, setuserId] = useState('');
  const [ProductiD, setProductiD] = useState('');
  const [ProductCount, setProductCount] = useState(1);
  const navigate = useNavigate();


  ///// ----------------Add products Dashboard ----------------------/////

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("decodeToken=", decodeToken)
    console.log(user_id)
    axios.post('http://localhost:5000/api/addProducts', { productName, productPrice, category, userId: user_id })
      .then(res => {
        console.log(res);
        toast.success('🦄 Product Added successfuly!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        fetchInfo();

        // Clear the text fields after successful submission

        setProductName('');
        setProductPrice('');
        setCategory('');

      })
      .catch(err => console.log(err));
  }


  /////////    Fetch info TO get product FROM DASHBOARD   /////

  const fetchInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getProducts?user_id=${user_id}`);
      // console.log(response.data);
      setData(response.data.data);
    } catch (err) {
      return console.log(err);
    }
  }
  useEffect(() => {
    fetchInfo();
  }, []);


  //////   Search product  FROM DASHBOARD MODEL   ///////

  useEffect(() => {
    const searchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/searchapi?productName=${searchInput.toLowerCase()}&user_id=${user_id}`);
        setData(res.data.products);
      } catch (error) {
        console.log(error)
      }
    }

    searchProduct();
  }, [searchInput])


  /////////  DELETE PRODUCTS  from product list DASHBOARD  /////////

  const Delete = async (id) => {
    console.log("deleting id :", id)
    try {
      const confirmed = window.confirm("Are u sure you want to delete this product ");

      if (confirmed) {
        const res = await axios.delete(`http://localhost:5000/api/delete/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(res.data);
        toast.success(' Deleted Suceesfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

      }
    } catch (error) {
      console.log(error);
    }

    fetchInfo()
  };


  //////////  Add  to CART  /////////////

  const handleAddTOcart = (id) => {
    console.log("add to cart id :", id)
    console.log("pcount", ProductiD)
    axios.post('http://localhost:5000/api/AddtoCart', { id, userId: user_id, ProductCount: ProductCount })
      .then(res => {
        console.log("res from the add to cart:", res);

        toast.success('🦄 Product Added successfuly!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/cart")

        fetchInfo();

        setuserId('');
        setProductiD('');
        setProductCount('');


      })
      .catch(err => console.log(err));
  }

  // console.log("data from dashboard", data)



  return (
    <>

      <Navbar />

      <div className='bg'>
        <br /><br />
        <h2 style={{ color: "rgb(3, 61, 56)" }}> Products Add To Database And Show From Database base </h2><br />
        <h3 style={{ color: "red" }}> Signed in as &nbsp;:&nbsp;{decodeToken.user.name} </h3>
        <br /><br />

        <form className="container mt-3 mb-3" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="formBasicEmail" className="col col-sm-4" style={{ color: "rgb(3, 61, 56)" }}>
              <Form.Label><h3>Product Name</h3></Form.Label>
              <Form.Control type="name" name="first_name" onChange={e => setProductName(e.target.value)} value={productName} className="form-control" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="col col-sm-4" style={{ color: "rgb(3, 61, 56)" }}>
              <Form.Label><h3>Product Price</h3></Form.Label>
              <Form.Control type="number" name="last_name" onChange={e => setProductPrice(e.target.value)} value={productPrice} className="form-control" />
            </Form.Group>

            <Form.Group controlId="formGridCheckbox" className="col col-sm-2" style={{ color: "rgb(3, 61, 56)" }}>
              <Form.Label><h3>Category</h3></Form.Label>

              <Form.Select defaultValue="Select..." className="form-control" name="menu" onChange={e => setCategory(e.target.value)} value={category} >
                <option value="Select...">Select...</option>
                <option value="Shirt">Shirt</option>
                <option value="Jacket">Jacket</option>
                <option value="Jeans">Jeans</option>
                <option value="Phone">Phone</option>
              </Form.Select>
            </Form.Group>
            <Col sm={2}>
              <button type="submit" className='button2' style={{ margin: "15px" }}>Add Products</button>
            </Col>
          </Row>
        </form>

        <div className="App">
          <center>
            <br />
            <MDBCol md="6">
              <input className="form-control" type="text" placeholder="Search " style={{ textAlign: "center" }} onChange={(e) => setSearchInput(e.target.value)} value={searchInput} aria-label="Search" />
              <br />

              <button type="button" className="button2" onClick={(e) => setSearchInput("")}><h5>Clear</h5></button>

            </MDBCol>
            <br/><br />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "25px" }}>
              {data.length > 0 && data.map((dataObj, index) => (
                <div key={index} style={{ background: "#fff", border: "5px solid rgb(3, 61, 56)", padding: "25px", borderRadius: "50px" }}>

                  <p style={{ textAlign: "center", color: "red" }}>Product Details</p>
                  <br />

                  <img src={image}></img>

                  <p style={{ textAlign: "center", color: "rgb(3, 61, 56)" }}>Product Name&nbsp;:&nbsp;{dataObj.productName}</p><br />

                  <p style={{ textAlign: "center", color: "rgb(3, 61, 56)" }}>Product Price&nbsp;:&nbsp;{dataObj.productPrice}</p><br />

                  <p style={{ textAlign: "center", color: "rgb(3, 61, 56)" }}>Product Category&nbsp;:&nbsp;{dataObj.category}</p>

                  <button type="button" className="button2" onClick={() => Delete(dataObj.Id)}><h5>Delete</h5></button>

                  <button type="button" className="button2" onClick={() => handleAddTOcart(dataObj.Id)}><h5>Add to Cart</h5></button>

                  <select id="Quantity" name="Quantity" onChange={(e) => { setProductCount(e.target.value) }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                   
                  </select>

                  <br/><br/>

                </div>
              ))}
            </div>
          </center>
        </div>
      </div>
    </>
  )
}

export default Product;




