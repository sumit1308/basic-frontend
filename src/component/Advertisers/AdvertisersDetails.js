import React,{useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
//import Export from "react-data-table-component";
import ReactJsAlert from "reactjs-alert";
import axios from 'axios';
import "./AdvertisersDetails.css";
const AdvertisersDetails = () => {
    const [advertisers, setAdvertisers] = useState([]);
    const [filterAdvertisers, setFilterAdvertisers] = useState([]);
    const [search, setSearch] = useState("");
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const getAdvertisers = async () => {
        try{
            const response = await axios.get("api/getAdvertiserData");
            setAdvertisers(response.data);
            setFilterAdvertisers(response.data);
        }catch(err){
            console.log(err.response.data.message);
			setAlertStatus(true);
			setAlertType("error");
			setAlertMessage(err.response.data.message);
        }
    };
    useEffect(()=>{
        // const  data  = axios.get(`https://restcountries.com/v2/all`);
        // 	data.then((result) =>{
        // 		console.log(result.data);
        //         setAdvertisersData(result.data); 
        // 	})   
        getAdvertisers();
	},[]);
    useEffect(()=>{
        console.log(advertisers);
        const result = advertisers.filter((advertiser) => {
            return advertiser.advertiserName.toLowerCase().match(search.toLowerCase());
        });
        setFilterAdvertisers(result);
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
            name: "Advertiser Name",
            selector: (row) => row.advertiserName,
        },
        {
            name: "Company Name",
            selector: (row) => row.companyName,
        },
        {
            name: "Website",
            selector: (row) => row.website,
        },
        {
            name: "E-mail",
            selector: (row) => row.email,
        },
        {
            name: "Phone Number",
            selector: (row) => row.phoneNumber,
        },
        {
            name: "Address",
            selector: (row) => row.address,
        },
        {
            name: "State",
            selector: (row) => row.state,
        },
        {
            name: "Action",
            cell: (row) => <button className="btn btn-primary" onClick={()=> alert(row.advertiserName)}> Edit </button>,
        },
    ];
    
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filterAdvertisers)} />, [filterAdvertisers]);

  return (
    <>
        <DataTable 
            title="Advertisers List" 
            columns={columns} 
            data={filterAdvertisers} 
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

export default AdvertisersDetails;
