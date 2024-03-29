import { Button, ButtonGroup, TextField } from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
const ProductForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const isEditing = id ? true : false;
  React.useEffect(function () {
    if (isEditing)
      axiosInstance
        .get("/api/products/" + params.id)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  const [image, setImage] = React.useState("");
  const [progress, setProgess] = React.useState(0);
  const [sending, setSending] = React.useState(false);
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    color: "",
    brand: "",
    items: "",
    description: "",
  });
  const getFormData = () => {
    var form_data = new FormData();
    for (var key in product) {
      form_data.append(key, product[key]);
    }
    form_data.append("image", image);
    return form_data;
  };
  return (
    <div>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
        size="small"
      >
        <Button component={Link} to="/">
          Back To Products
        </Button>
        <Button
          variant="contained"
          disabled={sending}
          onClick={(e) => {
            setSending(true);
            if (isEditing)
              axiosInstance
                .put("/api/products/" + params.id, getFormData(), {
                  onUploadProgress: (ProgressEvent) => {
                    let progress =
                      Math.round(
                        (ProgressEvent.loaded / ProgressEvent.total) * 100
                      ) + "%";
                    setProgess(progress);
                  },
                })
                .then((res) => {
                  //   console.log(res.data);
                  setSending(false);
                  navigate("/");
                });
            else
              axiosInstance
                .post("/api/products", getFormData(), {
                  onUploadProgress: (ProgressEvent) => {
                    let progress =
                      Math.round(
                        (ProgressEvent.loaded / ProgressEvent.total) * 100
                      ) + "%";
                    setProgess(progress);
                  },
                })
                .then((res) => {
                  //   console.log(res.data);
                  setSending(false);
                  navigate("/");
                });
          }}
        >
          {isEditing ? "Edit Product" : "Add Product"}
        </Button>
      </ButtonGroup>
      <br />

      <TextField
        disabled={sending}
        value={product.name}
        label="Name"
        fullWidth
        variant="standard"
        onChange={(e) => {
          console.log(e.target.value);
          setProduct({ ...product, name: e.target.value });
        }}
      />
      <TextField
        disabled={sending}
        value={product.brand}
        label="Brand"
        fullWidth
        variant="standard"
        onChange={(e) => {
          console.log(e.target.value);
          setProduct({ ...product, brand: e.target.value });
        }}
      />
      <TextField
        disabled={sending}
        value={product.items}
        label="Items"
        fullWidth
        variant="standard"
        onChange={(e) => {
          console.log(e.target.value);
          setProduct({ ...product, items: e.target.value });
        }}
      />
      <TextField
        disabled={sending}
        value={product.price}
        label="Price"
        fullWidth
        variant="standard"
        onChange={(e) => {
          setProduct({ ...product, price: e.target.value });
        }}
      />
    
      <TextField
        disabled={sending}
        value={product.description}
        label="Description"
        fullWidth
        multiline
        rows={4}
        variant="standard"
        onChange={(e) => {
          setProduct({ ...product, description: e.target.value });
        }}
      />
      <br />
      <div style={{ width: progress, backgroundColor: "blue", color: "white" }}>
        Upload Status : {progress} %
      </div>
      <br />
      <input
        disabled={sending}
        type="file"
        onChange={(e) => {
          setProgess(0);
          const file = e.target.files[0]; // accessing file
          console.log(file);
          setImage(file); // storing file
        }}
      />
    </div>
  );
};

export default ProductForm;
