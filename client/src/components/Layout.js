import { Helmet } from "react-helmet"

export default function Layout({ children }) {
    return (
        <div className="layout">
            <Helmet>
                <title> Social Media</title>
                <meta
                    name = "description"
                    content = "MERN Full-stack Social Media App"
                />
            </Helmet>
            <main className="main">
                {children}
            </main>
        </div>
    )
}