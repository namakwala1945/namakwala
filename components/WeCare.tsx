import Image from "next/image";
import weCare from "../public/optimized/namakwala-large.webp"
export default function WeCare(){
    return(
        <section className="pt-2 pb-2 bg-[#fdf2df]">
            <div className="container text-center justify-center py-8">
                <Image 
                    src={weCare} 
                    alt=""
                    className="object-cover w-full max-w-[680px] mx-auto pb-5"
                    priority
                />
                <p className="text-xl nunitoFont font-light pt-4 sm:text-lg md:text-2xl lg:text-4xl pb-0">One of the Top 10 Largest Salt & Minerals Producers in India.</p>
            </div>
        </section>

    );
}