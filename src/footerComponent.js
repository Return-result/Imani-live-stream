import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faGlobe,
} from "@fortawesome/free-brands-svg-icons";

export default class footerComponent extends Component {
  render() {
    return (
      <div className="radio-link">
        <FontAwesomeIcon
          icon={faFacebook}
          size="2x"
          style={{ color: "#000000" }}
          onClick={(event) =>
            (window.location.href =
              "https://www.facebook.com/pages/category/Media-News-Company/Imani-Radio-792634037482961/")
          }
        />

        <FontAwesomeIcon
          icon={faTwitter}
          size="2x"
          style={{ color: "#000000", marginLeft: "12px" }}
          onClick={(event) =>
            (window.location.href = "https://twitter.com/imaniradioke?lang=en")
          }
        />

        <FontAwesomeIcon
          icon={faGoogle}
          size="2x"
          style={{ color: "#000000", marginLeft: "12px" }}
          onClick={(event) =>
            (window.location.href = "http://www.imaniradio.org/")
          }
        />

        <h2 style={{ color: "#000000", marginTop: "20px" }}>
          Powered by Imani Radio
        </h2>
      </div>
    );
  }
}
