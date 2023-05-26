import { TextInput } from '@mantine/core'
import React from 'react'
import { AddressComponentProps } from '../types'

function AddressComponent({ address, setAddress, disabled }: AddressComponentProps) {
    return (
        <>
            <TextInput
                placeholder=""
                label="Street Address Line 1"
                radius="md"
                withAsterisk
                required
                value={address.streetAddressLine1}
                className="w-full"
                disabled={disabled}
                classNames={
                    { input: "tracking-wide", label: "pb-2" }
                }
                onChange={(e) => {
                    const value = e.currentTarget.value
                    setAddress((prevAddress) => {
                        return {
                            ...prevAddress,
                            streetAddressLine1: value
                        }
                    }
                    )
                }
                }
            />
            <TextInput
                placeholder=""
                label="Street Address Line 2"
                radius="md"
                value={address.streetAddressLine2}
                className="w-full"
                disabled={disabled}
                classNames={
                    { input: "tracking-wide", label: "pb-2" }
                }
                onChange={(e) => {
                    const value = e.currentTarget.value
                    setAddress((prevAddress) => {
                        return {
                            ...prevAddress,
                            streetAddressLine2: value
                        }
                    }
                    )
                }
                }
            />
            <div className="space-y-5 md:space-y-0 md:flex md:flex-grow md:space-x-5">
                <TextInput
                    placeholder=""
                    label="City"
                    radius="md"
                    withAsterisk
                    required
                    value={address.city}
                    className="w-full"
                    disabled={disabled}
                    classNames={
                        { input: "tracking-wide", label: "pb-2" }
                    }
                    onChange={(e) => {
                        const value = e.currentTarget.value
                        setAddress((prevAddress) => {
                            return {
                                ...prevAddress,
                                city: value
                            }
                        }
                        )
                    }
                    }
                />
                <TextInput
                    placeholder=""
                    label="State / Province / Region"
                    radius="md"
                    className="w-full"
                    disabled={disabled}
                    withAsterisk
                    required
                    value={address.state}
                    classNames={
                        { input: "tracking-wide", label: "pb-2" }
                    }
                    onChange={(e) => {
                        const value = e.currentTarget.value
                        setAddress((prevAddress) => {
                            return {
                                ...prevAddress,
                                state: value
                            }
                        }
                        )
                    }
                    }
                />
            </div>
            <TextInput
                placeholder=""
                label="Pincode / Zip"
                radius="md"
                withAsterisk
                required
                value={address.zip}
                className="w-full"
                disabled={disabled}
                classNames={
                    { input: "tracking-wide", label: "pb-2" }
                }
                onChange={(e) => {
                    const value = e.currentTarget.value
                    setAddress((prevAddress) => {
                        return {
                            ...prevAddress,
                            zip: value
                        }
                    }
                    )
                }
                }
            />
        </>
    )
}

export default AddressComponent