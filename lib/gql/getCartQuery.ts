// import gql from "graphql-tag";
// import { storeFrontInit } from "../shopify/storeFrontInit";
// import { returnGql } from "./returnGql";

// const query = gql
//     `query($cartId: ID!) {
//     cart(id: $cartId) {
//         id
//         createdAt
//         updatedAt
//         lines(first: 100) {
//         edges {
//           node {
//                     id
//                     quantity
  
//             cost {
//               subtotalAmount {
//                             amount
//                             currencyCode
//                         }
//               totalAmount {
//                             amount
//                             currencyCode
//                         }
//                     }
//             discountAllocations {
//               discountedAmount {
//                             amount
//                         }
//                     }
//             merchandise {
//               ... on ProductVariant {
//                             id
//                         }
//                     }
//                 }
//             }
//         }
//       discountCodes {
//             code
//         }
//       buyerIdentity {
//             phone
//         }
//       cost {
//         totalAmount {
//                 amount
//                 currencyCode
//             }
//         subtotalAmount {
//                 amount
//                 currencyCode
//             }
//         totalTaxAmount {
//                 amount
//                 currencyCode
//             }
//         totalDutyAmount {
//                 amount
//                 currencyCode
//             }
//         }
//     }
// }`


// export async function getCartQuery(cartId: string | number) {
//     try {
//         const getCartVariables = { cartId }
//         if(!cartId || (typeof(cartId)!=="string" && typeof(cartId) !== "number")) return

//         const storefrontClient = await storeFrontInit();

//         const cartRes = await storefrontClient.query({
//             data: { query: returnGql(query), variables: getCartVariables },
//         })

//         return cartRes

//     } catch (err) {
//         //@ts-ignore
//         console.log(err,err?.response)
//     }
// }