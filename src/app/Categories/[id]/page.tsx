import React from 'react'

export default async function dynamicCategories({params}:{params:Promise<{id:string}>}) {
    const {id}=await params
    const res =await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
    const {data}=await res.json();
    console.log(data);
  return (
    <div>
      <h1 className='text-6xl  flex justify-center mt-52'>{data.name}</h1>
    </div>
  )
}

