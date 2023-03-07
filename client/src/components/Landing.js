export default function Landing() {
    return (
        <div className="landing">
            <div className='landing-container'>
                <div className='landing-left'>
                    <h1>
                        The social app for creators
                    </h1>
                    <div className="left-container">
                        <div>
                            <button className="l-btn" id='lbtn1'> Enter </button>
                            <button className="l-btn" id='lbtn2'> Login  </button>
                        </div>
                    <p className="left-text">
                        Be the first to know what your friends are posting. Welcome to the revolution of social media.
                    </p>
                    </div>
                </div>
                <video 
                    src='https://videos.ctfassets.net/qqk6u6a33mqj/4lcGTeQNYGCElWZUwITLRG/7bdd395d72fbaf05e340bce3a65c842a/ill_home.mp4'
                    preload='auto'
                    autoPlay
                    loop
                ></video>
            </div>
            <div className="l-footer">

            </div>
        </div>
    )
}