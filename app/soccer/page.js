
'use client'

import NavTab from "../navTab";
import TabContent from "../../component/TabContent";
import React from "react";
import { useState } from "react";






const soccer= () => {
    const [selectedTab, setSelectedTab] = useState('soccer');
  
    const handleSelectTab = (tab) => {
      setSelectedTab(tab);
    };
  
    return (
      <div>
        
        <NavTab onSelectTab={handleSelectTab} selectedTab={selectedTab} />
        <TabContent selectedTab={selectedTab} />
      </div>
    );
  };
  
  export default soccer;
