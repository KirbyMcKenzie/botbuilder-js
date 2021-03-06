/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { DialogContext, TemplateInterface } from 'botbuilder-dialogs';
import { LanguageGenerator } from '../languageGenerator';
import { languageGeneratorKey } from '../languageGeneratorExtensions';

/**
 * Defines a text template where the template expression is local aka "inline"
 * and processed through registered language generator.
 */
export class TextTemplate<D = Record<string, unknown>> implements TemplateInterface<string, D> {
    /**
     * Initialize a new instance of TextTemplate class.
     * @param template The template to evaluate to create text.
     */
    public constructor(template: string) {
        this.template = template;
    }

    /**
     * Gets or sets the template to evaluate to create the text.
     */
    public template: string;

    /**
     * Bind data to template.
     * @param dialogContext DialogContext.
     * @param data Data to bind to.
     */
    public async bind(dialogContext: DialogContext, data: D): Promise<string> {
        if (!this.template) {
            throw new Error(`ArgumentNullException: ${this.template}`);
        }

        const languageGenerator = dialogContext.services.get(languageGeneratorKey) as LanguageGenerator<string, D>;
        if (languageGenerator !== undefined) {
            const lgResult = await languageGenerator.generate(dialogContext, this.template, data);
            const result = lgResult ? lgResult.toString() : '';

            return Promise.resolve(result);
        }

        return Promise.resolve(undefined);
    }

    public toString = (): string => {
        return `TextTemplate(${this.template})`;
    };
}
