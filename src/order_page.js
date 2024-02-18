import ReactDOM from 'react-dom';
import './Old.css';
import idCard from './images/id-card.png';
import deliveryTruck from './images/delivery-truck.png';
import orderTracking from './images/order-tracking.png';
import React, { useState, useEffect } from 'react';
import NoteTextArea from './note_area';

const quality_types = ["CZGH", "SI2GH", "SI3GH", "VS2GH", "VS2-SI1HI", "SI-I1"];
const metal_types = ["10K White", "10K Yellow", "14K Rose", "14K White", "14K Yellow", "18K White", "18K Yellow", "22K White", "22K Yellow", "9K Rose", "9K White", "9K Yellow", "Platinum"];
const choice = ["Yes", "No"];
function App() {
  const [OrderNo, setOrderNo] = useState();

  useEffect(() => {
    let currentDate = new Date();
    let OrderNo = currentDate.getTime();
    setOrderNo(OrderNo.toString());
    let ustrr = "Web Order ID : " + OrderNo.toString();
    document.getElementById('epochTime').innerHTML = ustrr;
  }, []);

  function getMetalValue(row) {
    let place = row.toString();
    let idx = "Metal" + place;
    let selectValue_temp = document.getElementById(idx).value;
    return selectValue_temp;
  }

  function getQualityValue(row) {
    let place = row.toString();
    let idx = "Quality" + place;
    let selectValue_temp = document.getElementById(idx).value;
    return selectValue_temp;
  }

  function getCenterQualityValue(row) {
    let place = row.toString();
    let idx = "CenterQuality" + place;
    let selectValue_temp = document.getElementById(idx).value;
    return selectValue_temp;
  }

  function getCustomerCenterValue(row) {
    let place = row.toString();
    let idx = "CustomerCenter" + place;
    let selectValue_temp = document.getElementById(idx).value;
    return selectValue_temp;
  }

  function getCenterValue(row) {
    let place = row.toString();
    let idx = "Center" + place;
    let selectValue_temp = document.getElementById(idx).value;
    return selectValue_temp;
  }

  const [base64Data, setBase64Data] = useState({});

  const handleImage = async (e, currRow) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        console.error('No file selected');
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataUrl = e.target.result;
        const imageData = {
          fileName: file.name,
          fileType: file.type,
          base64Data: imageDataUrl.split(',')[1],
        };
        setBase64Data((prevData) => ({ ...prevData, [currRow]: imageData.base64Data }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error handling image:', error);
    }
  };

  const [noteInputs, setNoteInputs] = useState({});

  const handleNoteInputChange = (rowId, inputValue) => {
    setNoteInputs((prevInputs) => ({
      ...prevInputs,
      [rowId]: inputValue,
    }));
  };

  useEffect(() => { }, [noteInputs]);

  function addRow() {
    let currRow = globalRow.toString();
    let table = document.getElementById("DataTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.rows.length);
    newRow.id = 'Row' + currRow.toString();
    for (let i = 0; i < 9; i++) {
      if (i === 4 || i === 6) {
        let cell = newRow.insertCell(i);
        let select = document.createElement("select");
        select.className = "form-control";
        if (i === 4) {
          let idx = "Quality" + currRow;
          select.id = idx;
        }
        else {
          let idx = "CenterQuality" + currRow;
          select.id = idx;
        }
        let j = 0;
        if (j === 0) {
          let option = document.createElement("option");
          option.disabled = true;
          option.selected = true;
          option.text = "Select an Option";
          select.appendChild(option);
        }
        j = j + 1;
        for (j = 1; j <= 6; j++) {
          let option = document.createElement("option");
          option.text = quality_types[j - 1];
          select.appendChild(option);
        }
        cell.appendChild(select);
        continue;
      }
      else if (i === 2) {
        let cell = newRow.insertCell(i);
        let select = document.createElement("select");
        select.className = "form-control";
        let idx = "Metal" + currRow;
        select.id = idx;
        let j = 0;
        if (j === 0) {
          let option = document.createElement("option");
          option.disabled = true;
          option.selected = true;
          option.text = "Select an Option";
          select.appendChild(option);
        }
        j = j + 1;
        for (j = 1; j <= 13; j++) {
          let option = document.createElement("option");
          option.text = metal_types[j - 1];
          select.appendChild(option);
        }
        cell.appendChild(select);
        continue;
      }
      else if (i === 7 || i === 8) {
        let cell = newRow.insertCell(i);
        let select = document.createElement("select");
        select.className = "form-control";
        if (i === 7) {
          let idx = "CustomerCenter" + currRow;
          select.id = idx;
        }
        else {
          let idx = "Center" + currRow;
          select.id = idx;
        }
        let j = 0;
        if (j === 0) {
          let option = document.createElement("option");
          option.disabled = true;
          option.selected = true;
          option.text = "Select an Option";
          select.appendChild(option);
        }
        j = j + 1;
        for (j = 1; j <= 2; j++) {
          let option = document.createElement("option");
          option.text = choice[j - 1];
          select.appendChild(option);
        }
        select.onchange = (event) => {
          handleInputThis(event);
        };
        cell.appendChild(select);
        continue;
      }
      let cell = newRow.insertCell(i);
      let input = document.createElement("input");
      input.type = "text" + currRow;
      input.className = "form-control";
      cell.appendChild(input);
    }

    let cell = newRow.insertCell(9);
    let input = document.createElement("input");
    input.type = "file";
    input.id = "FileInput";
    input.multiple = true;
    input.addEventListener('change', (e) => handleImage(e, newRow.id));
    cell.appendChild(input);

    cell = newRow.insertCell(10);
    const componentContainer = document.createElement('div');
    const uniqueRowId = `Row${currRow}`;
    ReactDOM.render(
      <NoteTextArea
        rowId={uniqueRowId.toString()}
        value={noteInputs[uniqueRowId] ? noteInputs[uniqueRowId].note : ''}
        onChange={handleNoteInputChange}
      />,
      componentContainer
    );
    cell.appendChild(componentContainer);

    let actionCell = newRow.insertCell(11);
    let deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger button';
    deleteButton.type = 'button';
    deleteButton.style.backgroundColor = '#273B42';
    deleteButton.style.borderWidth = '0px';
    deleteButton.innerHTML = 'Delete <i class="bi bi-dash-circle-fill"></i>';
    deleteButton.addEventListener('click', function () {
      deleteRow(newRow.id);
    });
    actionCell.innerHTML = '';
    actionCell.appendChild(deleteButton);
    addToValidRows(newRow.id);
    increaseGlobalRow();
  }

  var [globalRow, setGlobalRow] = useState(1);
  var [validRows, setValidRows] = useState(['Row0']);

  const increaseGlobalRow = () => {
    setGlobalRow((prevGlobalRow) => prevGlobalRow + 1);
  };

  const addToValidRows = (value) => {
    setValidRows((prevValidRows) => [...prevValidRows, value]);
  };

  const removeFromValidRows = (rowId) => {
    setValidRows((prevRows) => prevRows.filter((id) => id !== rowId));
  };

  const deleteRow = (rowId) => {
    const row = document.getElementById(rowId);

    if (row) {
      const rowId = row.id;
      removeFromValidRows(rowId);
      row.remove();
    } else {
      console.error('Error: <tr> element not found');
    }
    console.log(validRows);
  };

  // async function submitform() {
  //   let combined_data1 = {};
  //   let formData = {
  //     ShippingAccount: Fetch_ShipAcc(),
  //     Name: Fetch_Name(),
  //     CustomerPO: Fetch_CustomerPO(),
  //     DeliveryDate: Fetch_Date(),
  //     Email: Fetch_Email(),
  //     Phone: Fetch_Phone(),
  //     Address1: Fetch_Addr1(),
  //     Address2: Fetch_Addr2(),
  //     City: Fetch_City(),
  //     State: Fetch_State(),
  //     Zip_Code: Fetch_ZipCode(),
  //     WebOrderID: OrderNo,
  //   };

  //   combined_data1 = { ...combined_data1, ...formData };

  //   let table = document.getElementById("DataTable");
  //   let tbody = table.getElementsByTagName("tbody")[0];
  //   let rows = tbody.getElementsByTagName("tr");

  //   for (let i = 0; i < rows.length; i++) {
  //     if (validRows.indexOf(rows[i].id) !== -1) {
  //       let place = rows[i].id.charAt(rows[i].id.length - 1);
  //       let cells = rows[i].getElementsByTagName("td");
  //       let combined_data = {};

  //       for (let j = 0; j < cells.length; j++) {
  //         if (j === 2) {
  //           let selectValue = getMetalValue(place);
  //           let json_metal = {
  //             Row: i + 1,
  //             Metal: selectValue,
  //           }
  //           combined_data = { ...combined_data, ...json_metal };
  //         }
  //         else if (j === 4) {
  //           let selectValue = getQualityValue(place);
  //           let json_quality = {
  //             Row: i + 1,
  //             Quality: selectValue,
  //           }
  //           combined_data = { ...combined_data, ...json_quality };
  //         }
  //         else if (j === 6) {
  //           let selectValue = getCenterQualityValue(place);
  //           let json_CenterQuality = {
  //             Row: i + 1,
  //             CenterQuality: selectValue,
  //           }
  //           combined_data = { ...combined_data, ...json_CenterQuality };
  //         }
  //         else if (j === 7) {
  //           let selectValue = getCustomerCenterValue(place);
  //           let json_CustomerCenter = {
  //             Row: i + 1,
  //             CustomerCenter: selectValue,
  //           }
  //           combined_data = { ...combined_data, ...json_CustomerCenter };
  //         }
  //         else if (j === 8) {
  //           let selectValue = getCenterValue(place);
  //           let json_Center = {
  //             Row: i + 1,
  //             Center: selectValue,
  //           }
  //           combined_data = { ...combined_data, ...json_Center };
  //         }
  //         else if (j === 9) {
  //           let str = base64Data['Row' + place];            
  //           let json_image = {
  //             Row: i + 1,
  //             Image: str || "",
  //           };
  //           combined_data = { ...combined_data, ...json_image };
  //         }
  //         else {
  //           let inputElement = cells[j].querySelector(`input, #Row${place}`);
  //           if (inputElement) {
  //             let inputValue = inputElement.value;
  //             if (j === 0) {
  //               let json_data = {
  //                 Row: i + 1,
  //                 Style: inputValue,
  //               }
  //               combined_data = { ...combined_data, ...json_data };
  //             }
  //             if (j === 1) {
  //               let json_data = {
  //                 Row: i + 1,
  //                 Version: inputValue,
  //               }
  //               combined_data = { ...combined_data, ...json_data };
  //             }
  //             if (j === 3) {
  //               let json_data = {
  //                 Row: i + 1,
  //                 RingSize: inputValue,
  //               }
  //               combined_data = { ...combined_data, ...json_data };
  //             }
  //             if (j === 5) {
  //               let json_data = {
  //                 Row: i + 1,
  //                 CenterSize: inputValue,
  //               }
  //               combined_data = { ...combined_data, ...json_data };
  //             }
  //             if (j === 10) {
  //               let strr = 'Row' + place;
  //               let json_data = {
  //                 Row: i + 1,
  //                 Note: noteInputs[strr] ? noteInputs[strr] : '',
  //               }
  //               combined_data = { ...combined_data, ...json_data };
  //             }
  //           }
  //         }
  //         let strr = 'Row' + place;
  //         combined_data1[strr] = combined_data;
  //       }
  //     }
  //     else {
  //       continue;
  //     }
  //   }
  //   console.log(combined_data1);
  // }

  async function submitform() {
    let combined_data1 = {
      ShippingAccount: Fetch_ShipAcc(),
      Name: Fetch_Name(),
      CustomerPO: Fetch_CustomerPO(),
      DeliveryDate: Fetch_Date(),
      Email: Fetch_Email(),
      Phone: Fetch_Phone(),
      Address1: Fetch_Addr1(),
      Address2: Fetch_Addr2(),
      City: Fetch_City(),
      State: Fetch_State(),
      Zip_Code: Fetch_ZipCode(),
      WebOrderID: OrderNo,
      "Rows": {}
    };

    let table = document.getElementById("DataTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = tbody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      if (validRows.indexOf(rows[i].id) !== -1) {
        let place = rows[i].id.charAt(rows[i].id.length - 1);
        let cells = rows[i].getElementsByTagName("td");
        let combined_data = {};

        for (let j = 0; j < cells.length; j++) {
          if (j === 2) {
            let selectValue = getMetalValue(place);
            combined_data['Metal'] = selectValue;
          } else if (j === 4) {
            let selectValue = getQualityValue(place);
            combined_data['Quality'] = selectValue;
          } else if (j === 6) {
            let selectValue = getCenterQualityValue(place);
            combined_data['CenterQuality'] = selectValue;
          } else if (j === 7) {
            let selectValue = getCustomerCenterValue(place);
            combined_data['CustomerCenter'] = selectValue;
          } else if (j === 8) {
            let selectValue = getCenterValue(place);
            combined_data['Center'] = selectValue;
          } else if (j === 9) {
            let str = base64Data['Row' + place];
            combined_data['Image'] = str || "";
          } else {
            let inputElement = cells[j].querySelector(`input, #Row${place}`);
            if (inputElement) {
              let inputValue = inputElement.value;
              if (j === 0) {
                combined_data['Style'] = inputValue;
              }
              if (j === 1) {
                combined_data['Version'] = inputValue;
              }
              if (j === 3) {
                combined_data['RingSize'] = inputValue;
              }
              if (j === 5) {
                combined_data['CenterSize'] = inputValue;
              }
              if (j === 10) {
                combined_data['Note'] = noteInputs['Row' + place] ? noteInputs['Row' + place] : '';
              }
            }
          }
        }
        combined_data1['Rows']['Row' + place] = { Row: i + 1, ...combined_data };
      }
    }

    // console.log(combined_data1);

    let payload = {
      'order': combined_data1,
      'file_name': OrderNo,
      'email': Fetch_Email()
    }

    // Make the POST request
    fetch('https://vabackend.ajaffe.com/odata/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          console.log('JSON data uploaded successfully');
        } else {
          console.error('Failed to upload JSON data');
        }
      })
      .catch(error => {
        console.error('Error uploading JSON data:', error);
      });

    // Display alert
    window.alert(`Your order No. ${OrderNo} is submitted to Ajaffe you will get the confirmation email at your provided Email ID`);

    // Navigate to the previous page
    window.close();

    //console.log(JSON.stringify(combined_data1, null, 2));
  }


  const CellLogic = (rowId) => {
    const table = document.getElementById('DataTable');
    const rows = table.querySelectorAll(`tr#${rowId}`);

    rows.forEach((row) => {
      const cols = row.querySelectorAll('td');
      let selectCC = 0, selectCT = 0;

      cols.forEach((col, j) => {
        const selects = col.querySelectorAll('select');
        const selectValue = selects.length > 0 ? selects[0].value : '';

        if (j === 7 && selectValue === 'Yes') {
          selectCC = 1;
        }
        if (j === 8 && selectValue === 'No') {
          selectCT = 1;
        }
      });
      cols.forEach((col, j) => {
        const selects = col.querySelectorAll('select, input');
        if ((j === 5) && selectCC === 1) {
          selects.forEach((select) => {
            select.disabled = true;
          })
        }

        if ((j === 6) && selectCT === 1) {
          selects.forEach((select) => {
            select.disabled = true;
          });
        }
      });
    });
  };

  var handleInputThis = (event) => {
    const inputElement = event.target;
    const current = findClosestTR(inputElement);

    if (current) {
      const rowID = current.id;
      CellLogic(rowID);
    }
  };

  const findClosestTR = (element) => {
    while (element && element.tagName !== 'TR' && element.tagName !== 'tr') {
      element = element.parentNode;
    }
    return element;
  };

  function Fetch_Name() {
    let item = document.getElementById('item1');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_1');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_Phone() {
    let item = document.getElementById('item2');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_1_A');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_ShipAcc() {
    let item = document.getElementById('item3');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_1_B');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_DeliveryName() {
    let item = document.getElementById('item4');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_2');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_Addr1() {
    let item = document.getElementById('item5');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_2_A');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_Addr2() {
    let item = document.getElementById('item6');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_2_B');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_City() {
    let item = document.getElementById('item6_A');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_2_C');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_State() {
    let item = document.getElementById('item6_B');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_2_D');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_ZipCode() {
    let item = document.getElementById('item6_C');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_2_E');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_CustomerPO() {
    let item = document.getElementById('item7');
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById('Insert_Here_3');
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_ConfirmOrder() {
    let item = document.getElementById("flexCheckDefault");
    let value;
    if (item.checked) {
      value = "Confirmed";
    }
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById("Insert_Here_3_A");
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_UrgentOrder() {
    let item = document.getElementById("flexCheckDefault_1");
    let value;
    if (item.checked) {
      value = "Urgent";
    }
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById("Insert_Here_3_B");
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_Email() {
    let item = document.getElementById("item3_A");
    let value = item.value;
    const para = document.createElement('p');
    para.textContent = value;
    const target = document.getElementById("Insert_Here_1_C");
    target.textContent = para.textContent;
    return para.textContent;
  }

  function Fetch_Date() {
    let dateInput = document.getElementById('item6_D');
    let dateValue = dateInput.value;
    if (dateValue.trim() !== '') {
      const para = document.createElement('p');
      para.textContent = dateValue;
      const target = document.getElementById('Insert_Here_2_F');
      target.textContent = 'Date : ' + para.textContent;
      return para.textContent;
    } else {
      const target = document.getElementById('Insert_Here_2_F');
      target.textContent = '';
      return '';
    }
  }

  return (
    <>
      <div className="container" style={{ maxWidth: 'fit-content', minWidth: 'fit-content', height: 'auto', margin: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'Lato-Light', fontStyle: 'normal', fontWeight: 400, WebkitFontSmoothing: 'antialiased', textAlign: 'left', margin: '0' }}>
            A.JAFFE
          </h1>
          <h1 id="epochTime" style={{ fontSize: '16px', textAlign: 'right', margin: '0', marginLeft: 'auto' }}>
            Right-Aligned Heading
          </h1>
        </div>
        <h1 style={{ minWidth: 'auto', alignItems: 'right', display: 'flex', justifyContent: 'center', fontSize: '12px' }}>EST. 1892 NEW YORK</h1>
        <h1 style={{
          fontFamily: 'Lato-Light', fontStyle: 'normal', fontWeight: 400, WebkitFontSmoothing: 'antialiased',
          minWidth: 'auto', alignItems: 'right', display: 'flex', justifyContent: 'center', marginTop: '20px'
        }}>Order</h1>

        <form style={{ maxWidth: 'fit-content' }}>
          <div className="row">
            <div className="column" id="Target_Column_1">
              <div className="card" style={{ justifyContent: 'space-between', display: 'inline-block' }}>
                <div id="Image-Margin">
                  <img src={idCard} alt="Information" width="60" height="60" />
                </div>
                <div className="dropdown" style={{ width: 'fit-content', display: 'inline-block' }}>
                  <span className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown"
                    style={{ textAlign: 'center', width: '150px', backgroundColor: '#273B42', marginLeft: '90px', marginTop: '10px' }}
                    aria-expanded="false">
                    Customer Info
                  </span>
                  <div style={{maxWidth : '90%', overflow : 'hidden'}}>
                    <p className='my-3' id="Insert_Here_1"></p>
                    <p id="Insert_Here_1_A"></p>
                    <p id="Insert_Here_1_B"></p>
                    <p id="Insert_Here_1_C"></p>
                  </div>
                  <ul className="dropdown-menu" id="Conatact_Info" style={{ opacity: '1.0', minWidth: '100%' }}>
                    <li>
                      <span className="dropdown-item" style={{ display: 'block', width: '100%' }}>
                        <label style={{ display: 'inline-block' }}>Name : </label>
                        <input className="form-control" id="item1"
                          type="text"
                          onChange={Fetch_Name} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Phone : </label>
                        <input className="form-control" id="item2"
                          type="text"
                          onChange={Fetch_Phone} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Ship Account : </label>
                        <input className="form-control" id="item3"
                          type="text"
                          onChange={Fetch_ShipAcc} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Email : </label>
                        <input className="form-control" id="item3_A"
                          type="text"
                          onChange={Fetch_Email} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="column" id="Target_Column_2">
              <div className="card" style={{ justifyContent: 'space-between', display: 'inline-block' }}>
                <div id="Image-Margin">
                  <img src={deliveryTruck} alt="Delivery Information" width="60" height="60" />
                </div>
                <div className="dropdown" style={{ width: 'fit-content', display: 'inline-block' }}>
                  <span className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown"
                    style={{ textAlign: 'center', width: '150px', backgroundColor: '#273B42', marginLeft: '90px', marginTop: '10px' }}
                    aria-expanded="false">
                    Delivery Info
                  </span>
                  <p className='my-3' id="Insert_Here_2"></p>
                  <p id="Insert_Here_2_A"></p>
                  <p id="Insert_Here_2_B"></p>
                  <p id="Insert_Here_2_C"></p>
                  <p id="Insert_Here_2_D"></p>
                  <p id="Insert_Here_2_E"></p>
                  <p id="Insert_Here_2_F"></p>
                  <ul className="dropdown-menu" id="Delivery_Info" style={{ opacity: '1.0', minWidth: '100%' }}>
                    <li>
                      <span className="dropdown-item">
                        <label style={{ display: 'inline-block' }}>Delivery Name : </label>
                        <input className="form-control" id="item4"
                          type="text"
                          onChange={Fetch_DeliveryName} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Address 1 : </label>
                        <input className="form-control" id="item5"
                          type="text"
                          onChange={Fetch_Addr1} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Address 2 : </label>
                        <input className="form-control" id="item6"
                          type="text"
                          onChange={Fetch_Addr2} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>City : </label>
                        <input className="form-control" id="item6_A"
                          type="text"
                          onChange={Fetch_City} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>State : </label>
                        <input className="form-control" id="item6_B"
                          type="text"
                          onChange={Fetch_State} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Zip Code : </label>
                        <input className="form-control" id="item6_C"
                          type="text"
                          onChange={Fetch_ZipCode} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label htmlFor="date">Delivery : </label>
                        <input type="date" className="form-control"
                          id="item6_D"
                          placeholder="Enter a date"
                          onChange={Fetch_Date} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="column" id="Target_Column_3">
              <div className="card" style={{ justifyContent: 'space-between', display: 'inline-block' }}>
                <div id="Image-Margin">
                  <img src={orderTracking} alt="Order Information" width="60" height="60" />
                </div>
                <div className="dropdown" style={{ width: 'fit-content', display: 'inline-block' }}>
                  <span className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown"
                    style={{ textAlign: 'center', width: '150px', backgroundColor: '#273B42', marginLeft: '90px', marginTop: '10px' }}
                    aria-expanded="false">
                    Order Info
                  </span>
                  <p className='my-3' id="Insert_Here_3"></p>
                  <p id="Insert_Here_3_A"></p>
                  <p id="Insert_Here_3_B"></p>
                  <ul className="dropdown-menu" id="Order_Info" style={{ opacity: '1.0' }}>
                    <li>
                      <span className="dropdown-item">
                        <label style={{ display: 'inline-block' }}>Customer PO : </label>
                        <input className="form-control" id="item7"
                          style={{}} type="text"
                          onChange={Fetch_CustomerPO} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item d-flex align-items-left" style={{ border: '0px' }}>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Confirm Order :
                        </label>
                        <input className="form-check-input" type="checkbox"
                          style={{ marginLeft: '15px', height: '1.25em', width: '1.25em' }}
                          id="flexCheckDefault" onChange={Fetch_ConfirmOrder} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item d-flex align-items-left" style={{ border: '0px' }}>
                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                          Urgent Order :
                        </label>
                        <input className="form-check-input" type="checkbox"
                          style={{ marginLeft: '25px', height: '1.25em', width: '1.25em' }}
                          id="flexCheckDefault_1" onChange={Fetch_UrgentOrder} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <h1 style={{
            fontFamily: 'Lato-Light', fontStyle: 'normal', fontWeight: 400, WebkitFontSmoothing: 'antialiased',
            textAlign: 'center', marginBottom: '100px', marginTop: '100px'
          }}>Item Details</h1>
          <div className="row" style={{ margin: '50px', minWidth: 'fit-content' }}>
            <div className="col" style={{ minWidth: 'fit-content' }}>
              <table className="table" id="DataTable" style={{ minWidth: 'fit-content' }}>
                <thead>
                  <tr id="Row">
                    <th style={{ maxWidth: '100px' }}>Style</th>
                    <th style={{ maxWidth: '100px' }}>Version</th>
                    <th style={{ maxWidth: '100px' }}>Metal</th>
                    <th style={{ maxWidth: '100px' }}>Ring Size</th>
                    <th style={{ maxWidth: '100px' }}>Quality</th>
                    <th style={{ maxWidth: '100px' }}>Center Size</th>
                    <th style={{ maxWidth: '100px' }}>Center Quality</th>
                    <th style={{ maxWidth: '100px' }}>Customer Center</th>
                    <th style={{ maxWidth: '100px' }}>Center</th>
                    <th style={{ maxWidth: '225px' }}>Image Upload</th>
                    <th style={{ maxWidth: '200px' }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="Row0">
                    <td>
                      <input className="form-control" type="text" id="Style" name="Style" />
                    </td>
                    <td>
                      <input className="form-control" type="text" id="Version" />
                    </td>
                    <td>
                      <select className="form-control" id="Metal0" defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="10K White">10K White</option>
                        <option value="10K Yellow">10K Yellow</option>
                        <option value="14K Rose">14K Rose</option>
                        <option value="14K White">14K White</option>
                        <option value="14K Yellow">14K Yellow</option>
                        <option value="18K White">18K White</option>
                        <option value="18K Yellow">18K Yellow</option>
                        <option value="22K White">22K White</option>
                        <option value="22K Yellow">22K Yellow</option>
                        <option value="9K Rose">9K Rose</option>
                        <option value="9K White">9K White</option>
                        <option value="9K Yellow">9K Yellow</option>
                        <option value="Platinum">Platinum</option>
                      </select>
                    </td>
                    <td>
                      <input className="form-control" type="text" id="RingSize" />
                    </td>
                    <td>
                      <select className="form-control" id="Quality0" defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="CZGH">CZGH</option>
                        <option value="SI2GH">SI2GH</option>
                        <option value="SI3GH">SI3GH</option>
                        <option value="VS2GH">VS2GH</option>
                        <option value="VS2-SI1HI">VS2-SI1HI</option>
                        <option value="SI-I1">SI-I1</option>
                      </select>
                    </td>
                    <td>
                      <input className="form-control" type="text" id="CenterSize" />
                    </td>
                    <td>
                      <select className="form-control" id="CenterQuality0" defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="CZGH">CZGH</option>
                        <option value="SI2GH">SI2GH</option>
                        <option value="SI3GH">SI3GH</option>
                        <option value="VS2GH">VS2GH</option>
                        <option value="VS2-SI1HI">VS2-SI1HI</option>
                        <option value="SI-I1">SI-I1</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control" id="CustomerCenter0" onChange={handleInputThis} defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control" id="Center0" onChange={handleInputThis} defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td>
                      <input type="file" className="form-control-file" name="image1" id="FileInput" multiple
                        onChange={(e) => handleImage(e, 'Row0')} />
                    </td>
                    <td>
                      <NoteTextArea
                        rowId={'Row0'}
                        value={noteInputs['Ros0'] ? noteInputs['Row0'].note : ''}
                        onChange={handleNoteInputChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: '-40px', marginLeft: '60px' }}>
            <button className="btn btn-success" type="button" onClick={addRow} style={{ backgroundColor: '#273B42' }}>Add
              Row</button>
          </div>
        </form>
        <button className="button-28" type='button' onClick={submitform}>Submit</button>
      </div>
    </>
  );
}

export default App;