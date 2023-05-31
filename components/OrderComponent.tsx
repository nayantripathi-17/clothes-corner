import { Order } from '@shopify/shopify-api/rest/admin/2023-04/order'
import React from 'react'
import LineItems from './LineItems'
import { Card } from '@mantine/core'
import { useRouter } from 'next/router'
import Link from 'next/link'

function OrderComponent({ orders }: { orders: Order[] }) {
    const router = useRouter()

    return (
        <div className="text-black min-h-screen">
            {orders.length !== 0 ? orders.map((order) => {
                return (
                    <React.Fragment key={order.id}>
                        <div className="block lg:flex lg:flex-grow">
                            <div className="w-full lg:w-1/2 px-12 py-10">
                                <p className="pb-2 text-lg font-semibold">Order {String(order?.name)}</p>
                                <p className="pb-4 text-lg font-semibold">Thank You {String(order?.customer?.first_name ? order?.customer?.first_name : order?.shipping_address?.first_name)}</p>
                                <Card radius="md" padding="xl" withBorder className="space-y-5">
                                    <p className="text-lg tracking-wide">Customer Information</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <div className="col text-sm">
                                            <div className="py-2">
                                                <p className="font-semibold pb-2">Contact Information</p>
                                                <p className="">{order.customer?.phone}</p>
                                            </div>
                                            <div className="py-2">
                                                <p className="font-semibold pb-2">Shipping Address</p>
                                                <p className="">{String(order.shipping_address?.first_name)} {String(order?.shipping_address?.last_name)}</p>
                                                <p className="">{String(order?.shipping_address?.address1)}</p>
                                                <p className="">{String(order?.shipping_address?.address2 ? order?.shipping_address?.address2 : "")}</p>
                                                <p className="">{String(order?.shipping_address?.zip)} {String(order?.shipping_address?.city)} {String(order?.shipping_address?.province_code ? order?.shipping_address?.province_code : "")}</p>
                                                <p className="">{String(order?.shipping_address?.country)}</p>
                                                <p className="">{String(order?.shipping_address?.phone)}</p>
                                            </div>
                                        </div>
                                        <div className="col text-sm">
                                            <div>
                                                <p className="font-semibold">Payment Information</p>
                                                <p className="">{order?.gateway}</p>
                                                {/* @ts-ignore */}
                                                <p className="">{order?.payment_details?.credit_card_company} {order?.payment_details?.credit_card_number} - ₹ {Number(order?.total_price_set?.shop_money?.amount).toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Billing Address</p>
                                                <p className="">{String(order?.billing_address?.first_name)} {String(order?.billing_address?.last_name)}</p>
                                                <p className="">{String(order?.billing_address?.address1)}</p>
                                                <p className="">{String(order?.billing_address?.address2 ? order?.billing_address?.address2 : "")}</p>
                                                <p className="">{String(order?.billing_address?.zip)} {String(order?.billing_address?.city)} {String(order?.billing_address?.province_code ? order?.billing_address?.province_code : "")}</p>
                                                <p className="">{String(order?.billing_address?.country)}</p>
                                                <p className="">{String(order?.billing_address?.phone)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <LineItems order={order} />
                        </div>
                    </React.Fragment>
                )
            })
                :
                <div className="flex items-center flex-grow min-h-screen">
                    <div className=" mx-auto my-auto space-y-10">
                        <p className="text-xl font-semibold">
                            You have not ordered Anything.
                        </p>
                        <button className="w-full border-black rounded-none border-2 font-semibold tracking-wider hover:bg-gray-100 cursor-pointer bg-white py-2 uppercase"><Link href="/">Continue Shopping</Link></button>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrderComponent