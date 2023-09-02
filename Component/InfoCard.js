import React from "react";

function InfoCard({ setactiveStep }) {
  return (
    <div>
      <div class='card'>
        <h2>About IntelliRecruit</h2>
        <p style={{ margin: "10px" }}>
          IntelliRecruit is your go-to HR solution for a smarter and more
          efficient hiring process. Harnessing the power of GPT-3's advanced
          text analysis capabilities, IntelliRecruit automates resume screening
          based on job descriptions, ensuring precision and relevance in
          candidate evaluation. Our intuitive dashboard provides insightful
          analytics, empowering you to make data-driven hiring decisions
          effortlessly. Say goodbye to manual screening and hello to intelligent
          recruiting with IntelliRecruit.
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            setactiveStep(1);
          }}
          style={{ margin: "30px" }}
          class='buttonMainContinue'
        >
          Continue!
        </button>
      </div>
    </div>
  );
}

export default InfoCard;
