// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceClientCredentials } from '@azure/ms-rest-js';
import { Activity } from 'botbuilder-core';
import { assert, Assertion } from 'botbuilder-stdlib';
import { ClaimsIdentity } from 'botframework-connector';

export interface ProactiveCredentialsResult {
    credentials: ServiceClientCredentials;
    scope: string;
}

export interface AuthenticateRequestResult extends ProactiveCredentialsResult {
    claimsIdentity: ClaimsIdentity;
    calledId: string;
}

export abstract class BotFrameworkAuthentication {
    static assert: Assertion<BotFrameworkAuthentication> = assert.instanceOf(
        'BotFrameworkAuthentication',
        BotFrameworkAuthentication
    );

    static isType = assert.toTest(BotFrameworkAuthentication.assert);

    abstract authenticateRequest(activity: Activity, authHeader: string): Promise<AuthenticateRequestResult>;

    abstract getProactiveCredentials(
        claimsIdentity: ClaimsIdentity,
        audience: string
    ): Promise<ProactiveCredentialsResult>;
}
