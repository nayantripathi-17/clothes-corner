import gql from "graphql-tag"
import { storeFrontInit } from "../shopify/storeFrontInit";
import { returnGql } from "./returnGql";

const createCartWithoutLinesQuery = gql
    `mutation($userPhone: String!){
    cartCreate(
        input: {
        lines: [],
        buyerIdentity: {
            phone: $userPhone,
            countryCode: IN,
        }
    }
    ){
        cart {
            id
            createdAt
            updatedAt
            buyerIdentity {
                phone
            }
        }
    }
},
`


export async function createCartWithoutLines(userPhone: string) {
    try {
        const createCartVariables = { userPhone }

        if (typeof (userPhone) !== "string") return

        const storefrontClient = await storeFrontInit();

        const cartRes = await storefrontClient.query({
            data: { query: returnGql(createCartWithoutLinesQuery), variables: createCartVariables },
        })

        return cartRes

    } catch (err) {
        //@ts-ignore
        console.log(err)
    }
}

const addCartLineQuery = gql`
mutation($cartLines: [CartLineInput!]!, $cartId: ID!){
    cartLinesAdd(
        cartId: $cartId,
        lines: $cartLines,
    ) {
        cart {
            id
            updatedAt
            lines(first: 100) {
          edges {
            node {
                    id
                    quantity

            cost {
                subtotalAmount {
                    amount
                    currencyCode
                }
                totalAmount {
                    amount
                    currencyCode
                }
            }
            discountAllocations{
                discountedAmount{
                    amount
                }
            }
            merchandise {
                ... on ProductVariant {
                        id
                    }
                }
            }
        }
        }
        buyerIdentity {
                phone
            }
        }
        userErrors {
            field
            message
        }
    }
},
`


export async function addCartLine(cartLines: Object[], cartId: string) {
    try {
        const addCartLineVariables = { cartLines, cartId }


        if (cartLines.length <= 0 || Array.isArray(cartLines) !== true || typeof (cartId) !== "string") return

        const storefrontClient = await storeFrontInit();

        const cartRes = await storefrontClient.query({
            data: { query: returnGql(addCartLineQuery), variables: addCartLineVariables },
        })

        return cartRes

    } catch (err) {
        //@ts-ignore
        console.log(err)
    }
}




const removeCartLineQuery = gql`
mutation($lineIds: [ID!]!, $cartId: ID!){
    cartLinesRemove(
        cartId: $cartId,
        lineIds: $lineIds,
    ) {
        cart {
            id
            updatedAt
            lines(first: 100) {
          edges {
            node {
                    id
                    quantity
            merchandise {
                ... on ProductVariant {
                        id
                    }
                }
            }
        }
        }
        buyerIdentity {
                phone
            }
        }
        userErrors {
            field
            message
        }
    }
},
`


export async function removeCartLine(lineIds: string[], cartId: string) {
    try {
        const removeCartLineVariables = { lineIds, cartId }


        if (lineIds.length <= 0 || Array.isArray(lineIds) !== true || typeof (cartId) !== "string") return

        const storefrontClient = await storeFrontInit();

        const cartRes = await storefrontClient.query({
            data: { query: returnGql(removeCartLineQuery), variables: removeCartLineVariables },
        })

        return cartRes

    } catch (err) {
        //@ts-ignore
        console.log(err)
    }
}


const fetchCartQuery = gql
    `query($cartId:ID!){
    cart(id: $cartId) {
            id
            createdAt
            updatedAt
            lines(first: 100) {
          edges {
            node {
                        id
                        quantity

              cost {
                subtotalAmount {
                                amount
                                currencyCode
                            }
                totalAmount {
                                amount
                                currencyCode
                            }
                        }
            discountAllocations{
                discountedAmount{
                                amount
                            }
                        }
              merchandise {
                  ... on ProductVariant {
                                id
                                title
                                price{
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }
        discountCodes {
                code
            }
        buyerIdentity {
                phone
            }
                cost {
          totalAmount {
                    amount
                    currencyCode
                }
                    subtotalAmount {
                    amount
                    currencyCode
                }
                    totalTaxAmount {
                    amount
                    currencyCode
                }
                    totalDutyAmount {
                    amount
                    currencyCode
                }
            }
        }
    
}
`


export async function fetchCart(cartId: string) {
    try {
        const fetchCartVariables = { cartId }

        if (typeof (cartId) !== "string") return

        const storefrontClient = await storeFrontInit();

        const cartRes = await storefrontClient.query({
            data: { query: returnGql(fetchCartQuery), variables: fetchCartVariables },
        })

        return cartRes

    } catch (err) {
        //@ts-ignore
        console.log(err)
    }
}

const updateBuyerInfoQuery = gql`
mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
    cartBuyerIdentityUpdate(
        buyerIdentity: $buyerIdentity,
        cartId: $cartId
    ) {
        cart {
            id
            updatedAt
            checkoutUrl
            lines(first: 100) {
          edges {
            node {
                    id
                    quantity
            merchandise {
                ... on ProductVariant {
                        id
                    }
                }
            }
        }
        }
        buyerIdentity {
            countryCode
                phone
                deliveryAddressPreferences{
                    ... on MailingAddress {
                        address1
                        address2
                        city
                        country
                        province
                        zip
                        firstName
                        lastName
                        phone
                    }
                }
                email
            }
        }
        userErrors {
            field
            message
        }
    }
},
`


export async function updateBuyerInfo(buyerIdentity: Object, cartId: string) {
    try {
        const updateBuyerInfoVariables = { cartId, buyerIdentity }


        if (typeof (cartId) !== "string") return

        const storefrontClient = await storeFrontInit();

        const cartRes = await storefrontClient.query({
            data: { query: returnGql(updateBuyerInfoQuery), variables: updateBuyerInfoVariables },
        })

        return cartRes

    } catch (err) {
        //@ts-ignore
        console.log(err)
    }
}