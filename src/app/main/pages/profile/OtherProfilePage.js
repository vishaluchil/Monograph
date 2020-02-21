import React, {useEffect, useState} from 'react';
import {Avatar, Button, Tab, Tabs, Typography} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import {makeStyles} from '@material-ui/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import OtherTimelineTab from './tabs/OtherTimelineTab';
import PhotosVideosTab from './tabs/PhotosVideosTab';
import AboutTab from './tabs/AboutTab';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
    layoutHeader: {
        height                        : 320,
        minHeight                     : 320,
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    }
}));

function OtherProfilePage()
{
    console.log(window.location.pathname);
    const parts = window.location.pathname.split("/");
    const user = parts[parts.length - 1];
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    const [cookies] = useCookies(['user']);
    const [isFollowing, setIsFollowing] = useState(false)

    function handleTabChange(event, value)
    {
        setSelectedTab(value);
    }
 
        fetch(`http://localhost:3000/isFollowing/${user}/${cookies.user}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(res => res.json)
        .then(res => {
            if(res === 'following'){
                setIsFollowing(true)
            }
        })

    function followClick(){
        fetch('http://localhost:3000/follow', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                currentUser: cookies.user,
                userToFollow: user
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res === 'success'){
               setIsFollowing(true)
            }
        })
    }

    function unfollowClick(){
        fetch('http://localhost:3000/unfollow', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                currentUser: cookies.user,
                userToUnfollow: user
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res === 'success'){
               setIsFollowing(false)
            }
        })
    }

    return (
        <FusePageSimple
            classes={{
                header : classes.layoutHeader,
                toolbar: "px-16 sm:px-24"
            }}
            header={
                <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                    <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Avatar className="w-96 h-96" src="assets/images/avatars/Velazquez.jpg"/>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className="md:ml-24" variant="h4" color="inherit">{user}</Typography>
                        </FuseAnimate>
                    </div>

                    <div className="flex items-center justify-end">
                        { isFollowing ?
                        <Button className="mr-8 normal-case" variant="contained" aria-label="Following" onClick={unfollowClick}><CheckIcon fontSize='small'/> Following</Button>
                        : <Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow" onClick={followClick}>Follow</Button>
                        }
                        <Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">Send Message</Button>
                    </div>
                </div>
            }
            contentToolbar={
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    classes={{
                        root: "h-64 w-full border-b-1"
                    }}
                >
                    <Tab
                        classes={{
                            root: "h-64"
                        }}
                        label="Timeline"/>
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="About"/>
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="Photos & Videos"/>
                </Tabs>
            }
            content={
                <div className="p-16 sm:p-24">
                    {selectedTab === 0 &&
                    (
                        <OtherTimelineTab/>
                    )}
                    {selectedTab === 1 && (
                        <AboutTab/>
                    )}
                    {selectedTab === 2 && (
                        <PhotosVideosTab/>
                    )}
                </div>
            }
        />
    )
}

export default OtherProfilePage;
