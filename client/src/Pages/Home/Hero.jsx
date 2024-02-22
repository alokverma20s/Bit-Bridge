import React from "react";
// import {useTypewriter, Cursor} from 'react-simple-typewriter'
// import { TypeAnimation } from "react-type-animation";
import logo from "../../assets/logo.png";
import ganeshji from "../../assets/ganeshji.png"

const Hero = () => {
  // const [typeEffect] = useTypewriter({
  //     words: ['Campus', 'Conversations'],
  //     loop: {},
  //     typeSpeed: 100,
  //     deleteSpeed: 40
  // })
  return (
    <>
      <div className="hero">
        <div className="hero-one">
          <div className="hero-content">
            <div className="hero-heading">
              <div className="container-one">BIT</div>
              <div className="container-two">BRIDGE</div>
            </div>

            <div className="auto-type-text">Your Campus</div>

            {/* <div className="auto-type-text">
        </div> */}
            {/* <TypeAnimation
          sequence={["Your Campus", 2000, ""]}
          repeat={Infinity}
          cursor={true}
          style={{ whiteSpace: "pre-line", display: "block" }}
          omitDeletionAnimation={true}
        /> */}

            <div className="hero-desc">
              <div className="hero-content-three">
                The Ultimate Hub for sharing ideas, asking questions
              </div>
              <div className="hero-content-four">
                and fostering meaningful conversations
              </div>
            </div>
            <div className="hero-btns">
              <button className="hero-content-btn">Get Started</button>
              <button className="hero-content-btn">Why BitBridge?</button>
              <button className="hero-content-btn">View on Github</button>
            </div>
            <div className="hero-bottom"></div>
          </div>
          <div className="hero-logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="hero-two">
          <button className="hero-two-btn">Hello</button>
          <div className="random"></div>
        </div>
      </div>
      <div className="contentOne">
        <div className="contentOne-desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
          accusamus reiciendis recusandae reprehenderit vero veniam libero in,
          ipsum minima animi harum maiores voluptatibus alias deleniti inventore
          odit necessitatibus voluptates a! Sed, neque? Perferendis consequatur,
          aliquid odio eligendi porro inventore obcaecati neque ab pariatur
          magni blanditiis fuga, repellendus quod sed unde quia officiis? Nam
          non numquam labore ullam sapiente, enim atque. Illum magnam corrupti
          laboriosam ab repellendus cum maxime architecto suscipit eaque commodi
          ea totam voluptatem alias magni illo minus pariatur quisquam facilis
          adipisci eveniet, aliquid sit. Harum exercitationem ratione molestiae?
          Magnam laborum impedit tempora asperiores sapiente, ratione ab
          voluptatum soluta rerum. Dolorem placeat odio quasi officiis
          perferendis minima consectetur, iusto architecto similique harum
          expedita quisquam? Tempore nesciunt saepe expedita temporibus!
          Recusandae, beatae enim, totam quisquam itaque, optio in quas earum
          obcaecati libero natus iure quos sequi voluptatum aut odit officia
          doloremque excepturi vitae necessitatibus eius!
        </div>
        <div className="contentOne-img">
          <img src={ganeshji} className="ganeshji-img" alt="" />
        </div>
      </div>
      <div className="contentTwo">
      </div>
      <div className="contentThree"></div>
      <div className="footer"></div>
    </>
  );
};

export default Hero;
