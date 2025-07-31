import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
           const response = await axios.get(`https://dummyjson.com/products`);
           setProductData(response.data.products);
        //    console.log(response.data.products);
           setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        };
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
        return (discountedPrice / (1 - discountPercentage / 100)).toFixed(2);
      };

  return (
        <div className="row content-justify-center" style={{ marginTop: '56px' }}>
            { loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                productData.map(product => (
                    <div className='col'
                        style={{ marginTop: '25px' }}
                        key={product.id}
                    >
                        <Link
                            className="card mx-auto text-center border-0 mt-3 text-decoration-none"
                            to={{ pathname: `/${product.id}/product`, state: {product: product }}}
                            style={{ width: '15rem', minHeight: '100%' }}
                        >
                            <img src={product.thumbnail} className="card-img-top mt-3"/>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description.slice(0, 40)}</p>
                                <h5 className="card-title">$ {product.price}</h5>
                                <p
                                    className="fw-light text-decoration-line-through">
                                    $ {calculateOriginalPrice(product.price, product.discountPercentage)}
                                </p>
                            </div>
                        </Link>
                    </div>

                )))}

        </div>
  )
}

export default Products;
