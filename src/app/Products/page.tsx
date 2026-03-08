import React from 'react'
import GetSinglePost from '../GetSinglePost/GetSinglePost';
import { ProductType } from './../../types/Product.type';
import GetProducts from '@/API/GetProducts/GetProductsApi';
export default async function Products() {
  const data= await GetProducts();
  console.log(data);
  return (
    <>
      <div className="container w-[80%] mx-auto my-7">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 '>
            {data.map((currentProduct:ProductType)=>( <div className='my-3 mx-3' key={currentProduct.id}>
              <GetSinglePost product={currentProduct} />
            </div>))}
          </div>
      </div>
    </>
  )
}
