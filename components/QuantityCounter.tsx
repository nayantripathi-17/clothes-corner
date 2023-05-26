import { ActionIcon, NumberInput, NumberInputHandlers } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'

function QuantityCounter({ max, quantity, setQuantity }: { max: number | null | undefined, quantity: number, setQuantity: Dispatch<SetStateAction<number>> }) {

    const handlers = useRef<NumberInputHandlers>();
    const { width, height } = useViewportSize()

    return (
        <>
            <p className="tracking-widest font-light text-sm uppercase">Quantity</p>
            <div className="flex items-center flex-grow space-x-2 pt-2">
                {/* @ts-ignore */}
                <ActionIcon size={42} variant="default" disabled={max===0} onClick={() => handlers.current.decrement()}>-</ActionIcon>
                <NumberInput
                    hideControls
                    value={quantity}
                    onChange={(val) => setQuantity(val === "" ? 1 : val)}
                    handlersRef={handlers}
                    max={max ? max : undefined}
                    disabled={max === 0}
                    min={max === 0 ? 0 : 1}
                    step={1}
                    className={`text-center ${width > 1100 ? "w-1/12" : "w-1/6"}`}
                    classNames={
                        { input: "text-center" }
                    }
                />
                {/* @ts-ignore */}
                <ActionIcon size={42} variant="default" disabled={max === 0} onClick={() => handlers.current.increment()}>+</ActionIcon>
            </div>
        </>
    )
}

export default QuantityCounter