import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

export const userDetails = [
  {
    id: 1,
    name: "Ayo-oluwole oluwasomidotun",
    role: "Frontend developer/ Team leader",
    instagram: "https://www.instagram.com/somidotun07/",
    Twitter: "https://x.com/ayo_somidotun",
    Whatsapp: "sdffg",
    linkedin:
      "https://www.linkedin.com/in/ayo-oluwole-oluwasomidotun-51a94522a/",
    email: "johnsomidotun@gmail.com",
  },

  {
    id: 2,
    name: "Adekunle Zainab",
    role: "Project Manager",
    email: "Kemzbakes@gmail.com",
    instagram: "https://www.instagram.com/kemz_bakes/",
    Twitter: "sdffg",
    Whatsapp:
      "https://api.whatsapp.com/send/?phone=2349035451575&text&type=phone_number&app_absent=0",
    linkedin: "https://www.linkedin.com/in/zainab-adekunle-4a173326b/",
  },

  {
    id: 3,
    name: "Covenant adetuyi",
    role: "UI/UX ",
    email: "Covenantadetuyi@gmail.com",
    instagram: "https://www.instagram.com/covenantadetuyi/",
    Twitter: "https://x.com/tomi_kokoki",
    Whatsapp: "https://wa.me/2347035305242",
    linkedin: "https://www.linkedin.com/in/covenant-adetuyi-b0b650367/",
  },

  {
    id: 4,
    name: "Emmanuel Femi",
    role: "Backend developer",
    email: "emmanuelfemi000@gmail.com",
    instagram: "sdffg",
    Twitter: "https://x.com/hodlpreacher",
    Whatsapp: "https://wa.me/2349016192260",
    linkedin: "sdffg",
  },

  {
    id: 5,
    name: "Adebayo victor",
    role: "web3/crypto",
    email: "adebayobvibes@gmail.com",
    instagram: "sdffg",
    Twitter: "sdffg",
    Whatsapp: "sdffg",
    linkedin: "sdffg",
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-muted/30 py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-['Playfair_Display']">
              Contact Us
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Get in touch with our team
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-5">
          <div className=" ">
            <div
              className="flex font-bold flex-col  pb-5 
            md:flex-row justify-between"
            >
              <p>Name:</p>
              <p>Roles:</p>
              <p>Social media handles:</p>
            </div>

            <div className=" flex flex-col gap-5">
              {userDetails.map((userDetail) => (
                <div key={userDetail.id}>
                  <div
                    className="border border-black 
                   flex flex-col gap-3
                   md:flex-row md:justify-between p-3"
                  >
                    <p>{userDetail.name}</p>
                    <p>{userDetail.role}</p>
                    <div
                      className="flex flex-row w-full 
                    md:w-36 justify-between"
                    >
                      {/* instagram */}
                      <a
                        href={userDetail.instagram}
                        title="instagram"
                        target="_blank"
                        className="hover:text-[#E4405F]"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="h-10 text-base" />
                      </a>

                      {/* twitter */}
                      <a
                        href={userDetail.Twitter}
                        title="twitter"
                        target="_blank"
                        className="hover:text-[#1DA1F2]"
                        rel="noopener noreferrer"
                      >
                        <FaXTwitter className="h-10 text-base" />
                      </a>

                      {/* whatsapp */}
                      <a
                        href={userDetail.Whatsapp}
                        title="whatsapp"
                        target="_blank"
                        className="hover:text-[#25D366]"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="h-10 text-base" />
                      </a>

                      {/* linkedin */}
                      <a
                        href={userDetail.linkedin}
                        title="linkedin"
                        className="hover:text-[#0A66C2]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedinIn className="h-10 text-base" />
                      </a>

                      {/* email */}
                      <a
                        href={userDetail.email}
                        title="email"
                        target="_blank"
                        className="hover:text-[#EA4335]"
                        rel="noopener noreferrer"
                      >
                        <MdEmail className="h-10 text-base" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
