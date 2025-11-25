// src/components/common/Breadcrumbs.jsx
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 px-4 py-3">
      <ol className="flex items-center gap-1 flex-wrap">
        <li>
          <Link to="/" className="hover:underline text-[#355425] font-medium">
            Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const formatted = value.replace(/-/g, " ");

          return (
            <li key={to} className="flex items-center gap-1">
              <span>/</span>
              <Link
                to={to}
                className={`capitalize hover:underline ${
                  index === pathnames.length - 1
                    ? "text-gray-900 font-semibold"
                    : "text-[#355425]"
                }`}
              >
                {formatted}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
