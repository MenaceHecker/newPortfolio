const ShowcaseSection = () => {
  return (
    <div id="work"className='app-showcase'>
        <div className='w-full'>
            <div className='showcaselayout'>
                {/* LEFT SIDE */}
                <div className="first-project-wrapper">
                    <div className="image-wrapper">
                        <img src="/images/project1.png" alt="crumb" />
                    </div>
                    <div className="text-content">
                        <h2>New Innovative way to make Friends with crumb</h2>
                        <p className="text-white-50 md:text-xl">
                            An App built with React Native, Expo, Supabase and TailwindCSS with fast UI
                        </p>
                    </div>
                </div>
                {/* RIGHT SIDE */}
                <div className="project-list-wrapper overflow-hidden">
                    <div className="project">
                        <div className="image-wrapper bg-[#d5d0c8]">
                        <img src="/images/project2.png" alt="Email Organizer" />
                        </div>
                        <h2>Smart Email Organizer</h2>
                    </div>
                    <div className="project">
                        <div className="image-wrapper bg-[#d5d0c8]">
                        <img src="/images/project3.png" alt="Email Organizer" />
                        </div>
                        <h2>CareerSync Resume Matcher</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShowcaseSection