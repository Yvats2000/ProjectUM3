import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);
function Donat({allocation, holading, sector, colorCode}) {
    const donatData = []
    // loop for  holdings percentage
    for(let i=0;i<=allocation.holdings.length; i++){
        if(i<=6 && holading){
            donatData.push(allocation.holdings[i] && allocation.holdings[i].percentage)
        }
    }
    // // loop for others percentage
    let user = 0
    for(let i=7;i<allocation.holdings.length; i++){
        user = parseInt(user) + parseInt(allocation.holdings[i].percentage)
    }
    holading && donatData.push(user)
    // //loop for labelName
    let labelName =[]
    for(let i=0;i<=allocation.holdings.length; i++){
        if(i<=6 && holading){
            labelName.push(allocation.holdings[i] && allocation.holdings[i].name)
        }
    }
    // loop for sectors percentage
    for(let i=0;i<=allocation.sectors.length; i++){
        if(i<=6 && sector){
            donatData.push(allocation.sectors[i] && allocation.sectors[i].percentage)
        }
    }
    let id = 0
    for(let i=7;i<allocation.sectors.length; i++){
        id = parseInt(id) + parseInt(allocation.sectors[i].percentage)
    }
    for(let i=0;i<=allocation.sectors.length; i++){
        if(i<=6 && sector){
            labelName.push(allocation.sectors[i] && allocation.sectors[i].name)
        }
    }
    sector && donatData.push(id)
    labelName.push('others')
    let ColorCodeData = colorCode
    const data = {
        datasets: [{
            data: donatData,
            backgroundColor: ColorCodeData,
        },
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels:labelName,
    };

    const option= {
        plugins: {
            legend: {
                display: false
            },
          tooltip: {
            callbacks: {
              label: function(context){
                var label = context.label,
                    currentValue = context.raw  
                    return label + ": " +currentValue +"%" ;
              }
            }
          }
        }
      }
    return (
        <div className="App" style={{ width: '100%', height: '100%' }}>
            <Doughnut data={data} options={option}/>
        </div>
    );
}

export default Donat;