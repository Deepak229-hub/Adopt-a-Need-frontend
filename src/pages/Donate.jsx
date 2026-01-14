import { useState } from "react";
import { createOrder, validateOrder } from "../api/donation";

const Donate = () => {
    const [hide, setHide] = useState(true);

    const [amount, setAmount] = useState(null);

    const [info, setInfo] = useState({
        name: "",
        email: "",
        phone: "",
        amount: amount,
    });

    const payNow = async () => {
        const body = {
            amount: amount,
            currency: "INR",
            receipt: "receipt#1",
            notes: {},
        }
        const order = await createOrder(body);

        let options = {
            "key": "rzp_test_RoEYadOfP4eVdX",
            "amount": amount,
            "currency": "INR",
            "name": "Adopt-a-Need",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id,
            "handler": async function (response){
                const res = await validateOrder(response);
                if (res.order_id) {
                    console.log(res);
                    alert(res.msg);
                } else {
                    alert(res.msg);
                }
            },
            "prefill": {
                "name": "Deepak Tiwari",
                "email": "tiwarideepak.dk.2004@gmail.com",
                "contact": "+917490893975",
            },
            "notes": "sample payment",
            "theme": {
                "color": "#3399cc",
            },
        }
        let rzp = new Razorpay(options);
        rzp.on('payment failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp.open();
    }
    return (
        <main className={`pt-28 bg-blue-400`}>
            <section className={`flex w-full mt-20 px-[4.2rem]`}>
                <div className={`w-1/2 py-10 flex flex-col gap-6`}>
                    <div>
                        <h1 className={`text-[4rem] font-bold`}>Help a Child get Food, Shelter and Hope</h1>  
                    </div>
                    <div>
                        <p className={`text-xl`}>₹500 can feed a child for 7 days</p>
                    </div>
                    <div>
                        <a href="#donate" className={`bg-white text-black px-3 py-1 rounded-sm`}>Donate Now</a>
                    </div>
                </div>
                <div className={`w-1/2 py-10 relative`}>
                    <img src="/images/children.png" alt="" className={`absolute bottom-0`} />
                </div>
            </section>
            <section id="donate" className={`w-full text-black bg-gray-50 px-[4.2rem] py-16 text-center`}>
                <div className={`flex flex-col gap-5`}>
                    <div>
                        <h2 className={`text-[2rem] font-bold`}>Donate Now</h2>
                    </div>
                    <div className={`self-center w-1/2`}>
                        <div className={`bg-white py-4 px-6 flex flex-col gap-5`}>
                            <div className={`grid grid-cols-3 gap-3`}>
                                <button onClick={() => setAmount(1200)} className={`outline-2 outline-gray-300 rounded-sm focus:outline-3 focus:outline-green-500`}>₹1,200</button>
                                <button onClick={() => setAmount(650)} className={`outline-2 outline-gray-300 rounded-sm focus:outline-3 focus:outline-green-500`}>₹650</button>
                                <button onClick={() => setAmount(350)} className={`outline-2 outline-gray-300 rounded-sm focus:outline-3 focus:outline-green-500`}>₹350</button>
                                <button onClick={() => setAmount(140)} className={`outline-2 outline-gray-300 rounded-sm focus:outline-3 focus:outline-green-500`}>₹140</button>
                                <button onClick={() => setAmount(130)} className={`outline-2 outline-gray-300 rounded-sm focus:outline-3 focus:outline-green-500`}>₹130</button>
                                <button onClick={() => setAmount(120)} className={`outline-2 outline-gray-300 rounded-sm focus:outline-3 focus:outline-green-500`}>₹120</button>
                            </div>
                            <div className={`text-left`}>
                                <form className="flex flex-col gap-3">
                                    <div>
                                        <label htmlFor="amount" className={`text-sm`}>Amount (₹)</label><br />
                                        <input 
                                         type="number"
                                         name="amount"
                                         value={amount}
                                         onChange={(e) => setAmount(e.target.value)}
                                         placeholder="enter amount"
                                         className={`outline-2 outline-gray-300 w-full py-2 px-3 rounded-sm focus:outline-blue-500 focus:outline-3`}
                                         required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="name" className={`text-sm`}>Name</label><br />
                                        <input 
                                         type="text"
                                         name="name"
                                         value={info.name}
                                         onChange={(e) => setInfo({...info, [e.target.name]: e.target.value})}
                                         placeholder="enter your name"
                                         className={`outline-2 outline-gray-300 w-full py-2 px-3 rounded-sm focus:outline-blue-500 focus:outline-3`}
                                         required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className={`text-sm`}>Email</label><br />
                                        <input 
                                         type="email"
                                         name="email"
                                         value={info.email}
                                         onChange={(e) => setInfo({...info, [e.target.name]: e.target.value})}
                                         placeholder="enter your email"
                                         className={`outline-2 outline-gray-300 w-full py-2 px-3 rounded-sm focus:outline-blue-500 focus:outline-3`}
                                         required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className={`text-sm`}>Phone no.</label><br />
                                        <input 
                                         type="number"
                                         name="phone"
                                         value={info.phone}
                                         onChange={(e) => setInfo({...info, [e.target.name]: e.target.value})}
                                         placeholder="enter your phone"
                                         className={`outline-2 outline-gray-300 w-full py-2 px-3 rounded-sm focus:outline-blue-500 focus:outline-3`}
                                         required
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Donate;