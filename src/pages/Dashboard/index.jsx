import React, { useState, useEffect } from 'react';
import Barchart from '../../components/BarChart/Barchart';
import './dashboard.scss'

const Dashboard = () => {

    const [ data, setData] = useState([])

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getFullYear()
    }
    
    useEffect(() => {
        let arr = []
        let check = []
        for(let i=0; i<5; i++){
            let obj = {}
            obj.year = randomDate(new Date(2001, 0, 1), new Date())
            obj.one =  Math.floor( Math.random()*100 )
            obj.two =  Math.floor( Math.random()*100 )
            obj.three =  Math.floor( Math.random()*100 )
            // console.log('obj ', obj );
            check = arr.filter(x => x.year === obj.year )
            if(check.length < 1 ) arr.push(obj)
        }
        setData(arr)

    }, [])
    
      
      const allKeys = ['one', 'two', 'three' ];
      
      const colors = {
        one: "#F76E11",
        two: "#FF9F45",
        three: "#FFBC80"
      };

    return (
        <div className='dashboard-wrapper' >
            
            <div className='table-wrapper' >
                <table className='table' >
                    <thead className='thead' >  
                        <tr className='tr' >
                            <td className='td' > Year </td>
                            <td className='td one' > One  </td>
                            <td className='td two' > Two  </td>
                            <td className='td three' > Three  </td>
                        </tr>
                    </thead>
                    <tbody className='tbody' >
                        {
                            data.map((x,i) => {
                                return(
                                    <tr key={i} className='tr' >
                                        <td className='td' > {x.year} </td>
                                        <td className='td one' > {x.one} </td>
                                        <td className='td two' > {x.two} </td>
                                        <td className='td three' > {x.three} </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className='barchart-wrapper' >
                <Barchart data={data} keys={allKeys} colors={colors} />
            </div>

        </div>
    );
};

export default Dashboard;