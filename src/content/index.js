console.log("content.js is injected");
import React from "react";
import ReactDOM from "react-dom";
import "../index.css";
import Content from "./content";
import { StateProvider } from "./Contentstate";

const loginStatus = true;
// let examStatus = "Scheduled";
let requestFeatures = [];
let devRemove = false;
let listenersActive = false;
let tdsURL = "https://testconsole"
let logo = `<svg
width="26"
height="29"
viewBox="0 0 26 29"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<g clip-path="url(#clip0_272_2693)">
  <path
    d="M12.7501 19.4032C12.6526 19.4913 12.5513 19.5758 12.4518 19.6602C12.4481 19.6621 12.4443 19.6658 12.4424 19.6677C9.97723 21.7239 6.89291 22.8683 3.72978 22.9565C3.48401 22.964 3.23824 22.964 2.9906 22.9565C2.60412 22.9152 2.2289 22.8064 1.87994 22.6357L1.4747 22.4012C1.16702 22.1929 0.889353 21.9303 0.658592 21.6188C0.527264 21.405 0.401565 21.1892 0.281494 20.9678C0.105139 20.5645 0.0132098 20.1423 0.00195312 19.7221V8.65867C0.0132098 8.23843 0.105139 7.8163 0.281494 7.41294C0.401565 7.19343 0.527264 6.9758 0.658592 6.76193C0.876221 6.4655 1.137 6.21598 1.42592 6.01336L1.93435 5.72069L10.3356 0.870942L10.8667 0.567383C10.5196 0.809401 10.1761 1.13923 9.94346 1.49193C9.86654 1.60638 9.71913 1.95544 9.65721 2.07926C8.02875 5.00975 7.54955 8.2403 8.2287 11.5817C8.527 13.045 9.06169 14.4877 9.84966 15.8517C10.5682 17.0955 11.4443 18.1893 12.4424 19.1217C12.4462 19.1255 12.4499 19.1274 12.4518 19.1311C12.5494 19.223 12.6488 19.3131 12.7501 19.4013V19.4032Z"
    fill="url(#paint0_linear_272_2693)"
  />
  <path
    d="M25.487 19.3611V19.8771C25.4513 20.3423 25.3162 20.8076 25.0761 21.241C25.0761 21.2429 25.0742 21.2447 25.0724 21.2485C25.0536 21.2804 25.0348 21.3123 25.0161 21.3461C24.7384 21.8076 24.3669 22.1772 23.9392 22.4473L23.7084 22.5805L23.125 22.9182L14.5962 27.8411L14.2303 28.0531C13.8814 28.2257 13.4986 28.3402 13.0953 28.3815C13.0821 28.3815 13.0709 28.3815 13.0577 28.3815C13.054 28.3815 13.0502 28.3815 13.0484 28.3815C13.0409 28.3815 13.0334 28.3815 13.024 28.3815C13.0127 28.3815 13.0015 28.3815 12.9902 28.3815C12.9902 28.3815 12.9789 28.3815 12.9733 28.3815C12.9489 28.3815 12.9227 28.3815 12.8983 28.3815C12.8514 28.3815 12.8045 28.3815 12.7557 28.3815C12.6994 28.3815 12.6412 28.3815 12.585 28.3815C12.5418 28.3815 12.4968 28.3815 12.4536 28.3796C12.4499 28.3796 12.4461 28.3796 12.4443 28.3796C12.4255 28.3796 12.4067 28.3796 12.388 28.3796C11.994 28.3383 11.6188 28.2276 11.2773 28.0606L10.874 27.828L2.38831 22.9295L1.87988 22.6349C2.22884 22.8057 2.60801 22.9047 2.99054 22.9558C3.21276 22.9424 3.25056 22.9691 3.72973 22.9558C6.89285 22.8676 9.97717 21.7232 12.4424 19.6669C12.4461 19.6651 12.4499 19.6613 12.4518 19.6594C12.5531 19.575 12.6525 19.4906 12.7501 19.4024C12.7501 19.4024 12.7519 19.4043 12.7538 19.4062V19.4005C12.8514 19.3142 12.9489 19.2242 13.0465 19.1341C13.0502 19.1304 13.054 19.1285 13.0559 19.1247C14.0483 18.1942 14.9226 17.1042 15.6374 15.8641C16.4291 14.4945 16.9657 13.0461 17.2621 11.5771C20.5359 12.6728 23.2769 14.9279 24.9973 17.8565C24.9973 17.8565 24.9973 17.8565 24.9973 17.8584C25.0273 17.9109 25.0573 17.9615 25.0874 18.0141C25.3125 18.4306 25.4476 18.8883 25.4851 19.3593L25.487 19.3611Z"
    fill="url(#paint1_linear_272_2693)"
  />
  <path
    d="M25.4871 8.51027V19.3617C25.4514 18.8908 25.3163 18.4311 25.0893 18.0165C25.0612 17.964 25.0312 17.9115 24.9993 17.8608C24.9993 17.8608 24.9993 17.8608 24.9993 17.8589C23.2789 14.9303 20.5379 12.6752 17.2641 11.5796C15.9376 11.1349 14.5249 10.8817 13.0578 10.8517C13.0541 10.8517 13.0503 10.8517 13.0484 10.8517C12.9509 10.8498 12.8533 10.8479 12.7558 10.8479C12.6582 10.8479 12.555 10.8479 12.4537 10.8517C12.45 10.8517 12.4462 10.8517 12.4443 10.8517C10.9735 10.8835 9.55887 11.1387 8.23059 11.5852C7.5028 8.18328 8.11239 4.78806 9.73898 1.8557C9.81426 1.71999 9.84156 1.60433 9.9407 1.49321C10.0305 1.30195 10.451 0.831765 10.8234 0.593082L11.3299 0.300409C11.6564 0.148444 12.0128 0.0471338 12.3862 0.00773548C12.4049 0.00773548 12.4237 0.00773548 12.4425 0.00773548C12.4462 0.00773548 12.45 0.00773548 12.4518 0.00773548C12.5006 0.00773548 12.5494 0.00773548 12.5982 0.00585938C12.6507 0.00585938 12.7014 0.00585938 12.7539 0.00585938C12.8064 0.00585938 12.8571 0.00585938 12.9096 0.00585938C12.949 0.00585938 12.9865 0.00585938 13.0241 0.00585938C13.0316 0.00585938 13.0372 0.00585938 13.0447 0.00585938C13.0484 0.00585938 13.0522 0.00585938 13.0541 0.00585938C13.0672 0.00585938 13.0785 0.00585938 13.0916 0.00585938C13.4724 0.0452577 13.8364 0.148444 14.1685 0.306037L14.2304 0.341683L14.6112 0.563064L14.6469 0.583701L15.1347 0.865118L23.6241 5.76552L24.0049 5.9869C24.4008 6.25143 24.746 6.60601 25.0086 7.04127C25.0274 7.07316 25.0462 7.10506 25.0649 7.13883C25.0649 7.14071 25.0668 7.14258 25.0687 7.14633C25.3088 7.57971 25.4439 8.04499 25.4795 8.51027H25.4871Z"
    fill="url(#paint2_linear_272_2693)"
  />
  <path
    d="M13.5346 13.7087C13.5346 14.0389 13.332 14.3222 13.0449 14.4404V15.96C13.0449 16.127 12.9099 16.2621 12.7429 16.2621C12.5759 16.2621 12.4408 16.127 12.4408 15.96V14.4404C12.1538 14.3222 11.9512 14.0389 11.9512 13.7087C11.9512 13.3785 12.1538 13.0952 12.4408 12.977C12.5346 12.9376 12.636 12.917 12.7429 12.917C12.8498 12.917 12.9511 12.9376 13.0449 12.977C13.332 13.0952 13.5346 13.3785 13.5346 13.7087Z"
    fill="url(#paint3_linear_272_2693)"
  />
</g>
<defs>
  <linearGradient
    id="paint0_linear_272_2693"
    x1="6.3751"
    y1="22.0184"
    x2="6.3751"
    y2="3.84645"
    gradientUnits="userSpaceOnUse"
  >
    <stop stop-color="#28AAE1" />
    <stop offset="0.03" stop-color="#23A1DA" />
    <stop offset="0.15" stop-color="#1483C0" />
    <stop offset="0.28" stop-color="#096DAE" />
    <stop offset="0.39" stop-color="#0260A3" />
    <stop offset="0.5" stop-color="#005CA0" />
    <stop offset="0.6" stop-color="#0464A7" />
    <stop offset="0.77" stop-color="#117DBB" />
    <stop offset="0.97" stop-color="#25A4DC" />
    <stop offset="1" stop-color="#28AAE1" />
  </linearGradient>
  <linearGradient
    id="paint1_linear_272_2693"
    x1="8.13108"
    y1="25.5467"
    x2="22.6484"
    y2="15.6108"
    gradientUnits="userSpaceOnUse"
  >
    <stop offset="0.02" stop-color="#28AAE1" />
    <stop offset="0.06" stop-color="#219ED7" />
    <stop offset="0.17" stop-color="#1381BF" />
    <stop offset="0.28" stop-color="#086CAD" />
    <stop offset="0.39" stop-color="#0260A3" />
    <stop offset="0.5" stop-color="#005CA0" />
    <stop offset="0.6" stop-color="#0464A7" />
    <stop offset="0.77" stop-color="#117DBB" />
    <stop offset="0.97" stop-color="#25A4DC" />
    <stop offset="1" stop-color="#28AAE1" />
  </linearGradient>
  <linearGradient
    id="paint2_linear_272_2693"
    x1="9.01668"
    y1="4.82371"
    x2="24.8867"
    y2="12.9604"
    gradientUnits="userSpaceOnUse"
  >
    <stop offset="0.02" stop-color="#28AAE1" />
    <stop offset="0.06" stop-color="#219ED7" />
    <stop offset="0.17" stop-color="#1381BF" />
    <stop offset="0.28" stop-color="#086CAD" />
    <stop offset="0.39" stop-color="#0260A3" />
    <stop offset="0.5" stop-color="#005CA0" />
    <stop offset="0.6" stop-color="#0464A7" />
    <stop offset="0.77" stop-color="#117DBB" />
    <stop offset="0.97" stop-color="#25A4DC" />
    <stop offset="1" stop-color="#28AAE1" />
  </linearGradient>
  <linearGradient
    id="paint3_linear_272_2693"
    x1="12.1951"
    y1="14.9282"
    x2="13.4802"
    y2="14.0051"
    gradientUnits="userSpaceOnUse"
  >
    <stop stop-color="#194789" />
    <stop offset="0.64" stop-color="#2389C3" />
    <stop offset="1" stop-color="#28AAE1" />
  </linearGradient>
  <clipPath id="clip0_272_2693">
    <rect width="25.487" height="28.3855" fill="white" />
  </clipPath>
</defs>
</svg>`;

/**
 * get security features from background.js
 */
function getSecurityFeatures() {
  requestFeatures = [];
  chrome.storage.local.get(null, function (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && key.startsWith("requestFeature_")) {
        requestFeatures.push(obj[key]);
      }
    }
    addListeners(requestFeatures);
  });
}

/**
 * Trigger video function
 */
// function Trigger() {
//   let rootElement = document.getElementById("root");

//   if (!rootElement) {
//     rootElement = document.createElement("div");
//     rootElement.id = "root";
//     document.body.appendChild(rootElement);
//   }

//   ReactDOM.render(
//     <React.StrictMode>
//       <StateProvider>
//         <Content />
//       </StateProvider>
//     </React.StrictMode>,
//     rootElement
//   );
//   return true;
// }

//===============================================================
// @DOM listener
//===============================================================
document.addEventListener("DOMContentLoaded", function (e) {
  let spaceCount = 0;
  // const body = document.querySelector("body");

  /**
   * unblock content function
   */
  const unBlockContent = () => {
    const data = {
      trigger: "exam-play",
    };
    window.postMessage(data, "*");
    disabledEvent(e);
  };

  /**
   * fullscreen exit detection
   */
  document.addEventListener("fullscreenchange", exitHandler, false);
  document.addEventListener("mozfullscreenchange", exitHandler, false);
  document.addEventListener("MSFullscreenChange", exitHandler, false);
  document.addEventListener("webkitfullscreenchange", exitHandler, false);

  function exitHandler() {
    if (requestFeatures.includes("FULLSCREEN_DETECTION")) {
      if (
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        let value = {
          remark: `Candidate has exited the full screen ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(`Full screen exited`, JSON.stringify(value), false);
        // blockContent();
        makeTabFullScreen();
      }
    }
  }

  /**
   * Key Blocker functions
   */
  document.addEventListener("keydown", function (e) {
    if (
      requestFeatures.includes("KEY_BLOCKER") &&
      loginStatus === true
      // examStatus === "inProgress"
    ) {
      if (e.altKey && "tab".indexOf(e.key) !== -1) {
        let value = {
          remark: `Content blocked since the candidate pressed alt and ${e.key} key which is not allowed in the url ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(
          `Restricted key pressed alt and ${e.key} key`,
          JSON.stringify(value),
          true
        );
      } else if (e.ctrlKey && "tab".indexOf(e.key) !== -1) {
        let value = {
          remark: `Content blocked since the candidate pressed ctrl and ${e.key} key which is not allowed in the url ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(
          `Restricted key pressed ctrl and ${e.key} key`,
          JSON.stringify(value),
          true
        );
      } else if (
        (e.metaKey && e.key == "PrintScreen") ||
        e.key == "PrintScreen"
      ) {
        let value = {
          remark: `Content blocked since the candidate tried to print the screen in the url ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(
          `Restricted key print screen detected`,
          JSON.stringify(value),
          true
        );
      } else if (e.ctrlKey && e.shiftKey) {
        let value = {
          remark: `Content blocked since the candidate pressed ctrl and ${e.key} in the url ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(
          `Restricted key pressed ctrl and ${e.key}`,
          JSON.stringify(value),
          true
        );
      } else if (e.shiftKey && e.metaKey) {
        let value = {
          remark: `Content blocked since the candidate pressed shift and ${e.metaKey} in the url ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(
          `Restricted key pressed shift and ${e.metaKey}`,
          JSON.stringify(value),
          false
        );
      } else if (e.ctrlKey && e.shiftKey && "34".indexOf(e.key)) {
        let value = {
          remark: `Pressed ctrl key, shift key and ${e.key} key in the url ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(
          `Restricted key pressed ctrl key, shift key and ${e.key} key`,
          JSON.stringify(value),
          true
        );
      } else if (e.ctrlKey && e.shiftKey) {
        let value = {
          remark: `Pressed ctrl key, shift key and ${e.key} key in the url ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(
          `Restricted key pressed ctrl key, shift key and ${e.key}`,
          JSON.stringify(value),
          true
        );
      } else if (
        [
          // "Shift",
          // "Control",
          "Alt",
          "Meta",
          "meta",
          // "control",
          "alt",
          // "shift",
          "Escape",
          "escape",
        ].includes(e.key)
      ) {
        let value = {
          remark: `Content blocked since the candidate pressed ${e.key} key which is not allowed in the url ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(
          `Restricted key pressed ${e.key}`,
          JSON.stringify(value),
          true
        );
      } else if (
        [
          "F1",
          "F2",
          "F3",
          "F4",
          "F5",
          "F6",
          "F7",
          "F8",
          "F9",
          "F10",
          "F11",
          "F12",
        ].includes(e.key)
      ) {
        let value = {
          remark: `Content blocked since the candidate pressed ${e.key} key which is not allowed in the url ${window.location.href}`,
        };
        actionLogger(
          `Restricted key pressed ${e.key} key`,
          JSON.stringify(value),
          true
        );
      } else if (e.ctrlKey && "cvxspwuaz".indexOf(e.key) !== -1) {
        let value = {
          remark: `Content blocked since the candidate pressed ctrl key and ${e.key} in the url ${window.location.href}`,
        };
        disabledEvent(e);
        actionLogger(
          `Restricted key pressed ctrl key and ${e.key}`,
          JSON.stringify(value),
          true
        );
      } else if (e.key === " ") {
        spaceCount++;
        if (spaceCount === 2) {
          unBlockContent();
          spaceCount = 0;
          // makeTabFullScreen();
        }
      } else {
        // console.log("Keydown event failed", e);
      }
    }
  });

  /**
   * logging trigger
   */
  function actionLogger(reason, cmt, block) {
    let flag = {
      flag_type: "RED",
      transfer_to: "Don''t Transfer",
      reason: reason,
      attachments: "",
      object: "",
      comment: cmt,
      sender: "Examlock lite",
      timestamp: Date.now(),
      key: "",
      status: "",
      proctorComment: "",
      // upload_status: false,
    };
    let message = {
      action: "sendFlags",
      data: flag,
      blockContent: block,
    };

    console.log(message);

    chrome.runtime.sendMessage(message, (response) => {
      // console.log(response);
    });
    // console.log("Flag triggered");
  }
});

/**
 * Function to make the tab full screen
 */
function makeTabFullScreen() {
  if (window.location.href.startsWith(tdsURL)) {
    console.log("Inside an iframe. Skipping fullscreen popup.");
    return;
  }

  const docElm = document.documentElement;

  const isFullScreen =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;

  // Check if already showing popup
  if (
    document.getElementById("fs-confirm-overlay") ||
    document.getElementById("extension-warning-overlay")
  ) {
    console.log("Another popup is already open.");
    return;
  }

  if (
    loginStatus === true &&
    // examStatus === "inProgress" &&
    requestFeatures.includes("FULLSCREEN_DETECTION") &&
    !isFullScreen
  ) {
    const dialogWrapper = document.createElement("div");
    dialogWrapper.id = "fs-confirm-overlay";
    dialogWrapper.innerHTML = `
      <div class="fs-confirm-overlay">
        <div class="fs-confirm-box">
          ${logo}
          <h3>In order to continue your exam, please allow full screen mode</h3>
          <div class="fs-confirm-buttons">
            <button id="fs-accept">Allow</button>
          </div>
        </div>
      </div>`;
    // <button id="fs-reject">Quit Exam</button>

    const style = document.createElement("style");
    style.textContent = `
      .fs-confirm-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .fs-confirm-box {
        display: flex;
        flex-direction: column !important;
        align-items: center;
        justify-content: center;
        background: white;
        padding: 20px 30px;
        border-radius: 6px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        text-align: center;
        font-family: Arial, sans-serif;
      }
      .fs-confirm-buttons {
        margin-top: 15px;
      }
      .fs-confirm-buttons button {
        border: 1px solid black;
        border-radius: 5px;
        margin: 0 8px;
        padding: 8px 16px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(dialogWrapper);

    document.getElementById("fs-accept").onclick = () => {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullscreen) {
        docElm.webkitRequestFullscreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
        disabledEvent(docElm);
      }
      dialogWrapper.remove();
      // console.log("Entered fullscreen mode.");
    };

    // document.getElementById("fs-reject").onclick = () => {
    //   dialogWrapper.remove();
    //   console.log("User rejected fullscreen.");
    // };
  } else {
    if (isFullScreen) {
      // console.log("Already in fullscreen");
    } else {
      // console.log("Exam is not running or fullscreen not requested");
    }
  }
}

/**
 * additional extensions popup
 */
function additionalExtensionpopup(extensionList) {
  if (window.location.href.startsWith(tdsURL)) {
    return;
  }

  if (extensionList && extensionList.length == 0) {
    const element = document.getElementById("extension-warning-overlay");
    if (element) {
      element.remove();
    }
  }

  if (
    document.getElementById("extension-warning-overlay") ||
    document.getElementById("fs-confirm-overlay") ||
    extensionList.length == 0
  ) {
    return;
  }
  const dialogWrapper = document.createElement("div");
  dialogWrapper.id = "extension-warning-overlay";
  dialogWrapper.innerHTML = `
    <div class="fs-confirm-overlay">
      <div class="fs-confirm-box">
        ${logo}
        <h3>Examlock lite has detected additional extensions on your browser. Please remove them to continue.</h3>
        <ul id="extension-list"></ul>
        <div class="fs-confirm-buttons">
          <button id="ext-ok">Uninstall</button>
        </div>
      </div>
    </div>
  `;

  const listContainer = dialogWrapper.querySelector("#extension-list");
  extensionList.forEach((ext) => {
    const listItem = document.createElement("li");
    listItem.textContent = ext;
    listContainer.appendChild(listItem);
  });

  const style = document.createElement("style");
  style.textContent = `
    .fs-confirm-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .fs-confirm-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: white;
      padding: 20px 30px;
      border-radius: 6px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      text-align: center;
      font-family: Arial, sans-serif;
    }
    .fs-confirm-box ul {
      text-align: left;
      margin: 10px 0;
      padding-left: 20px;
      list-style-type: circle;
    }
    .fs-confirm-buttons {
      margin-top: 15px;
    }
    .fs-confirm-buttons button {
      border: 1px solid black;
      border-radius: 5px;
      margin: 0 8px;
      padding: 8px 16px;
      cursor: pointer;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(dialogWrapper);

  document.getElementById("ext-ok").addEventListener("click", () => {
    let message = {
      action: "unistall-exten",
    };
    chrome.runtime.sendMessage(message, (response) => {
      // console.log(response);
    });
    document.body.removeChild(dialogWrapper);
  });
}

/**
 * disabled event function
 */
function disabledEvent(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else if (window.event) {
    window.event.cancelBubble = true;
  } else {
    e.preventDefault();
    return false;
  }
}

/**
 * on Message from background
 */
chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "devtools-found") {
    devRemove = true;
    window.removeEventListener("beforeunload");
  } else if (message.type === "live-flag") {
    const data = {
      trigger: "live-flag",
      flag: message.flag,
      block: message.blockExam,
      // block: false
    };
    window.postMessage(data, "*");
  } else if (message.type === "activate-fullscreen") {
    setTimeout(() => {
      console.log(message.type);
      makeTabFullScreen();
    }, 2000);
  } else if (message.type === "prelim-exten") {
    additionalExtensionpopup(message.data);
  } else if (message.type === "setInterval-trigger") {
    getSecurityFeatures();
    // examStatus = message.examStatus;
  }
});

/**
 * Functions to add listeners [selection, right-click]
 * @param {*} features
 */
function addListeners(features) {
  if (listenersActive === false && features !== undefined) {
    // disable selection
    if (features.includes("SELECTION_DISABLING")) {
      document.addEventListener(
        "selectstart",
        function (e) {
          e.preventDefault();
          // let flag = {
          //   flag_type: "RED",
          //   transfer_to: "Don''t Transfer",
          //   reason: "Extension Restricted activity",
          //   attachments: "",
          //   object: "",
          //   comment: `Candidate selection detected in the url ${window.location.href}`,
          //   sender: "Examlock lite",
          //   timestamp: Date.now(),
          //   key: "",
          //   status: "",
          //   proctorComment: ""
          //   // upload_status: false,
          // };
          // let message = {
          //   action: "sendFlags",
          //   data: flag,
          // };
          // chrome.runtime.sendMessage(message, (response) => {
          //   console.log(response);
          // });
        },
        false
      );
    }

    // disable right-click
    if (features.includes("RIGHTCLICK_DISABLING")) {
      document.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
          let flag = {
            flag_type: "RED",
            transfer_to: "Don''t Transfer",
            reason: "Right click detected",
            attachments: "",
            object: "",
            comment: `Right click detected in the url ${window.location.href}`,
            sender: "Examlock lite",
            timestamp: Date.now(),
            key: "",
            status: "",
            proctorComment: "",
            // upload_status: false,
          };
          let message = {
            action: "sendFlags",
            data: flag,
          };

          try {
            chrome.runtime.sendMessage(message, (response) => {
              // console.log(response);
            });
          } catch (e) {
            console.log(e);
          }
        },
        false
      );
    }

    window.addEventListener("beforeunload", function (e) {
      if (devRemove === false) {
        e.preventDefault();
        e.returnValue = "";
      }
    });

    listenersActive = true;
  } else if (features.length === 0 && listenersActive === true) {
    listenersActive = false;
    window.removeEventListener("beforeunload");
    document.removeEventListener("contextmenu");
    document.removeEventListener("selectstart");
  } else {
    // console.log("something went wrong with add listeners");
  }
}

//===============================================================
// @On load runners
//===============================================================

/**
 * Trigger popup
 */
// setTimeout(() => {
//   Trigger();
// }, 3000);

//======================================================================
// @To be reused
//======================================================================

// /**
//  * Function to check for already connected USB devices
//  */
// async function checkExistingDevices() {
//   try {
//     const devices = await navigator.usb.getDevices();
//     if (devices.length > 0) {
//       console.log("USB device(s) already connected:", devices);
//     } else {
//       console.log("No USB devices connected.");
//     }
//   } catch (error) {
//     console.error("Error checking USB devices:", error);
//   }
// }

// /**
//  * Listen for new USB device connections
//  */
// navigator.usb.addEventListener("connect", (event) => {
//   checkExistingDevices();
//   console.log("USB device connected:", event.device);
// });

// /**
//  * Listen for USB device disconnections
//  */
// navigator.usb.addEventListener("disconnect", (event) => {
//   console.log("USB device disconnected:", event.device);
// });
