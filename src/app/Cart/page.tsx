"use client";
import GetUserCart from "@/API/GetUserCart/GetUserCart";
import RemoveCartItemApi from "@/API/RemoveCartItem/RemoveCartItemApi";
import UpdateCartQuantityApi from "@/API/UpdateCartQuantity/UpdateCartQuantityApi";
import React, { useContext, useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import ClearCartItemApi from "@/API/ClearCartItem/ClearCartItemApi";
import { CartContext } from "../CartContextProvider/CartContextProvider";
import Link from "next/link";
import { CartProductType } from "@/types/Cart.type";
import  Image  from 'next/image';


export default function Cart() {
  const [products, setProducts] = useState([]);
  const [isLoading,setIsLoading]=useState(true)
  const [isDesiabled,setisDesiabled]=useState(false)
  const [isDesiabledUpdate,setisDesiabledUbdate]=useState(false)
  const [isLoadingCount,setIsLoadingCount]=useState(false)
  const [total,setTotal]=useState(0);
  const [currentId,setCurrentId]=useState("");
  const [RemoveId,setRemoveId]=useState("")
  const [cartId,setcartId]=useState("");
  const [isDelete,setIsDelete]=useState(false);
 const context = useContext(CartContext);
if (!context) {
  throw new Error("CartContext must be used within CartContextProvider");
}
const { countNumber, setcountNumber } = context;
  async function reciveGetUserCartApi() {
    const res = await GetUserCart();
    if (res.status === "success") {
      setProducts(res.data.products);
      setIsLoading(false)
      setTotal(res.data.totalCartPrice)
      setcartId(res.cartId)
    } else {
      setIsLoading(false)
      throw new Error("can't recive data");
      
    }
  }
  async function deleteItem(id:string){
    setRemoveId(id);
    setisDesiabled(true)
    setIsDelete(true)
    const res=await RemoveCartItemApi(id);
    console.log(res)
    if(res.status==="success"){
      reciveGetUserCartApi()
      setProducts(res.data.products);
      setisDesiabled(false)
      setIsDelete(false)
    }
    let sum=0;
    res.data.products.forEach((product:CartProductType)=>{
      sum+=product.count;
      setcountNumber(sum)
    })
  }
  async function updateProduct(id:string,count:string,sign:string){
    setCurrentId(id)
    setisDesiabledUbdate(true)
    setIsLoadingCount(true)
    const res=await UpdateCartQuantityApi(id,count);
      console.log(res);
       if(res.status==="success"){
        reciveGetUserCartApi()
      setProducts(res.data.products);
      setisDesiabledUbdate(false)
      setIsLoadingCount(false)
      if(sign==="+"){
        setcountNumber(countNumber+1);
      }else{
        setcountNumber(countNumber-1);
      }
    }else{
      console.log("ERROR")
      setisDesiabledUbdate(false)
      setIsLoadingCount(false)
    }
  }
  async function clear(){
    reciveGetUserCartApi()
    const res=await ClearCartItemApi();
    console.log(res)
    if (res.message==="success"){
      reciveGetUserCartApi()
      
    }
  }
 useEffect(()=>{
  reciveGetUserCartApi()
},[])

  console.log(products);
  if(isLoading){
    return <h1>LOADING...</h1>
  }
  return (
    <>
    {products.length>0?(<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="w-full mx-auto flex justify-center my-6"><Button onClick={()=>clear()} className="bg-red-600">Clear my cart</Button></div>
      <h1 className="text-center">Total Prices :{total}</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                Images
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product:CartProductType)=><tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <Image
                  width={500}
                  height={500}
                  src={product.product.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="Apple Watch"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.product.title}
              </td>
              <td className="px-6 py-4">
                
                <div className="flex items-center gap-4">
                  <button disabled={isDesiabledUpdate} onClick={()=>updateProduct(product.product.id,`${product.count+1}`,"+")}><i className="fa-solid fa-plus"></i></button>
                  {currentId===product.product.id?isLoadingCount?<i className="fa-solid fa-spinner fa-spin"></i>:product.count:product.count}
                  <button disabled={isDesiabledUpdate} onClick={()=>updateProduct(product.product.id,`${product.count-1}`,"-")}><i className="fa-solid fa-minus"></i></button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.price*product.count}
              </td>
              <td className="px-6 py-4">
                {RemoveId===product.product.id?isDelete?<i className="fa-solid fa-spinner fa-spin"></i>:<button className="bg-red-700 text-white p-3 rounded-3xl w-25 cursor-pointer" disabled={isDesiabled} onClick={()=>deleteItem(product.product.id)}>Rmove</button>:<button className="bg-red-700 text-white p-3 rounded-3xl w-25 cursor-pointer" disabled={isDesiabled} onClick={()=>deleteItem(product.product.id)}>Rmove</button>}
                
              </td>
              
            </tr>)} 
          </tbody>
        </table>
          <Link href={`/CheckOut/${cartId}`}>
            <Button className="w-full bg-blue-600 text-white mt-6">Checkout</Button>
          </Link>
      </div>):<h1 className="font-bold">No Data Yet</h1>}
      
    </>
  );
}
