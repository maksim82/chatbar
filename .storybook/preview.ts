import type {Preview} from "@storybook/react";
import {ThemeDecorator} from "../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import {StyleDecorator} from "../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import {Theme} from "../src/app/providers/ThemeProvider";
import {RouterDecorator} from "../src/shared/config/storybook/RouterDecorator/RouterDecorator";

const preview: Preview = {
  decorators: [
    ThemeDecorator(Theme.LIGHT),
    StyleDecorator,
    RouterDecorator,
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
