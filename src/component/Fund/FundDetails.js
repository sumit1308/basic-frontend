import React,{useEffect, useState} from "react";
import axios from 'axios';
import DataTable from 'react-data-table-component';
import ReactJsAlert from "reactjs-alert";
import "./FundDetails.css";
const FundDetails = () => {
    const [fundData, setFundData] = useState([]);
    const [filterFundData, setFilterFundData] = useState([]);
    const [search, setSearch] = useState("");
    const [alertStatus, setAlertStatus] = useState(false);
  	const [alertType, setAlertType] = useState("");
  	const [alertMessage, setAlertMessage] = useState("");
    const getfundData = async () => {
        try{
            const response = await axios.get(`/api/getFundData`);
            setFundData(response.data);
            setFilterFundData(response.data);
        }catch(err){
            console.log(err.response.data.message);
			setAlertStatus(true);
			setAlertType("error");
			setAlertMessage(err.response.data.message);
        }
    };
    useEffect(()=>{
        getfundData();
	},[]);
    useEffect(()=>{
        const result = fundData.filter((fund) => {
            return fund.Advertisers.toLowerCase().match(search.toLowerCase());
        });
        setFilterFundData(result);
	},[search]);

  function convertArrayOfObjectsToCSV(array) {
    let result;
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            // eslint-disable-next-line no-plusplus
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}

// eslint-disable-next-line react/prop-types
const Export = ({ onExport }) => <button className="btn btn-primary" onClick={e => onExport(e.target.value)}>Export</button>;

const columns = [
    {
        name: "Advertisers",
        selector: (row) => row.Advertisers,
    },
    {
        name: "Mode of Payment",
        selector: (row) => row.ModeofPayment,
    },
    {
        name: "Amount",
        selector: (row) => row.Amount,
    },
    {
        name: "Description",
        selector: (row) => row.Description,
    },
    {
        name: "Comment",
        selector: (row) => row.Comment,
    },
    {
        name: "Action",
        cell: (row) => <button className="btn btn-primary" onClick={()=> alert(row.Advertisers)}> Edit </button>,
    },
];

const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filterFundData)} />, [filterFundData]);

return (
    <>
    <DataTable 
        title="Fund Details" 
        columns={columns} 
        data={filterFundData} 
        pagination 
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={actionsMemo}
        subHeader
        subHeaderComponent={
            <input type="text" placeholder="search here" className="w-25 form-control" value={search} onChange={(e)=> setSearch(e.target.value)} />
        }
    />
    <ReactJsAlert
					status={alertStatus}   // true or false
					type={alertType}   // success, warning, error, info
					title={alertMessage}   // title you want to display
					Close={() => setAlertStatus(false)}   // callback method for hide
				/>
    </>
)
};

export default FundDetails;
