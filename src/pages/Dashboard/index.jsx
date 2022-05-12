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
        one: "cadetblue",
        two: "#2196F3",
        three: "purple"
      };

    return (
        <div className='dashboard-wrapper' >
            
            <div className='table-wrapper' >
                <table className='table' >
                    <thead className='thead' >  
                        <tr className='tr' >
                            <td className='td' > Year </td>
                            <td className='td' > One (Green) </td>
                            <td className='td' > Two (Blue) </td>
                            <td className='td' > Three (Purple) </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((x,i) => {
                                return(
                                    <tr key={i} className='tr' >
                                        <td className='td' > {x.year} </td>
                                        <td className='td' > {x.one} </td>
                                        <td className='td' > {x.two} </td>
                                        <td className='td' > {x.three} </td>
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