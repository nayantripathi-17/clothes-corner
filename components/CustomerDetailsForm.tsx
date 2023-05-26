import { Button, Checkbox, Select, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import AddressComponent from './AddressComponent'
import { updateBuyerInfo } from '../lib/gql/mutateCartQuery'
import { initDB } from '../lib/firebase/intiDB'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { CustomerDetails } from '../types'

function CustomerDetailsForm({ phone }: { phone: string }) {
    const [checked, setChecked] = useState(false)
    const [title, setTitle] = useState("")
    const [addPhoneNumber, setaddPhoneNumber] = useState(String(phone.slice(3)))
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [shippingAddress, setShippingAddress] = useState({
        streetAddressLine1: "",
        streetAddressLine2: "",
        city: "",
        state: "",
        zip: ""
    })
    const [billingAddress, setBillingAddress] = useState({
        streetAddressLine1: "",
        streetAddressLine2: "",
        city: "",
        state: "",
        zip: ""
    })
    const [save, setSave] = useState(false)

    const router = useRouter();

    useEffect(() => {

        (async function () {
            const db = await initDB();
            const userRef = doc(db, "users", `${phone}`);
            const dbUserRes = (await getDoc(userRef)).data()
            if (dbUserRes === undefined) return

            if (dbUserRes) {
                const customerDetails = dbUserRes as CustomerDetails
                setTitle(customerDetails.title ? customerDetails.title : "")
                setFName(customerDetails.fName ? customerDetails.fName : "")
                setLName(customerDetails.lName ? customerDetails.lName : "")
                setEmail(customerDetails.email ? customerDetails.email : "")
                setaddPhoneNumber(customerDetails.phone ? customerDetails.phone.slice(3) : "")
                setShippingAddress(customerDetails.shippingAddress ? { ...customerDetails.shippingAddress } : {
                    streetAddressLine1: "",
                    streetAddressLine2: "",
                    city: "",
                    state: "",
                    zip: ""
                })
                setBillingAddress(customerDetails.billingAddress ? { ...customerDetails.billingAddress } : {
                    streetAddressLine1: "",
                    streetAddressLine2: "",
                    city: "",
                    state: "",
                    zip: ""
                })
            }
        }());

    }, [phone])

    //@ts-ignore
    const submitCustomerUpdateForm = async (event) => {
        event.preventDefault()
        if (title === "" || fName === "" || lName === "" ||
            shippingAddress.streetAddressLine1 === "" || shippingAddress.city === "" ||
            shippingAddress.state === "" || shippingAddress.zip === "" &&
            (!checked && billingAddress.streetAddressLine1 === "" || billingAddress.city === "" ||
                billingAddress.state === "" || billingAddress.zip === "")) {
            return
        }

        const db = await initDB();
        const userRef = doc(db, "users", `${phone}`);

        const customer = {
            countryCode: "IN",
            deliveryAddressPreferences: [{
                deliveryAddress: {
                    firstName: fName,
                    lastName: lName,
                    address1: shippingAddress.streetAddressLine1,
                    address2: shippingAddress.streetAddressLine2,
                    city: shippingAddress.city,
                    province: shippingAddress.state,
                    country: "IN",
                    zip: shippingAddress.zip,
                    phone: `+91${addPhoneNumber}`,
                }
            }],
            email,
            phone: phone
        }

        const cartRef = doc(db, "cart", `${phone}`);
        const dbCartRes = (await getDoc(cartRef)).data()
        if (dbCartRes === undefined) return

        const cartId = dbCartRes.cartDetails.cartId

        const resBuyerInfo = await updateBuyerInfo(customer, cartId)

        if (save) {
            await setDoc(userRef,
                {
                    title,
                    fName,
                    lName,
                    email,
                    phone: `+91${addPhoneNumber}`,
                    shippingAddress,
                    billingAddress: checked ? shippingAddress : billingAddress
                    //@ts-ignore
                }, { merge: true }
            )
        }
        await setDoc(cartRef, {
            cartDetails: {
                //@ts-ignore
                checkoutUrl: String(resBuyerInfo?.body?.data?.cartBuyerIdentityUpdate?.cart?.checkoutUrl)
            }
        }, { merge: true, mergeFields: ["cartDetails"] })
        //@ts-ignore
        router.push(String(resBuyerInfo?.body?.data?.cartBuyerIdentityUpdate?.cart?.checkoutUrl))
    }

    return (
        <form className="w-11/12 lg:w-2/3 mx-auto space-y-5 mt-10" onSubmit={submitCustomerUpdateForm}>
            <div className="space-y-5 md:space-y-0 md:flex md:flex-grow md:space-x-5 items-center">
                <Select
                    label="Title"
                    placeholder="Title"
                    withAsterisk
                    radius="md"
                    required
                    value={title}
                    onChange={(e) => setTitle(String(e))}
                    data={[
                        { value: "mr", label: "Mr." },
                        { value: "mrs", label: "Mrs." },
                        { value: "ms", label: "Ms." },
                    ]}
                    classNames={
                        { input: "tracking-wide", label: "pb-2" }
                    }
                />
                <TextInput
                    placeholder="First Name"
                    label="First Name"
                    radius="md"
                    withAsterisk
                    required
                    value={fName}
                    className="w-full"
                    onChange={(e) => setFName(e.currentTarget.value)}
                    classNames={
                        { input: "tracking-wide", label: "pb-2" }
                    }
                />
                <TextInput
                    placeholder="Last Name"
                    label="Last Name"
                    radius="md"
                    withAsterisk
                    required
                    value={lName}
                    onChange={(e) => setLName(e.currentTarget.value)}
                    className="w-full"
                    classNames={
                        { input: "tracking-wide", label: "pb-2" }
                    }
                />
            </div>
            <div className="space-y-5 md:space-y-0 md:flex md:flex-grow md:space-x-5">
                <TextInput
                    placeholder="Phone Number"
                    label="Phone Number"
                    radius="md"
                    type="tel"
                    pattern="[0-9]{10}"
                    icon={
                        <p className="">+91</p>
                    }
                    withAsterisk
                    value={addPhoneNumber}
                    onChange={(e) => setaddPhoneNumber(e.currentTarget.value)}
                    className="w-full"
                    classNames={
                        { input: "tracking-wide", label: "pb-2" }
                    }
                />
                <TextInput
                    placeholder="Email Address"
                    label="Email"
                    radius="md"
                    type="email"
                    className="w-full"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    value={email}
                    classNames={
                        { input: "tracking-wide", label: "pb-2" }
                    }
                />
            </div>
            <p className="font-semibold text-lg tracking-wide text-gray-500">Shipping Address</p>
            <AddressComponent address={shippingAddress} setAddress={setShippingAddress} disabled={false} />
            <p className="font-semibold text-lg tracking-wide text-gray-500">Billing Address</p>
            <AddressComponent address={checked ? shippingAddress : billingAddress} setAddress={setBillingAddress} disabled={checked} />
            <Checkbox
                radius="md"
                checked={checked}
                onChange={() => setChecked(!checked)}
                label="Same as Shipping Address"
            />
            <Checkbox
                radius="md"
                checked={save}
                onChange={() => setSave(!save)}
                label="Save Addresses for future use"
            />
            <Button type="submit" className="w-full py-2 bg-black text-white font-semibold tracking-wider hover:bg-gray-900 cursor-pointer" >Proceed</Button>
        </form>
    )
}

export default CustomerDetailsForm