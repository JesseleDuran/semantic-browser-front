import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        objectFit: 'cover',
    },
  };

class ResultItemImage extends Component {

    render = () => {
        const { classes, thumbnailLink, title, contextLink, isLoggedIn } = this.props;
        return (
            <Card className={classes.card}>
                <div>
                    <CardMedia
                        component="img"
                        alt={title}
                        className={classes.media}
                        height="140"
                        image={thumbnailLink}
                        title={title}
                    />
                    <CardContent>
                        <Typography component="p">
                            {title}
                        </Typography>
                    </CardContent>
                </div>   
                <CardActions>
                    <Button size="small" color="primary" href={contextLink}>
                        Visitar
                    </Button>
                    {(isLoggedIn) ? (
						<Button size="small">
                            <Favorite color="disabled" />
                        </Button>
						) : (null)}
                </CardActions>
            </Card>
        );
    };
}

export default withRouter(withStyles(styles)(ResultItemImage));


