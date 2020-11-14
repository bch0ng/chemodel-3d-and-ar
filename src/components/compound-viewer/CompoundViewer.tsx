import * as React from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import * as styled from './CompoundViewer.styles';
import { Text } from 'react-native';
import { ViroAR } from './viro-ar/ViroAR';

export function CompoundARViewer(): JSX.Element {
    return <ViroAR />;
}
