import { Carousel } from "@mantine/carousel";
import Banner from "./Banner";

function Slide() {
  return (
    <Carousel className="text-white" loop withIndicators withControls={false} >
      <Carousel.Slide>
        {/* <Banner imgsrc={""} alt="" width={100} link="/" /> */}
      </Carousel.Slide>
    </Carousel>
  );
}

export default Slide;
