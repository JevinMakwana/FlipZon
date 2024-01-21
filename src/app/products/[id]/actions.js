"use server";

import { createCart, getCarts } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import {
    notFound
} from "next/navigation";



export async function incrementProductQuantity(productId) {
                //getCarts():get existing cart //createCart:create new cart if doesn't exist
    const cart = await getCarts() ?? await createCart(); 

        //articleInCart: product in cart
    const articleInCart = cart.items.find((item) => item.productId === productId);

    if(articleInCart){
        await prisma.cartItem.update({ //'update' quantity if product already exists
            where: { id: articleInCart.id },
            data: { quantity: {increment: 1} }
        })
    }else{
        await prisma.cartItem.create({//'create' new entry of product inside cart
            data:{
                cartId: cart.id,
                productId: productId,
                quantity: 1,
            }
        })
    }
    revalidatePath("/products/[id]", 'page') //this is path, not a URL
}