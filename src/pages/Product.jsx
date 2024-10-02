import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Card from "../components/Card";
import { APP_URL } from "../config";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(12);

    useEffect(() => {
        axios
            .get(`${APP_URL}/productlist`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <Helmet>
                <title>Products</title>
                <meta name="description" content="Ecommerce React" />
            </Helmet>
            <div className="container-fluid">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {products &&
                        products
                            .slice(0, limit)
                            .map((item, i) => <Card key={i} data={item} />)}
                </div>
                <div className="row d-flex justify-content-center my-5">
                    <div className="col-md-5">
                        {limit < products.length && (
                            <button
                                className="btn btn-warning btn-lg"
                                onClick={() => setLimit(limit + 4)}
                            >
                                Load More
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;