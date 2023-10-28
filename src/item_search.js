import Chatbot from "./chatbot";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import thumbnailIMG from './images/thumbnail.png';


export default function ItemSearch() {
    const items_ref = useRef();

    const [filters, setfilters] = useState(null);

    const setFilters = (filters) => {
        setfilters(filters);
    }

    useEffect(_ => {
        axios.get('http://va.ajaffe.com:8085/list_items')
        .then(resp => {
            if (resp.data.filters !== null) {
                setFilters(resp.data.filters);
            } else {
                setFilters(null);
            }
        })
        .catch(err => console.log('error'));
    }, []);

    const applyFilters = _ => {
        const filterform = document.getElementById('filterform');
        filterform.addEventListener('submit', e => {
          e.preventDefault();
          const inputs = filterform.getElementsByTagName('input');
          const filters = {};
          for (let i=0; i<inputs.length; i++) {
            const input = inputs[i];
            const datalist = document.getElementById(input.getAttribute('list'));
            if(input.value.trim() !== '') {
              const options = datalist.getElementsByTagName('option');
              let validOption = false;
              for(let j=0; j<options.length; j++) {
                if(options[j].value === input.value) {
                  validOption = true;
                  break;
                }
              }
    
              if(validOption) filters[input.name] = input.value;
            }
          }

          // make a post to item search api
          axios.post('http://va.ajaffe.com:8085/item_search', { 'filters': filters })
          .then(function (response) {
            items_ref.current.innerHTML = '';
            items_ref.current.innerHTML = `
            <div class="mx-auto" style="width: 200px; margin-top: 250px;">
              <div class="spinner-border" role="status" style="font-size: 40px;">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            `;
            const results = response.data.results;
            items_ref.current.innerHTML = '';
            if(Object.keys(results).length > 0) {
              for(const item in results) {
                  const versions = results[item].versions;
                  let imageurl = results[item].imageurl;
                  if (imageurl === '') {
                    imageurl = thumbnailIMG;
                  }
                  const item_body = `<div class="col-md-4 mt-2">
                  <div class="card p-2 mw-100" style="height: 100%;">
                    <img src="${imageurl}" class="card-img-top" alt="${item}" style="height: 100%;">
                    <div class="card-body">
                      <h5 class="card-title">${item}</h5>
                      <p class="card-text border" style="max-height: 100px; overflow-y: auto;">${versions.join('<br>')}</p>
                      <a href="https://ajaffe.com/catalogsearch/result/?q=${item}" class="btn btn-primary" target="_blank">See details</a>
                    </div>
                  </div>
                </div>`;
                items_ref.current.innerHTML += item_body;
              }
              // make form inputs as blank
              for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = '';
              }
            } else {
              items_ref.current.innerHTML += `
              <div class="row">
                <div class="col-md-12">
                  <div class="alert alert-success" role="alert">
                    Sorry no items found.
                  </div>
                </div>
              </div>
              `;
            }
        })
        .catch(function (error) {
          items_ref.current.innerHTML = '';
          items_ref.current.innerHTML += `
              <div class="row">
                <div class="col-md-12">
                  <div class="alert alert-danger" role="alert">
                    Sorry for inconvenience server has some issues.
                  </div>
                </div>
              </div>
              `;
          });
        });
    }

    return (
        <div>
            <div className="row" style={{ margin: 0 }}>
            <div className="col-3 ps-3 border-end">
                <div className="row">
                <div className="col-md-12">
                    <h4 className="text-center">Filters</h4>
                </div>
                </div>
                <form className="row" id="filterform" action="">
                    <div className="col-md-12">

                        {filters && Object.entries(filters).map(([key, value]) => (
                            <div className="input-group mb-3" key={key}>
                                <span className="input-group-text">{key}</span>
                                <input className="form-control" list={`${key}_options`} id={key} name={key} placeholder="Type to search..." />
                                <datalist id={`${key}_options`}>
                                    {value.map((item, idx) => (
                                        <option key={idx} value={item}></option>
                                    ))}
                                </datalist>
                            </div>
                        ))}

                    </div>
                    <div className="col-md-12 d-grid">
                        <button type="submit" className="btn btn-primary" onClick={applyFilters}>
                            Apply
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-9 h-80" style={{ overflowY: 'auto' }}>
                <div className="row" ref={items_ref}></div>
            </div>
            </div>
            <Chatbot />
        </div>
    );
}
