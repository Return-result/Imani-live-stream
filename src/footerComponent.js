import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default class footerComponent extends Component {
  render() {
    return (
      <div className="radio-link">
        <FontAwesomeIcon
          icon={faFacebook}
          size="2x"
          style={{ color: "white" }}
          onClick={(event) =>
            (window.location.href = "https://www.facebook.com/ShineFm103.1/")
          }
        />

        <FontAwesomeIcon
          icon={faTwitter}
          size="2x"
          style={{ color: "white", marginLeft: "12px" }}
          onClick={(event) =>
            (window.location.href = "https://twitter.com/shinefm103?lang=en")
          }
        />

        <FontAwesomeIcon
          icon={faYoutube}
          size="2x"
          style={{ color: "white", marginLeft: "12px" }}
          onClick={(event) =>
            (window.location.href =
              "https://www.youtube.com/channel/UCsOKUNkcRBp75niZbqcsOvw")
          }
        />

        <h2>Powered by Daystar University</h2>
      </div>
    );
  }
}
