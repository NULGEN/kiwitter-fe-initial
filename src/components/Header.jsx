import { Link, useHistory } from "react-router-dom";
import { storage } from "../utils/storage";
import { authService } from "../api/services/authService";

export default function Header(){

    const history = useHistory();
    const user = storage.getUser();

    const handleLogout = ()=>{
        authService.logout();
        history.push("/login");
    };
    return (
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-bold text-lime-700">
              Kiwitter
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-lime-700 font-medium"
              >
                Ana Sayfa
              </Link>
              {user && (
                <Link
                  to={`/profile/${user.nickname}`}
                  className="text-gray-600 hover:text-lime-700 font-medium"
                >
                  Profilim
                </Link>
              )}
            </div>
          </div>
    
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">@{user.nickname}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-lime-600 text-white font-semibold hover:bg-lime-700"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-lime-700 font-medium"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-lime-600 text-white font-semibold hover:bg-lime-700"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </nav>
      );
}
