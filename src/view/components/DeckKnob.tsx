import React, { useCallback, useMemo } from 'react';
import { Colors } from '../constants/Colors';
import { Knob } from './Knob';
import WavenerdDeck from '@fms-cat/wavenerd-deck';
import styled from 'styled-components';
import { useMidiValue } from '../utils/useMidiValue';

// == styles =======================================================================================
const StyledKnob = styled( Knob )`
  width: 32px;
  height: 32px;
`;

const Label = styled.div`
  font-size: 10px;
  color: ${ Colors.fore };
`;

const Value = styled.div`
  font-size: 10px;
  color: ${ Colors.fore };
`;

const Root = styled.div<{ isLearning: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  box-shadow: ${ ( { isLearning } ) => (
    isLearning
      ? `0 0 0 2px ${ Colors.accent }`
      : 'none'
  ) };
`;

// == components ===================================================================================
function DeckKnob( { paramName, midiParamNamePrefix, deck, className }: {
  paramName: string;
  midiParamNamePrefix: string;
  deck: WavenerdDeck;
  className?: string;
} ): JSX.Element {
  const value = useMidiValue( midiParamNamePrefix + paramName );

  const handleChange = useCallback(
    ( v ) => {
      deck.setParam( paramName, v );
    },
    [ deck, paramName ]
  );

  const valueStr = useMemo(
    () => value.toFixed( 3 ),
    [ value ],
  );

  return (
    <Root
      isLearning={ false }
      className={ className }
    >
      <Label>{ paramName }</Label>
      <StyledKnob
        midiParamName={ midiParamNamePrefix + paramName }
        deltaValuePerPixel={ 1.0 / 64.0 }
        onChange={ handleChange }
        data-stalker={ paramName }
      />
      <Value>{ valueStr }</Value>
    </Root>
  );
}

export { DeckKnob };
