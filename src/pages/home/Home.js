import React, { useEffect, useState } from 'react'
import Hero from '../../components/hero/Hero'
import Category from '../../components/category/Category'
import Product from '../../components/product/Product'
import './Home.scss';
import { axiosClient } from '../../utils/axiosClient';
import { useSelector } from 'react-redux';

function Home() {
  const categories = useSelector(state => state.categoryReducer.categories);

  const [topProducts, setTopProducts] = useState(null);

  async function fetchData() {
     
    const topProductsResponse = await axiosClient.get('/products?filter[isTopPick][$eq]=true&populate=image');

     
    setTopProducts(topProductsResponse.data.data);
  }

  useEffect(() => {
      fetchData();
  }, [])

  return (
    <div className='Home'>
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">Shop from the best, our Film and TV Poster Collection</p>
        </div>
        <div className="content">
          {categories?.map(category => <Category key={category.id} category={category} />)}
          {/* <Category />
          <Category />
          <Category /> */}
        </div>
      </section>

      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Pics</h2>
          <p className="subheading">All New Designs, Same Old Details.</p>
        </div>
        <div className="content">
          {topProducts?.map(product => <Product key={product.id} product={product} />)}
           {/* <Product />
           <Product />
           <Product />
           <Product />
           <Product />
           <Product /> */}
        </div>
      </section>
    </div>
  )
}

export default Home