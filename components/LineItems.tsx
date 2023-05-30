import { Badge, ScopedCssBaseline, ThemeProvider } from '@mui/material'
import { Order } from '@shopify/shopify-api/rest/admin/2023-04/order'
import Image from 'next/image'
import React from 'react'
import { createTheme } from "@mui/material/styles"


function LineItems({ order }: { order: Order }) {
    const theme = createTheme({
        typography: {
            fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji"
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 0,
                md: 768,
                lg: 1024,
                xl: 1440,
            }
        },
        palette: {
            mode: "light",
        }
    })

    return (
        <div className="w-full lg:w-1/2 bg-gray-100 px-12 py-10" >
            {order?.line_items && order?.line_items.length !== 0 && order?.line_items.map((item) => {
                return (
                    <div key={String(item?.variant_id)} >
                        <div className="flex flex-grow space-x-5 justify-between">
                            {
                                !(item?.img_src === undefined || item?.img_src === "" || item.img_src === null) &&
                                (
                                    <ThemeProvider theme={theme}>
                                        <ScopedCssBaseline enableColorScheme className="p-0 m-0 h-fit bg-gray-100 w-1/2 md:w-1/12">
                                            <Badge
                                                badgeContent={String(item.quantity)}
                                                overlap="rectangular"
                                                classes={
                                                    { badge: "bg-gray-600 text-white opacity-90" }
                                                }
                                                aria-label={String(item?.quantity)}
                                            >
                                                <Image
                                                    src={String(item?.img_src)}
                                                    width="0"
                                                    height="0"
                                                    sizes="100vw"
                                                    alt=""
                                                    className="w-full h-auto"
                                                />
                                            </Badge>
                                        </ScopedCssBaseline>
                                    </ThemeProvider>
                                )
                            }
                            <div>
                                <p className="font-semibold">{String(item?.title)}</p>
                                <p className="font-semibold">{String(item?.variant_title)}</p>
                            </div>
                            {/* @ts-ignore */}
                            <p className="font-semibold">₹ {String(item?.price_set?.shop_money?.amount)}</p>
                        </div>
                        <div>
                            <hr className="h-[1.5px] my-5 bg-gray-200 border-0" />
                        </div>
                    </div>
                )
            })}
            <div className="flex justify-between space-x-2">
                <p>Subtotal</p>
                {/* @ts-ignore */}
                <p>₹ {Number(order?.subtotal_price_set?.shop_money?.amount).toFixed(2)}</p>
            </div>
            {/*  @ts-ignore */}
            {order?.total_tax_set?.shop_money?.amount &&
                <div className="flex justify-between space-x-2">
                    <p>Tax</p>
                    {/* @ts-ignore */}
                    <p>₹ {Number(order?.total_tax_set?.shop_money?.amount).toFixed(2)}</p>
                </div>
            }
            {// @ts-ignore
                order?.total_shipping_price_set?.shop_money?.amount &&
                <div className="flex justify-between space-x-2">
                    <p>Shipping</p>
                    {/* @ts-ignore */}
                    <p>₹ {Number(order?.total_shipping_price_set?.shop_money?.amount).toFixed(2)}</p>
                </div>
            }
            <hr className="h-[1.5px] my-5 bg-gray-200 border-0" />
            <div className="flex justify-between space-x-2">
                <p className="font-semibold">Total</p>
                {/* @ts-ignore */}
                <p className="font-semibold text-lg">₹ {Number(order?.total_price_set?.shop_money?.amount).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default LineItems