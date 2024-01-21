import { formatPrice } from "@/lib/format"



export default function PriceTag({ price, className }){
    return <span className={`badge ${className}`}>{formatPrice(price)}</span>
}