import { Component, Inject } from '@angular/core';
import { Region, SABC, AIRPORT, Carbondex, AirportLanLon } from '../app/model/ParameterDocument';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService } from '../app/data.service';
import 'hammerjs';
import { AlertComponent } from './alert/alert.component';
import {Sort} from '@angular/material/sort';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'carbondex';

  fromCity = new FormControl();
  fromCityName: string;
  fromCityOptions: Observable<string[]>;
  toCity = new FormControl();
  toCityOptions: Observable<string[]>;
  toCityName: string;
  airportLatLon: AirportLanLon[];

  sortedData: SABC[];

  from: string;
  to: string;
  
  loading = false;
  regions: Region[];
  sabc: SABC[];
  originPort: string;
  carbondex: Carbondex[];

  hideLocation: boolean = true;
  hideSchedule: boolean = true;

  finalSABC: SABC[];
  airport: AIRPORT[];

  km: number;
  kg: number = 0;
  stops: number = 0;
  result: number;

  // results data
  fromCountry: string;
  toCountry: string;
  fromOriginCity: string;
  toOriginCity: string;
  origin: string;
  destination: string;
  portForm: FormGroup;

  fromPortCode: string;
  toPortCode: string;

  toDestinationAirport: AIRPORT[];

  location: string[] = [
    ,"Aksu (AKU)"
    ,"Guangzhou (CAN)"
    ,"Zhengzhou Xinzheng International Apt (CGO)"
    ,"Chongqing (CKG)"
    ,"Kashi Apt (KHG)"
    ,"Korla (KRL)"
    ,"Karamay (KRY)"
    ,"Xian Xianyang International Apt (XIY)"
    ,"Qoqek Apt (TCG)"
    ,"Urumqi Diwobao International Apt (URC)"
    ,"Yining (YIN)"
    ,"Beijing (PKX)"
    ,"Changsha Huanghua International Apt (CSX)"
    ,"Chengdu Shuangliu International Apt (CTU)"
    ,"Yan'an Ershilipu Apt (ENY)"
    ,"Hohhot Baita International Apt (HET)"
    ,"Hangzhou Xiaoshan International Apt (HGH)"
    ,"Jinghong (JHG)"
    ,"Quanzhou Jinjiang Apt (JJN)"
    ,"Kunming Wujiaba International Apt (KMG)"
    ,"Guiyang (KWE)"
    ,"Ningbo (NGB)"
    ,"Nanjing (NKG)"
    ,"Shanghai (PVG)"
    ,"Sanya (SYX)"
    ,"Shenzhen (SZX)"
    ,"Jinan Yaoqiang International Apt (TNA)"
    ,"Wuhan (WUH)"
    ,"Xiamen (XMN)"
    ,"Zunyi Xinzhou Apt (ZYI)"
    ,"Beijing (PEK)"
    ,"Lijiang Sanyi Apt (LJG)"
    ,"Tianjin (TSN)"
    ,"Lhasa Gongga Apt (LXA)"
    ,"Altay (AAT)"
    ,"Hami (HMI)"
    ,"Hotan (HTN)"
    ,"Kuqa Apt (KCA)"
    ,"Lanzhou Zhongchuan Apt (LHW)"
    ,"Qingdao (TAO)"
    ,"Hefei Xinqiao International Apt (HFE)"
    ,"Fuzhou (FOC)"
    ,"Haikou (HAK)"
    ,"Harbin (HRB)"
    ,"Guilin Liangjiang International Apt (KWL)"
    ,"Shanghai (SHA)"
    ,"Yantai (YNT)"
    ,"Baotou (BAV)"
    ,"Dongshan (DSN)"
    ,"Wusha (WUA)"
    ,"Changchun Longjia International Apt (CGQ)"
    ,"Dalian (DLC)"
    ,"Yinchuan Hedong International Apt (INC)"
    ,"Shenyang Taoxian International Apt (SHE)"
    ,"Shijiazhuang Zhengding International Apt (SJW)"
    ,"Taiyuan Wusu International Apt (TYN)"
    ,"Xuzhou Guanyin Apt (XUZ)"
    ,"Ulanhad Tuchengcity Apt (CIF)"
    ,"Zhuhai (ZUH)"
    ,"Xingyi (ACX)"
    ,"Zhangjiajie Hehua International Apt (DYG)"
    ,"Nanning Wuxu International Apt (NNG)"
    ,"Wenzhou (WNZ)"
    ,"Changde (CGD)"
    ,"Huaihua Zhijiang Apt (HJJ)"
    ,"Hengyang (HNY)"
    ,"Weihai Dashuipo Apt (WEH)"
    ,"Anshan Teng'ao Apt (AOG)"
    ,"Anqing (AQG)"
    ,"Beihai (BHY)"
    ,"Baoshan (BSD)"
    ,"Chenghai (CHG)"
    ,"Changzhi (CIH)"
    ,"Changzhou (CZX)"
    ,"Datong (DAT)"
    ,"Daxie (DAX)"
    ,"Dandong (DDG)"
    ,"Deqen Shangri-La Apt (DIG)"
    ,"Dali Apt (DLU)"
    ,"Enshi Xujiaping Apt (ENH)"
    ,"Fuqing (FUG)"
    ,"Guangyuan Panlong Apt (GYS)"
    ,"Heihe (HEK)"
    ,"Huai'An (HIA)"
    ,"Hulunbuir Hailar Apt (HLD)"
    ,"Ulan Hot Apt (HLH)"
    ,"Heshan (HSN)"
    ,"Huazhou (HUZ)"
    ,"Huangyan (HYN)"
    ,"Hanzhong (HZG)"
    ,"Qingyang Xifengzhen Apt (IQN)"
    ,"Jingdezhen (JDZ)"
    ,"Jiayuguan (JGN)"
    ,"Jinggangshan Apt (JGS)"
    ,"Jiangcun (JIC)"
    ,"Jiamusi (JMU)"
    ,"Jining (JNG)"
    ,"Jiuzhen (JUZ)"
    ,"Jixian (JXA)"
    ,"Jiaozhou (JZH)"
    ,"Ganzhou Huangjin Apt (KOW)"
    ,"Liancheng Apt (LCX)"
    ,"Luxi Apt/Dehong (LUM)"
    ,"Luoyang Beijiao Apt (LYA)"
    ,"Lianyungang (LYG)"
    ,"Linyizhan (LYI)"
    ,"Liuzhou (LZH)"
    ,"Laizhou (LZO)"
    ,"Mudanjiang Hailang Apt (MDG)"
    ,"Mianyang Nanjiao Apt (MIG)"
    ,"Meixian Changgangji Apt (MXZ)"
    ,"Nanchong (NAO)"
    ,"Qiqihar Sanjiazi Apt (NDG)"
    ,"Nanyang (NNY)"
    ,"Nantong (NTG)"
    ,"Luohe (OHE)"
    ,"Panzhihua Apt (PZI)"
    ,"Shantou (SWA)"
    ,"Simao (SYM)"
    ,"Tongren Fenhuang Apt (TEN)"
    ,"Tongliao Apt (TGO)"
    ,"Huangshan Tunxi International Apt (TXN)"
    ,"Yulin (UYN)"
    ,"Wendeng (WDS)"
    ,"Weifang (WEF)"
    ,"Wusong (WUS)"
    ,"Wuzhou (WUZ)"
    ,"Wu Xuan (WXN)"
    ,"Xiangfan (XFN)"
    ,"Xichang Qingshan Apt (XIC)"
    ,"Xining Caojiabao Apt (XNN)"
    ,"Yibin Caiba Apt (YBP)"
    ,"Guangong Apt/Yuncheng (YCU)"
    ,"Yichang (YIC)"
    ,"Yichang Sanxia Apt (YIH)"
    ,"Yiwu (YIW)"
    ,"Yanji Chaoyangchuan Apt (YNJ)"
    ,"Yancheng Nanyang International Apt (YNZ)"
    ,"Yueyang (YYA)"
    ,"Zhaotong Apt (ZAT)"
    ,"Zhanjiang Potou Apt (ZHA)"
    ,"Zhaoyuan (ZHY)"
    ,"Changde (CDE)"
    ,"Dunhuang Apt (DNH)"
    ,"Jinzhou (JNZ)"
    ,"Nyingchi Mainling Apt (LZY)"
    ,"Golmud (GOQ)"
    ,"Bangda (BPX)"
    ,"Gaoyou (GYU)"
    ,"Rikaze (RKZ)"
    ,"Huzhou (HZH)"
    ,"Guangzhou (GZG)"
    ,"Kangding (KGT)"
    ,"Dantu Xian (DTU)"
    ,"Qiemo Apt (IQM)"
    ,"Lianjiang (LNJ)"
    ,"Fuyun (FYN)"
    ,"Zhanjiang (ZNG)"
    ,"Shashi (SHS)"
    ,"Huangxingdao (HXD)"
    ,"Hong Kong (HKG)"
    ,"Ha Kwai Chung (HKC)"
    ,"Tokyo (NRT)"
    ,"Tokyo (HND)"
    ,"Nagoya, Aichi (NGO)"
    ,"Osaka (KIX)"
    ,"Nagoya, Aichi (NKM)"
    ,"Osaka (ITM)"
    ,"Sapporo (CTS)"
    ,"Fukuoka (FUK)"
    ,"Kikaishima (KKX)"
    ,"Kagoshima (KOJ)"
    ,"Yoronjima (RNJ)"
    ,"Tokunoshima (TKN)"
    ,"Komatsu, Ishikawa (KMQ)"
    ,"Hiroshima (HIJ)"
    ,"Okinawa (OKA)"
    ,"Sendai, Miyagi (SDJ)"
    ,"Kitakyushu (KKJ)"
    ,"Toyama (TOY)"
    ,"Izumo (IZO)"
    ,"Nagasaki (NGS)"
    ,"Amamioshima (ASJ)"
    ,"Shizuoka Apt (FSZ)"
    ,"Fukue, Nagasaki (FUJ)"
    ,"Hanamaki (HNA)"
    ,"Iburi (IBR)"
    ,"Ishigaki (ISG)"
    ,"Kochi (KCZ)"
    ,"Niigata (KIJ)"
    ,"Miyazaki, Miyazaki (KMI)"
    ,"Yakushima (KUM)"
    ,"Matsumoto (MMJ)"
    ,"Matsuyama (MYJ)"
    ,"Tokushima (TKS)"
    ,"Tsushima (TSJ)"
    ,"Okushiri (OIR)"
    ,"Sapporo (OKD)"
    ,"Kumamoto (KMJ)"
    ,"Okayama (OKJ)"
    ,"Shimojishima (SHI)"
    ,"Takamatsu (TAK)"
    ,"Yonago (YGJ)"
    ,"Osaka (UKB)"
    ,"Oki (OKI)"
    ,"Okinoerabu (OKE)"
    ,"Tanegashima (TNE)"
    ,"Asahikawa (AKJ)"
    ,"Aomori (AOJ)"
    ,"Akita (AXT)"
    ,"Yamagata (GAJ)"
    ,"Hakodate (HKD)"
    ,"Memanbetsu (MMB)"
    ,"Miyakojima (MMY)"
    ,"Oita (OIT)"
    ,"Iki (IKI)"
    ,"Iwakuni (IWK)"
    ,"Kumejima (UEO)"
    ,"Fukushima Apt (FKS)"
    ,"Kushiro (KUH)"
    ,"Misawa (MSJ)"
    ,"Tajima Apt / Toyooka (TJH)"
    ,"Saga (HSG)"
    ,"Rishiri (RIS)"
    ,"Nakashibetsu (SHB)"
    ,"Wakkanai (WKJ)"
    ,"Obihiro (OBO)"
    ,"Shoura (SYO)"
    ,"Tottori (TTJ)"
    ,"Ube (UBJ)"
    ,"Hachijojima (HAC)"
    ,"Iwami (IWJ)"
    ,"Monbetsu/Abashiri (MBE)"
    ,"Oniike (ONJ)"
    ,"Shirahama, Wakayama (SHM)"
    ,"Seoul (ICN)"
    ,"Seoul (GMP)"
    ,"Busan (PUS)"
    ,"Muan International Apt (MWX)"
    ,"Daegu (TAE)"
    ,"Cheongju Apt (CJJ)"
    ,"Jinju (HIN)"
    ,"Pohang (KPO)"
    ,"Gunsan (KUV)"
    ,"Gwangju (KWJ)"
    ,"Yeosu Apt (RSU)"
    ,"Ulsan (USN)"
    ,"Wonju (WJU)"
    ,"Yangyang-gun (YNY)"
    ,"Kuala Lumpur (KUL)"
    ,"Johor Bahru (JHB)"
    ,"Kuala Lumpur (SZB)"
    ,"Ba Kelalan (BKM)"
    ,"Long Lellang (LGL)"
    ,"Marudi, Sarawak (MUR)"
    ,"Miri, Sarawak (MYY)"
    ,"Long Seridan (ODN)"
    ,"Kota Kinabalu, Sabah (BKI)"
    ,"Bintulu, Sarawak (BTU)"
    ,"Kota Bharu (KBR)"
    ,"Kuching, Sarawak (KCH)"
    ,"Kudat, Sabah (KUD)"
    ,"Labuan, Sabah (LBU)"
    ,"Lahad Datu, Sabah (LDU)"
    ,"Limbang, Sarawak (LMN)"
    ,"Lawas, Sarawak (LWY)"
    ,"Mulu (MZV)"
    ,"Penang (Georgetown) (PEN)"
    ,"Sibu, Sarawak (SBW)"
    ,"Sandakan, Sabah (SDK)"
    ,"Tawau, Sabah (TWU)"
    ,"Bario (BBN)"
    ,"Mukah, Sarawak (MKM)"
    ,"Langkawi (LGK)"
    ,"Alor Setar (AOR)"
    ,"Ipoh (IPH)"
    ,"Malacca (MKZ)"
    ,"Kerteh (KTE)"
    ,"Kuantan (Tanjong Gelang) (KUA)"
    ,"Kuala Terengganu (TGG)"
    ,"Long Banga (LBP)"
    ,"Singapore (SIN)"
    ,"Singapore (XSP)"
    ,"Bangkok (BKK)"
    ,"Bangkok (DMK)"
    ,"Phuket (HKT)"
    ,"Chiang Mai International Apt (CNX)"
    ,"Hat Yai (HDY)"
    ,"Krabi (KBV)"
    ,"Buri Ram Apt (BFV)"
    ,"Mae Fah Luang - Chiang Rai International Apt (CEI)"
    ,"Mae Hong Son Apt (HGN)"
    ,"Khon Kaen (KKC)"
    ,"Nakhon Phanom Apt (KOP)"
    ,"Loei Apt (LOE)"
    ,"Lampang Apt (LPT)"
    ,"Mae Sot Apt (MAQ)"
    ,"Narathiwat (NAW)"
    ,"Nan Nakhon Apt (NNT)"
    ,"Nakhon Si Thammarat Apt (NST)"
    ,"Phitsanulok Apt (PHS)"
    ,"Phrae Apt (PRH)"
    ,"Roi Et Apt (ROI)"
    ,"Sakon Nakhon Apt (SNO)"
    ,"Sukhothai Apt (THS)"
    ,"Trang (TST)"
    ,"Ubon Ratchathani Apt (UBP)"
    ,"Ranong (UNN)"
    ,"Surat Thani Apt (URT)"
    ,"Koh Samui (USM)"
    ,"Udon Thani Apt (UTH)"
    ,"U-Tapao Rayong Pattaya International Apt (UTP)"
    ,"Hua Hin Apt (HHQ)"
    ,"Addis Ababa (ADD)"
    ,"Adelaide (ADL)"
    ,"Auckland (AKL)"
    ,"Almaty (ALA)"
    ,"Alger (Algiers) (ALG)"
    ,"Amsterdam (AMS)"
    ,"Anchorage (ANC)"
    ,"Ashkhabad (ASB)"
    ,"Athinai (ATH)"
    ,"Atlanta (ATL)"
    ,"Abu Dhabi (AUH)"
    ,"Baku (GYD)"
    ,"Barcelona (BCN)"
    ,"Berlin (TXL)"
    ,"Baghdad (BGW)"
    ,"Bangalore (BLR)"
    ,"Brisbane (BNE)"
    ,"Mumbai (ex Bombay) (BOM)"
    ,"Boston (BOS)"
    ,"Blagoveschensk (BQS)"
    ,"Brussel (Bruxelles) (BRU)"
    ,"Budapest (BUD)"
    ,"Bandar Seri Begawan (BWN)"
    ,"El Qahira (Cairo) (CAI)"
    ,"Kolkata (ex Calcutta) (CCU)"
    ,"Cebu (CEB)"
    ,"Christchurch (CHC)"
    ,"Chicago (ORD)"
    ,"Colombo (CMB)"
    ,"Cairns (CNS)"
    ,"Kobenhavn (CPH)"
    ,"Cincinnati (CVG)"
    ,"Dhaka (DAC)"
    ,"Da Nang (DAD)"
    ,"Delhi (DEL)"
    ,"Dallas-Fort Worth Int Apt (DFW)"
    ,"Doha (DOH)"
    ,"Denpasar, Bali (DPS)"
    ,"Darwin (DRW)"
    ,"Detroit (DTW)"
    ,"Dusseldorf (DUS)"
    ,"Davao, Mindanao (DVO)"
    ,"Dubai (DXB)"
    ,"Dubai (DWC)"
    ,"Dushanbe (DYU)"
    ,"Pyongyang (FNJ)"
    ,"Frankfurt am Main (FRA)"
    ,"Frankfurt am Main (HHN)"
    ,"Bishkek (ex Frunze) (FRU)"
    ,"Nizhniy Novgorod (ex Gorkiy) (GOJ)"
    ,"Geneve (GVA)"
    ,"Hanoi (HAN)"
    ,"La Habana (HAV)"
    ,"Henzada (HEB)"
    ,"Helsingfors (Helsinki) (HEL)"
    ,"Honolulu (HNL)"
    ,"Houston (IAH)"
    ,"Haiphong (HPH)"
    ,"Chita (HTA)"
    ,"Kiev (KBP)"
    ,"Irkutsk (IKT)"
    ,"Islamabad (ISB)"
    ,"Istanbul (IST)"
    ,"Jeddah (JED)"
    ,"Jakarta, Java (CGK)"
    ,"Johannesburg (JNB)"
    ,"Kemerovo (KEJ)"
    ,"Kigali (KGL)"
    ,"Kaohsiung (KHH)"
    ,"Karachi (KHI)"
    ,"Khabarovsk (KHV)"
    ,"Krasnojarsk (KJA)"
    ,"Kalibo (KLO)"
    ,"Kinmen (KNH)"
    ,"Kampong Saom (KOS)"
    ,"Krasnodar (KRR)"
    ,"Kathmandu (KTM)"
    ,"Kazan (KZN)"
    ,"Las Vegas (LAS)"
    ,"Los Angeles (LAX)"
    ,"Saint Petersburg (ex Leningrad) (LED)"
    ,"Liege (LGG)"
    ,"Lahore (LHE)"
    ,"Lisboa (LIS)"
    ,"London (LHR)"
    ,"London (STN)"
    ,"London (LGW)"
    ,"Lagos (LOS)"
    ,"Luang Prabang (LPQ)"
    ,"Luxembourg (LUX)"
    ,"Chennai (ex Madras) (MAA)"
    ,"Madrid (MAD)"
    ,"Muscat (MCT)"
    ,"Manado (MDC)"
    ,"Mandalay (MDL)"
    ,"Melbourne (MEL)"
    ,"Ciudad de Mexico (MEX)"
    ,"Macau (MFM)"
    ,"Milano (MXP)"
    ,"Male (MLE)"
    ,"Manila (MNL)"
    ,"Moskva (SVO)"
    ,"Moskva (DME)"
    ,"Moskva (VKO)"
    ,"Sir Seewoosagur Ramgoolam Int Apt (MRU)"
    ,"Minsk (MSQ)"
    ,"Munchen (MUC)"
    ,"Nairobi (NBO)"
    ,"Nha Trang (CXR)"
    ,"New York (EWR)"
    ,"New York (JFK)"
    ,"Novosibirsk (OVB)"
    ,"Paris (CDG)"
    ,"Perm (PEE)"
    ,"Perth (PER)"
    ,"Phnom Penh (PNH)"
    ,"Phu Quoc (PQC)"
    ,"Praha (PRG)"
    ,"Panama, Ciudad de (PTY)"
    ,"Siem Reap (REP)"
    ,"Yangon (RGN)"
    ,"Rome (Roma) (FCO)"
    ,"Riyadh (RUH)"
    ,"Saint-Denis de la Reunion (RUN)"
    ,"Sao Paulo (GRU)"
    ,"Seattle (SEA)"
    ,"San Francisco (SFO)"
    ,"Ho Chi Minh City (SGN)"
    ,"Xian Xianyang International Apt (SIA)"
    ,"San Jose (SJC)"
    ,"Saipan (SPN)"
    ,"Stockholm (ARN)"
    ,"Surabaya (SUB)"
    ,"South West Bay (SWJ)"
    ,"Sydney (SYD)"
    ,"Tashkent (TAS)"
    ,"Tbilisi (TBS)"
    ,"Tehran (IKA)"
    ,"Tijuana (TIJ)"
    ,"Tel Aviv-Yafo (TLV)"
    ,"Antananarivo (TNR)"
    ,"Taipei (TPE)"
    ,"Taipei (TSA)"
    ,"Ulaanbaatar (ULN)"
    ,"Ulan-Ude (UUD)"
    ,"Yuzhno-Sakhalinsk (UUS)"
    ,"Vienna (VIE)"
    ,"Vientiane (VTE)"
    ,"Vladivostok (VVO)"
    ,"Washington (IAD)"
    ,"Warszawa (WAW)"
    ,"Wenchang (WEC)"
    ,"Wuli (WLI)"
    ,"Yakutsk (YKS)"
    ,"Metropolitan Area Apt/Toronto (YYZ)"
    ,"Vancouver Apt (YVR)"
    ,"Zaragoza (ZAZ)"
    ,"Zurich (ZRH)"
    ,"Amman (AMM)"
    ,"Bahrain (BAH)"
    ,"Columbus (LCK)"
    ,"Cape Town (CPT)"
    ,"Ad Dammam (DMM)"
    ,"Dublin (DUB)"
    ,"Guadalajara (GDL)"
    ,"Hyderabad (HYD)"
    ,"Iloilo, Panay (ILO)"
    ,"Istanbul (ISL)"
    ,"Miami (MIA)"
    ,"Nadi (NaN)"
    ,"Oostende (Ostend) (OST)"
    ,"Portland (PDX)"
    ,"Port Moresby (POM)"
    ,"Sharjah (SHJ)"
    ,"Tainan (TNN)"
    ,"Toowoomba (WTB)"
    ,"Calgary Apt (YYC)"
    ,"Denver (DEN)"
    ,"Guam (GUM)"
    ,"Coggon (KOA)"
    ,"Kiruna (KRN)"
    ,"Minneapolis/St Paul Apt (MSP)"
    ,"Noumea (NOU)"
    ,"Gold Coast Apt/Coolangatta (OOL)"
    ,"Papeete (PPT)"
    ,"San Diego (SAN)"
    ,"Salt Lake City (SLC)"
    ,"Dalat (DLI)"
    ,"Oslo (OSL)"
    ,"Puerto Princesa, Palawan (PPS)"
    ,"Koror (ROR)"
    ,"Sao Paulo (VCP)"
    ,"Tagbilaran, Bohol (TAG)"
    ,"Venezia (VCE)"
    ,"Zagreb (ZAG)"
    ,"Amritsar (ATQ)"
    ,"Bhubaneswar (BBI)"
    ,"Bandung, Java (BDO)"
    ,"Batam (ex Batu Besar) (BTH)"
    ,"Banda Aceh (BTJ)"
    ,"Cochin (COK)"
    ,"Jaipur (JAI)"
    ,"Yogyakarta (JOG)"
    ,"Madinah (MED)"
    ,"Melbourne (AVV)"
    ,"Medan, Sumatra (KNO)"
    ,"Padang (PDG)"
    ,"Pekanbaru, Sumatra (PKU)"
    ,"Palembang, Sumatra (PLM)"
    ,"Pontianak, Kalimantan (PNK)"
    ,"Semarang (SRG)"
    ,"Tanjung Pandan (TJQ)"
    ,"Tarakan, Kalimantan (TRK)"
    ,"Thiruvananthapuram (ex Trivandrum) (TRV)"
    ,"Tiruchirapalli (TRZ)"
    ,"Ujung Pandang, Sulawesi (UPG)"
    ,"Can Tho (VCA)"
    ,"Varanasi (VNS)"
    ,"Visakhapatnam (VTZ)"
    ,"Ahmedabad (AMD)"
    ,"Balikpapan (BPN)"
    ,"Canberra (CBR)"
    ,"Coimbatore (CJB)"
    ,"Gauhati (Panidi) (GAU)"
    ,"Madurai (IXM)"
    ,"Paro (PBH)"
    ,"Wellington (WLG)"
    ,"Chelyabinsk (CEK)"
    ,"Gaya (GAY)"
    ,"Bagdogra (IXB)"
    ,"Kawthaung (KAW)"
    ,"Samara (KUF)"
    ,"Kuwait (KWI)"
    ,"Lucknow (LKO)"
    ,"Pakxe (PKZ)"
    ,"Rostov (ROV)"
    ,"Tyumen (TJM)"
    ,"Ufa (UFA)"
  ];

  constructor(private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient, private dialog: MatDialog, private service: DataService) { }

  ngOnInit() {

    this.loading = true;

    // subcribe regions
    this.httpClient.get<Region[]>('../assets/database/region.json').subscribe(data => {
      this.regions = data;
    });

    // subscribe SABC
    this.httpClient.get<SABC[]>('../assets/database/sabc.json').subscribe(data => {
      this.sabc = data;
    });

    // subscribe airport
    this.httpClient.get<AIRPORT[]>('../assets/database/airport.json').subscribe(data => {
      this.airport = data;
    });

    // subscribe carrier chart
    this.httpClient.get<Carbondex[]>('../assets/database/carbondexByCarrier.json').subscribe(data => {
      this.carbondex = data;
    });

    this.httpClient.get<AirportLanLon[]>('../assets/database/airportlatlon.json').subscribe(data => {
      this.airportLatLon = data;
    });

    this.portForm = this.formBuilder.group({
      destination: [null, Validators.required],
      weight: [null]
    });

    /*this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );*/

    this.fromCityOptions = this.fromCity.valueChanges.pipe(startWith(''), map(value => this._filter(value)))

    this.toCityOptions = this.toCity.valueChanges.pipe(startWith(''), map(value => this._filter(value)))

    this.loading = false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.location.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  fromCityChange(event) {
    this.fromCountry = this.sabc.filter(data=>data.fromCityNameDisplay===event)[0].fromCountryName; //this.getCountryName(this.sabc.filter(data=>data.fromCityNameDisplay===event)[0].fromCtry);
    this.fromCityName = event;
    this.from = this.fromCityName + ', ' + this.fromCountry
    if(this.toCity.value !== ''){
      this.toCity.setValue('', {emitEvent: false});
    }
    // console.log('event change:', this.getLocationCode(event)[0].portCode.substring(2,5));
    /*let region = {};
    region = this.getLocationCode(event);
    this.fromPortCode = region[0].portCode.substring(2,5); // this.getLocationCode(event)[0].portCode.substring(2,5);
    this.fromCountry = region[0].country;*/
    
    /*let filteredSABC = this.sabc.filter(data => data.fromCityNameDisplay === event);
    console.log(filteredSABC);*/
    // const headers = new HttpHeaders().set({"x-rapidapi-host": "greatcirclemapper.p.rapidapi.com",
    //                  "x-rapidapi-key": "94d5ad4d8emshefb0a656033a11dp17b138jsn08c6e8670644",
    //                  "vary": "Accept-Encoding",
    //                  "content-type":"text/html;charset=UTF-8"})
    // this.httpClient.get('https://greatcirclemapper.p.rapidapi.com/airports/route/EGLL-KJFK/510', this.httpOptions).pipe(retry(1),catchError(this.handleError);
    //console.log(this.getEmployee());
    // this.service.getDistance().subscribe(data => {
    //   console.log('call rest api:', data);
    // });
  }

  toCityChange(event) {
    const filteredSABC = this.sabc.filter(data=>data.toCityNameDisplay===event)[0];
    this.toCountry = filteredSABC.toCountryName; //this.sabc.filter(data=>data.toCityNameDisplay===event)[0].toCountryName; //this.getCountryName(this.sabc.filter(data=>data.fromCityNameDisplay===event)[0].fromCtry);
    this.to = event + ', ' + this.toCountry;
    // perform search
    this.loading = true;
    // console.log('from city:', this.fromCityName, 'to city:', event);
    this.finalSABC = this.sabc.filter(data => 
      data.fromCityNameDisplay === this.fromCityName
      && data.toCityNameDisplay === event
      );
    if(this.finalSABC.length===0){
     // console.log('empty...')
      this.hideSchedule = true;
      this.dialog.open(DialogComponent);
    }else{
      this.hideSchedule = false;
      this.km =  this.getDistance(this.finalSABC[0].fromAirport,this.finalSABC[0].toAirport);
      this.sortedData = this.finalSABC.slice();
      // console.log(this.finalSABC);
    }
    this.loading = false;
    
  }

  weightChange() {
    this.kg =  parseInt(this.portForm.get('weight').value);
    if(this.kg>90000){
      this.dialog.open(AlertComponent);
      this.portForm.get('weight').setValue('');
      this.kg = 0;
    }
  }

  getSchedule(servDay: string): string[] {
    const tbs = [];
    for(let i=0; i<servDay.length; i++){
      tbs.push(servDay.charAt(i) ==='.'? 'N' : 'Y');
    }
    return tbs;
  }

  getCountryName(countryCode: string) {
    const result:Region[] = this.regions.filter(data=>data.countryCode === countryCode);
    return result[0].country;
  }

  getCityName(code: string) {
    const result:Region[] = this.regions.filter(data=>data.portCode === code);
    const v = result[0].location!==undefined ? result[0].location : code;
    return v; // result[0].location!==undefined?result[0].location:code;
  }

  getLocationCode(location: string): Region[] {
    return this.regions.filter(data => data.location === location);
  }

  getColor(param:string) {
    if (param==='Y') {
      return 'green';
    } else if (param==='N') {
      return 'red';
    }
  }

  getCarbondex(param:string): any {

    let carbondex = '0';
    const result = this.carbondex.filter(data => data.Code === param.substring(0,2));
    if(result.length!==0) {
      carbondex = result[0].Carbondex;
    }
    return parseFloat(carbondex).toFixed(3)
  }

  convertDecimal(param: string) {
    return parseFloat(param).toFixed(3);
  }

  sortData(sort: Sort) {
    const data = this.finalSABC.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'flight': return compare(a.flight, b.flight, isAsc);
        case 'aircraft': return compare(a.aircraft, b.aircraft, isAsc);
        case 'carbondexunit': return compare(this.getCarbondex(a.flight),this.getCarbondex(b.flight), isAsc);
        case 'sdate': return compare(a.effectDate, b.effectDate, isAsc);
        case 'edate': return compare(a.expiryDate, b.expiryDate, isAsc);
        case 'dtime': return compare(this.toHHMM(a.dtime), this.toHHMM(b.dtime), isAsc);
        case 'atime': return compare(this.toHHMM(a.atime), this.toHHMM(b.atime), isAsc);
        // tslint:disable-next-line:max-line-length
        case 'totalcarbondex': return compare(this.getCarbondex(a.flight) as any * (this.km/1000)*this.kg, this.getCarbondex(b.flight) as any * (this.km/1000) * this.kg, isAsc);
        default: return 0;
      }
    });
  }


  getDistance(from:string, to:string): number {
    const fromAir = this.airportLatLon.filter(data => data.iata === from);
    const toAir = this.airportLatLon.filter(data => data.iata === to);
    const fromLat = parseInt(fromAir[0].lat);
    const fromlon = parseInt(fromAir[0].lon);
    const toLat = parseInt(toAir[0].lat);
    const toLon = parseInt(toAir[0].lon);
    // let distance = Math.acos(Math.cos(this.toRadians(90 - 22.308901)) // FROMAIRPORTLAT
    // * Math.cos(this.toRadians(90 - 2.745579957962)) // TOAIRPORTLAT
    // + Math.sin(this.toRadians(90 - 22.308901)) // FROMAIRPORTLAT
    // * Math.sin(this.toRadians(90 - 2.745579957962)) // TOAIRPORTLAT
    // // FROMAIRPORTLONG - TOAIRPORTLONG
    // * Math.cos(this.toRadians(113.915001) - this.toRadians(101.70999908447))) * 6371;
    const distance = Math.acos(Math.cos(this.toRadians(90 - fromLat)) // FROMAIRPORTLAT
    * Math.cos(this.toRadians(90 - toLat)) // TOAIRPORTLAT
    + Math.sin(this.toRadians(90 - fromLat)) // FROMAIRPORTLAT
    * Math.sin(this.toRadians(90 - toLat)) // TOAIRPORTLAT
    // FROMAIRPORTLONG - TOAIRPORTLONG
    * Math.cos(this.toRadians(fromlon) - this.toRadians(toLon))) * 6371;
    return Math.trunc(distance);
  }

  toRadians(degrees:number) {
    return degrees * Math.PI / 180;
  }

  openDialog() {
    //const dialogRef = this.dialog.open(DialogComponent, {width: '250px'});
    this.dialog.open(DialogComponent);
  }

  toHHMM(param: string) {
    let formatTime = null;
    if( param.length === 1 ) {
      formatTime = '00:0' + param;
    }else if ( param.length === 2 ) {
      formatTime = '00:' + param;
    }else if ( param.length === 3 ) {
      formatTime = '0'+ param.substring(0,1) + ':' + param.substring(1,3);
    }else {
      formatTime = param.substring(0,2) + ':' + param.substring(2,4);
    }
    return formatTime;
  }

  availableDay(param: string) {
    let obj = null;
    if(param==='Y'){
      obj =  '<img src="../assets/tick.PNG" width="25" height="25"/>';
    }
    return obj;
  }

  toDateFormat(inputDate: string) {
    let convertMsg = null;
    if(inputDate === '0') {
      convertMsg = 'Start of winter schedule';
    } else if(inputDate === '99999999') {
      convertMsg = 'End of winter schedule';
    } else {
      convertMsg = inputDate.substring(0,4) + '-' + inputDate.substring(6,4) + '-' + inputDate.substring(8,6);
    }
    return convertMsg;
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}