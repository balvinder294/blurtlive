import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Center } from 'decorators';
import BlurtLogo from './index';

storiesOf('Elements', module)
    .addDecorator(withKnobs)
    .addDecorator(Center)
    .add('BlurtLogo', () => <BlurtLogo />);
