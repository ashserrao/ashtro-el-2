console.log("background.js is working");
import Urls from "./urls.json";

let Images = [];
let mainTabId = null;
let mainTabURL = '';
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
//   "DEVTOOLS_DETECTION",
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
        const flag = {
          flag_type: "RED",
          transfer_to: "Don't Transfer",
          reason: "Additional tab opened",
          attachments: "",
          object: "",
          sender: "Examlock lite",
          comment: `Additional tab was opened by the candidate. url: ${tab.url}`,
          timestamp: Date.now(),
          key: "",
          status: "",
          proctorComment: "",
          // upload_status: false,
        };
        let message = {
          data: flag,
          blockContent: false,
        };
        sendliveFlag(message);
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

        chrome.tabs.remove(tab.id);
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
  chrome.tabs.query({ currentWindow: true }, (allTabs) => {
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
  let message = {
    data: flag,
    blockContent: false,
  };
  sendliveFlag(message);
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
    sendliveFlag(message);
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
  } else if (message.action === "unistall-exten") {
    // chrome.tabs.create({ url: "chrome://extensions/" });
    openOrFocusTab("chrome://extensions/");
  }
});

function openOrFocusTab(targetUrl) {
  chrome.tabs.query({}, function(tabs) {
    // Look for an existing tab with the given URL
    let existingTab = tabs.find(tab => tab.url === targetUrl);

    if (existingTab) {
      // If the tab exists, activate it
      chrome.tabs.update(existingTab.id, { active: true });
      chrome.windows.update(existingTab.windowId, { focused: true });
    } else {
      // If it doesn't exist, create a new tab
      chrome.tabs.create({ url: targetUrl });
    }
  });
}


/**
 * On External messages
 */
chrome.runtime.onMessageExternal.addListener((message, sender) => {
  mainTabId = sender.tab.id;
  mainTabURL = sender.tab.url;

  if (message.trigger && message.trigger === "start_exam") {
    console.log("start_exam extension");
    requestFeatures = message.requiredFeatures;
    examStatus = "inProgress";

    candidateInfo.personEventGuid = message.data.personEventGuid
      ? message.data.personEventGuid
      : "";
    candidateInfo.tenantGuid = message.data.tenantGuid
      ? message.data.tenantGuid
      : "";
    candidateInfo.userGuid = message.data.userGuid ? message.data.userGuid : "";

    let trigger = {
      type: "activate-fullscreen",
      message: "I'm from the service worker.",
    };

    chrome.tabs.sendMessage(mainTabId, trigger);

    console.log("triggered start_exam");

    chrome.tabs.query({ currentWindow: true }, (allTabs) => {
      allTabs.forEach((tab) => {
        if (!allowedUrls.some((allowedurl) => tab.url.includes(allowedurl))) {
          chrome.tabs.remove(tab.id);
        }
      });
    });
  } else if (message.trigger && message.trigger === "reset_exam") {
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
  } else if (message.trigger && message.trigger === "prelim-test") {
    requestFeatures = message.requiredFeatures;
    getExtensions();
  } else if (message.trigger && message.trigger === "anchor-redirect") {
    // console.log("Anchor tab redirection requested");
    redirectToMaintab();
  } else if (message.trigger && message.trigger === "proc-fullscreen-request") {
    let trigger = {
      type: "activate-fullscreen",
      message: "I'm from the service worker.",
    };
    chrome.tabs.sendMessage(mainTabId, trigger);
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
    const urlWithParams = new URL(url);
    const formattedData = [data];

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

/**
 * send live flags to content.JS
 * @param {*} flag
 */
function sendliveFlag(msg) {
  let message = {
    type: "live-flag",
    flag: msg.data,
    blockExam: msg.blockContent,
  };
  chrome.tabs.sendMessage(mainTabId, message);
}

function setIntervalTrigger() {
  let message = {
    type: "setInterval-trigger",
  };
  if (mainTabId !== null) {
    chrome.tabs.sendMessage(mainTabId, message);
  }
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
          let message = {
            data: flag,
            blockContent: false,
          };
          sendliveFlag(message);
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

      let message = {
        type: "prelim-exten",
        data: extensions_found,
      };
      chrome.tabs.sendMessage(mainTabId, message);

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
        let message = {
          data: flag,
          blockContent: false,
        };
        sendliveFlag(message);
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

function redirectToMaintab() {
  if (mainTabId !== null) {
    chrome.tabs.update(mainTabId, { active: true }, function (tab) {
      if (chrome.runtime.lastError) {
        console.error("Error switching tab:", chrome.runtime.lastError.message);
      } else {
        console.log("Switched back to tab:", tab);
      }
    });
  } else {
    console.log("No main tab ID saved.");
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
      let message = {
        data: flag,
        blockContent: false,
      };
      sendliveFlag(message);
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
    let message = {
      data: flag,
      blockContent: false,
    };
    sendliveFlag(message);
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
  saveSecurityFeatures();
  getExtensions();
  displayMonitoring();
  checkIncognitoEnable();
  setIntervalTrigger();
}, 5000);

//======================================================================
// @To be removed
//======================================================================

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
