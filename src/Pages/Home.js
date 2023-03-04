import React, { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import ProductCard from '../Components/ProductCard';
const Home = () => {
    const [theme] = useThemeHook();
    const [searchInput, setSearchInput] = useState('');
    const [productData, setproductData ] = useState([]);

    async function getResponse(){
        const res = await fetch('https://fakestoreapi.com/products')
        .then(res=> res.json());
        setproductData(await res);
        setproductData(productData.reverse());
    }
    useEffect(()=>{
        getResponse();
        console.log(productData);
    }, [])
    return (
        <Container className='py-4'>
            <Row className='justify-content-center'>
                <Col xs={10} md={7} lg={4} className="mb-3 max-auto text-center">
                    <h1 className={theme ? 'text-light my-5' : 'text-black my-5'}>Search products</h1>

                    <InputGroup className="mb-3">
                        <InputGroup.Text className={theme? 'bg-black text-dark-primary': 'bg-light text-light-primary'}>
                        <BiSearch size="2rem"/>
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e)=> setSearchInput(e.target.value)}
                            className={theme? 'bg-light-black text-light': 'bg-light text-black'}
                        />
                    </InputGroup>
                    
                </Col>
                <SearchFilter
                value={searchInput}
                data={productData}
                renderResults={results =>(
                    <Row className='justify-content-center'>
                        {results.map((item, i)=>(
                            <ProductCard data={item} key={i}/>
                        ))}
                   </Row>
                )}
                />
            </Row>
        </Container>
    );
};

export default Home;