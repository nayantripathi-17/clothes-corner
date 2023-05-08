import { ActionIcon, NumberInput, NumberInputHandlers } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import React, { useRef, useState } from 'react'

function QuantityCounter({ max }: { max: number | null | undefined }) {

    const [value, setValue] = useState<number | ''>(0);
    const handlers = useRef<NumberInputHandlers>();
    const { width, height } = useViewportSize()

    return (
        <>
            <p className="tracking-widest font-light text-sm uppercase">Quantity</p>
            <div className="flex items-center flex-grow space-x-2 pt-2">
                {/* @ts-ignore */}
                <ActionIcon size={42} variant="default" onClick={() => handlers.current.decrement()}>-</ActionIcon>
                <NumberInput
                    hideControls
                    value={value}
                    onChange={(val) => setValue(val)}
                    handlersRef={handlers}
                    max={max ? max : undefined}
                    min={0}
                    step={1}
                    className={`text-center ${width > 1100 ? "w-1/12" : "w-1/6"}`}
                    classNames={
                        { input: "text-center" }
                    }
                />
                {/* @ts-ignore */}
                <ActionIcon size={42} variant="default" onClick={() => handlers.current.increment()}>+</ActionIcon>
            </div>
        </>
    )
}

export default QuantityCounter