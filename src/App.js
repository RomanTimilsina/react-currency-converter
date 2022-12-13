import { useEffect , useState } from 'react';
import './App.css'
import CurrencyRow from './CurrencyRow'


const old_api = "Ry4IiQHCUOuEF6OstB5noWHBNJiEIQix";

function App() {
  
  const [currencyOptions,setCurrencyOptions] = useState([])
  const [fromCurrency,setFromCurrency] = useState()
  const [toCurrency,setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  
  const [ER, setER] = useState(1)
  const [inFrom, setInFrom] = useState(true)
  

 
  let toAmount, fromAmount

  if(inFrom){
    toAmount = amount*ER
    fromAmount = amount
  }
  else{
    fromAmount = amount/ER
    toAmount = amount
  }

  useEffect(() => {

    fetch(`https://api.currencyfreaks.com/latest?apikey=abb36491c2d04d02a73898c5888db206`)
  .then(response => response.json())
  .then(result => {
   
    const firstCurrency = Object.keys(result.rates)[0]
    console.log(Object.keys(result.rates)[0])
    setCurrencyOptions([result.base, ...Object.keys(result.rates)]);
     setFromCurrency(result.base) ;
     setToCurrency(firstCurrency) ;

    }
  )
 
  },[])

  useEffect(() => {

    fetch(`https://api.currencyfreaks.com/latest?apikey=abb36491c2d04d02a73898c5888db206`)
  .then(response => response.json())
  .then(result => {
    
    setER(result.rates[toCurrency])
    
   

    }
  )
 
  },[toCurrency,fromCurrency])

   


    function handleFromAmount(e){
      
      setAmount(e.target.value)
      setInFrom(true)

    }
    
    function handleToAmount(e){
      
      setAmount(e.target.value)
      setInFrom(false)
    }

 

  return (
    <>
    <h1> Convert </h1>
    <CurrencyRow
     selected= {fromCurrency}
     amount = {fromAmount}
     handleInput = {handleFromAmount}
     onChangeCurrency = {(e) => setFromCurrency(e.target.value)}  
     currencyOptions = {currencyOptions}
     />
    <div className='equals'>=</div>
    <CurrencyRow 
    selected= {toCurrency} 
    amount = {toAmount}
    handleInput = {handleToAmount}
    onChangeCurrency = {(e) => setToCurrency(e.target.value)}
    currencyOptions = {currencyOptions}
    />
    </>
    
  );
}

export default App;
