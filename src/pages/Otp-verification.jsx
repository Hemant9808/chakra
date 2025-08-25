import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthStore from "../Store/useAuthStore";


const OtpVerification = () => {
    const { verifySignupOTP } = useAuthStore();
    const navigate = useNavigate();
    const { email } = useLocation()?.state || {};
    
    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        const otp = e.target.otp.value;
        const response = await verifySignupOTP({ otp, email });
        if(response.success){
            console.log("response.......",response);
            toast.success("OTP verified successfully");
            navigate("/");  
        }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <div>
        
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Otp Verification</h1>   
            <p className="text-sm text-gray-500">Enter the OTP sent to your email: {email}</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center w-full max-w-md mt-4 gap-4"> 
                    <input className="w-full p-2 rounded-md border border-gray-300" type="text" name="otp" placeholder="Enter OTP" />
                    <button className="w-full p-2 rounded-md bg-blue-500 text-white mt-4" type="submit">Verify</button>
                </div>
            </form>
        </div>
        

           
        </div>
    )
}

export default OtpVerification;

