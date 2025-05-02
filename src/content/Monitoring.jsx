import React, { useEffect, useRef } from "react";

// const minRequiredBatt = 95;

function Monitoring() {
  // const lowBattFlag = useRef("No");
  // const battChargeFlag = useRef("No");
  // const usbFound = useRef("No");

  // const batteryMonitoring = () => {
  //   navigator.getBattery().then((battery) => {
  //     const battChargeStatus = battery.charging ? "Yes" : "No";
  //     const battLevel = battery.level * 100;

  //     if (
  //       battChargeStatus === "No" &&
  //       battChargeFlag.current === "No" &&
  //       lowBattFlag.current === "No"
  //     ) {
  //       const flag = {
  //         flag_type: "WHITE",
  //         transfer_to: "Don't Transfer",
  //         reason: "Battery Alert",
  //         attachments: "",
  //         object: "",
  //         sender: "Examlock lite",
  //         comment: "System is not charging",
  //         timestamp: Date.now(),
  //         upload_status: false,
  //         key: "",
  //         status: "",
  //         proctorComment: "",
  //       };

  //       const message = {
  //         action: "sendFlags",
  //         data: flag,
  //       };

  //       chrome.runtime.sendMessage(message, (response) => {
  //         console.log(response);
  //       });

  //       chrome.storage.local.set({ recTrigger: "playPauseRec" }, function () {
  //         console.log("Value is set to " + "playPauseRec");
  //       });

  //       battChargeFlag.current = "Yes";
  //     } else if (
  //       battChargeStatus === "No" &&
  //       battChargeFlag.current === "Yes" &&
  //       lowBattFlag.current === "No"
  //     ) {
  //       if (lowBattFlag.current === "No" && battLevel < minRequiredBatt) {
  //         const flag = {
  //           flag_type: "WHITE",
  //           transfer_to: "Don't Transfer",
  //           reason: "Battery Alert",
  //           attachments: "",
  //           object: "",
  //           sender: "Examlock lite",
  //           comment: `low battery ${battLevel}%`,
  //           timestamp: Date.now(),
  //           upload_status: false,
  //           key: "",
  //           status: "",
  //           proctorComment: "",
  //         };

  //         const message = {
  //           action: "sendFlags",
  //           data: flag,
  //         };

  //         chrome.runtime.sendMessage(message, (response) => {
  //           console.log(response);
  //         });
  //         lowBattFlag.current = "Yes";
  //       }
  //       console.log(`Battery level: ${battLevel}%`);
  //     } else {
  //       battChargeFlag.current = "No";
  //     }
  //   });
  // };

  // const checkUSB = () => {
  //   chrome.storage.local.get(["usbStatus"], function (result) {
  //     if (result.usbStatus === "No USB") {
  //       if (usbFound.current === "No") {
  //         const flag = {
  //           flag_type: "RED",
  //           transfer_to: "Don't Transfer",
  //           reason: "USB Alert",
  //           attachments: "",
  //           object: "",
  //           comment: `USB device connected or found.`,
  //           timestamp: Date.now(),
  //         };
  //         let message = {
  //           action: "sendFlags",
  //           data: flag,
  //         };
  //         chrome.runtime.sendMessage(message, (response) => {
  //           console.log(response);
  //         });
  //         usbFound.current = "Yes";
  //       }
  //     }
  //   });
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     batteryMonitoring();
  //     checkUSB();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  return <div></div>;
}

export default Monitoring;
