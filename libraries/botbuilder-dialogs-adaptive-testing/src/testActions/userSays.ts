/**
 * @module botbuilder-dialogs-adaptive-testing
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { TurnContext, TestAdapter } from 'botbuilder-core';
import { TestAction } from '../testAction';

export interface UserSaysConfiguration {
    text?: string;
    user?: string;
}

/**
 * Action to script sending text to the bot.
 */
export class UserSays extends TestAction implements UserSaysConfiguration {
    public static $kind = 'Microsoft.Test.UserSays';

    /**
     * The text to send to the bot.
     */
    public text: string;

    /**
     * If user is set then the channalAccount.id and channelAccount.name will be from user.
     */
    public user: string;

    /**
     * The locale of user.
     */
    public locale: string;

    /**
     * Execute the test.
     * @param testAdapter Adapter to execute against.
     * @param callback Logic for the bot to use.
     * @returns A Promise that represents the work queued to execute.
     */
    public async execute(testAdapter: TestAdapter, callback: (context: TurnContext) => Promise<void>): Promise<void> {
        if (!this.text) {
            throw new Error('You must define the text property');
        }

        const activity = testAdapter.makeActivity(this.text);
        if (this.user) {
            activity.from = Object.assign({}, activity.from);
            activity.from.id = this.user;
            activity.from.name = this.user;
        }

        if (this.locale) {
            activity.locale = this.locale;
        }

        await testAdapter.processActivity(activity, callback);
    }
}
