import { Button } from "@mui/material";
import React from "react";
import { Link , useNavigate} from "react-router-dom"


import axios from "axios";
const SingleProduct = (props) => {
  let navigate = useNavigate();
  return (
    <div>
      
      
      <h3>
        <Link to={"/products/details/" + props.product._id}>
          {props.product.name}
        </Link>
      </h3>
      <div >
        <p display="flex" align="left">
        <b>Price :</b>{props.product.price} 
        </p>
        <div display="flex" align="right" >
       
       <Button
         variant="outlined"
         size="medium"
         color="secondary"
         onClick={()=>{
           navigate("/products/edit/" + props.product._id);
        }}
       >Edit   
       </Button>
       
       <Button
         variant="outlined"
         size="medium"
         color="error"
         onClick={(e) => {
           axios
             .delete(
               "https://usman-recipes.herokuapp.com/api/recipes/" +
                 props.product._id
             )
             .then((res) => {
               console.log("deleted");
               navigate("/")
               navigate("/Products")

             });
         }}
        
       >
         Delete
       </Button>
       </div>



      </div>
      
        
      
    
     
      <hr />
    </div>
  );
};

export default SingleProduct;