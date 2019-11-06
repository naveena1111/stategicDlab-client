import React from 'react';
import './contactUs.css';
//import Draw from 'leaflet-draw';
import L from 'leaflet';
import { httpServices } from '../../helpers/api';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// import './../../'

const provider = new OpenStreetMapProvider({ params: { countrycodes: 'sg' }, });
const searchControl = new GeoSearchControl({
    provider: provider,
    autoClose: true,
    showMarker: true,                                   // optional: true|false  - default true
    showPopup: false,                                   // optional: true|false  - default false
    marker: {                                           // optional: L.Marker    - default L.Icon.Default
        icon: new L.Icon.Default(),
        draggable: false,
    },
    keepResult: true
});
var map;

export default class ContactUsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 1.3521,
            lng: 103.8198,
            zoom: 13,
            list: [],
        };

    }


    //get all values of markers from database & set in map
    getMarkerValue() {
        httpServices.get('/marker').then(resp => {
            if (resp && resp.data) {
                this.setState({ list: resp.data.result.data }, () => {
                    let marker;
                    if (this.state.list && this.state.list.length > 0) {
                        this.state.list.filter(function (value) {
                            marker = L.marker([value.latitude, value.longitude]).addTo(map).on('click', function (e) { });
                            marker.bindPopup(value.address)
                            return value;
                        });
                    }


                });
            }

        });
    }

    componentDidMount() {

        map = L.map('mapid').setView([this.state.lat, this.state.lng], this.state.zoom);          //leaflet map set
        this.getMarkerValue();

        map.addControl(searchControl);                                                             //search control added to map using leaflet-geosearch
        let self = this;

        //get location latitude longitude of geosearch
        map.on('geosearch/showlocation', function (result) {
            let markerObject = {};
            markerObject.latitude = result.location.y;
            markerObject.longitude = result.location.x;
            markerObject.address = result.location.label;

            //save marker in database api integration
            httpServices.post('/marker', markerObject).then(resp => {
                console.log("resp", resp);
            });
            self.getMarkerValue();
        });

        map.setMaxBounds([[1.1304753, 1.4504753], [103.6920359, 104.0120359]]);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);



    }

  

    render() {
          var containerStyle = {
            'margin-top':'30px'
          }
        return (
            <div >
                 <div className="heading">
         <h1 className="text-white text">Contact Us </h1> 
      </div>
    
      <div class="container" style={containerStyle}>
        <div class="col-lg-12">
            <div class="row">
                <div class="col-lg-6 text-center ">
                    <label class="font-weight-bold  text-clr">MY NAME IS</label>
                    <div class="form-group mx-sm-3 mb-2">
                        <input type="text" class="form-control change" placeholder="Name"/>
                    </div>
                </div>
                <div class="col-lg-6 text-center">
                    <label class="font-weight-bold  text-clr">YOU CAN REACH ME AT</label>
                    <div class="form-group mx-sm-3 mb-2">
                        <input type="text" class="form-control change" placeholder="Email"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12 innerCnt">
            <div class="col-lg-12">
                <div class="text-center py-4">
                    <label class="font-weight-bold letterSpace-1 text-clr">I'M INTERESTED WITH</label>
                </div>
                <div class="content-box">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                        Social media marketing
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                            <img src={require('./../../img/icon2.png')} alt="" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                        accounts  marketing
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                        <img src={require('./../../img/icon3.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                        Lead Generation 
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                        <img src={require('./../../img/icon4.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                          branching awareness
                                      
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                        <img src={require('./../../img/icon6.png')}  alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                        Web development
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                        <img src={require('./../../img/icon5.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                        Mobile development
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                        <img src={require('./../../img/icon6.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                        Content marketing
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                        <img src={require('./../../img/icon7.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                        Sales and channel 
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                        <img src={require('./../../img/icon8.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                        performance Marketing
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                        <img src={require('./../../img/icon9.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-2 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-3">
                                        <input type="checkbox" class="largerCheckbox" />
                                        </div>
                                        <div class="col-lg-6 col-6 middle text-clr">
                                            Account based marketing
                                        </div>
                                        <div class="col-lg-3 col-3 middle">
                                        <img src={require('./../../img/icon10.png') } alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="col-lg-12  text-center">
                <div class="form-group">
                    <textarea class="form-control" rows="5" placeholder="Message"></textarea>
                </div>
                <button type="button" class="btn btn-warning btnSubmit">Submit</button>
            </div>
        </div>
    </div>

    <div class="jumbotron" style={containerStyle}>
        <div class="container">
            <div class="col-lg-12">
                <div class="col-lg-12 addressHead">
                    <div class="row">
                        <div class="col-md-6 text-left addressHeadtext">
                            <p class="font-weight-bold text-clr">61 Robinson road, #12-01</p>
                            <p class="font-weight-bold text-clr">Robinson Centre, Singapore 068893</p>
                        </div>
                        <div class="col-md-6 text-right addressHeadtext">
                            <p class="font-weight-bold text-clr">+65 6908 3770</p>
                            <p class="font-weight-bold text-clr">enquiry@strategicdigitalab</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 col-12 col-md-12 text-center">
                    <div class="mapouter">
                        <div id="mapid">
                        </div>
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
                
          </div> 
        );
    }
}

