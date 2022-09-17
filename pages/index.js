import React from "react";
import { client } from "../lib/client";

import { Product, HeroBanner, FooterBanner } from "../components";

const Home = ({ productsData, bannerData }) => (
  <>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <h3>Speakers of many vairations</h3>
    </div>
    <div className="products-container">
      {productsData?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </>
);

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { productsData, bannerData },
  };
};

export default Home;
