export interface Carbondex {
    Carrier: string;
    Code: string;
    Carbondex: string;
}

export interface Region {
    portCode: string; //city code: region code + city code
    location: string;
    countryCode: string;
    country: string;
}

export interface SABC {
    leg: string;
    fromCtry: string;
    toCtry: string;
    fromCityName: string;
    fromCityNameDisplay: string;
    toCityName: string;
    toCityNameDisplay: string;
    fromCity: string;
    toCity: string;
    fromCountryName: string;
    toCountryName: string;
    fromAirport: string;
    toAirport: string;
    effectDate: string;
    expiryDate: string;
    servDay: string;
    dtime: string;
    atime: string;
    flight: string;
    stops: string;
    aircraft: string;
}

export interface AIRPORT {
    fromAirp: string;
    toAirp: string;
}

export interface AirportLanLon {
    iata: string;
    lat: string;
    lon: string;
}