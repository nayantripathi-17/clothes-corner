import { Button } from '@mantine/core';
import Image from 'next/image';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useRouter } from 'next/router';

//@ts-ignore
function Cart({ cart, removeFromCart }) {
  const router = useRouter()

  return (
    <div className="text-black">
      {Object.keys(cart).length > 0 ?
        <>
          {Object.keys(cart).map((variantId) => {
            return (
              <div key={variantId} className="flex items-center space-x-6 p-6 hover:bg-gray-200">
                <Image
                  src={(cart[variantId]).variant.image_id ? (cart[variantId]).variant.image_id : (cart[variantId]).image}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt=""
                  className="w-20 h-auto"
                />
                <div className="text-center">
                  <p>{(cart[variantId]).productName}</p>
                  <p>{(cart[variantId]).variant.title}</p>
                </div>
                <div>
                  <p>{(cart[variantId]).quantity}</p>
                </div>
                <div>
                  <button className="text-red-600 hover:scale-110" onClick={() => { removeFromCart(variantId) }}>
                    <RemoveCircleOutlineIcon />
                  </button>
                </div>
              </div>
            )
          })}
          <div>
            <button className="w-full bg-black text-white py-2 font-semibold tracking-wider">Proceed to Checkout</button>
          </div>
        </>
        :
        <>
          <p className="p-10 font-semibold">Your Cart is Empty!</p>
          <button className="w-full bg-black text-white py-2 font-semibold tracking-wider" onClick={() => router.push("/")}>Continue Shopping</button>
        </>
      }
    </div>
  )
}

export default Cart