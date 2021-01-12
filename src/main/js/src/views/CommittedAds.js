import '../css_files/Home.css';
import React, {Component} from 'react'
import NavBar from "../components/NavBar/NavBar";
import AdsNavBar from "../components/AdsNavBar/AdsNavBar";
import AdsService from "../services/ads.service"


export default class CommittedAds extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);

        this.state = {
            elements: ""
        }
    }

    componentDidMount() {
        AdsService.getPostedAds().then(response => {
            this.setState({elements: response.data})
        }, error => {
            this.setState({elements: "Dohvat nije uspio."})
        });
    }


    checkAd(ad){
        if(localStorage.getItem('za')!== undefined){
            var search = localStorage.getItem('za');
            console.log("u provjeri");
            console.log(search);

            if(!search ==="") {
                if (!ad.caption.toLowerCase().includes(search.toLowerCase())
                    && !ad.description.toLowerCase().includes(search.toLowerCase())) return false;
            }
        }
        console.log("prije true");
        console.log(search);
        return true;
    }


    pretrazivanje(){
        var searchValue = document.getElementById("search").value ;
        localStorage.setItem('search',searchValue);
        localStorage.setItem('za',searchValue);
        //document.getElementById("search").value = searchValue;
        if(searchValue!=="")window.location.reload();
    }

    render() {
        var items = [];

        for (var a of this.state.elements) {

            var base64Image = `data:image/png;base64,${a.image}`;
            var stanje;
            if (a.condition.includes("RESERVED")) {
                stanje = "da"
            } else {
                stanje = "ne";
            }

            if(localStorage.getItem('search')!== undefined){
                if(a === this.state.elements[this.state.elements.length-1]) {
                    var search = localStorage.getItem('search');
                    localStorage.setItem("search", "");
                    localStorage.setItem("za",search);
                }
            }
            if(!this.checkAd(a))continue;

            items.push(
                <div className="card-oglas">
                    <div>
                        <img className="slika"
                             src={base64Image}
                             alt=""/>
                    </div>

                    <div className="NaslovIOpis">
                        <h2>{a.caption}</h2>
                        <p><b>Adresa
                            :</b> <br/> {a.sellerAddress.street} {a.sellerAddress.number}, {a.sellerAddress.city.postalCode} {a.sellerAddress.city.cityName}
                        </p>
                        <p className="opis">{a.description}</p>
                    </div>

                    <div>

                        <p><b>Izvorna cijena i popust :</b> <br/> {a.price}kn, {a.discount}%</p>
                        <p><b>Nova cijena :</b> {a.price * (100-a.discount) / 100 }kn</p>
                        <p><b>Rezerviran : </b>{stanje}</p>


                    </div>

                </div>
            )
        }




        function searchX() {

            localStorage.setItem('search',"");
            localStorage.setItem('za',"");
            window.location.reload();
        }


        var pretraga='';
        var x ='';
        var rijec= localStorage.getItem('za');
        if(rijec !== undefined  ) {
            if (rijec.length !==0) {
                pretraga = <h2>Pretraga za : {localStorage.getItem('za')} <button onClick={searchX}>x</button></h2>


            }
        }

        return (
            <div>
                <NavBar/>

                <div className=" card-svioglasi">
                    <AdsNavBar/>
                    <h1>Predani oglasi</h1>
                    <div className="flex">
                        <div className="vertikalno">

                            <button htmlFor="search" className="gumb1" onClick={this.pretrazivanje}>Pretraži</button>
                            <br></br>
                            <input type="text" id="search" name="search"></input>

                            {pretraga}
                            {x}
                        </div>




                    </div>
                    {items}
                </div>

            </div>

        )
    }
}
