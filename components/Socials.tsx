import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { ActionIcon } from '@mantine/core';


function Socials({ color }: { color: string }) {
    return (
        <>
            <ActionIcon color={color} size="lg" component="a" href="https://www.instagram.com/thethirteen.in/" target="_blank">
                <InstagramIcon />
            </ActionIcon>
            <ActionIcon color={color} size="lg" component="a" href="https://www.facebook.com/profile.php?id=100091054797716" target="_blank">
                <FacebookOutlinedIcon />
            </ActionIcon>
        </>
    )
}

export default Socials