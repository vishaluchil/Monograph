import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {LoginPageConfig} from 'app/main/pages/auth/login/LoginPageConfig';
import {RegisterPageConfig} from 'app/main/pages/auth/register/RegisterPageConfig';
import {ForgotPasswordPageConfig} from 'app/main/pages/auth/forgot-password/ForgotPasswordPageConfig';
import {ProfilePageConfig} from 'app/main/pages/profile/ProfilePageConfig';
import {ResetPasswordPageConfig} from 'app/main/pages/auth/reset-password/ResetPasswordPageConfig';
import {MailConfirmPageConfig} from 'app/main/pages/auth/mail-confirm/MailConfirmPageConfig';
import {ChatAppConfig} from 'app/main/chat/ChatAppConfig';

const routeConfigs = [
    LoginPageConfig,
    RegisterPageConfig,
    ForgotPasswordPageConfig,
    ProfilePageConfig,
    ResetPasswordPageConfig,
    MailConfirmPageConfig,
    ChatAppConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/chat"/>
    }
];

export default routes;
