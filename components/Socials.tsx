import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';


function Socials() {
    return (
        <>
            <div className="text-black flex flex-grow justify-center space-x-5 items-center py-10">
                <hr className="w-[40%] h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-600"></hr>
                {/* <p className="uppercase text-gray-600 font-extrabold">Follow Us</p> */}
                <InstagramIcon />
                <FacebookOutlinedIcon />
                <TwitterIcon />
                <PinterestIcon />
                <hr className="w-[40%] h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-600"></hr>
            </div>
        </>
    )
}

export default Socials