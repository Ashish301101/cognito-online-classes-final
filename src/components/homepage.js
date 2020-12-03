import React from "react";
import {
  FaPlay,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Home = () => {
    const [state] = React.useState([
        {
            id: 1,
            heading: "Classrooms",
            text: "Realtime schedulable chatrooms or classrooms with video, audio, screen-sharing facilities and a unique class id.",
        },
        {
            id: 2,
            heading: "Chat-Boxes",
            text: "Real time chat-boxes with a spam filters which is solely for asking doubts and questions & answers sessions.",
        },
        {
            id: 3,
            heading: "Attendance",
            text: "Attendance system depending on the attentiveness of the listener. This way we guarantee a student's performance.",
        },
        {
            id: 4,
            heading: "Quizes",
            text: "A quiz platform after every class to test what one learnt in the class. This way a student can focus what he feels he is weak in.",
        },
        {
            id: 5,
            heading: "Security",
            text: "Secure login systems for faculties and the students separate. We want to deliver the content only to the intended.",
        },
        {
            id: 6,
            heading: "Ease",
            text: "Easy to use, be it a student or a teacher. Just a few clicks and get what you want and why you are visiting the platform for.",
        },
    ]);
  const [states] = React.useState({
    title: "COGNITO",
    text:
      "A platform for eClassroom​ with innovation.",
    image: "/images/bg.gif",
  });

  const [header] = React.useState({
    mainHeader: "SERVICES",
    subHeading: "Our Salient Features",
    text: "One of the few online platforms that is dedicated to conduct efficient online classes.",
    });
  return (
    <div className = "containers">
        <header className="header">
        <div className="container">
        <div className="row">
            <div className="col-6">
            <div className="header__content">
                <div className="header__section">
                <h1>{states.title}</h1>
                <p>{states.text}</p>
                <div className="header__buttons">
                    <a href="http://localhost:3000/signup" className="btn btn-outline">
                    Get Started
                    </a>
                    &nbsp;&nbsp;&nbsp;
                    <a href="http://localhost:3000/joinClass" className="btn btn-smart">
                    <FaPlay className="play" />
                    </a>
                </div>
                </div>
            </div>
            </div>
            <div className="col-6">
            <div className="banner__img">
                <img src={states.image} alt="man" width="700" />
            </div>
            </div>
        </div>
        </div>
    </header>
    <div className="services" id="services">
    <div className="container">
        <div className="services__header">
            <div className="common">
                <h3 className="heading">{header.mainHeader}</h3>
                <h1 className="mainHeader">{header.subHeading}</h1>
                <p className="mainContent">{header.text}</p>
                <div className="commonBorder"></div>
            </div>

            <div className="row bgMain">
                {state.map((info) => (
                    <div className="col-4 bgMain">
                        <div className="services__box">
                            {info.icon}
                            <div className="services__box-header">{info.heading}</div>
                            <div className="services__box-p">{info.text}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
    <div className="contact" id="contact">
            <div className="container">
                <div className="contactSection">
                    <div className="row justifyConter">
                        <div className="col-6">
                            <div className="contactSection-logo">
                                <img src="/images/logo.png" alt="" />
                            </div>
                            <p className="aboutUs">
                                We are a group of PES University, Bangalore, India 2nd year CSE students.The purpose of the project was the 3rd semester Web Technologies project.The source code is linked with the github icon below.For more information contact us on the below mentioned social networking sites.
                            </p>
                            <ul className="contactCircles">
                                <li>
                                    <a href="https://github.com/sumukhbhat2701"><FaGithub className="contactIcon" /></a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/sumukh-bhat-60b4431b2/"><FaLinkedinIn className="contactIcon" /></a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/sumukh_bhat2701/"><FaInstagram className="contactIcon" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default Home;