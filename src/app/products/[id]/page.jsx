import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import prisma from "@/lib/db/prisma";
import { incrementProductQuantity } from "./actions";



const getProduct = cache(async (id)=>{
    // const product = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await prisma.product.findUnique({where: {id}})
    if(!product) notFound;
    
    return product;
})

export async function generateMetadata({params: {id}}){
    const prod = await getProduct(id);
    return {
        title: prod.name + "-FlipZon",
        description: prod.description,
        openGraph: {
            image: [{url: prod.imageUrl}]
        }
    }
}

export default async function ProductPage({params: {id}}){
    const res = await getProduct(id);
    return(
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <Image
                src={res.imageUrl}
                alt={res.name}
                width={500}
                height={500}
                className="rounded-lg"
                priority
            />
            <div>
                <h1 className="text-3xl font-bold">{res.name}</h1>
                <span className="badge mt-4">₹ {res.price}</span>
                <p className="py-6">{res.description}</p>
                <AddToCartButton productId={res.id} incrementProductQuantity={incrementProductQuantity} />
            </div>
        </div>
    )
}