import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Consent() {
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);

  const handleCheckboxChange = () => {
    setConsent(!consent);
  };

  const onConsent = () => {
    // const flag = {
    //   flag_type: "GREEN",
    //   transfer_to: "Don't Transfer",
    //   reason: "Recording Consent",
    //   attachments: "",
    //   object: "",
    //   sender: "Examlock lite",
    //   comment: "The candidate had given the consent.",
    //   timestamp: Date.now(),
    //   // upload_status: false,
    // };

    // const message = {
    //   action: "sendFlags",
    //   data: flag,
    // };

    // chrome.runtime.sendMessage(message, (response) => {
    //   console.log(response);
    // });

    navigate("/recording.html/id_scan");
  };

  return (
    <div>
      <style>{`
    li {
      list-style-type: circle;
      padding-bottom: 1% ;
    }
    `}</style>
      <div className="mx-10 my-4 p-2 border">
        <h1 className="font-bold text-lg">Consent Form</h1>
        <hr />
        <div className="py-1 px-6">
          <ol>
            <li>
              We strive to provide a more efficient and streamlined remote
              proctoring service for all users, both administrators, and
              candidates. By utilizing APIs and LTIs to create an automated
              system integrating with most LMS and databases, we can support a
              single sign-on system. Ensuring exam integrity by providing live
              person onboarding agents to verify identity and environment scans.
              Proctoring can be delivered by a live person, with AI assistance,
              or a standalone AI proctoring service.
            </li>
            <li>
              We strive to provide a more efficient and streamlined remote
              proctoring service for all users, both administrators, and
              candidates. By utilizing APIs and LTIs to create an automated
              system integrating with most LMS and databases, we can support a
              single sign-on system. Ensuring exam integrity by providing live
              person onboarding agents to verify identity and environment scans.
              Proctoring can be delivered by a live person, with AI assistance,
              or a standalone AI proctoring service.
            </li>
            <li>
              We strive to provide a more efficient and streamlined remote
              proctoring service for all users, both administrators, and
              candidates. By utilizing APIs and LTIs to create an automated
              system integrating with most LMS and databases, we can support a
              single sign-on system. Ensuring exam integrity by providing live
              person onboarding agents to verify identity and environment scans.
              Proctoring can be delivered by a live person, with AI assistance,
              or a standalone AI proctoring service.
            </li>
            <li>
              We strive to provide a more efficient and streamlined remote
              proctoring service for all users, both administrators, and
              candidates. By utilizing APIs and LTIs to create an automated
              system integrating with most LMS and databases, we can support a
              single sign-on system. Ensuring exam integrity by providing live
              person onboarding agents to verify identity and environment scans.
              Proctoring can be delivered by a live person, with AI assistance,
              or a standalone AI proctoring service.
            </li>
          </ol>
        </div>
        <div className="flex flex-wrap px-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={handleCheckboxChange}
          />
          <span className="p-2">
            I have read and accepted the terms and conditions
          </span>
          <span className="flex flex-auto"></span>
          <button
            disabled={!consent}
            className={`bg-teal-600 text-slate-100 font-semibold rounded p-2 hover:bg-teal-700 ${
              !consent && "cursor-not-allowed opacity-50"
            }`}
            onClick={onConsent}
          >
            Start Recording
          </button>
        </div>
      </div>
    </div>
  );
}

export default Consent;
