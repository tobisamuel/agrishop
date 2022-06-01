import "./productedit.css";
import PublishIcon from "@mui/icons-material/Publish";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProduct } from "../../../redux/apiCalls";
import app from "../../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ProductEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productId = location.pathname.split("/")[4];

  const vendor = useSelector((state) => state.vendor.currentVendor);
  const businessName = vendor.businessName;
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, vendor: businessName, img: downloadURL };
          updateProduct(productId, product, dispatch);
          window.alert(`Product Updated`);
          navigate("/vendor/dashboard/products");
        });
      }
    );
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Product</h1>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              name="name"
              type="text"
              placeholder={product.name}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              name="description"
              type="text"
              placeholder={product.description}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              name="price"
              type="text"
              placeholder={product.price}
              onChange={handleChange}
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label>
                <PublishIcon />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
