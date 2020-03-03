import { emptyUuid } from './types';
import { QueryVariableModel, VariableHide, VariableModel } from '../variable';
import { initialQueryVariableModelState } from '../query/reducer';
import { VariablesState } from './variablesReducer';

export const getVariableState = (
  noOfVariables: number,
  inEditorIndex = -1,
  includeEmpty = false
): Record<string, VariableModel> => {
  const variables: Record<string, VariableModel> = {};

  for (let index = 0; index < noOfVariables; index++) {
    variables[index] = {
      uuid: index.toString(),
      type: 'query',
      name: `Name-${index}`,
      hide: VariableHide.dontHide,
      index,
      label: `Label-${index}`,
      skipUrlSync: false,
    };
  }

  if (includeEmpty) {
    variables[emptyUuid] = {
      uuid: emptyUuid,
      type: 'query',
      name: `Name-${emptyUuid}`,
      hide: VariableHide.dontHide,
      index: noOfVariables,
      label: `Label-${emptyUuid}`,
      skipUrlSync: false,
    };
  }

  return variables;
};

export const getVariableTestContext = (variableOverrides: Partial<QueryVariableModel> = {}) => {
  const defaultVariable = {
    ...initialQueryVariableModelState,
    uuid: '0',
    index: 0,
    name: '0',
  };
  const variable = { ...defaultVariable, ...variableOverrides };
  const initialState: VariablesState = {
    '0': variable,
  };

  return { initialState };
};
