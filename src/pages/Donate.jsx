import { useState } from "react";
import { createOrder, validateOrder } from "../api/donation";
import {ShieldCheck} from "lucide-react"

const Donate = () => {
    const [info, setInfo] = useState({
        name: "",
        email: "",
        phone: "",
        amount: null,
        domain: "WHEREVER MOST NEEDED"
    });

    const payNow = async () => {
        const body = {
            amount: info.amount,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                "name": info.name,
                "email": info.email,
                "phone": info.phone,
                "domain": info.domain,
            }
        };
        const order = await createOrder(body);

        let options = {
            "key": "rzp_test_RoEYadOfP4eVdX",
            "amount": info.amount * 100,
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
                "name": info.name,
                "email": info.email,
                "contact": "+91" + info.phone,
            },
            "notes": info.domain,
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
                            <div className={`w-full flex justify-center text-sm items-center gap-2`}>
                                <div>
                                    <ShieldCheck color="green" />
                                </div>
                                <div>
                                    <p>Secure payment with </p>
                                </div>
                                <div>
                                    <img src="/images/razorpay.png" className="h-5" alt="" />
                                </div>
                            </div>
                            <div className={`grid grid-cols-3 gap-3`}>
                                {[1200, 650, 350, 140, 130, 120].map(d => (
                                    <>
                                    <button onClick={() => setInfo({...info, amount: d})} className={`outline-2 outline-gray-300 focus:outline-3 focus:outline-green-500 rounded-sm py-2`}>₹{d}</button>
                                    </>
                                ))}
                            </div>
                            <div className={`text-left`}>
                                <form className="flex flex-col gap-3" onSubmit={async (e) => {
                                            e.preventDefault();
                                            await payNow();
                                            setInfo({
                                                name: "",
                                                email: "",
                                                phone: "",
                                                domain: "WHEREVER MOST NEEDED",
                                                amount: null,
                                            });
                                        }}>
                                    <div>
                                        <label htmlFor="amount" className={`text-sm`}>Amount (₹)</label><br />
                                        <input 
                                         type="number"
                                         name="amount"
                                         value={info.amount ?? ""}
                                         onChange={(e) => setInfo({...info, [e.target.name]: e.target.value === "" ? null : Number(e.target.value)})}
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
                                    <div>
                                        <label htmlFor="domain" className="text-sm">domain</label> <br />
                                        <select 
                                         name="domain" 
                                         value={info.domain}
                                         onChange={(e) => setInfo({
                                            ...info,
                                            [e.target.name]: e.target.value,
                                         })}
                                         className={`outline-2 outline-gray-300 w-full py-2 px-3 rounded-sm focus:outline-blue-500 focus:outline-3`}
                                        >
                                            <option value="HEALTHCARE">Healthcare</option>
                                            <option value="EDUCATION">Education</option>
                                            <option value="LIFESTYLE">Lifestyle</option>
                                            <option value="WHEREVER MOST NEEDED">Wherever most needed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button type="submit" className={`bg-green-500 text-white py-2 px-3 shadow-sm rounded-sm`}>Donate</button>
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