import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ProductType } from './../../types/Product.type';
import  Image  from 'next/image';
import AddBtn from "../AddBtn/AddBtn";

export default function GetSinglePost({ product }:{product:ProductType}) {
  console.log(product);
  return (
    <>
    
      <Card>
        <Link href={`/Products/${product.id}`}>
          <CardHeader>
            <CardTitle className="flex justify-center align-middle">
              <Image src={product.imageCover} alt="image" width={200} height={200} />
            </CardTitle>
            <CardDescription>{product.category.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-1">{product.title}</p>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <span>{product.price} EGP</span>
            <span>
              <i className="text-yellow-400 fa-solid fa-star"></i>
              {product.ratingsAverage}
            </span>
          </CardFooter>
        </Link>
        {/* <Button variant="outline">Button</Button> */}
        <AddBtn id={product.id}/>
      </Card>
    </>
  );
}
