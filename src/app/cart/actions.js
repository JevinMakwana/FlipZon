"use server";

import { getCarts } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId, quantity){
    const cart = await getCarts() ?? await createSearchParamsBailoutProxy();
    const articleInCart = cart.items.find((item) => item.productId === productId);

    if(quantity === 0){
        if(articleInCart){
            await prisma.cartItem.delete({
                where: {id: articleInCart.id}
            })
        }
    }else{
        if(articleInCart){
            await prisma.cartItem.update({
                where: { id: articleInCart.id},
                data: { quantity: quantity }
            })
        }else{
            await prisma.cartItem.create({
                data:{
                    cartId: cart.id,
                    productId,
                    quantity,
                }
            })
        }
    }

    revalidatePath("/ccart", 'page');

}