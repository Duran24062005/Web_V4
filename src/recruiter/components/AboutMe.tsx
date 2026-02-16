interface AboutMeProps {
    upText?: string[];
    image?: string;
    downText: string[];
    video?: string
}

export const AboutMe = ({upText = [""], image, downText, video}: AboutMeProps) => {
  return (
     <section id="about-me" className="py-20 z-20 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    {
                        image && (
                            <>
                                <div className="md:w-1/2 lg:w-2/6 mb-8 md:mb-0">
                                    <img src={image} alt="Alexi Dg" className="rounded-full mx-auto border-4 border-purple-500 shadow-lg" />
                                </div>
                                <div className="md:w-1/2 md:pl-8">
                                    <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Sobre mi</h2>
                                    {
                                        upText.map((text)=>(
                                            <p className="mb-4">
                                                {text}
                                            </p>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="md:flex lg:flex  justify-center mt-24 px-2">
                <div className="flex flex-col-reverse md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/1 max-w-2xl px-2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left gradient-text">Quiero contarte sobre está web</h2>
                        {
                            downText.map((text)=>(
                                <p className="mb-4 text-sm md:text-base">
                                    {text}
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-end px-2">
                    <video className="w-full max-w-lg rounded-xl border-4 border-purple-500 shadow-xl" controls>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            </div>
        </section>
  )
}
