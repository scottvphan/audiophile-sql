import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0);
        };

        // Scroll after a brief delay (e.g., 100 milliseconds)
        const scrollTimeout = setTimeout(scrollToTop, 100);

        // Clear the timeout if the component unmounts
        return () => clearTimeout(scrollTimeout);
    }, [pathname]);

    return null;
}
