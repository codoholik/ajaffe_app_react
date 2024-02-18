import BotMessage from './Bot';
import axios from 'axios';
import OtpForm from './OtpForm';
import SendMessage from './SendMessage';
import { useState, useRef, useEffect } from 'react';
import GreetingOptions from './GreetingOptions';
import OrderStatusForm from './orderstatusform';
import SingleOrderStatusDetail from './singleorderstatusdetail';
import CustomerServiceForm from './customer_service_form';
import { useNavigate } from 'react-router-dom';


const Chatbot = () => {
    const navigate = useNavigate();
    
    const chatbot_window = useRef();
    // This hook will automatically calls whenever component re-renders or mounted in DOM.
    useEffect(_ => {
        if (chatbot_window.current) {
            chatbot_window.current.scrollTop = chatbot_window.current.scrollHeight;
        }
    });

    const [messages, setMessages] = useState([]);

    const chatUserState = (text) => {
        setMessages(prevMessages => {
            const usermessages = [...prevMessages];
            usermessages.push({
              'user': text
            });
            return usermessages;
        });
    }

    const chatBotState = (text) => {
        setMessages(prevMessages => {
            const botmessages = [...prevMessages];
            botmessages.push({
              'bot': text
            });
            return botmessages;
        });
    }

    // this state will hold whether to show view more button in single order status details or not
    const [viewmoresingleorderstatusdetail, setviewmoresingleorderstatusdetail] = useState(false);
    // this state will hold whether to show single order status details or not
    const [singleorderstatusdetail, setsingleorderstatusdetail] = useState(null);
    // this state will hold whether to show order status form or not
    const [orderstatusform, setorderstatusform] = useState(null);
    const submitOrderStatus = _ => {
        setsingleorderstatusdetail(null);
        const order_no = document.getElementById('order_status_val').value.trim();
        axios.post(`${process.env.REACT_APP_DOMAIN}/order_status`, {
          'order_num': order_no
        }).then(resp => {
          const orders_count = resp.data.data.length;
          if (orders_count === 0) {
            chatBotState('No orders found.');
            setorderstatusform(null);
          } else if (orders_count === 1) {
            // set the state to show the single order status details view
            setsingleorderstatusdetail(resp.data.data[0]);
            setorderstatusform(null);
          } else {
            // set the state to show the single order status details view
            setsingleorderstatusdetail(resp.data.data[0]);
            setorderstatusform(null);
            setviewmoresingleorderstatusdetail(true);
          }
        }).catch(_ => {
          chatUserState('Unable to fetch the results, Please reach out at csd@ajaffe.com');
          setorderstatusform(null);
        });
    }

    const openAllOrdersPage = order_no => {
        setsingleorderstatusdetail(null);
        navigate(`/view/${order_no}/allorders`);
    }

    const [customerservice, setcustomerservice] = useState(null);
    const [validate_otp, setvalidateotp] = useState(null);
    const [otpform, setotpform] = useState(null);
    const otpFormState = (otp) => {
        setotpform(otp);
        setvalidateotp(null);
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (!emailRegex.test(event.target.value)) {
                const text = event.target.value;
                chatUserState(text);
                event.target.value = '';
                const anchorTagRegex = /<a\b[^>]*>(.*?)<\/a>/;
                // make a post call to va agent openai api
                axios.post(`${process.env.REACT_APP_DOMAIN}/openai`, {
                    'prompt': text
                })
                .then(response => {
                    if (anchorTagRegex.test(response.data.chatbot_answer)) {
                        chatBotState(response.data.chatbot_answer.replace(/\n/g, '<br>'));
                    } else {
                        chatBotState(response.data.chatbot_answer.replace(/(.*?):/g, '<strong>$1</strong>:').replace(/\n/g, '<br>'));
                    }
                    // add the price link
                    // Extract the first item ID
                    const firstItem = response.data.chatbot_answer.split("\n\n")[0];
                    const matchItemId = firstItem.match(/Item Id: (.*?)\s/);
                    const firstItemId = matchItemId ? matchItemId[1] : "";
                    if(firstItemId !== '') {
                        const price_link = `https://ajaffe.com/catalogsearch/result/?q=${firstItemId}`;
                        const a = document.createElement('a');
                        a.setAttribute('href', price_link);
                        a.setAttribute('target', '_blank');
                        a.textContent = price_link;
                    }
                })
                .catch(err => chatBotState('Please contact at csd@ajaffe.com.'));
            }
            else {
                const value = event.target.value;
                chatUserState(value);
                event.target.value = '';
                // setvalidateotp(true); //For using without OTP validation
                axios.post(`${process.env.REACT_APP_DOMAIN}/otp_generator`, {'email': value}).then(response => {
                    chatBotState(response.data.message);
                    chatBotState("Enter your OTP here");
                    setvalidateotp(true);
                });
            }
        }
    }

    const otp_message = (otp_input_id) =>{
        const otp_value = document.getElementById(otp_input_id).value.trim();
        document.getElementById(otp_input_id).value = '';
        // otpFormState(otp_value); //For using without OTP validation
        axios.post(`${process.env.REACT_APP_DOMAIN}/otp_validation`, {'otp': otp_value}).then(response => {
            if (response.data.success === true) {
                otpFormState(otp_value);
            } 
            else {
                chatBotState("Wrong OTP value entered!");
            }
        })
    }

    // Perform actions based on the clicked button
    const handleButtonClick = (buttonName) => {
        switch (buttonName) {
            case 'Employee':
                chatUserState('Employee');
                chatBotState('Enter your email id');
                break;
            case 'Consumer':
                // botMessage('Please reach out with your query on csd@ajaffe.com');
                break;
            case 'Retailer':
                // botMessage('Please reach out with your query on csd@ajaffe.com');
                break;
            case 'Search Item':
                chatUserState(`You selected ${buttonName}`);
                navigate('/item/search');
                break;
            case 'Search Price':
                break;
            case 'Order Status':
                chatBotState('Enter your order_number.');
                setorderstatusform(true);
                break;
            case 'Create Order':
                chatUserState(`You selected ${buttonName}`);
                window.open('/order/create', '_blank');
            case 'Help':
                break;
            case 'Send Questions to Customer Service':
                setcustomerservice(true);
                break;
            default:
                break;
        }
    }

    // This function will send the inquiry to customer
    const submitCustomerServiceForm = _ => {
        const payload = {
            'name': document.getElementById('customer_service_name').value.trim(),
            'email': document.getElementById('customer_service_email').value.trim(),
            'msg': document.getElementById('customer_service_message').value.trim()
          }
          document.getElementById('customer_service_name').value = '';
          document.getElementById('customer_service_email').value = '';
          document.getElementById('customer_service_message').value = '';

          document.getElementById('customerservice').style.display = 'none';
          document.getElementById('otpform').style.display = 'none';

          chatBotState('We are sending a mail...');

          axios.post(`${process.env.REACT_APP_DOMAIN}/send_customer_service_inquiry`, payload)
          .then(resp => {
            if (resp.data.success === true) {
                chatBotState('Mail Sent Successfully.');
                setcustomerservice(null);
            } else {
                chatBotState('Mail could not be delivered, please contact at csd@ajaffe.com.');
                setcustomerservice(null);
            }
          })
          .catch(_ => {
            chatBotState('Mail could not be delivered, please contact at csd@ajaffe.com.');
            setcustomerservice(null);
        });
    }

    // creating greeting buttons for users
    const greetingButtons = ['Employee', 'Consumer', 'Retailer'];
    const userGreetings = greetingButtons.map(greetingButton =>
        <button key={greetingButton} className="btn btn-outline-primary" onClick={_ => handleButtonClick(greetingButton)}>{greetingButton}</button>
        )

    const [chatbotcloser, setchatbotcloser] = useState(false);
    const toggleClass = _ => {
        setchatbotcloser(prevchatbotcloser => !prevchatbotcloser);
    }

    return (
        <div className={chatbotcloser === true ? 'chatbot chatbot--closed' : 'chatbot'}>
            <div className="chatbot__header" onClick={toggleClass}>
                <p style={{margin: 0, fontSize:'24px'}}>AJAFFE VA</p>
                <svg className="chatbot__close-button icon-close" viewBox="0 0 32 32">
                <use xlinkHref="#close" />
                </svg>
                <svg className="chatbot__close-button icon-speech" viewBox="0 0 32 32">
                <use xlinkHref="#speech" />
                </svg>
            </div>
            <div className="chatbot__message-window" ref={chatbot_window}>
                <ul className="chatbot__messages">
                    <BotMessage msg={userGreetings} />
                    {messages.map((message, idx) => (
                        <li key={idx} className={message.bot ? 'is-ai animation' : 'is-user animation'}>
                            {message.bot && (
                                <>
                                    <div className="is-ai__profile-picture">
                                        <svg className="icon-avatar" viewBox="0 0 32 32">
                                            <use xlinkHref="#avatar" />
                                        </svg>
                                        </div>
                                        <span className="chatbot__arrow chatbot__arrow--left"></span>
                                    <div className="chatbot__message" dangerouslySetInnerHTML={{__html: message.bot}}>
                                    </div>
                                </>
                            )}
                            {message.user && (
                                <>
                                    <p className='chatbot__message'>
                                        {message.user}
                                    </p>
                                    <span className='chatbot__arrow chatbot__arrow--right'></span>
                                </>
                            )}
                        </li>
                    ))}
                    {validate_otp && <OtpForm validate_otpfunc={otp_message} />}
                    {otpform && <GreetingOptions handler={handleButtonClick} />}
                    {customerservice && <CustomerServiceForm submitCustomerService={submitCustomerServiceForm} />}
                    {orderstatusform && <OrderStatusForm handleSubmit={submitOrderStatus} />}
                    {singleorderstatusdetail && <SingleOrderStatusDetail order={singleorderstatusdetail} viewmorebtn={viewmoresingleorderstatusdetail} loadallorderspage={openAllOrdersPage} />}
                </ul>
            </div>
            <SendMessage key_down={handleKeyDown} />
            <svg style={{display: 'none'}}>
                <defs>
                    <symbol
                    id="avatar"
                    viewBox="0 0 32 32"
                    >
                    <circle cx="16" cy="10" r="8" />
                    <path
                        d="M16,17.5c-3.314,0-6,2.239-6,5v0.5h12v-0.5C22,19.739,19.314,17.5,16,17.5z"
                        />
                    </symbol>
                    <symbol
                    id="send"
                    viewBox="0 0 32 32"
                    >
                    <path
                        d="M3.154,28.907c-1.04,0.471-2.177-0.256-2.242-1.295c-0.065-1.048,1.27-5.829,1.782-7.102
                        c0.077-0.189,0.372-0.465,0.64-0.312c1.455,0.884,3.147,3.952,4.822,4.198c0.368,0.043,1.576-1.004,2.066-1.176
                        c0.477-0.176,0.95,0.498,0.73,1.068c-0.149,0.339-1.998,3.028-3.845,5.654C6.281,28.693,3.95,28.483,3.154,28.907z M27.995,4.878
                        c-1.449-1.354-3.447-2.268-4.34-1.27c-0.489,0.516-0.688,1.269-0.548,1.971c0.1,0.605,0.575,1.177,1.354,1.325
                        c0.912,0.167,1.746-0.581,2.207-1.246c0.212-0.292,0.524-0.377,0.81-0.289C27.661,5.529,28.401,5.43,27.995,4.878z M31.647,1.202
                        c-0.447-0.384-1.193-0.338-1.689,0.066l-23.648,18.463c-0.416,0.346-1.039,1.203-1.187,1.973c-0.2,1.072,0.314,1.438,0.902,1.414
                        c1.216-0.059,2.781-0.212,4.232-0.518l1.503-3.159l0.021,0.002c0.475,0.478,0.956,1.059,1.207,1.405
                        c0.13,0.185,0.346,0.573,0.688,0.34c0.288-0.208,1.5-1.281,2.195-1.917l0.001,0.001c0.088-0.088,0.175-0.175,0.262-0.264
                        c0.536-0.544,0.915-0.926,1.498-1.71c0.496-0.72,0.619-0.896,1.015-1.165c1.006-0.569,1.949,0.625,2.432,1.043
                        c1.227,1.334,2.14,2.354,3.442,2.828c1.681,0.687,3.057,0.578,4.284-0.669c1.207-1.258,1.33-3.129,0.448-5.256
                        C32.77,2.615,32.095,1.579,31.647,1.202z"
                        />
                    </symbol>
                    <symbol
                    id="close"
                    viewBox="0 0 32 32"
                    >
                    <path
                        d="M16,13.657L26.364,3.293c1.171-1.171,1.171-3.071,0-4.242s-3.071-1.171-4.242,0L11.757,9.414L1.393-1.95
                        c-1.171-1.171-3.071-1.171-4.242,0s-1.171,3.071,0,4.242L7.515,16L-2.849,26.364c-1.171,1.171-1.171,3.071,0,4.242
                        s3.071,1.171,4.242,0L16,20.586l10.364,10.364c1.171,1.171,3.071,1.171,4.242,0s1.171-3.071,0-4.242L20.586,16L30.95,5.636
                        c1.171-1.171,1.171-3.071,0-4.242C29.778,0.235,28.889-0.056,28-0.056s-1.778,0.291-2.435,0.949L16,13.657z"
                        />
                    </symbol>
                </defs>
                </svg>
                </div>
    )
}


export default Chatbot;