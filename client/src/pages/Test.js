import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Form from "../components/Form";
import PORT from "../config";
import Header from "../components/Header";
import Chart from 'chart.js/auto';
import ProgressBar from "../components/ProgressBar"; // Import the component


const Test = () => {
  let id = 4;
  // console.log(id);
  const [user, setUser] = useState({});
  const [listOfForms, setListOfForms] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const columns = [
    { label: "Student WPI Address", accessor: "student", sortable: false },
    { label: "Proposal Name", accessor: "proposalName", sortable: false },
    { label: "Unconfirmed Hours", accessor: "nonApprovedHours", sortable: true },
    { label: "Verified Hours", accessor: "verifiedHours", sortable: true },
    { label: "Updated Date", accessor: "updatedAt", sortable: true, sortbyOrder: "desc" },
  ];
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const juniorChartRef = useRef(null);

  useEffect(() => {

    axios
      .get(`${PORT}/forms/byUserId/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          navigate(`/`);
          // alert(response.data.error);
          return;
        }
        setListOfForms(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    axios.get(`${PORT}/auth/basicInfo/${id}`).then((response) => {
      if (!response.data || response.data.error) {
        navigate(`/`);
        // alert(response.data.error);
        return;
      }
      setUser(response.data);
    });


    // Initialize the first doughnut chart
    if (chartRef1 && chartRef1.current) {
      const myChartRef1 = chartRef1.current.getContext('2d');
      new Chart(myChartRef1, {
        type: 'doughnut',
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [{
            data: [12, 19, 3],
            backgroundColor: ['red', 'blue', 'yellow'],
            borderColor: ['red', 'blue', 'yellow'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // if (juniorChartRef && juniorChartRef.current) {
    //   const myJuniorChartRef = juniorChartRef.current.getContext('2d');
    //   new Chart(myJuniorChartRef, {
    //     tpye: 'doughnut',
    //     data: {
    //       labels: listOfForms.
    //     }
    //   })
    // }

    // Initialize the second doughnut chart
    if (chartRef2 && chartRef2.current) {
      const myChartRef2 = chartRef2.current.getContext('2d');
      new Chart(myChartRef2, {
        type: 'doughnut',
        data: {
          labels: ['Green', 'Purple', 'Orange'],
          datasets: [{
            data: [5, 2, 3],
            backgroundColor: ['green', 'purple', 'orange'],
            borderColor: ['green', 'purple', 'orange'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#000',
              drawBorder: false
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
      });
    }
  }, [id, navigate]);

  return (
    <>
      <h3 style={{ textAlign: 'center', paddingBottom: '10px' }}>{user.firstName + " " + user.lastName}</h3>
      <div className="bg-light p-4 w-100 mx-auto rounded">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>

          <div style={{ width: '55%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: '1', marginRight: '2.5%', paddingBottom: '10px' }}>
              <h4 style={{ textAlign: 'center' }}>Junior Year Hours</h4>
              <div style={{ position: 'relative', height: 'calc(40vh - 30px)' }}>
                {/* <canvas id="myChart1" ref={chartRef1} style={{ width: '100%', height: '100%' }} /> */}
              </div>
            </div>
            <div style={{ flex: '1', marginLeft: '2.5%', paddingBottom: '10px' }}>
              <h4 style={{ textAlign: 'center' }}>Senior Year Hours</h4>
              <div style={{ position: 'relative', height: 'calc(40vh - 30px)' }}>
                {/* <canvas id="myChart2" ref={chartRef2} style={{ width: '100%', height: '100%' }} /> */}
              </div>
            </div>
          </div>

          <div style={{ width: '40%', backgroundColor: '#f3f3f3', borderRadius: '10px', textAlign: 'center', justifyContent: 'space-evenly', padding: '10px', height: '100%' }}>
            <p>
              <b>Graduation Year:</b> {user.gradYear}
            </p>
            <p>
              <b>Junior Year Hours:</b> {user.nonApprovedHours} | {user.verifiedHours}
            </p>
            {/* // TODO
            progress bar needs to be current hours / total hours for each different section
            color each section according to junior, senior, and high needs hours
            add customizable color scheme for overall website and progress bars
             */}
            <ProgressBar progress={100} />
            <p>
              <b>Senior Year Hours:</b> {user.nonApprovedHours} | {user.verifiedHours}
            </p>
            <ProgressBar progress={66} />
            <p>
              <b>High Needs Hours:</b> {user.nonApprovedHours} | {user.verifiedHours}
            </p>
            <ProgressBar progress={33} />
          </div>
        </div>

      </div>
{/* 
      <div className="bg-light p-4 w-100 my-2 rounded d-flex align-items-center justify-content-between">
        <div className="main-content">
          <p className="main-text">Proposal Name</p>
          <p className="sub-text">01/01/2023 - Status</p>
        </div>

        <div style={{ width: '20%' }}>

          {listOfForms.map(() => {

          })}

        </div>
        <div className="right-content">
          <p className="right-text">XX | XX</p>
        </div>
      </div> */}

      {authState.isAdmin && <div>
      {listOfForms.map((form, key) => {
          console.log(form, key);
            return <Form key={key} isAdmin={authState.isAdmin} form={form} mode="proposal" />;
          })}
          </div>}

      {/* {authState.isAdmin && <div className="bg-light p-3 rounded my-2"><table className="table table-hover bg-light">
        <thead>
          <tr>
            <th>Student WPI Address</th>
            <th>Proposal Name</th>
            <th>Status</th>
            <th>Approved?</th>
            <th>Verified?</th>
            <th>Unconfirmed Hours</th>
            <th>Verified Hours</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Image?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOfForms.map((form, key) => {
            return <Form key={key} isAdmin={authState.isAdmin} form={form} mode="table" />;
          })}
        </tbody>
      </table></div>} */}
    </>
  );
};

export default Test;

