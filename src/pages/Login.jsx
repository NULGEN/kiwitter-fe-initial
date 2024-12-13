
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { authService } from "../api/services/authService";
import AuthLayout from "./AuthLayout";
import { useAuthContext } from "../contexts/AuthContext";

export default function Login() {
 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const {login} = useAuthContext();
  const {from} = location.state || {from: {pathname: "/"}};
  const message = location.state?.message;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  async function handleLogin(data) {
      try{
        setIsLoading(true);
        setError("");

        const response= await authService.login({
          nickname : data.nickname,
          password: data.password
        });
        if(response.token){
          login(response.user, response.token);
          history.replace(from);
        }
      }
      catch (err){
         setError(err.message || "Giriş yapılırken bir hata oluştu" )

      }finally {
        setIsLoading(false);
      }

  }

  return (
    <AuthLayout>
    <h1 className="text-3xl text-center font-semibold tracking-tighter text-lime-700">
      Hoş Geldin!
    </h1>
    
    {message && (
      <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
        {message}
      </div>
    )}
    
    {error && (
      <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 mt-4">
      <div>
        <div className="flex justify-between gap-2 items-baseline pb-1">
          <label htmlFor="nickname">Kullanıcı adı</label>
          <span className="text-sm font-medium text-red-600">
            {errors.nickname && errors.nickname.message}
          </span>
        </div>
        <input
          type="text"
          id="nickname"
          className="w-full h-10 px-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
          {...register("nickname", { required: "Bu alan zorunlu" })}
        />
      </div>

      <div>
        <div className="flex justify-between gap-2 items-baseline pb-1">
          <label htmlFor="password">Şifre</label>
          <span className="text-sm font-medium text-red-600">
            {errors.password && errors.password.message}
          </span>
        </div>
        <input
          type="password"
          id="password"
          className="w-full h-10 px-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
          {...register("password", { required: "Bu alan zorunlu" })}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`h-12 text-center block w-full rounded-lg bg-lime-700 text-white font-bold
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-800'}`}
      >
        {isLoading ? 'Giriş yapılıyor...' : 'GİRİŞ YAP'}
      </button>
    </form>

    <div className="mt-6 text-center">
      <span className="text-gray-600">Hesabınız yok mu?</span>{" "}
      <Link to="/signup" className="text-lime-700 font-semibold hover:text-lime-800">
        Kayıt olun
      </Link>
    </div>
  </AuthLayout>
  );
}
