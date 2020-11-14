import * as React from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import * as styled from './CompoundViewer.styles';
import { Text } from 'react-native';

export function CompoundARViewer(): JSX.Element {
    const { isLoading, compound } = useSearchContext();

    if (!compound || compound.cid === undefined) {
        return <></>;
    }

    if (isLoading) {
        return <Text style={{ color: 'white' }}>Is loading...</Text>;
    }

    return <Text style={{ color: 'white' }}>Hello {compound.cid}</Text>;
}
