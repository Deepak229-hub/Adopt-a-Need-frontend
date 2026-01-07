import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const Footer = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
        .sendForm("service_1vka6to", "template_a6egy28", formRef.current, "jy85CQQqgLvCMDs7E")
        .then(
            () => {
                alert("Message Sent Successfully!");
                formRef.current.reset();
            },
            (error) => {
                alert("An error occured!");
                formRef.current.reset();
            }
        );
  };
  return (
    <footer className={`flex h-full w-full items-end bg-amber-100 text-black`}>
      <div className={`py-3 w-full justify-between px-[4.2rem] flex`}>
        <div>
          <img className={`h-25`} src="/images/Logo.png" alt="logo" />
        </div>

        <div className={`w-[15%]`}>
          <div className={`py-2`}>
            <h4 className={`font-bold text-xl text-center`}>Link with us</h4>
          </div>
          <div>
            <ul className={`flex justify-between`}>
              <li>
                <a href="#">
                  <Facebook />
                </a>
              </li>
              <li>
                <a href="#">
                  <Instagram />
                </a>
              </li>
              <li>
                <a href="#">
                  <Twitter />
                </a>
              </li>
              <li>
                <a href="#">
                  <Youtube />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`w-15% bg-white p-3 rounded-md`}>
          <form ref={formRef} onSubmit={sendEmail}>
            <div>
              <label htmlFor="name">Your Name: </label>
              <input
                type="text"
                name="name"
                className={`w-full bg-gray-300 py-1 px-2 rounded-md`}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Your Email: </label>
              <input
                type="email"
                className={`w-full bg-gray-300 py-1 px-2 rounded-md`}
                required
              />
            </div>
            <div>
              <label htmlFor="subject">Subject: </label>
              <input
                type="text"
                className={`w-full bg-gray-300 py-1 px-2 rounded-md`}
                name="subject"
              />
            </div>
            <div>
              <label htmlFor="message">Message: </label>
              <textarea
                name="message"
                className={`w-full resize-none bg-gray-300 py-1 px-2 rounded-md`}
                required
              />
            </div>
            <div>
                <button type="submit" className="bg-green-500 py-1 px-2 rounded-md text-white">Send</button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
