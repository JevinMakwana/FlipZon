import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { cookies } from "next/headers";
import { Cart } from "@prisma/client"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
          //cookies

export async function getCarts(){
    const session = await getServerSession(authOptions);

    let cart = null;

    if(session){
        cart = await prisma.cart.findFirst({
            where: {userId: session.user.id},
            include: {items: {include: {product: true}}}
        })
    }else{
        const localCartId = cookies().get("loacalCartId")?.value
        cart = localCartId ?
        await prisma.cart.findUnique({
            where: {id: localCartId},
            include: {items: { include: {product: true}}}
        }) : 
        null; 
    }


    if(!cart)return null;
    return {
        ...cart,   //reduce:  function // acc=>accumlate // item of the list // 0 at the end is starting value 
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0
        )
    }
}
 
export async function createCart(){
    const session = await getServerSession(authOptions);

    let newCart = Cart;
    if(session){
        newCart = await prisma.cart.create({
            data: {userId: session.user.id}
        })
    }else{
        newCart  = await prisma.cart.create({
            data: {}
        })
        cookies().set('loacalCartId', newCart.id);
    }
    

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0
    }
}