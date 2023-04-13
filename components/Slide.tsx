import { Carousel } from "@mantine/carousel";
import Banner from "./Banner";
import Anime1 from"../public/Screenshot 2023-04-12 210347.png"
import Anime2 from"../public/Screenshot 2023-04-12 210452.png"

function Slide() {
  return (
    <Carousel className="text-white" loop withIndicators withControls={false} >
      <Carousel.Slide>
        <Banner imgsrc={Anime1} alt="" width={100} link="/" />
      </Carousel.Slide>
      <Carousel.Slide>
        <Banner imgsrc={Anime2} alt="" width={100} link="/" />
      </Carousel.Slide>
    </Carousel>
  );
}

export default Slide;
