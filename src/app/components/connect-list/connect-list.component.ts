import { Component, OnInit } from '@angular/core';
import {usb} from 'webusb';
import {webusb} from "usb";

@Component({
  selector: 'app-connect-list',
  templateUrl: './connect-list.component.html',
  styleUrls: ['./connect-list.component.scss']
})
export class ConnectListComponent implements OnInit {
  device: any;

  constructor() { }

  ngOnInit(): void {
  }

  connect()  {
    navigator.usb.requestDevice( {filters: [{vendorId: 1899}]})// фильтр может быть пустым
      .then(selectedDevice => {
        this.device = selectedDevice;
        console.log(this.device)
        // return this.device.open(); //начинаем сеанс
      })
      .then(() => this.device.open())
      .then(() => this.device.selectConfiguration()) // выбираем для устройства конфигурацию #1.
      .then(() => this.device.claimInterface()) // Запрашиваем эксклюзивный контроль над интерфейсом #2.
      .catch(error => { console.error(error); });


    // https://github.com/geryb-bg/webusb/tree/master/finger-print-demo - пример с фингерпринтом


    // await device.open();
    // await device.selectConfiguration(1);
    // await device.claimInterface(0);
    //
    // //TURN ON
    // await device.transferOut(6, new Uint8Array(getCommand));
    // await device.transferIn(5, 512);
    // await setDeviceConfig();
  }


    // vendorId: 0xabcd
}
