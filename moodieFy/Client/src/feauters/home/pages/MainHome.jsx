import Card from "../components/Card";
import "../components/styles/home.scss";
import { useNavigate } from "react-router-dom";
import emotionIcon from "../../../assets/emotion2.png";
import music from "../../../assets/music.png";
import forward from "../../../assets/fast-forward.png";


export default function MainHome() {
  const navigate = useNavigate();

   const feautered = [
    {
      icon: emotionIcon,
      text:"Mood Detection",
      para:"Detect your emotions using face recognition.",
    },
    {
      icon:music,
      text:" Smart Songs",
      para:"Get songs recommended based on your mood.",
    },
    {
      icon:forward,
      text:" Fast Player",
      para:"Seamless music experience with real-time playback.",
    },
  ]

  return (
    <div className="home">

       

      {/* 🔹 HERO */}
      <section className="hero">
       <div className="hero-top">
         <h1>Feel the <span>Music</span> Based on Your Mood 🎧</h1>
        <p>AI detects your mood and plays the perfect songs instantly.</p>

        <div className="buttons">
          <button onClick={() => navigate("/player")}>
            Start Listening
          </button>
        </div>
       </div>
      <div className="features">
        {feautered.map((item,idx)=>
          <Card key={idx} icon={<img src={item.icon} alt="" />} text={item.text} para={item.para}/>
        )}
      </div>
      </section>

      {/* 🔹 FEATURES */}
    

      {/* 🔹 HOW IT WORKS */}
      <section className="steps">
        <h2>How It Works</h2>

        <div className="step-list">
          <div>1️⃣ Open Camera</div>
          <div>2️⃣ Detect Mood</div>
          <div>3️⃣ Get Songs</div>
          <div>4️⃣ Enjoy 🎶</div>
        </div>
      </section>

      {/* 🔹 CTA */}
      <section className="cta">
        <h2>Start Your Mood Journey 🚀</h2>
        <button onClick={() => navigate("/register")}>
          Get Started
        </button>
      </section>

    </div>
  );
}
