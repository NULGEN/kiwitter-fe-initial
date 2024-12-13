import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useForm } from "react-hook-form";
import { authService } from "../api/services/authService";

export default function Signup() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  async function handleSignup(data) {
    try {
      setIsLoading(true);
      setError("");
      
      await authService.signup({
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        password: data.password
      });
      
      history.push('/login', { 
        message: 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.' 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl text-center font-semibold tracking-tighter text-lime-700">
        Hoş Geldin!
      </h1>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(handleSignup)} className="space-y-4 mt-4">
        <div>
          <div className="flex justify-between gap-2 items-baseline pb-1">
            <label htmlFor="name">İsim Soyisim</label>
            <span className="text-sm font-medium text-red-600">
              {errors.name && errors.name.message}
            </span>
          </div>
          <input
            type="text"
            id="name"
            className="w-full h-10 px-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            {...register("name", { 
              required: "Bu alan zorunlu",
              minLength: {
                value: 2,
                message: "İsim en az 2 karakter olmalıdır"
              }
            })}
          />
        </div>

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
            {...register("nickname", { 
              required: "Bu alan zorunlu",
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Sadece harf, rakam ve alt çizgi kullanabilirsiniz"
              },
              minLength: {
                value: 3,
                message: "Kullanıcı adı en az 3 karakter olmalıdır"
              }
            })}
          />
        </div>

        <div>
          <div className="flex justify-between gap-2 items-baseline pb-1">
            <label htmlFor="email">Email</label>
            <span className="text-sm font-medium text-red-600">
              {errors.email && errors.email.message}
            </span>
          </div>
          <input
            type="email"
            id="email"
            className="w-full h-10 px-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            {...register("email", {
              required: "Bu alan zorunlu",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Geçerli bir email adresi girin"
              }
            })}
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
            {...register("password", { 
              required: "Bu alan zorunlu",
              minLength: {
                value: 6,
                message: "Şifre en az 6 karakter olmalıdır"
              }
            })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`h-12 text-center block w-full rounded-lg bg-lime-700 text-white font-bold
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-800'}`}
        >
          {isLoading ? 'Kaydediliyor...' : 'KAYIT OL'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-gray-600">Zaten hesabınız var mı?</span>{" "}
        <Link to="/login" className="text-lime-700 font-semibold hover:text-lime-800">
          Giriş yapın
        </Link>
      </div>
    </AuthLayout>
  );
}

