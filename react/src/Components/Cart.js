import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import image from "./shopping.jpg"
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

////////////// GET PRODUCTS FROM CART ////////////////

function Cart() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token")
  var decodeToken = jwt_decode(token);
  const user_id = decodeToken.user.Id;
  console.log("id", user_id)
  const navigate = useNavigate()
  const fetchInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getProductsfromcart?user_id=${user_id}`);
      console.log("data response from get cart product", response);
      setData(response.data.data);

    } catch (err) {
      return console.log(err);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);


  /////////////// DELETE FROM ORDER /////////////////////////

  const Delete = async (id) => {
    console.log("deleting id", id)
    try {
      const confirmed = window.confirm("Are u sure you want to delete this product ");
      console.log("edwadadawd", confirmed)
      if (confirmed) {
        const res = await axios.delete(`http://localhost:5000/api/deleteorder/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        fetchInfo()
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

  };


  /////////// BUY A PRODUCT FROM CART ///////////////////

  const BuyNow = async (data) => {
    console.log("data rfrom buy now :", data)
    const res = await axios.post(`http://localhost:5000/api/addorder`, { data: data });

    toast.success(' Product Order Has been Suceesfully Placed !!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate('/order')

  }

  //////// TOTAL PRICE COUNT ///////////////

  const totalPrice = () => {
    let total = 0
    data.forEach((product) => {
      const productPrice = product.rajat18_product.productPrice
      const ProductCounts = product.ProductCount
      total += Number(productPrice) * Number(ProductCounts)
    })
    return total

  }

  return (
    <div>

      <h1 style={{ color: "red" }}>Grand Total : Rs  {totalPrice()}</h1> &nbsp;

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "25px" }}>
        {data.length > 0 && data.map((dataObj, index) => (
          <div key={index} style={{ background: "#fff", border: "5px solid rgb(3, 61, 56)", padding: "25px", borderRadius: "50px" }}>

            <p style={{ textAlign: "center", color: "red" }}>Product Details</p>
            <br />

            <img src={image}></img>

            <p style={{ textAlign: "center", color: "rgb(3, 61, 56)" }}>Product Name&nbsp;:&nbsp;{dataObj.rajat18_product.productName}</p><br />

            <p style={{ textAlign: "center", color: "rgb(3, 61, 56)" }}>Product Price&nbsp;:&nbsp;{dataObj.rajat18_product.productPrice}</p><br />

            <p style={{ textAlign: "center", color: "rgb(3, 61, 56)" }}>Product count&nbsp;:&nbsp;{dataObj.ProductCount}</p>



            <button type="button" className="button2" onClick={() => Delete(dataObj.Id)}><h5>Delete</h5></button>


            <button type="button" className="button2" onClick={() => BuyNow(data)}><h5>Buy Now</h5></button>
            <br /><br />

          </div>

        ))}
        <br />
      </div>
    </div>
  )
}

export default Cart;
