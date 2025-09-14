import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthStore from "../Store/useAuthStore";

const OtpVerification = () => {
  const { verifySignupOTP } = useAuthStore();
  const navigate = useNavigate();
  const { email } = useLocation()?.state || {};

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const otp = e.target.otp.value;
      const response = await verifySignupOTP({ otp, email });
      if (response.success) {
        console.log("response.......", response);
        toast.success("OTP verified successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md relative">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center text-green-700">
          OTP Verification
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the OTP sent to your email:{" "}
          <span className="font-medium text-gray-700">{email}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col gap-4">
            <input
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-center tracking-widest text-lg font-semibold"
              type="text"
              name="otp"
              placeholder="Enter OTP"
              maxLength={6}
            />

            <button
              className="w-full p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              type="submit"
            >
              Verify
            </button>
          </div>
        </form>

        {/* Extra styling element */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full blur-2xl opacity-20"></div>
        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-400 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
};

export default OtpVerification;
