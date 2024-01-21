import PaginationBar from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import prisma from '@/lib/db/prisma'
import Image from 'next/image'
import Link from 'next/link'



export default async function Home({ searchParams: { page = "1"} }) {
  // const response = await fetch('https://fakestoreapi.com/products');
  // const products = await response.json();
  const currentPage = parseInt(page);

  const pageSize = 6
  const heroItemCount = 1

  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount-heroItemCount) / pageSize)


  const products = await prisma.product.findMany({
    orderBy: {id: "desc"},
    skip: (currentPage-1) * pageSize + (currentPage===1?0:heroItemCount),
    take: pageSize+ (currentPage === 1 ? heroItemCount : 0),
  })

  const isNew = ((Date.now() - new Date(products[0].createdAt).getTime()) < (1000*60*60*24));
  return (
    <div className='flex flex-col items-center'>
      {currentPage === 1 &&
        <div className='hero rounded-xl bg-base-300'>
          <div className='hero-content flex-col lg:flex-row'>
            <Image 
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className='w-full max-w-sm rounded-lg shadow-2xl'
              priority
            />
            <div>
              <h1 className='text-5xl font-bold'>
                {isNew && <><div className="badge badge-secondary align-middle">NEW</div><br/></>}
                {products[0].name} 
              </h1>
              <p className="py-6">{products[0].description}</p>
              <Link href={"/products/" + products[0].id} className='btn-primary btn'>Check it now</Link>
            </div>
          </div>
        </div> 
      }
      <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {products && (currentPage===1 ? products.slice(1) : products).slice(0).map((prod)=>(
          <ProductCard key={prod._id} prod={prod}/>
          ))}
      </div> 
      {totalPages>1 && 
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      
      }
    </div>
  )
}
