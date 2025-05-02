console.log("background.js is working");

import { type } from "@testing-library/user-event/dist/type";
import Urls from "./urls.json";

let Images = [];
let mainTabId = null;
let mainTabURL = "https://localhost:4300/#/"; // Coming from API
let recStatus = false;
let Flags = [];
let examStatus = "inProgress"; // Coming from candidate console
let allowedUrls = Urls.urls;
// let requestFeatures = [
//   "TAB_BLOCKING",
//   "KEY_BLOCKER",
//   "CONTENT_BLOCKER",
//   "RIGHTCLICK_DISABLING",
//   "SELECTION_DISABLING",
//   "EXTENSIONS_DETECTION",
//   "INCOGNITO_DETECTION",
//   "DUAL_SCREEN_DETECTION",
//   // "DEVTOOLS_DETECTION",
//   "FULLSCREEN_DETECTION",
//   "LOST_FOCUS_DETECTION",
//   // "RECORD_EXAM",
//   // "CAPTURE_ID",
//   // "CAPTURE_FACE",
// ]; // Coming from API
let requestFeatures = [];
let installed_extensions = [];
let number_of_display = 0;
let incognitoTrigger = false;

// For live
// let baseApiURL = Urls.backApi.baseApiURL;
// let flagsApiURL = Urls.backApi.flagsApiURL;

// For testing
let baseApiURL = "http://localhost:3000";
let flagsApiURL = "/flags";

let candidateSystemIP;
let candidateInfo = {
  tenantGuid: "",
  userGuid: "",
  personEventGuid: "",
};
// let examType = "online"; // Coming from candidate console

/**
 * on extension installation
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({ currentWindow: true }, (allTabs) => {
    allTabs.forEach((tab) => {
      const tabUrl = tab.url;
      if (
        !allowedUrls.some((allowedurl) => tabUrl.includes(allowedurl)) &&
        requestFeatures.includes("TAB_BLOCKING") &&
        examStatus === "inProgress"
      ) {
        chrome.tabs.remove(tab.id);
        // console.log(tab.url);
      } else {
        chrome.tabs.reload(tab.id);
      }
    });
  });
});

/**
 * when candidate opens new tab
 */
chrome.tabs.onUpdated.addListener(() => {
  chrome.tabs.query({ currentWindow: true }, (allTabs) => {
    allTabs.forEach((tab) => {
      if (
        !allowedUrls.some((allowedurl) => tab.url.includes(allowedurl)) &&
        requestFeatures.includes("TAB_BLOCKING") &&
        examStatus === "inProgress"
      ) {
        chrome.tabs.remove(tab.id);
        // console.log(tab.url);
      }
    });
  });
});

/**
 * Store the array in local storage
 */
function saveSecurityFeatures() {
  requestFeatures.forEach((feature, index) => {
    chrome.storage.local.set({ [`requestFeature_${index}`]: feature });
  });
}

/**
 * Function to create and show a push notification
 */
// function showNotification(title, message) {
//   const options = {
//     type: "basic",
//     iconUrl: "assets/icon.png",
//     title: "Examlock Warning",
//     message: "Please return back to you examination screen.",
//     priority: 3,
//   };

//   chrome.notifications.create(
//     "minimizedNotification",
//     options,
//     function (notificationId) {
//       chrome.notifications.onClicked.addListener(function (
//         clickedNotificationId
//       ) {
//         if (clickedNotificationId === notificationId) {
//           chrome.tabs.query(
//             { active: true, currentWindow: true },
//             function (tabs) {
//               if (tabs && tabs.length > 0) {
//                 chrome.tabs.update(tabs[0].id, { active: true }, function () {
//                   chrome.windows.update(tabs[0].windowId, { focused: true });
//                 });
//               }
//             }
//           );
//         }
//       });
//     }
//   );
// }



/**
 * Getting main tab ID
 */
function getMainTabId() {
  chrome.tabs.query({ currentWindow: true }, (allTabs) => {
    allTabs.forEach((tab) => {
      if (tab.url.startsWith(mainTabURL)) {
        mainTabId = tab.id;
      } else {
        console.log("Main tab not found!!!");
      }
    });
  });
}

/**
 * Trigger recording page
 */
// function openRecPage() {
// const url = `chrome-extension://${chrome.runtime.id}/recording.html/recordings`;
// chrome.tabs.query({ url: url }, function (tabs) {
//   if (tabs.length > 0) {
//     // If the tab is found, make it the active tab
//     chrome.tabs.update(tabs[0].id, { active: true });
//   } else {
//     // If the tab is not found, create a new tab
//     chrome.tabs.create({
//       url: `chrome-extension://${chrome.runtime.id}/recording.html`,
//     });
//   }
// });
// }

/**
 * Trigger contact page
 */
// function openContPage() {
// const url = `chrome-extension://${chrome.runtime.id}/contact.html`;
// chrome.tabs.query({ url: url }, function (tabs) {
//   if (tabs.length > 0) {
//     // If the tab is found, make it the active tab
//     chrome.tabs.update(tabs[0].id, { active: true });
//   } else {
//     // If the tab is not found, create a new tab
//     chrome.tabs.create({ url: url });
//   }
// });
// }

/**
 * Function on opening dev tools
 */
chrome.runtime.onConnect.addListener((port) => {
  if (
    port.name === "devtools" &&
    requestFeatures.includes("DEVTOOLS_DETECTION")
  ) {
    port.onMessage.addListener((msg) => {
      if (msg.name === "openDevTools") {
        fetchSystemIP();
      }
    });
  }
});

/**
 * directing to the hack ui page
 */
function onDevToolsOpen() {
  chrome.tabs.query({ currentWindow: false }, (allTabs) => {
    requestFeatures = [];
    chrome.tabs.create({ url: "https://examroom.ai/34pizy6/" });
    allTabs.forEach((tab) => {
      if (tab.url === "https://examroom.ai/34pizy6/") {
        console.log("you tried to hack us page");
      } else {
        chrome.tabs.sendMessage(tab.id, {
          type: "devtools-found",
          message: "I'm from the service worker.",
        });
        chrome.tabs.remove(tab.id);
        // console.log("Tab removed on update =>", tab.id, tab.url);
      }
    });
  });
  const flag = {
    flag_type: "RED",
    transfer_to: "Don't Transfer",
    reason: "Devtools Alert",
    attachments: "",
    object: "",
    sender: "Examlock lite",
    comment: `Dev tools detected on browser logged network ID ${candidateSystemIP}`,
    timestamp: Date.now(),
    key: "",
    status: "",
    proctorComment: "",
    // upload_status: false,
  };
  // console.log("raised flag", flag);
  sendliveFlag(flag);
  httpsPostFlag(`${baseApiURL}${flagsApiURL}`, flag, candidateInfo, (error) => {
    if (error) {
      Flags.push(flag);
      console.log("Flag API failed");
    } else {
      console.log("Flag API Success");
    }
  });
}

/**
 * Fetch system IP
 */
function fetchSystemIP() {
  fetch("https://api64.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      candidateSystemIP = data.ip;
      console.log("Current System IP:", candidateSystemIP);
      onDevToolsOpen();
    })
    .catch((error) => {
      console.error("Error fetching IP address:", error);
    });
}

/**
 * On internal messages
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "recording-page") {
    // recordTabId();
    // openRecPage();
    sendResponse("page triggered");
  } else if (
    message.action === "id-cards" ||
    message.action === "face-capture"
  ) {
    let temparray = message.data;
    temparray.forEach((element) => {
      Images.push(element);
    });
    console.log(Images);
    sendResponse(
      "received " + (message.action === "id-cards" ? "ID's" : "Face photo")
    );
  } else if (message.action === "record-tab") {
    // recordTabId();
    sendResponse("recorded-tab");
  } else if (message.action === "switch-tab") {
    // switchBackToPreviousTab();
    sendResponse("switched-tab");
  } else if (message.action === "check-recording-status") {
    // recStatus = message.data;
    sendResponse(recStatus);
  } else if (message.action === "switch-recording-status") {
    // openRecPage();
    // recStatus = message.data;
    console.log(recStatus);
  } else if (message.action === "getFlags") {
    if (Flags) {
      sendResponse(Flags[0]);
      Flags.shift();
    }
  } else if (message.action === "sendFlags") {
    // console.log("Flag =>", message.data);
    sendliveFlag(message.data);
    httpsPostFlag(
      `${baseApiURL}${flagsApiURL}`,
      message.data,
      candidateInfo,
      (error) => {
        if (error) {
          Flags.push(message.data);
          console.log("Flag API failed");
        } else {
          console.log("Flag API Success");
        }
      }
    );
    sendResponse("Flag received.");
  } else if (message.action === "content-blocked") {
    // openContPage();
  } else if (message.action === "check-incognito") {
    chrome.extension.isAllowedIncognitoAccess().then(logIsAllowed);
  }
});

/**
 * On External messages
 */
chrome.runtime.onMessageExternal.addListener((message, sender) => {
  // Get the tab details from the sender
  mainTabId = sender.tab.id;
  mainTabURL = sender.tab.url;

  if (message.trigger === "start_exam") {
    requestFeatures = message.requiredFeatures;
    examStatus = "inProgress";

    candidateInfo.personEventGuid = message.data.personEventGuid
      ? message.data.personEventGuid
      : "";
    candidateInfo.tenantGuid = message.data.tenantGuid
      ? message.data.tenantGuid
      : "";
    candidateInfo.userGuid = message.data.userGuid ? message.data.userGuid : "";

    chrome.tabs.query({ currentWindow: true }, (allTabs) => {
      allTabs.forEach((tab) => {
        if (!allowedUrls.some((allowedurl) => tab.url.includes(allowedurl))) {
          chrome.tabs.remove(tab.id);
        }
      });
    });
  } else if (message.trigger === "reset_exam") {
    requestFeatures = [];
    chrome.storage.local.clear(() => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error clearing local storage:",
          chrome.runtime.lastError
        );
      } else {
        console.log("Local storage cleared.");
      }
    });

    chrome.tabs.query({ currentWindow: true }, (allTabs) => {
      allTabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    });
  }
});

/**
 * Post API function with URL parameters
 * @param {*} url
 * @param {*} data
 * @param {*} params
 * @param {*} callback
 */
async function httpsPostFlag(url, data, params, callback) {
  try {
    // Append URL parameters to the URL
    const urlWithParams = new URL(url);
    const formattedData = [data];

    // If params object is provided, add each param to the URL
    if (!params) {
      Object.keys(params).forEach((key) => {
        urlWithParams.searchParams.append(key, params[key]);
      });
    }

    const response = await fetch(urlWithParams, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    callback(null, result);
  } catch (error) {
    callback(error, null);
  }
}

function sendliveFlag(flag) {
  let message = {
    type: "live-flag",
    flag: flag,
  };
  chrome.tabs.sendMessage(mainTabId, message);
}

//===============================================================
// @Service-worker monitoring
//===============================================================

/**
 * screen minimize detection
 */
chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    if (
      current_tab_info.url.includes(mainTabURL) &&
      requestFeatures.includes("LOST_FOCUS_DETECTION")
    ) {
      chrome.windows.onFocusChanged.addListener((windowId) => {
        if (windowId === chrome.windows.WINDOW_ID_NONE) {
          const flag = {
            flag_type: "RED",
            transfer_to: "Don't Transfer",
            reason: "Lost focus detected",
            attachments: "",
            object: "",
            sender: "Examlock lite",
            comment: `Candidate is not on the examination window`,
            timestamp: Date.now(),
            key: "",
            status: "",
            proctorComment: "",
            // upload_status: false,
          };
          // console.log("raised flag", flag);
          sendliveFlag(flag);
          httpsPostFlag(
            `${baseApiURL}${flagsApiURL}`,
            flag,
            candidateInfo,
            (error) => {
              if (error) {
                Flags.push(flag);
                console.log("Flag API failed");
              } else {
                console.log("Flag API Success");
              }
            }
          );
          // let message = {
          //   info: "block content",
          // };
          // chrome.runtime.sendMessage(mainTabId, message, (response) => {
          //   console.log(response);
          // });
          // showNotification(
          //   "Examlock Warning",
          //   "Please return back to you examination screen."
          // );
        }
      });
    }
  });
});

/**
 * get list of extensions
 */
async function getExtensions() {
  if (requestFeatures.includes("EXTENSIONS_DETECTION")) {
    try {
      let extensions = await new Promise((resolve, reject) => {
        chrome.management.getAll((extensionsList) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(extensionsList);
          }
        });
      });

      let extensions_found = [];
      extensions.forEach((extension) => {
        if (extension.enabled && extension.id !== chrome.runtime.id) {
          extensions_found.push(extension.shortName);
        }
      });

      if (
        extensions_found.length > 0 &&
        JSON.stringify(installed_extensions) !==
          JSON.stringify(extensions_found)
      ) {
        const flag = {
          flag_type: "RED",
          transfer_to: "Don't Transfer",
          reason: "Additional Extensions Alert",
          attachments: "",
          object: "",
          sender: "Examlock lite",
          comment: `List of extensions found: ${JSON.stringify(
            extensions_found
          )}`,
          timestamp: Date.now(),
          key: "",
          status: "",
          proctorComment: "",
          // upload_status: false,
        };
        // console.log("raised flag", flag);
        sendliveFlag(flag);
        httpsPostFlag(
          `${baseApiURL}${flagsApiURL}`,
          flag,
          candidateInfo,
          (error) => {
            if (error) {
              Flags.push(flag);
              console.log("Flag API failed");
            } else {
              console.log("Flag API Success");
            }
          }
        );
        installed_extensions = extensions_found;
      }
    } catch (error) {
      console.error("Error retrieving extensions:", error);
    }
  }
}

/**
 * checking for count of displays
 */
function displayMonitoring() {
  chrome.system.display.getInfo((displayInfo) => {
    if (chrome.runtime.lastError) {
      console.error("Error:", chrome.runtime.lastError.message);
      return;
    }
    const displayCount = displayInfo.length;

    if (
      displayCount > 1 &&
      displayCount !== number_of_display &&
      requestFeatures.includes("DUAL_SCREEN_DETECTION")
    ) {
      number_of_display = displayCount;
      const flag = {
        flag_type: "RED",
        transfer_to: "Don't Transfer",
        reason: "Additional Display Alert",
        attachments: "",
        object: "",
        sender: "Examlock lite",
        comment: `Total displays found: ${displayCount}`,
        timestamp: Date.now(),
        key: "",
        status: "",
        proctorComment: "",
        // upload_status: false,
      };
      // console.log("raised flag", flag);
      sendliveFlag(flag);
      httpsPostFlag(
        `${baseApiURL}${flagsApiURL}`,
        flag,
        candidateInfo,
        (error) => {
          if (error) {
            Flags.push(flag);
            console.log("Flag API failed");
          } else {
            console.log("Flag API Success");
          }
        }
      );
    } else if (
      displayCount === 1 &&
      requestFeatures.includes("DUAL_SCREEN_DETECTION")
    ) {
      number_of_display = displayCount;
    }
  });
}

/**
 * Logging if Incongnito is allowed or not
 */
function checkIncognitoEnable() {
  if (requestFeatures.includes("INCOGNITO_DETECTION")) {
    chrome.extension.isAllowedIncognitoAccess().then(logIsAllowed);
  }
}

/**
 * flagging incognito
 * @param {*} answer
 */
function logIsAllowed(answer) {
  if (answer === false && incognitoTrigger === false) {
    incognitoTrigger = true;
    const flag = {
      flag_type: "RED",
      transfer_to: "Don't Transfer",
      reason: "Extension disabled for incognito",
      attachments: "",
      object: "",
      sender: "Examlock lite",
      comment: `Extension disabled for incognito tabs within the browser.`,
      timestamp: Date.now(),
      key: "",
      status: "",
      proctorComment: "",
      // upload_status: false,
    };
    // console.log("raised flag", flag);
    sendliveFlag(flag);
    httpsPostFlag(
      `${baseApiURL}${flagsApiURL}`,
      flag,
      candidateInfo,
      (error) => {
        if (error) {
          Flags.push(flag);
          console.log("Flag API failed");
        } else {
          console.log("Flag API Success");
        }
      }
    );
  } else if (answer === true && incognitoTrigger === true) {
    incognitoTrigger = false;
  }
}

//===============================================================
// @On load runners
//===============================================================

// runFunction();
// getMainTabId();
// getCandidateInfo();

setInterval(() => {
  getMainTabId();
  saveSecurityFeatures();
  getExtensions();
  displayMonitoring();
  checkIncognitoEnable();
}, 5000);

//======================================================================
// @To be removed
//======================================================================

/**
 * get exam information
 */
// function getExamInfo(){

// }

/**
 * get candidate information
 */
// function getCandidateInfo(){

// }

/**
 * Access cookies from examroom website
 */
// chrome.cookies.getAll({ url: mainTabURL }, function (cookies) {
//   apiCookies = cookies
//     .map((cookie) => `${cookie.name}=${cookie.value}`)
//     .join("; ");
//   // console.log(apiCookies);
// });

// /**
//  * fetch api function
//  * @param {*} url
//  */
// function fetchData(url) {
//   const headers = {
//     Cookie: apiCookies, // Example header
//   };

//   fetch(url, {
//     method: "GET",
//     headers: headers,
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Data received:", data);
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//     });
// }

// setTimeout(() => {
//   fetchData('https://erv2developmentapi.examroom.ai/ClientBFF/api/User/GetPeopleFullInfoByGuids');
// }, 5000);

// getExamroomTabid();
/**
 * Function to switch back to the previous tab
 */
// function switchBackToPreviousTab() {
//   if (previousTabId !== null) {
//     chrome.tabs.update(previousTabId, { active: true }, function (tab) {
//       if (chrome.runtime.lastError) {
//         console.error(
//           "Error switching back to the previous tab: ",
//           chrome.runtime.lastError
//         );
//       } else {
//         console.log("Switched back to Tab ID: ", previousTabId);
//       }
//     });
//   }
// }

// function getExamroomTabid() {
//   chrome.tabs.query({ currentWindow: true }, (allTabs) => {
//       // Assuming you want to use the URL of the active tab as the reference
//       chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
//           console.log("activeTabs =>", activeTabs);
//           const activeTabUrl = new URL(activeTabs[0].url);
//           console.log("activeTabUrl =>", activeTabUrl);
//           const baseDomain = activeTabUrl.origin;

//           allTabs.forEach((tab) => {
//               console.log(tab.id, tab.url);
//               const tabUrl = new URL(tab.url);
//               console.log("tabUrl",tabUrl)
//               if (tabUrl.origin === baseDomain) {
//                   console.log("active tab =>", tab.url, tab.id)
//               }
//           });
//       });
//   });
// }

// function connectContent() {
//   chrome.tabs.sendMessage(153119322, {
//     message: "I'm from the service worker.",
//   });
// }

/**
 * Record the active tab when the popup is loaded
 */
// function recordTabId() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     if (tabs.length > 0) {
//       previousTabId = tabs[0].id;
//       mainPageURL = tabs[0].url;
//       console.log("Recorded active Tab ID: ", previousTabId);
//     }
//   });
//   return true;
// }

// window['chrome'].runtime.sendMessage(Constants.LANGUAGE.extensionID, { key: "installExtension", clientId: clientId }, (res) => {
//   window['chrome'].runtime.sendMessage(Constants.LANGUAGE.extensionID, 'closedTab')
//   window['chrome'].runtime.sendMessage(Constants.LANGUAGE.extensionID, 'examCompleted');
//   window['chrome'].runtime.sendMessage(Constants.LANGUAGE.extensionID, 'examStarted');

// let timerState = {
//   isRunning: false,
//   time: 0,  // in seconds
//   intervalId: null
// };

// // Start the timer
// function startTimer() {
//   if (!timerState.isRunning) {
//     timerState.isRunning = true;
//     timerState.intervalId = setInterval(() => {
//       timerState.time++;
//       broadcastTimerState();  // Notify all tabs
//     }, 1000);
//   }
// }

// // Pause the timer
// function pauseTimer() {
//   if (timerState.isRunning) {
//     clearInterval(timerState.intervalId);
//     timerState.isRunning = false;
//     broadcastTimerState();  // Notify all tabs
//   }
// }

// // Reset the timer
// function resetTimer() {
//   timerState.time = 0;
//   broadcastTimerState();  // Notify all tabs
// }

// // Broadcast the current timer state to all tabs
// function broadcastTimerState() {
//   chrome.tabs.query({}, (tabs) => {
//     tabs.forEach((tab) => {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: updateTimerDisplay,
//         args: [timerState]  // Pass the current timer state to the tab
//       });
//     });
//   });
// }

// // Listen for commands to start, pause, or reset the timer
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'start') {
//     startTimer();
//   } else if (message.action === 'pause') {
//     pauseTimer();
//   } else if (message.action === 'reset') {
//     resetTimer();
//   }
// });

// // Initialize the timer state on extension load
// broadcastTimerState();
