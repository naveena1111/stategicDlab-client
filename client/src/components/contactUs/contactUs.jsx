import React from 'react';
import './contactUs.css';
//import Draw from 'leaflet-draw';
import L from 'leaflet';
import { httpServices } from '../../helpers/api';
import { ConstantValue } from '../../helpers/const';
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
var checkcolor = {

    "left": "13px",
    "top": "5px",
    "bottom": "5px",
    "width": "10px",
    "height": "30px",
    "border": "solid orange",
    "borderWidth": "0 3px 3px 0",
    "WebkitTransform": "rotate(45deg)",
    "msTransform": "rotate(45deg)",
    "transform": "rotate(45deg)",
    "marginLeft": "15px"

}

export default class ContactUsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 1.3521,
            lng: 103.8198,
            zoom: 13,
            list: [],
            checkboxarray: ConstantValue.checkbox
        };
        this.changeColor = this.changeColor.bind(this);
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
        L.marker([1.2778, 103.8484]).addTo(map);
        //get location latitude longitude of geosearch
        map.on('geosearch/showlocation', function (result) {
            let markerObject = {};
            markerObject.latitude = result.location.y;
            markerObject.longitude = result.location.x;
            markerObject.address = result.location.label;

            //save marker in database api integration
            httpServices.post('/marker', markerObject).then(resp => {
            });
            self.getMarkerValue();
        });

        map.setMaxBounds([[1.1304753, 1.4504753], [103.6920359, 104.0120359]]);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);



    }

    changeColor(item, index) {
        if (item.checked) {
            item.checked = !item.checked
        } else {
            item.checked = true;
        }
        let array = [];
        array = this.state.checkboxarray;
        var foundIndex = array.findIndex(x => x.id == item.id);
        array[foundIndex] = item;
        this.setState({ checkboxarray: array })
    }

    render() {
        var containerStyle = {
            'margin-top': '30px'
        }
        return (
            <div >
                <div className="heading">
                    <h2 className="text">Contact Us </h2>
                </div>

                <div class="container" style={containerStyle}>
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-6 text-center ">
                                <label class="fonts">MY NAME IS </label>
                                <div class="form-group mx-sm-3 mb-2">
                                    <input type="text" class="form-control change" placeholder="Name" />
                                </div>
                            </div>
                            <div class="col-lg-6 text-center">
                                <label class="fonts">YOU CAN REACH ME AT</label>
                                <div class="form-group mx-sm-3 mb-2">
                                    <input type="text" class="form-control change" placeholder="Email" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 innerCnt">
                        <div class="col-lg-12">
                            <div class="text-center py-4">
                                <label class="fonts">I'M INTERESTED WITH</label>
                            </div>
                            <div class="content-box">
                                <div className="row">


                                    {
                                        this.state.checkboxarray.map((item, index) => {
                                            return (

                                                <div class="col-lg-3 col-md-6 mb-2 text-center">
                                                    <div class="flex-container">
                                                        {
                                                            item.checked ? <div> <div className="checkboxchecked" onClick={(e) => this.changeColor(item, index)} ><div style={checkcolor}></div></div>   <div className="cardtext">
                                                                <h6 className="colortext">{item.name}</h6>

                                                            </div> </div> :
                                                                <div> <div className="uncheckbox" onClick={(e) => this.changeColor(item, index)} ></div> <div className="cardtext">
                                                                    <h6 className="centertext"> {item.name}</h6>
                                                                </div>  </div>
                                                        }
                                                        <img src={item.image} className="icon" alt="" />
                                                    </div>
                                                </div>

                                            )




                                        })
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="col-lg-12  text-center">
                            <div class="form-group">
                                <textarea class="form-control messagetextarea change" rows="5" placeholder="Message"></textarea>
                            </div>
                            <button type="button" class="btnSubmit">Submit</button>
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

