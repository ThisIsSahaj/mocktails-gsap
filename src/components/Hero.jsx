import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useRef } from "react"
import { useMediaQuery } from "react-responsive"

const Hero = () => {

    // taking video referene
    const videoRef = useRef();

    // checking if device is mobile (for responsiveness of video)
    const isMobile = useMediaQuery({ maxWidth: 767 })  //if its upto 767 then it'll be mobile



    useGSAP(() => {

        // splitting title
        const heroSplit = new SplitText('.title', {
            type: 'chars, words' //split in both characters and words
        })

        // splitting paragraph
        const paragraphSplit = new SplitText('.subtitle', {
            type: 'lines' //split into only lines
        })

        // add gradient class to each char of title
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        // animate each char of title
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05
        });

        // animate lines of paragraph
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05,
            delay: 1,
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero", //trigger at hero section
                start: 'top top', // when the top of the hero section hits the top of the screen
                end: 'bottom top',
                scrub: true
            }
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0)


        // VIDEO ANIMATION
        const startValue = isMobile ? 'top 50%' : 'center 60%';   // when top of video reaches 50% down the screen, animation starts   //similarly when the center of the video reaches 60% down the screen, animation starts
        const endValue = isMobile ? '120% top' : 'bottom top';    // when 120% of video has crossed the top of the screen, animation stops  //similarly, when the bottom of the video has reached the top of the screen, animation stops 

        // VIDEO Animation TIMELINE
        const videoTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,  // this will keep the video stuck on screen while scroll
                // onEnter: () => videoRef.current.play(),
                // onEnterBack: () => videoRef.current.play(),
                // onLeave: () => videoRef.current.pause(),
                // onLeaveBack: () => videoRef.current.pause(),
            }
        })
        
        videoRef.current.onloadedmetadata = () => {
            videoTimeline.to(videoRef.current, {
                currentTime: videoRef.current.duration   // update the current time based on video duration
            })
        }



    }, [])
    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>

                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />

                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block ">
                            <p>Cool. Crisp. Classic</p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>

                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">Every cocktail on our menu is a blend of premium ingredients, reative flair, and timeless recipes - designed to delight your senses.</p>
                            <a href="#cocktails">View Cocktails</a>

                        </div>

                    </div>

                </div>

            </section>

            {/* video section */}
            <div className="video absolute inset-0 ">
                <video
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline  //to hide any video element like trackbar (videoPlayer)
                    preload="auto"  //coz we want to load it automatically as the user opens the page
                />

            </div>
        </>
    )
}

export default Hero