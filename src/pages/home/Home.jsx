import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Widget from "../../components/Widget/Widget";
import Featured from "../../components/Featured/Featured";
import Chart from "../../components/Charts/Chart";
import "./home.scss";
import { Tab } from "@mui/material";
import TableComp from "../../components/Table/TableComp";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Header />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months(Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transaction</div>
          <TableComp />
        </div>
      </div>
    </div>
  );
}

export default Home;
