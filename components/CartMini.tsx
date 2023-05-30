import { useRouter } from 'next/router';
import CartProduct from './CartProduct';

//@ts-ignore
function CartMini({ cart, removeFromCart, subTotal }) {
  const router = useRouter()

  return (
    <>
      {Object.keys(cart).filter(key => key != "cartDetails").length > 0 ?
        <>
          <div className="text-black h-fit min-h-screen scrollbar-hide">
            {Object.keys(cart).filter(key => key != "cartDetails").map((variantId) => {
              return (

                <CartProduct
                  key={variantId}
                  variantId={variantId}
                  imgSrc={(cart[variantId]).variant.image_id ? (cart[variantId]).variant.image_id : (cart[variantId]).image}
                  productName={(cart[variantId]).productName}
                  productTitle={(cart[variantId]).variant.title}
                  quantity={(cart[variantId]).quantity}
                  price={(cart[variantId]).variant.price}
                  actualPricePerUnit={(cart[variantId]).actualPricePerUnit}
                  removeFromCart={removeFromCart}
                  actualPriceTotal={(cart[variantId]).actualPriceTotal}
                />

              )
            })
            }
          </div>
          <div className="overflow-hidden scrollbar-hide bottom-0 sticky">
            <br />
            <div className="flex flex-grow justify-center py-5 space-x-5 bg-white">
              <p className="text-gray-600 uppercase">Subtotal</p>
              <p className="text-gray-700 font-bold">₹ {Number(subTotal).toFixed(2)}</p>
            </div>
            <button className="w-full bg-black text-white py-2 font-semibold tracking-wider" onClick={()=>router.push("/cart")}>Proceed to Checkout</button>
          </div>
        </>
        :
        <>
          <div className="h-[100vh] min-h-fit">
            <p className="w-fit mx-auto font-semibold text-xl">Your Cart is Empty!</p>
          </div>
            <div className="overflow-hidden scrollbar-hide bottom-0 sticky">

              <button className="w-full bg-black text-white py-2 font-semibold tracking-wider" onClick={() => router.push("/")}>Continue Shopping</button>
            </div>
        </>
      }
    </>
  )
}

export default CartMini