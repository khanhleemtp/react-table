import './App.css';
import BasicTable from './components/BasicTable';
import FilteringTable from './components/FilteringTable';
import SortingTable from './components/SortingTable';
import PaginationTable from './components/PaginationTable';
import SelectingRow from './components/SelectingRow';

function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      {/* <FilteringTable /> */}
      {/* <PaginationTable /> */}
      <SelectingRow />
    </div>
  );
}

export default App;
