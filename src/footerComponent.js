import React, { Component } from "react";
// import 'bulma/css/bulma.min.css'
//import copyright from './resources/copyright.svg'

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
        {/* <a href="http://www.google.com">ShineFM FB</a> */}

        <FontAwesomeIcon
          icon={faTwitter}
          size="2x"
          style={{ color: "white", marginLeft: "12px" }}
          onClick={(event) =>
            (window.location.href = "https://twitter.com/shinefm103?lang=en")
          }
        />
        {/* <a href="http://www.google.com">ShineFM Twitter</a> */}

        <FontAwesomeIcon
          icon={faYoutube}
          size="2x"
          style={{ color: "white", marginLeft: "12px" }}
          onClick={(event) =>
            (window.location.href =
              "https://www.youtube.com/channel/UCsOKUNkcRBp75niZbqcsOvw")
          }
        />
        {/* <a href="http://www.google.com">ShineFM YT</a> */}

        {/* <span>
                    <img className="radio-link-img-dimensions thisimg" src={copyright} alt="copyright" />
                    <h2 className="right-floater"> {new Date().getFullYear()}, {'\u00A0'} All rights reserved </h2>
                </span> */}
      </div>
    );
  }
}
