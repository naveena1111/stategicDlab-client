import React from 'react';
import './contactUs.css';
//import Draw from 'leaflet-draw';
import L from 'leaflet';
import { httpServices } from '../../helpers/api';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

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
        var style = {
            "border":"0.5 grey",
            "height": "100px",
            "display":"flex",
            "backgroundColor": "#aa1b41",
            "marginRight": "20px",
            "marginLeft": "20px",
            "justifyContent": "center",
            "alignItems": "center"
          };
        return (
            <div >
                 <div style={style}>
         <h1 className="text-white text">Contact Us </h1> 
      </div>
      <div className="container containerstyle" >
      <div className="col-lg-12">
            <div className="row">
                <div className="col-lg-6 text-center">
                    <label className="font-weight-bold text-dark">MY NAME IS</label>
                    <div className="form-group mx-sm-3 mb-2 text-dark">
                        <input type="text" className="form-control" placeholder="Name"/>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-dark">
                    <label className="font-weight-bold">YOU CAN REACH ME AT</label>
                    <div className="form-group mx-sm-3 mb-2">
                        <input type="text" className="form-control" placeholder="Email"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="col-lg-12">
                <div class="text-center py-4">
                    <label class="font-weight-bold text-dark">I'M INTERESTED WITH</label>
                </div>
                <div class="row ">
                    <div class="col-lg-3 mb-2 text-center">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="filterCheckbx" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                        {/* <i class="fas fa-yin-yang"></i> */}
                                    </div>
                                    <div class="col-lg-9 text-dark texting">
                                    Social media marketing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 text-center">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="filterCheckbx" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                        {/* <i class="fas fa-yin-yang"></i> */}
                                    </div>
                                    <div class="col-lg-9 text-dark texting">
                                   accounts  marketing
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 text-center text-dark">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="filterCheckbx" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                        {/* <i class="fas fa-yin-yang"></i> */}
                                    </div>
                                    <div class="col-lg-9 text-dark texting">
                                      Lead Generation 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 text-center">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="filterCheckbx" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                        {/* <i class="fas fa-yin-yang"></i> */}
                                    </div>
                                    <div class="col-lg-9  text-dark texting">
                                       Branching awareness
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-lg-3 mb-2 text-center">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="filterCheckbx" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                    </div>
                                    <div class="col-lg-9 text-dark texting">
                                      Web development
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 text-center">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="filterCheckbx" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                    </div>
                                    <div class="col-lg-9 text-dark texting">
                                       Mobile development
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 text-center">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="filterCheckbx" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                    </div>
                                    <div class="col-lg-9 text-dark texting">
                                       Content marketing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 text-center text-dark">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="filterCheckbx" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                    </div>
                                    <div class="col-lg-9 texting">
                                      Sales and channel 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-lg-3 mb-2 text-center">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="filterCheckbx" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                    </div>
                                    <div class="col-lg-9 text-dark texting">
                                      performance Marketing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 text-center">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3">
                                    <input class="checkmark" id="filter1" type="checkbox" name="section" value="Angewandte Ingenierwissenschaften"/>
                                    </div>
                                    <div class="col-lg-9 text-dark texting">
                                      Growth hacking
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
                <button type="button" className="buttoncolor btn btn-danger">submit</button>
            </div>
        </div>
       
        <div className="mapstyle">
      
        <div class="jumbotron" style={{"marginTop":"30px"}}>
        <div class="container">
            <div class="col-lg-12">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-4 text-left">
                            <p class="font-weight-bold text-info">61 robinson road,#12-01</p>
                            <p class="font-weight-bold text-info">robinson center,singapore</p>
                        </div>
                        <div class="col-lg-4">
                        </div>
                        <div class="col-lg-4 text-left">
                            <p class="font-weight-bold text-info">+6581156501</p>
                            <p class="font-weight-bold text-info">enquiry@strategicdigitalab.com</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 text-center">
                <div id="mapid">
                </div>
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

