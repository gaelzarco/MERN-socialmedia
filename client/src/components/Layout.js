import { Helmet } from "react-helmet"

import { NavBar, Footer } from '.'

export default function Layout({ children }) {
    return (
        <div className="layout">
            <Helmet>
                <title>MERN Social Media</title>
                <meta
                    name = "description"
                    content = "Full-stack Social Media App"
                />
            </Helmet>
            <header>
                <NavBar />
            </header>
            <main className="main-container">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}