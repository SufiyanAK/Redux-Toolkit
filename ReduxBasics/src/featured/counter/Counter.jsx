import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreament, increament, reset, increamentByAmount, deccreamentByAmount } from './CounterSlice'


const Counter = () => {
    const count = useSelector((state) => state.counter.count)

    const [increamentAmount, setIncreamentAmount] = useState(0)

    const handleChange = (e) => {
        setIncreamentAmount(e.target.value)
    }

    const dispatch = useDispatch()

    const handleIncreament = () => {
        dispatch(increament())
    }
    const handleDecreament = () => {
        dispatch(decreament())
    }
    const handleReset = () => {
        dispatch(reset())
    }
    const handleAmountIncreament = () => {
        dispatch(increamentByAmount(Number(increamentAmount)))
        setIncreamentAmount('')
    }

    return (
        <>
            <section>
                <h1>{count}</h1>
                <div>
                    <button onClick={handleIncreament}>+</button>
                    <button onClick={handleDecreament}>-</button>
                    <input value={increamentAmount} onChange={handleChange} type="number" />
                    <button onClick={handleReset}>reset</button>
                    <button onClick={handleAmountIncreament}>Add</button>
                </div>
            </section>
        </>
    )
}

export default Counter