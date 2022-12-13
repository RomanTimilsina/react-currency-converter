import React from 'react'
import {v4 as uuidv4} from 'uuid'

export default function CurrencyRow({currencyOptions,selected,onChangeCurrency, amount, handleInput}) {
  
  return (
    <>

    <input type= "number" className="input" value={amount} onChange={handleInput}/>

    <select value={selected} onChange={onChangeCurrency}>
   {currencyOptions.map(option => (
        <option key={uuidv4()} value={option}>{option}</option>
        ))}
    </select>

    </>
  )
}
