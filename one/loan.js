import { colors } from 'configs';
import { DynamicConstant } from 'molecules';

const LANG_PREFIX = 'screens.loanConstant.text.';
export const HIRE_PURCHASE_ACC_TYPE = 'H';

export const LOAN_COMPANY_TYPE = {
  PBB: 'PBB',
  PIBB: 'PIBB',
};

export const ESI_STATUS = {
  P: { key: 'P', label: `${LANG_PREFIX}esiPending`, bgColor: colors.lightestBg, color: colors.yellow },
  F: { key: 'F', label: `${LANG_PREFIX}esiFail`, bgColor: colors.lightestRed, color: colors.primary },
  A: { key: 'A', label: `${LANG_PREFIX}esiFail`, bgColor: colors.lightestRed, color: colors.primary },
  E: { key: 'E', label: `${LANG_PREFIX}esiFail`, bgColor: colors.lightestRed, color: colors.primary },
  S: { key: 'S', label: `${LANG_PREFIX}esiSuccess`, bgColor: colors.lightestBg, color: colors.mediumGreen },
  C: { key: 'C', label: `${LANG_PREFIX}esiSuccess`, bgColor: colors.lightestBg, color: colors.mediumGreen },
};

export const LOAN_DESC = {
  id: '01',
  lists: [
    {
      id: '001',
      details: [
        {
          type: DynamicConstant.variants.numberList,
          data: [
            {
              id: '0001',
              label: `${LANG_PREFIX}infoLoan`,
            },
            {
              id: '0002',
              label: `${LANG_PREFIX}infoLoan2`,
            },
          ],
        },
      ],
    },
  ],
};
