import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const SearchProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
            })
            .catch(error => {
                console.error('Error fetching products data:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    return (
        <Autocomplete
            id="combo-box-demo"
            options={filteredProducts}
            className='bg-white'
            sx={{ width: 700 }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField
                    {...params}
                    type='text'
                    label="Search Products"
                    onChange={e => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
            )}
        />
    );
}

export default SearchProducts;
