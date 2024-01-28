import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    axios.get("https://openapiv1.coinstats.app/coins?", {
      headers: {
        'X-API-KEY': 'By+qhootCIzec8VBlCcbdkLpRytyMZad07dixh73/5I='
      }
    }).then(res => setCurrency(res.data.result))
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <div className="App">
        <h1>Crypto Currency App</h1>
        <input type="text" placeholder='Search Here.....' onChange={(e) => setSearch(e.target.value)} />
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th className='namee'>Name</th>
              <th>Symbol</th>
              <th>Market cap</th>
              <th>Price</th>
              <th>Available Supply</th>
              <th>Volume(24hr)</th>
            </tr>
          </thead>
          <tbody>
            {
              currency.filter((val) => {
                return val.name.toLowerCase().includes(search.toLowerCase())
              }).map((val) => {
                return <tr>
                  <td className="rank">{val.rank}</td>
                  <td className='logo'>
                    <a href={val.websiteUrl} target='_blank'><img src={val.icon} alt="" /></a>
                    <p>{val.name}</p>
                  </td>
                  <td className='symbol'>{val.symbol}</td>
                  <td>${val.marketCap}</td>
                  <td>${val.price.toFixed()}</td>
                  <td>{val.availableSupply}</td>
                  <td>{val.volume.toFixed(0)}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
