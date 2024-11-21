import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Legend, Bar } from 'recharts'
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 100, pv: 2400, amt: 2400}, {name: 'Page A', uv: 200, pv: 2200, amt: 2200}];
function Stats() {
  return (
    <>    
        <h3 className='text-gray-900 text-xl text-center font-semibold'>Statistiques</h3>
        <div className="flex flex-wrap justify-evenly w-[100%] items-center gap-y-4 p-3 mt-20">
              
              <LineChart width={500} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <Line type="monotone" dataKey="pv" stroke="green" />
              <CartesianGrid stroke="#ccc" />
              <XAxis  dataKey="uv" />
              <YAxis />
              </LineChart>
              <BarChart width={500} height={300} data={data}>
              <XAxis dataKey="uv" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
              <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
        </div>
    
    </>

  )
}

export default Stats