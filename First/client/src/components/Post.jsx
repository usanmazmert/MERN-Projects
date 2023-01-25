import React from 'react'
import moment from "moment";
import {Link} from "react-router-dom";
import {styled} from "@mui/material";
import {
    Card,
    Chip,
    Button,
    CardMedia,
    CardContent,
    CardActions,
    Typography
} from "@mui/material";
import noimage from "../images/noimage.svg";

const StyledCard = styled(Card)(({theme}) => ({
    maxWidth: 374,
    position: "relative",
    margin: "0 auto",
}));

const StyledCardMedia = styled(CardMedia)(({theme}) => ({
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
}))

const Post = ({_id, title, subtitle, content, tag, image, createdAt}) => {
    const covertRelativeTime = (date) => {
        return moment(date).fromNow();
    }
  return (
    <div>
        <StyledCard>
            <StyledCardMedia image={image ||noimage} title="Resim"/>
            <div className='overlay'>
                <Typography variant="h6">Didem</Typography>
                <Typography variant="body2">
                    {covertRelativeTime(createdAt)}
                </Typography>
            </div>
            <CardContent>
                <Typography variant="h6" component="p">
                    {title}
                </Typography>
                <Typography variant="h6" component="p">
                    {subtitle}
                </Typography>
                <Typography variant="h6" component="p">
                    {content?.substring(0, 250) + "..."}
                </Typography>
                <Chip label={`#${tag}`} variant="outlined" sx={({theme}) => ({
                    marginTop: "0.5rem",
                })} />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <Link to={`/posts/${_id}`}>Daha fazla...</Link>
                </Button>
            </CardActions>
        </StyledCard>
    </div>
  )
}

export default Post