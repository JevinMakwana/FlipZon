"use client";

import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

export default function CartEntry({cartItem:{product, quantity}, setProductQuantity}){
    const [isPending, startTransition] = useTransition();
    const quantityOption = [];
    for(let i=0; i<=99; i++){
        quantityOption.push(
            <option value={i} key={i}>
                {i}
            </option>
        )
    }
    return(
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
                <div>
                    <Link href={'/products' + product.id} className="bold">
                        {product.name}
                    </Link>
                    <div>Price: {formatPrice(product.price)}</div>
                    <div className="flex my-1 items-center gap-2">
                        Quantity:
                        <select 
                            className="select select-bordered w-full max-w-[80px]"
                            defaultValue={quantity}
                            onChange={e => {
                                const newQuantity = parseInt(e.currentTarget.value)
                                console.log("newQuantity<<<", newQuantity)
                                startTransition(async () =>{
                                    await setProductQuantity(product.id, newQuantity)
                                })
                            }}
                        >
                            {/* <option value={0}>0</option>  */}
                            {quantityOption}
                        </select>
                    </div>
                    <div className="flex items-center gap-3 ">
                        Total: {formatPrice(product.price * quantity)}
                    </div>
                    {isPending && <span className="loading loading-spinner loading-sm" />}
                </div>
            </div>
            <div className="divider" />
        </div>
    )
}