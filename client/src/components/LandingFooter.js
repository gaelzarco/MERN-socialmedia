import { Link } from "react-router-dom"

export default function LandingFooter() {
    return (
        <footer className="landing-footer">
            <div className="landing-footer-text">
                <h2>Don't miss out on what your friends are posting</h2>
                <p>People on Social Media are the first to know.</p>
            </div>

            <div className="landing-footer-btn-container">
                <Link to='/login'><button className="landing-footer-btn">Login</button></Link>
                <Link to='/create-account'><button className="landing-footer-btn">Sign-up</button></Link>
            </div>
        </footer>
    )
}