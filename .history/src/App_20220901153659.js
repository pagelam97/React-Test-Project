import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
useEffect(()=>{

axios({
  method:'get',
  url:"ajax/moreCinemas?movieId=0&day=2022-09-01&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1662017357743&cityId=562&optimus_uuid=BC9EFC4029C711ED8B46250E871FBE3306AB1A39AFF941C58F5D6BC13A477048&optimus_risk_level=71&optimus_code=10"
}).then(res=>{console.log(res);})

},[])




  return (
    <div className="App">
     APP组件
    </div>
  );
}

export default App;
