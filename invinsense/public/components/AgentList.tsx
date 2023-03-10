import MUIDataTable from "mui-datatables";



import React, { useState, useEffect } from 'react';

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Button from "@material-ui/core/Button";

import './SecurityInfoMonitoring.scss';

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
  });



const AgentList = () => {

    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
  
    const columns = [
      { name: "ID", options: { filterOptions: { fullWidth: true } } },
      { name: "Name", options: { filterOptions: { fullWidth: true } } },
      { name: "IP", options: { filterOptions: { fullWidth: true } } },
      { name: "Groups", options: { filterOptions: { fullWidth: true } } },
      { name: "OS", options: { filterOptions: { fullWidth: true } } },
      { name: "Cluster Node", options: { filterOptions: { fullWidth: true } } },
      { name: "Version", options: { filterOptions: { fullWidth: true } } },
      { name: "Registration Date", options: { filterOptions: { fullWidth: true } } },
      { name: "Last keep alive", options: { filterOptions: { fullWidth: true } } },
      { name: "Status", options: { filterOptions: { fullWidth: true } } },
      { name: "Action", options: { filterOptions: { fullWidth: true } } }

    ];

    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onTableChange: (action, state) => {
          console.log(action);
          console.dir(state);
        }
    };
    //   const data = [
    //     ["Gabby George", "Business Analyst", "Minneapolis"],
    //     [
    //       "Aiden Lloyd",
    //       "Business Consultant for an International Company and CEO of Tony's Burger Palace",
    //       "Dallas"
    //     ],
    //     ["Jaden Collins", "Attorney", "Santa Ana"],
    //     ["Franky Rees", "Business Analyst", "St. Petersburg"],
    //     ["Aaren Rose", null, "Toledo"],
    //     ["Johnny Jones", "Business Analyst", "St. Petersburg"],
    //     ["Jimmy Johns", "Business Analyst", "Baltimore"],
    //     ["Jack Jackson", "Business Analyst", "El Paso"],
    //     ["Joe Jones", "Computer Programmer", "El Paso"],
    //     ["Jacky Jackson", "Business Consultant", "Baltimore"],
    //     ["Jo Jo", "Software Developer", "Washington DC"],
    //     ["Donna Marie", "Business Manager", "Annapolis"]
    //   ];
    const data = [];

    const [agentListData, setAgentListData] = useState([]);       
    // const listAgentCount = ()=>{
        // fetch('/api/request', {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'osd-xsrf': 'kibana',
        //     },
        //     body: JSON.stringify( {"method":"GET","path":"/agents","body":{ "params": {
        //     limit: 15, offset: 0, q: "id!=000", sort: "+id"
        //     }},"id":"default"}),
        // }).then(listresponse => listresponse.json())
        // .then(listresponseData=> {setAgentListData(listresponseData.data); 
        
        //     console.log(listresponseData);
        //     console.log(agentListData);
        // });
    // }
    
    useEffect(()=>{
        //listAgentCount();
        fetch('/api/request', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'osd-xsrf': 'kibana',
            },
            body: JSON.stringify( {"method":"GET","path":"/agents","body":{ "params": {
            limit: 15, offset: 0, q: "id!=000", sort: "+id"
            }},"id":"default"}),
        }).then(listresponse => listresponse.json())
        .then(agents=> setAgentListData(agents.data)); 

        // const object = {"data":{"affected_items":
        // [{"id":"001","dateAdd":"2023-02-02T08:08:08Z","status":"never_connected","name":"agent-1","node_name":"unknown","ip":"172.30.130.8","registerIP":"172.30.130.8"},{"id":"002","dateAdd":"2025-02-02T08:08:08Z","status":"never_connected","name":"agent-2","node_name":"known","ip":"172.30.130.8","registerIP":"172.40.130.8"},{"id":"004","dateAdd":"2053-02-02T08:08:08Z","status":"disconnected","name":"agent-3","node_name":"unknown","ip":"152.30.130.8","registerIP":"162.30.130.8"},{"id":"004","dateAdd":"2023-02-02T08:08:08Z","status":"never_connected","name":"agent-1","node_name":"unknown","ip":"172.30.130.8","registerIP":"172.30.130.8"},{"id":"005","dateAdd":"2023-02-02T08:08:08Z","status":"never_connected","name":"agent-1","node_name":"unknown","ip":"172.30.130.8","registerIP":"182.30.130.8"}],"total_affected_items":5,"total_failed_items":0,"failed_items":[]},"message":"All selected agents information was returned","error":0};

    }, []);

    console.log("---------------------------")    
    console.log(agentListData);

    if(agentListData && agentListData.affected_items)    {
        agentListData.affected_items.map(function(item){
            let agent = [];    
            agent.push(item.id );
            agent.push(item.name);
            agent.push(item.ip );
            agent.push("-");
            agent.push("-");
            agent.push(item.node_name);
            agent.push(item.version);
            agent.push(item.dateAdd);
            agent.push("-");
            agent.push(item.status);
            agent.push("-");

            data.push(agent);
        });    
    }



console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")    
console.log(data);



    return(
        <>
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"Agents( )"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
          
        </>
    );
}

export {AgentList};