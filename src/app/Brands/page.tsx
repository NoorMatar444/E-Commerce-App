"use client";
import GetAllBrands from "@/API/GetAllBrands/GetAllBrands";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BrandsType } from "@/types/Brands.type";

export default function Brands() {
  const [brands, setBrands] = useState<BrandsType[]>([]);

  async function getBrands() {
    try {
      const { data } = await GetAllBrands();
      console.log(data);
      setBrands(data);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {brands.map((brand:BrandsType) => (
        <Link key={brand._id} href={`/Brands/${brand._id}`}>
          <Card key={brand._id} className="flex flex-col items-center p-4">
            <CardHeader className="flex flex-col items-center">
              <Image
                src={brand.image}
                alt={brand.name}
                width={100}
                height={100}
                className="rounded-md object-contain"
              />
              <CardTitle>{brand.name}</CardTitle>
              <CardDescription>Brand ID: {brand._id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Some extra content here</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
