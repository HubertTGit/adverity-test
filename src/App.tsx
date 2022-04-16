import { useEffect, useState } from 'react'
import { CampaignSelect } from './components/CampaignSelect'
import { Chart } from './components/Chart'
import { DatasourceSelect } from './components/DatasourceSelect'
import { Filter } from './components/Filter'
import { IData } from './interfaces/data.model'
import { getMetrics } from './services/api'

function App() {
  const [metrics, setData] = useState<IData[] | undefined>([]);
  const [campaign, setCampaign] = useState<string>("All");
  const [datasource, setDataSource] = useState<string>("All");

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const response = await getMetrics(datasource, campaign)
    setData(response);
  };

  const cHandleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const _campaign = e.target.value;
    setCampaign(_campaign);
    getDatas()
  }

  const dSHandleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selection = [...options].filter(i => i.selected).map(o => o.value);
    setDataSource(selection.toString());
    getDatas()
  }

  return (
    <main className='grid place-items-center'>
      <div className='flex items-center justify-center container h-screen border-blue-900 border-1'>
        <Filter>
          <DatasourceSelect onChangeHandler={dSHandleSelection} />
          <CampaignSelect onChangeHandler={cHandleSelection} />
        </Filter>
        <Chart metrics={metrics} campaign={campaign} datasource={datasource} />

      </div>
    </main>
  )
}


export default App
