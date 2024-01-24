import BuyResidentialsPage from '@/components/template/BuyResidentialsPage'
import ProfileModel from '@/models/profile';
import React from 'react'

type queryType={
  searchParams:{category:string}
}

async function BuyResidentials({searchParams}:queryType) {
  //http://localhost:3000/buy-residential?category=apartment
  // console.log(searchParams)
  // بهتر است در کامپوننت های سرورساید از ای پی آی روت  که خودمان ساختیم استفاده نکنیم(این مورد حالت تمرینی دارد)
  const res = await fetch(`http://localhost:3000/api/profile?categoty=${searchParams.category}`,{cache:"no-store"})
  const data = await res.json();
  // console.log(data)
  if (!data.success) return <h3>داده ای وجود ندارد</h3>;

  return (
    <BuyResidentialsPage data={data.profile}/>
  )
}

export default BuyResidentials